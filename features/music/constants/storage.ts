/**
 * Music Preference Storage Keys — SmritiSaathi
 *
 * Centralised namespace for all localStorage keys used by the music system.
 * Using a namespaced, versioned key prevents collisions with other
 * localStorage consumers in the application.
 *
 * SSR-safe: this file only contains string constants; no browser APIs.
 */

/**
 * The primary localStorage key under which MusicPreferences is serialised.
 *
 * Convention: "<app>:<feature>:<schema-version>"
 */
export const MUSIC_PREFERENCES_STORAGE_KEY =
  'smritisaathi:music-preferences:v1' as const;

/**
 * The namespace prefix — useful if we ever need to enumerate or clear
 * all music-related keys from localStorage.
 */
export const MUSIC_STORAGE_NAMESPACE = 'smritisaathi:music' as const;
