/**
 * MusicEngine — SmritiSaathi
 *
 * Owns exactly ONE HTMLAudioElement for the lifetime of the browser session.
 * Implemented as a plain TypeScript class (not a React hook) so it can be
 * created once outside the React tree and shared as a singleton.
 *
 * Responsibilities:
 *  - Play, pause, mute, set volume, select track, loop
 *  - Fade-out → src change → fade-in track transitions
 *  - Race-safe transitions via a generation counter
 *  - Audio ducking for TTS / narration sources
 *  - Browser autoplay rejection detection
 *  - Observable state via listener subscriptions (for Phase 2 Context)
 *  - Clean resource disposal
 *
 * SSR contract:
 *  - The class can be instantiated on the server; it holds no browser state
 *    until .init() is called.
 *  - HTMLAudioElement is created lazily inside .init(), which must only be
 *    called from a 'use client' component or useEffect.
 *  - All methods are guarded by this._audio !== null checks so they are
 *    safe to call before .init() without throwing.
 */

import type {
  MusicMode,
  MusicTrack,
  PlaybackStatus,
  MusicEngineState,
  MusicEngineStateListener,
} from '../types';
import {
  ALL_TRACKS,
  DEFAULT_CALM_TRACK_ID,
  DEFAULT_COGNITIVE_TRACK_ID,
  getTrackById,
} from '../constants/track-catalog';

// ---------------------------------------------------------------------------
// Tuning Constants
// ---------------------------------------------------------------------------

/** Effective volume applied to audio during ducking [0, 1]. */
const DUCK_VOLUME = 0.15;

/** Duration of fade-out and fade-in animations in milliseconds. */
const FADE_DURATION_MS = 600;

/** Interval between volume steps during a fade (ms). */
const FADE_STEP_MS = 30;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

// ---------------------------------------------------------------------------
// MusicEngine
// ---------------------------------------------------------------------------

export class MusicEngine {
  // ── Audio element ─────────────────────────────────────────────────────
  private _audio: HTMLAudioElement | null = null;

  // ── Playback state ────────────────────────────────────────────────────
  private _status: PlaybackStatus = 'idle';
  private _currentTrack: MusicTrack | null = null;
  private _mode: MusicMode = 'calm';

  // ── Volume state ──────────────────────────────────────────────────────
  /** User-configured volume [0, 1].  This is the "desired" volume. */
  private _volume: number = 0.5;
  /** Whether the user has muted the audio. */
  private _muted: boolean = false;

  // ── Ducking ───────────────────────────────────────────────────────────
  /**
   * Set of source IDs that have requested ducking.
   * Music stays ducked until this set is empty.
   */
  private _duckingSources: Set<string> = new Set();

  // ── Transition race-guard ─────────────────────────────────────────────
  /**
   * Monotonically increasing counter.  Each call to _changeTrack() increments
   * this value and captures the current generation.  Any asynchronous step
   * (fade, load) that observes a stale generation must abort immediately.
   */
  private _transitionGeneration: number = 0;
  private _isTransitioning: boolean = false;

  // ── Fade timer ────────────────────────────────────────────────────────
  private _fadeIntervalId: ReturnType<typeof setInterval> | null = null;

  // ── Observers ─────────────────────────────────────────────────────────
  private _listeners: Set<MusicEngineStateListener> = new Set();

  // =========================================================================
  // Initialisation & Disposal
  // =========================================================================

  /**
   * Create and configure the single HTMLAudioElement.
   *
   * MUST be called only inside a browser environment (e.g. from useEffect or
   * an event handler).  Safe to call multiple times — subsequent calls are
   * no-ops if the element already exists.
   *
   * @param initialVolume  Restored from stored preferences.
   * @param initialMuted   Restored from stored preferences.
   * @param initialMode    The mode to pre-select the default track for.
   */
  public init(
    initialVolume: number = 0.5,
    initialMuted: boolean = false,
    initialMode: MusicMode = 'calm'
  ): void {
    if (this._audio) return; // Already initialised.

    this._volume = clamp01(initialVolume);
    this._muted = initialMuted;
    this._mode = initialMode;

    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'none'; // Do not preload until a track is explicitly played.
    audio.volume = this._effectiveVolume();

    // Attach event listeners.
    audio.addEventListener('canplay', this._onCanPlay);
    audio.addEventListener('error', this._onError);
    audio.addEventListener('pause', this._onPause);
    audio.addEventListener('play', this._onPlay);
    audio.addEventListener('ended', this._onEnded);

    this._audio = audio;

    // Pre-select the default track for the initial mode without playing yet.
    const defaultId =
      initialMode === 'calm' ? DEFAULT_CALM_TRACK_ID : DEFAULT_COGNITIVE_TRACK_ID;
    const defaultTrack = getTrackById(defaultId) ?? null;
    this._currentTrack = defaultTrack;

    this._notify();
  }

