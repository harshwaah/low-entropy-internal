/**
 * Feature Barrier: Music
 *
 * This is the ONLY file other features should import from when consuming
 * music system functionality.  Do NOT import directly from internal paths
 * like features/music/services/music-engine or features/music/types.
 *
 * Usage:
 *   import { musicEngine, MusicMode, ... } from '@/features/music';
 *
 * Owned by: music-system branch
 * Phase 1: Foundation — engine, preferences, catalog, types
 * Phase 2: Will add MusicProvider, useMusicEngine hook, MusicRouteController
 * Phase 3: Will add real audio assets and Firestore preference sync
 */

// ── Types (public surface) ────────────────────────────────────────────────
export type {
  MusicMode,
  MusicTrack,
  RegionalMetadata,
  TrackAttribution,
  PlaybackStatus,
  MusicPreferences,
  MusicPreferencesVersion,
  MusicEngineState,
  MusicEngineStateListener,
} from './types';

export { MUSIC_PREFERENCES_VERSION } from './types';

// ── Engine (singleton + class) ────────────────────────────────────────────
export { musicEngine, MusicEngine, getAvailableTracks } from './services/music-engine';

// ── Preference Storage ────────────────────────────────────────────────────
export {
  DEFAULT_MUSIC_PREFERENCES,
  loadMusicPreferences,
  saveMusicPreferences,
  updateMusicPreferences,
  clearMusicPreferences,
} from './services/music-preferences-storage';

// ── Track Catalog ─────────────────────────────────────────────────────────
export {
  CALM_TRACKS,
  COGNITIVE_TRACKS,
  REGIONAL_NE_TRACKS,
  ALL_TRACKS,
  DEFAULT_CALM_TRACK_ID,
  DEFAULT_COGNITIVE_TRACK_ID,
  getTrackById,
  getTracksForMode,
} from './constants/track-catalog';

// ── Storage Constants ─────────────────────────────────────────────────────
export {
  MUSIC_PREFERENCES_STORAGE_KEY,
  MUSIC_STORAGE_NAMESPACE,
} from './constants/storage';
