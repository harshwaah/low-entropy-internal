/**
 * Feature Barrier: Music
 *
 * This is the ONLY file other features should import from when consuming
 * music system functionality.
 *
 * Do NOT import directly from internal paths such as:
 * features/music/services/music-engine
 * features/music/types
 *
 * Phase 1: Music engine, preferences, catalog, and types
 * Phase 2: MusicProvider, useMusic, and route controller
 * Phase 3: Patient layout integration
 * Phase 4: Dementia-friendly music controls
 */

// Types
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

// Engine
export { musicEngine, MusicEngine, getAvailableTracks } from './services/music-engine';

// Preference Storage
export {
  DEFAULT_MUSIC_PREFERENCES,
  loadMusicPreferences,
  saveMusicPreferences,
  updateMusicPreferences,
  clearMusicPreferences,
} from './services/music-preferences-storage';

// Track Catalog
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

// Storage Constants
export {
  MUSIC_PREFERENCES_STORAGE_KEY,
  MUSIC_STORAGE_NAMESPACE,
} from './constants/storage';

// React Integration
export { MusicProvider } from './context/music-provider';
export type { MusicContextValue } from './context/music-provider';
export { useMusic } from './hooks/use-music';
export {
  MusicRouteController,
  getMusicModeForPathname,
} from './components/music-route-controller';
export { MusicControls } from './components/music-controls';
