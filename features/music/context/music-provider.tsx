'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_MUSIC_PREFERENCES,
  loadMusicPreferences,
  saveMusicPreferences,
} from '../services/music-preferences-storage';
import { musicEngine } from '../services/music-engine';
import { getTrackById } from '../constants/track-catalog';
import type {
  MusicEngineState,
  MusicMode,
  MusicPreferences,
  MusicTrack,
  PlaybackStatus,
} from '../types';

export interface MusicContextValue {
  status: PlaybackStatus;
  currentTrack: MusicTrack | null;
  volume: number;
  muted: boolean;
  mode: MusicMode;
  autoplayBlocked: boolean;
  isDucked: boolean;
  play: () => Promise<void>;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  selectTrack: (trackId: string) => Promise<void>;
  setMode: (mode: MusicMode) => Promise<void>;
  duck: (sourceId: string) => void;
  releaseDuck: (sourceId: string) => void;
}

const INITIAL_ENGINE_STATE: MusicEngineState = {
  status: 'idle',
  currentTrack: null,
  mode: 'calm',
  volume: DEFAULT_MUSIC_PREFERENCES.volume,
  muted: DEFAULT_MUSIC_PREFERENCES.muted,
  isTransitioning: false,
  isDucked: false,
  duckingSources: new Set<string>(),
};

export const MusicContext = createContext<MusicContextValue | null>(null);

function clampVolume(volume: number): number {
  if (!Number.isFinite(volume)) return DEFAULT_MUSIC_PREFERENCES.volume;
  return Math.min(1, Math.max(0, volume));
}

function selectedTrackIdForMode(
  preferences: MusicPreferences,
  mode: MusicMode
): string | null {
  return mode === 'calm'
    ? preferences.selectedCalmTrackId
    : preferences.selectedCognitiveTrackId;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [engineState, setEngineState] = useState<MusicEngineState>(
    INITIAL_ENGINE_STATE
  );
  const preferencesRef = useRef<MusicPreferences>({
    ...DEFAULT_MUSIC_PREFERENCES,
  });
  const initializedRef = useRef(false);
  const requestedModeRef = useRef<MusicMode>('calm');

  const persistPreferences = useCallback(
    (updates: Partial<Omit<MusicPreferences, 'version'>>) => {
      const nextPreferences: MusicPreferences = {
        ...preferencesRef.current,
        ...updates,
      };

      preferencesRef.current = nextPreferences;
      saveMusicPreferences(nextPreferences);
    },
    []
  );

  useEffect(() => {
    const preferences = loadMusicPreferences();
    const initialMode = requestedModeRef.current;
    preferencesRef.current = preferences;

    musicEngine.init(preferences.volume, preferences.muted, initialMode);
    const unsubscribe = musicEngine.subscribe(setEngineState);
    initializedRef.current = true;

    const selectedTrackId = selectedTrackIdForMode(preferences, initialMode);
    const currentTrackId = musicEngine.getState().currentTrack?.id;

    if (selectedTrackId && selectedTrackId !== currentTrackId) {
      // Restore track choice without restoring playback. A browser gesture is
      // still required before play(), even when playbackIntent was "play".
      void musicEngine.setMode(initialMode, selectedTrackId, false);
    }

    return () => {
      initializedRef.current = false;
      unsubscribe();
      musicEngine.dispose();
    };
  }, []);

  const play = useCallback(async () => {
    persistPreferences({ playbackIntent: 'play' });
    await musicEngine.play();
  }, [persistPreferences]);

  const pause = useCallback(() => {
    persistPreferences({ playbackIntent: 'pause' });
    musicEngine.pause();
  }, [persistPreferences]);

  const mute = useCallback(() => {
    persistPreferences({ muted: true });
    musicEngine.mute();
  }, [persistPreferences]);

  const unmute = useCallback(() => {
    persistPreferences({ muted: false });
    musicEngine.unmute();
  }, [persistPreferences]);

  const toggleMute = useCallback(() => {
    const nextMuted = !musicEngine.getState().muted;
    persistPreferences({ muted: nextMuted });
    musicEngine.toggleMute();
  }, [persistPreferences]);

  const setVolume = useCallback(
    (volume: number) => {
      const safeVolume = clampVolume(volume);
      persistPreferences({ volume: safeVolume });
      musicEngine.setVolume(safeVolume);
    },
    [persistPreferences]
  );

  const selectTrack = useCallback(
    async (trackId: string) => {
      const track = getTrackById(trackId);
      if (!track) {
        console.warn(`[MusicProvider] selectTrack: unknown track id "${trackId}"`);
        return;
      }

      persistPreferences(
        track.mode === 'calm'
          ? { selectedCalmTrackId: track.id }
          : { selectedCognitiveTrackId: track.id }
      );

      const shouldContinuePlaying = musicEngine.getState().status === 'playing';
      await musicEngine.changeTrack(track.id, shouldContinuePlaying);
    },
    [persistPreferences]
  );

  const setMode = useCallback(async (mode: MusicMode) => {
    requestedModeRef.current = mode;

    // MusicRouteController can render before this provider's mount effect has
    // initialised the browser-only engine. The requested mode is applied by
    // that effect, so no second audio element or eager browser API is needed.
    if (!initializedRef.current) return;

    const state = musicEngine.getState();
    const selectedTrackId = selectedTrackIdForMode(
      preferencesRef.current,
      mode
    );

    if (state.mode === mode && state.currentTrack?.id === selectedTrackId) {
      return;
    }

    // Route changes continue music only when it is already playing. Stored
    // playback intent never triggers an autoplay attempt on mount/navigation.
    await musicEngine.setMode(mode, selectedTrackId, state.status === 'playing');
  }, []);

  const duck = useCallback((sourceId: string) => {
    musicEngine.duck(sourceId);
  }, []);

  const releaseDuck = useCallback((sourceId: string) => {
    musicEngine.releaseDuck(sourceId);
  }, []);

  const value = useMemo<MusicContextValue>(
    () => ({
      status: engineState.status,
      currentTrack: engineState.currentTrack,
      volume: engineState.volume,
      muted: engineState.muted,
      mode: engineState.mode,
      autoplayBlocked: engineState.status === 'blocked',
      isDucked: engineState.isDucked,
      play,
      pause,
      mute,
      unmute,
      toggleMute,
      setVolume,
      selectTrack,
      setMode,
      duck,
      releaseDuck,
    }),
    [
      engineState,
      play,
      pause,
      mute,
      unmute,
      toggleMute,
      setVolume,
      selectTrack,
      setMode,
      duck,
      releaseDuck,
    ]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}