  /**
   * Tear down all listeners, clear timers, pause and nullify the audio element.
   * Call from React cleanup (useEffect return / Provider unmount) to prevent
   * memory leaks in development fast-refresh cycles.
   */
  public dispose(): void {
    this._clearFadeInterval();

    if (this._audio) {
      this._audio.removeEventListener('canplay', this._onCanPlay);
      this._audio.removeEventListener('error', this._onError);
      this._audio.removeEventListener('pause', this._onPause);
      this._audio.removeEventListener('play', this._onPlay);
      this._audio.removeEventListener('ended', this._onEnded);

      this._audio.pause();
      this._audio.src = '';
      this._audio.load(); // Triggers resource release in Chromium.
      this._audio = null;
    }

    this._listeners.clear();
    this._status = 'idle';
    this._currentTrack = null;
    this._isTransitioning = false;
  }

  // =========================================================================
  // State Observation
  // =========================================================================

  /**
   * Subscribe to state changes.  Returns an unsubscribe function.
   *
   * Phase 2 will call this from the MusicProvider to drive React state.
   */
  public subscribe(listener: MusicEngineStateListener): () => void {
    this._listeners.add(listener);
    // Immediately emit the current state so the subscriber can hydrate.
    listener(this.getState());
    return () => {
      this._listeners.delete(listener);
    };
  }

  /** Return a snapshot of current engine state (immutable to callers). */
  public getState(): MusicEngineState {
    return {
      status: this._status,
      currentTrack: this._currentTrack,
      mode: this._mode,
      volume: this._volume,
      muted: this._muted,
      isTransitioning: this._isTransitioning,
      isDucked: this._duckingSources.size > 0,
      duckingSources: new Set(this._duckingSources), // defensive copy
    };
  }

  // =========================================================================
  // Playback Control
  // =========================================================================

