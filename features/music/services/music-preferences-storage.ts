/**
 * Music Preference Storage — SmritiSaathi
 *
 * Persists and retrieves MusicPreferences from localStorage.
 *
 * Design contracts:
 *  - SSR-safe:   localStorage is accessed only inside isBrowser() guard.
 *  - Versioned:  stored data that pre-dates MUSIC_PREFERENCES_VERSION is
 *                discarded and replaced with defaults.
 *  - Namespaced: uses MUSIC_PREFERENCES_STORAGE_KEY (smritisaathi:music-preferences:v1).
 *  - Validated:  all fields are individually validated; a corrupt/partial blob
 *                falls back gracefully to defaults rather than throwing.
 *  - Tolerant:   JSON.parse errors and quota errors are caught silently.
 *
 * Future:  A Firestore sync layer can be added in Phase 3 without changing
 *          this file's public API; just call it from the engine after local
 *          save.
 */

import type { MusicPreferences, MusicPreferencesVersion } from '../types';
import { MUSIC_PREFERENCES_VERSION } from '../types';
import { MUSIC_PREFERENCES_STORAGE_KEY } from '../constants/storage';
import {
  DEFAULT_CALM_TRACK_ID,
  DEFAULT_COGNITIVE_TRACK_ID,
} from '../constants/track-catalog';

// ---------------------------------------------------------------------------
// Default Preferences
// ---------------------------------------------------------------------------

/**
 * The preference values used when no stored data is found or when the stored
 * data is invalid / outdated.
 */
export const DEFAULT_MUSIC_PREFERENCES: Readonly<MusicPreferences> = {
  version: MUSIC_PREFERENCES_VERSION,
  volume: 0.5,
  muted: false,
  selectedCalmTrackId: DEFAULT_CALM_TRACK_ID,
  selectedCognitiveTrackId: DEFAULT_COGNITIVE_TRACK_ID,
  preferredRegionalTrackId: null,
  playbackIntent: 'none',
} as const;

// ---------------------------------------------------------------------------
// SSR Guard
// ---------------------------------------------------------------------------

/** Returns true only when running inside a real browser environment. */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** Clamp a numeric value to [min, max]. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Validate and normalise a raw parsed object into a full MusicPreferences.
 *
 * Each field is checked independently; invalid fields are replaced with the
 * corresponding default value.  This means a partially-valid blob still
 * produces a usable preferences object.
 */
function validateAndNormalise(raw: unknown): MusicPreferences {
  // Not an object at all — return full defaults.
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ...DEFAULT_MUSIC_PREFERENCES };
  }

  const obj = raw as Record<string, unknown>;

  // Version mismatch — treat as invalid; return defaults.
  const storedVersion = obj['version'];
  if (storedVersion !== MUSIC_PREFERENCES_VERSION) {
    console.info(
      `[MusicPreferences] Stored version (${storedVersion}) does not match ` +
        `current version (${MUSIC_PREFERENCES_VERSION}). Resetting to defaults.`
    );
    return { ...DEFAULT_MUSIC_PREFERENCES };
  }

  // Validate individual fields with safe fallbacks.
  const volume: number =
    typeof obj['volume'] === 'number' && isFinite(obj['volume'])
      ? clamp(obj['volume'], 0, 1)
      : DEFAULT_MUSIC_PREFERENCES.volume;

  const muted: boolean =
    typeof obj['muted'] === 'boolean'
      ? obj['muted']
      : DEFAULT_MUSIC_PREFERENCES.muted;

  const selectedCalmTrackId: string | null =
    typeof obj['selectedCalmTrackId'] === 'string'
      ? obj['selectedCalmTrackId']
      : obj['selectedCalmTrackId'] === null
        ? null
        : DEFAULT_MUSIC_PREFERENCES.selectedCalmTrackId;

  const selectedCognitiveTrackId: string | null =
    typeof obj['selectedCognitiveTrackId'] === 'string'
      ? obj['selectedCognitiveTrackId']
      : obj['selectedCognitiveTrackId'] === null
        ? null
        : DEFAULT_MUSIC_PREFERENCES.selectedCognitiveTrackId;

  const preferredRegionalTrackId: string | null =
    typeof obj['preferredRegionalTrackId'] === 'string'
      ? obj['preferredRegionalTrackId']
      : null;

  const rawIntent = obj['playbackIntent'];
  const playbackIntent: 'play' | 'pause' | 'none' =
    rawIntent === 'play' || rawIntent === 'pause' || rawIntent === 'none'
      ? rawIntent
      : DEFAULT_MUSIC_PREFERENCES.playbackIntent;

  return {
    version: MUSIC_PREFERENCES_VERSION as MusicPreferencesVersion,
    volume,
    muted,
    selectedCalmTrackId,
    selectedCognitiveTrackId,
    preferredRegionalTrackId,
    playbackIntent,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Load and validate MusicPreferences from localStorage.
 *
 * Returns DEFAULT_MUSIC_PREFERENCES when:
 *  - called during SSR
 *  - localStorage is unavailable
 *  - the stored value is missing, malformed, or versioned incompatibly
 */
export function loadMusicPreferences(): MusicPreferences {
  if (!isBrowser()) {
    return { ...DEFAULT_MUSIC_PREFERENCES };
  }

  try {
    const raw = localStorage.getItem(MUSIC_PREFERENCES_STORAGE_KEY);
    if (raw === null) {
      return { ...DEFAULT_MUSIC_PREFERENCES };
    }
    const parsed: unknown = JSON.parse(raw);
    return validateAndNormalise(parsed);
  } catch {
    // JSON.parse error or SecurityError from localStorage
    console.warn('[MusicPreferences] Failed to load preferences; using defaults.');
    return { ...DEFAULT_MUSIC_PREFERENCES };
  }
}

/**
 * Serialise and persist MusicPreferences to localStorage.
 *
 * Silently no-ops during SSR or when localStorage is unavailable.
 * Catches QuotaExceededError and other storage exceptions without throwing.
 */
export function saveMusicPreferences(prefs: MusicPreferences): void {
  if (!isBrowser()) return;

  try {
    const serialised = JSON.stringify(prefs);
    localStorage.setItem(MUSIC_PREFERENCES_STORAGE_KEY, serialised);
  } catch {
    console.warn('[MusicPreferences] Failed to save preferences.');
  }
}

/**
 * Merge a partial update into the currently stored preferences and persist.
 *
 * Useful for single-field updates (e.g. changing volume) without requiring
 * the caller to hold the full object.
 *
 * Returns the new complete preferences object.
 */
export function updateMusicPreferences(
  partial: Partial<Omit<MusicPreferences, 'version'>>
): MusicPreferences {
  const current = loadMusicPreferences();
  const updated: MusicPreferences = { ...current, ...partial };
  saveMusicPreferences(updated);
  return updated;
}

/**
 * Remove the stored preferences blob from localStorage, effectively resetting
 * to defaults on next load.
 *
 * Silently no-ops during SSR.
 */
export function clearMusicPreferences(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(MUSIC_PREFERENCES_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
