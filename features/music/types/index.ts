/**
 * Music System Types — SmritiSaathi
 *
 * Strongly typed contracts shared across the entire music feature.
 * No browser APIs are referenced here; this file is safe to import
 * from both server and client modules.
 *
 * Feature: features/music
 * Author:  music-system branch
 */

// ---------------------------------------------------------------------------
// Mode
// ---------------------------------------------------------------------------

/**
 * The two behavioural modes the music engine can operate in.
 *
 * - calm       → played on patient home, memories, routines, companion screens
 * - cognitive  → played inside cognitive game pages (memory-match, what-comes-next,
 *               find-the-object)
 */
export type MusicMode = 'calm' | 'cognitive';

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/**
 * Geographic/cultural metadata for North-East Indian regional tracks.
 * Each state must be labelled individually — the region is NOT homogeneous.
 */
export interface RegionalMetadata {
  /**
   * The specific Indian state this music originates from.
   * Never use a generic label like "North-East India" without a state.
   */
  state:
    | 'Assam'
    | 'Manipur'
    | 'Meghalaya'
    | 'Mizoram'
    | 'Nagaland'
    | 'Tripura'
    | 'Arunachal Pradesh'
    | 'Sikkim'
    | 'other';
  /** Ethnic/folk tradition name, e.g. "Bihu", "Lai Haraoba", "Nongkrem". */
  tradition?: string;
  /** Free-text description of the cultural context. */
  description?: string;
}

/**
 * Attribution/licensing data required for any externally sourced asset.
 */
export interface TrackAttribution {
  /** Name of the composer / performer / ensemble. */
  artist?: string;
  /** Album or collection the track belongs to. */
  album?: string;
  /** Original source URL or publication. */
  source?: string;
  /** SPDX license identifier or free-text license name. */
  license?: string;
  /** Year of recording/release. */
  year?: number;
}

/**
 * A single music track in the catalog.
 */
export interface MusicTrack {
  /** Stable, unique identifier. Must not change after initial publication. */
  id: string;
  /** Display name shown to the user. */
  title: string;
  /** Brief one-line description (shown in future track-picker UI). */
  description: string;
  /**
   * Primary mode this track is suited for.
   * A regional track can be "calm" or "cognitive"; the mode field decides
   * which pool it belongs to by default.
   */
  mode: MusicMode;
  /**
   * Path relative to the project public root, e.g.
   * "/assets/audio/music/calm/gentle-flute-01.mp3"
   *
   * PLACEHOLDER: All paths in track-catalog.ts are marked as placeholders
   * and will remain empty strings ("") until real audio assets are added.
   */
  src: string;
  /**
   * Optional regional metadata.  Present only for tracks that originate
   * from a specific North-East Indian cultural tradition.
   */
  regional?: RegionalMetadata;
  /** Attribution / licensing info. Required for externally sourced assets. */
  attribution?: TrackAttribution;
  /**
   * Whether this track file has actually been added to the repository yet.
   * All tracks in the initial catalog are placeholders (isPlaceholder = true).
   */
  isPlaceholder: boolean;
}

// ---------------------------------------------------------------------------
// Playback Status
// ---------------------------------------------------------------------------

/**
 * Current lifecycle state of the audio engine's single HTMLAudioElement.
 *
 * State machine:
 *
 *   idle ──play()──► loading ──canplay──► playing
 *                                          │
 *                              pause() ◄──►│
 *                                          │
 *                          blocked ◄───────┘  (autoplay rejection)
 *                          error   ◄───────    (network/decode error)
 */
export type PlaybackStatus =
  | 'idle'       // Engine initialised; no track loaded yet
  | 'loading'    // src set; waiting for canplay event
  | 'playing'    // Audio is actively playing
  | 'paused'     // User or engine has paused playback
  | 'blocked'    // Browser rejected the play() call (autoplay policy)
  | 'error';     // HTMLAudioElement emitted an unrecoverable error

// ---------------------------------------------------------------------------
// Preferences
// ---------------------------------------------------------------------------

/**
 * Increment this version number whenever the shape of MusicPreferences
 * changes in a breaking way.  The storage layer uses this to invalidate
 * and migrate stale stored data.
 */
export const MUSIC_PREFERENCES_VERSION = 1 as const;
export type MusicPreferencesVersion = typeof MUSIC_PREFERENCES_VERSION;

/**
 * User preferences persisted to localStorage.
 *
 * Intentionally minimal for Phase 1.  Additional fields (e.g.
 * preferredRegionalState, caregiverOverrideTrackId) will be added in later
 * phases without breaking the version-1 schema.
 */
export interface MusicPreferences {
  /** Schema version — used to detect stale stored data. */
  version: MusicPreferencesVersion;
  /** Master volume level in [0, 1]. Default: 0.5. */
  volume: number;
  /** Whether audio output is silenced. Separate from volume. Default: false. */
  muted: boolean;
  /**
   * ID of the track the user last selected for calm mode.
   * null → use the catalog default.
   */
  selectedCalmTrackId: string | null;
  /**
   * ID of the track the user last selected for cognitive mode.
   * null → use the catalog default.
   */
  selectedCognitiveTrackId: string | null;
  /**
   * Reserved for future caregiver/patient-selected regional music.
   * null → no regional preference set.
   */
  preferredRegionalTrackId: string | null;
  /**
   * The user's last intentional playback action.  Used to restore state
   * across navigation without restarting the track.
   *
   * - 'play'  → user wanted music on
   * - 'pause' → user explicitly paused
   * - 'none'  → fresh session, no preference yet
   */
  playbackIntent: 'play' | 'pause' | 'none';
}

// ---------------------------------------------------------------------------
// Engine Events / State Snapshot
// ---------------------------------------------------------------------------

/**
 * The observable state snapshot exposed by MusicEngine to React consumers
 * (will be used by the provider in Phase 2).
 */
export interface MusicEngineState {
  /** Current playback status. */
  status: PlaybackStatus;
  /** Currently loaded track, or null if none. */
  currentTrack: MusicTrack | null;
  /** Active music mode. */
  mode: MusicMode;
  /** Current user-configured volume [0, 1]. */
  volume: number;
  /** Whether audio output is muted. */
  muted: boolean;
  /**
   * Whether the engine is currently in a fading transition
   * (fade-out → src change → fade-in).
   */
  isTransitioning: boolean;
  /**
   * Whether the effective volume is currently reduced due to ducking
   * (e.g. TTS or narration is speaking).
   */
  isDucked: boolean;
  /**
   * Set of active ducking source IDs.
   * Empty set → not ducked.
   */
  duckingSources: ReadonlySet<string>;
}

/**
 * Listener callback signature for engine state changes.
 * Phase 2 will wire this into a React Context / hook.
 */
export type MusicEngineStateListener = (state: MusicEngineState) => void;