  /**
   * Attempt to start or resume playback of the currently loaded track.
   *
   * Handles autoplay rejection:
   *  - If the browser blocks the play() promise, status → 'blocked'.
   *  - A future UI button can retry by calling play() again after a
   *    user gesture has occurred.
   */
  public async play(): Promise<void> {
    if (!this._audio) return;
    if (this._status === 'playing') return;

    // If there is no media loaded yet, load the current track's src first.
    // We check currentSrc (the resolved URL actually loaded) rather than the
    // .src property, because browsers set .src to the page's own URL when no
    // src attribute has been assigned — making .src an unreliable sentinel.
    // currentSrc is "" until the browser has accepted a media source.
    if (!this._audio.currentSrc) {
      if (this._currentTrack && !this._currentTrack.isPlaceholder) {
        this._audio.src = this._currentTrack.src;
        this._audio.load();
        this._status = 'loading';
        this._notify();
      } else {
        // No real src available (placeholder track); stay idle.
        return;
      }
    }

    try {
      await this._audio.play();
      // Status will be set to 'playing' by the 'play' event listener.
    } catch (err: unknown) {
      // The most common case: NotAllowedError (autoplay policy).
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        this._status = 'blocked';
        this._notify();
        console.info(
          '[MusicEngine] Autoplay blocked by browser. ' +
            'Status set to "blocked". ' +
            'Will resume when the user interacts with the page.'
        );
      } else {
        this._status = 'error';
        this._notify();
        console.error('[MusicEngine] play() failed with unexpected error:', err);
      }
    }
  }

  /** Pause playback without unloading the track. */
  public pause(): void {
    if (!this._audio) return;
    this._audio.pause();
    // Status will be set to 'paused' by the 'pause' event listener.
  }

  /** Toggle between playing and paused states. */
  public async togglePlayPause(): Promise<void> {
    if (this._status === 'playing') {
      this.pause();
    } else {
      await this.play();
    }
  }

  // =========================================================================
  // Volume & Mute
  // =========================================================================

  /**
   * Set user-configured volume [0, 1].
   * The effective audio volume respects mute and ducking state.
   */
  public setVolume(volume: number): void {
    this._volume = clamp01(volume);
    this._applyEffectiveVolume();
    this._notify();
  }

  /** Mute audio output without changing the configured volume level. */
  public mute(): void {
    this._muted = true;
    this._applyEffectiveVolume();
    this._notify();
  }

  /** Unmute audio output, restoring effective volume. */
  public unmute(): void {
    this._muted = false;
    this._applyEffectiveVolume();
    this._notify();
  }

  /** Toggle mute state. */
  public toggleMute(): void {
    if (this._muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  // =========================================================================
  // Track Selection
  // =========================================================================

  /**
   * Change the active track with a fade-out → load → fade-in transition.
   *
   * Race-safe: if this method is called again before the previous transition
   * completes, the previous transition is abandoned at its next checkpoint.
   *
   * @param trackId   Must exist in the track catalog.
   * @param autoPlay  If true (default), begin playing after loading.
   *                  If false, load the track but leave playback paused.
   */
  public async changeTrack(trackId: string, autoPlay = true): Promise<void> {
    const track = getTrackById(trackId);
    if (!track) {
      console.warn(`[MusicEngine] changeTrack: unknown track id "${trackId}"`);
      return;
    }

    if (track.isPlaceholder) {
      // Track has no real audio file yet.  Update metadata only.
      this._currentTrack = track;
      this._status = 'idle';
      this._notify();
      return;
    }

    await this._changeTrack(track, autoPlay);
  }

  /**
   * Switch the active music mode and load the appropriate default (or
   * previously selected) track for that mode.
   */
  public async setMode(
    mode: MusicMode,
    preferredTrackId?: string | null,
    autoPlay = true
  ): Promise<void> {
    this._mode = mode;

    const trackId =
      preferredTrackId ??
      (mode === 'calm' ? DEFAULT_CALM_TRACK_ID : DEFAULT_COGNITIVE_TRACK_ID);

    await this.changeTrack(trackId, autoPlay);
  }

  // =========================================================================
  // Audio Ducking
  // =========================================================================

  /**
   * Request volume reduction due to an external source (e.g. TTS, narration).
   *
   * Multiple independent sources can duck simultaneously.  Volume stays
   * reduced until ALL sources have called releaseDuck().
   *
   * @param sourceId  A stable identifier for the requester, e.g. "tts" or
   *                  "game-narration".
   */
  public duck(sourceId: string): void {
    const wasEmpty = this._duckingSources.size === 0;
    this._duckingSources.add(sourceId);
    if (wasEmpty) {
      // Transition from unducked → ducked.
      this._applyEffectiveVolume();
      this._notify();
    }
  }

  /**
   * Release a previously registered ducking request.
   *
   * Music volume will only be restored once all active ducking sources
   * have called releaseDuck().
   *
   * @param sourceId  Must match the value passed to duck().
   */
  public releaseDuck(sourceId: string): void {
    const removed = this._duckingSources.delete(sourceId);
    if (removed && this._duckingSources.size === 0) {
      // Last source released — restore normal volume.
      this._applyEffectiveVolume();
      this._notify();
    }
  }

  /**
   * Clear ALL active ducking sources at once.
   * Useful for hard resets (e.g. page unload or game exit).
   */
  public releaseAllDucks(): void {
    if (this._duckingSources.size > 0) {
      this._duckingSources.clear();
      this._applyEffectiveVolume();
      this._notify();
    }
  }

  // =========================================================================
  // Retry After Autoplay Block
  // =========================================================================

  /**
   * Retry playback after a user gesture.
   *
   * Only acts if status is 'blocked'.  Should be wired to a prominent
   * "Tap to enable music" UI button in Phase 2.
   */
  public async retryAfterUserGesture(): Promise<void> {
    if (this._status !== 'blocked') return;
    this._status = 'idle'; // Reset so play() will re-attempt.
    await this.play();
  }

  // =========================================================================
  // Internal — Smooth Track Transition
  // =========================================================================

  /**
   * Race-safe track change with fade transition.
   *
   * A monotonically-increasing generation counter is captured at entry.
   * Every async checkpoint tests whether the captured generation still matches
   * the current one.  If it does not, the transition exits silently.
   */
  private async _changeTrack(track: MusicTrack, autoPlay: boolean): Promise<void> {
    if (!this._audio) return;

    // Increment generation to invalidate any in-flight transition.
    const myGeneration = ++this._transitionGeneration;
    this._isTransitioning = true;
    this._notify();

    // ── Step 1: Fade out (only if currently playing) ──────────────────
    if (this._status === 'playing' || this._status === 'loading') {
      await this._fadeOut(myGeneration);
      if (this._transitionGeneration !== myGeneration) return; // Stale.
    }

    // ── Step 2: Pause, swap source, load ──────────────────────────────
    this._audio.pause();
    this._audio.src = track.src;
    this._audio.load();
    this._currentTrack = track;
    this._status = 'loading';
    this._notify();

    if (!autoPlay) {
      // Caller wants to preload without playing.
      this._audio.volume = 0; // Start silent; fade-in when play() is called.
      this._isTransitioning = false;
      this._status = 'paused';
      this._notify();
      return;
    }

    // ── Step 3: Wait for canplay ──────────────────────────────────────
    const canPlayOk = await this._waitForCanPlay(myGeneration);
    if (!canPlayOk || this._transitionGeneration !== myGeneration) return; // Stale or error.

    // ── Step 4: Start at zero volume, attempt play() ──────────────────
    this._audio.volume = 0;

    try {
      await this._audio.play();
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        this._status = 'blocked';
        this._isTransitioning = false;
        this._notify();
        return;
      }
      this._status = 'error';
      this._isTransitioning = false;
      this._notify();
      return;
    }

    if (this._transitionGeneration !== myGeneration) return; // Stale.

    // ── Step 5: Fade in ───────────────────────────────────────────────
    await this._fadeIn(myGeneration);

    if (this._transitionGeneration === myGeneration) {
      this._status = 'playing';
      this._isTransitioning = false;
      this._notify();
    }
  }

  // =========================================================================
  // Internal — Fade Helpers
  // =========================================================================

  /**
   * Gradually reduce audio element volume from current effective volume to 0.
   * Returns a promise that resolves when the fade completes or is superseded.
   */
  private _fadeOut(generation: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this._audio) { resolve(); return; }

      this._clearFadeInterval();

      const startVolume = this._audio.volume;
      const steps = Math.ceil(FADE_DURATION_MS / FADE_STEP_MS);
      const decrement = startVolume / steps;
      let step = 0;

      this._fadeIntervalId = setInterval(() => {
        if (this._transitionGeneration !== generation || !this._audio) {
          this._clearFadeInterval();
          resolve();
          return;
        }
        step++;
        this._audio.volume = Math.max(0, startVolume - decrement * step);
        if (step >= steps || this._audio.volume <= 0) {
          this._audio.volume = 0;
          this._clearFadeInterval();
          resolve();
        }
      }, FADE_STEP_MS);
    });
  }

  /**
   * Gradually increase audio element volume from 0 to the effective volume.
   * Returns a promise that resolves when the fade completes or is superseded.
   */
  private _fadeIn(generation: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this._audio) { resolve(); return; }

      this._clearFadeInterval();

      const targetVolume = this._effectiveVolume();
      const steps = Math.ceil(FADE_DURATION_MS / FADE_STEP_MS);
      const increment = targetVolume / steps;
      let step = 0;

      this._fadeIntervalId = setInterval(() => {
        if (this._transitionGeneration !== generation || !this._audio) {
          this._clearFadeInterval();
          resolve();
          return;
        }
        step++;
        this._audio.volume = Math.min(targetVolume, increment * step);
        if (step >= steps || this._audio.volume >= targetVolume) {
          this._audio.volume = targetVolume;
          this._clearFadeInterval();
          resolve();
        }
      }, FADE_STEP_MS);
    });
  }

  /** Wait for the audio element to emit 'canplay' or 'error'. */
  private _waitForCanPlay(generation: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this._audio) { resolve(false); return; }

      /**
       * 10-second safety timeout.
       *
       * If neither 'canplay' nor 'error' fires within this window (e.g. the
       * audio src points to a stalled CDN or an unreachable host) we resolve
       * false so the transition can be cleanly abandoned rather than hanging
       * forever.  The timeout is cleared immediately if the element responds
       * normally — it does not add any latency to healthy loads.
       */
      const CANPLAY_TIMEOUT_MS = 10_000;

      const onCanPlay = () => {
        cleanup();
        resolve(this._transitionGeneration === generation);
      };
      const onError = () => {
        cleanup();
        resolve(false);
      };
      const onTimeout = () => {
        cleanup();
        console.warn(
          `[MusicEngine] _waitForCanPlay: no 'canplay' event received within ` +
            `${CANPLAY_TIMEOUT_MS}ms for track "${this._currentTrack?.id ?? 'unknown'}". ` +
            'Abandoning transition.'
        );
        resolve(false);
      };

      const timeoutId = setTimeout(onTimeout, CANPLAY_TIMEOUT_MS);

      const cleanup = () => {
        clearTimeout(timeoutId);
        this._audio?.removeEventListener('canplay', onCanPlay);
        this._audio?.removeEventListener('error', onError);
      };

      this._audio.addEventListener('canplay', onCanPlay, { once: true });
      this._audio.addEventListener('error', onError, { once: true });
    });
  }

  private _clearFadeInterval(): void {
    if (this._fadeIntervalId !== null) {
      clearInterval(this._fadeIntervalId);
      this._fadeIntervalId = null;
    }
  }

  // =========================================================================
  // Internal — Effective Volume
  // =========================================================================

  /**
   * Calculate the audio element volume to apply, considering:
   *  1. Mute state (if muted → 0)
   *  2. Ducking state (if ducked → DUCK_VOLUME)
   *  3. User-configured volume
   */
  private _effectiveVolume(): number {
    if (this._muted) return 0;
    if (this._duckingSources.size > 0) return DUCK_VOLUME;
    return this._volume;
  }

  /** Write the current effective volume to the audio element. */
  private _applyEffectiveVolume(): void {
    if (!this._audio) return;
    // Do not override volume mid-transition; the fade logic owns the element
    // volume during transitions.
    if (this._isTransitioning) return;
    this._audio.volume = this._effectiveVolume();
  }

  // =========================================================================
  // Internal — Audio Element Event Handlers
  // =========================================================================

  /** Arrow-function properties so they retain `this` when passed to addEventListener. */
  private readonly _onCanPlay = (): void => {
    // Only update status if we are in 'loading' and not mid-transition
    // (the transition handler manages status during track changes).
    if (this._status === 'loading' && !this._isTransitioning) {
      this._status = 'playing';
      this._notify();
    }
  };

  private readonly _onPlay = (): void => {
    if (!this._isTransitioning) {
      this._status = 'playing';
      this._notify();
    }
  };

  private readonly _onPause = (): void => {
    if (!this._isTransitioning) {
      this._status = 'paused';
      this._notify();
    }
  };

  private readonly _onEnded = (): void => {
    // loop = true, so 'ended' should not normally fire.  Handle defensively.
    if (!this._isTransitioning) {
      this._status = 'paused';
      this._notify();
    }
  };

  private readonly _onError = (): void => {
    if (!this._isTransitioning) {
      this._status = 'error';
      this._notify();
      console.error('[MusicEngine] HTMLAudioElement error:', this._audio?.error);
    }
  };

  // =========================================================================
  // Internal — State Notification
  // =========================================================================

  private _notify(): void {
    const state = this.getState();
    this._listeners.forEach((l) => {
      try { l(state); } catch { /* listener errors must not crash the engine */ }
    });
  }

  // =========================================================================
  // Debug / Inspection
  // =========================================================================

  /**
   * Return a human-readable summary of the engine's current state.
   * Intended for development use only; do not call in production hot paths.
   */
  public debugInfo(): string {
    const s = this.getState();
    return [
      `Status: ${s.status}`,
      `Track: ${s.currentTrack?.title ?? 'none'} (${s.currentTrack?.id ?? '-'})`,
      `Mode: ${s.mode}`,
      `Volume: ${(s.volume * 100).toFixed(0)}%`,
      `Muted: ${s.muted}`,
      `Transitioning: ${s.isTransitioning}`,
      `Ducked: ${s.isDucked} (sources: ${[...s.duckingSources].join(', ') || 'none'})`,
    ].join(' | ');
  }
}

// ---------------------------------------------------------------------------
// Module-level singleton
// ---------------------------------------------------------------------------

/**
 * The single MusicEngine instance shared across the application.
 *
 * ⚠️  This is the ONLY place where the engine is instantiated.  No other
 *     module should call `new MusicEngine()`.
 *
 * Import this from @/features/music (via index.ts) — not directly from this
 * file — to respect the feature-barrier convention.
 *
 * Lifecycle:
 *   - musicEngine.init()     → call from MusicProvider (Phase 2) useEffect
 *   - musicEngine.dispose()  → call from MusicProvider cleanup
 */
export const musicEngine = new MusicEngine();

/**
 * Convenience: return a list of all tracks with real (non-placeholder) assets.
 * Will be empty until Phase 3 adds real audio files.
 */
export function getAvailableTracks(mode?: MusicMode): MusicTrack[] {
  return ALL_TRACKS.filter(
    (t) => !t.isPlaceholder && (mode === undefined || t.mode === mode)
  );
}
