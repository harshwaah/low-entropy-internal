/**
 * Music Track Catalog — SmritiSaathi
 *
 * MIXED ASSET CATALOG
 *
 * Playable calm and cognitive tracks are backed by files under public/assets.
 * Entries without a verified local asset remain placeholders with an empty src.
 *
 * When real assets are added to the repository they must be placed under:
 *   public/assets/audio/music/calm/       → calm mode tracks
 *   public/assets/audio/music/cognitive/  → cognitive game mode tracks
 *   public/assets/audio/music/regional/   → North-East Indian regional tracks
 *
 * Then update the relevant `src` field and set isPlaceholder: false.
 *
 * Cultural note:
 *   North-East India consists of eight distinct states, each with its own
 *   languages, ethnic communities, and musical traditions.  Tracks from
 *   this region MUST be attributed to their specific state and tradition.
 *   Do NOT use a generic "North-East Indian music" label.
 *
 * SSR-safe: this file only exports plain data objects.  No browser APIs.
 */

import type { MusicTrack } from '../types';

// ---------------------------------------------------------------------------
// Calm Mode Tracks
// ---------------------------------------------------------------------------

/**
 * Gentle instrumental tracks for patient home, memories, routines,
 * and companion screens.  Should create a warm, unhurried atmosphere
 * that does not overwhelm a dementia patient.
 */
export const CALM_TRACKS: MusicTrack[] = [
  {
    id: 'calm-gentle-instrumental-01',
    title: 'Raga Yaman - Sitar',
    description: 'A sitar performance of Raga Yaman by Tito Dutta.',
    mode: 'calm',
    src: '/assets/audio/music/calm/raga-yaman-sitar.mp3',
    isPlaceholder: false,
    attribution: {
      artist: 'Tito Dutta',
      source: 'https://commons.wikimedia.org/wiki/File:Sitar_sample_yaman.ogg',
      license: 'CC BY-SA 3.0',
      year: 2011,
    },
  },
  {
    id: 'calm-gentle-instrumental-02',
    title: 'Basuri Flute Melodies',
    description: 'A long-form flute recording by Learnerktm.',
    mode: 'calm',
    src: '/assets/audio/music/calm/basuri-flute.mp3',
    isPlaceholder: false,
    attribution: {
      artist: 'Learnerktm',
      source:
        'https://commons.wikimedia.org/wiki/File:%E0%A4%AC%E0%A4%BE%E0%A4%81%E0%A4%B8%E0%A5%81%E0%A4%B0%E0%A5%80%E0%A4%95%E0%A5%8B_%E0%A4%A7%E0%A5%81%E0%A4%A8_Basuri.ogg',
      license: 'CC0 1.0',
      year: 2014,
    },
  },
  {
    id: 'calm-nature-ambient-01',
    title: 'Rain & Veena — Nature Ambient',
    description:
      'Gentle rain sounds layered with soft veena notes. Minimal melodic movement ' +
      'to reduce cognitive load.',
    mode: 'calm',
    // PLACEHOLDER: Replace with actual path when asset is added.
    src: '',
    isPlaceholder: true,
  },
  {
    id: 'calm-nature-ambient-02',
    title: 'Forest Morning — Flute & Birdsong',
    description:
      'Soft bamboo flute with natural forest ambience. Evokes a peaceful, ' +
      'familiar outdoor setting.',
    mode: 'calm',
    // PLACEHOLDER: Replace with actual path when asset is added.
    src: '',
    isPlaceholder: true,
  },
];

// ---------------------------------------------------------------------------
// Cognitive Game Mode Tracks
// ---------------------------------------------------------------------------

/**
 * Light, moderately upbeat instrumental tracks for cognitive game pages
 * (Memory Match, What Comes Next?, Find the Object).
 *
 * Must be:
 *  - Positive and encouraging, never frantic
 *  - Free of lyrics (lyrics compete with in-game narration/instructions)
 *  - Tempo-appropriate for gentle focus, not anxiety
 */
export const COGNITIVE_TRACKS: MusicTrack[] = [
  {
    id: 'cognitive-light-upbeat-01',
    title: 'Playful Tabla Loop',
    description:
      'A light, rhythmic tabla pattern with melodic accents. Provides gentle energy ' +
      'without overwhelming concentration.',
    mode: 'cognitive',
    // PLACEHOLDER: Replace with actual path when asset is added.
    src: '',
    isPlaceholder: true,
    attribution: {
      artist: '[To be determined]',
      license: '[To be confirmed — CC BY or royalty-free required]',
    },
  },
  {
    id: 'cognitive-light-upbeat-02',
    title: 'Joyful Harmonium — Game Theme',
    description:
      'Warm harmonium melody with a light percussive underpinning. Cheerful and ' +
      'encouraging without being overstimulating.',
    mode: 'cognitive',
    // PLACEHOLDER: Replace with actual path when asset is added.
    src: '',
    isPlaceholder: true,
  },
  {
    id: 'cognitive-positive-game-01',
    title: 'Bali Gamelan Xylophone',
    description: 'A gamelan xylophone performance recorded in Bali.',
    mode: 'cognitive',
    src: '/assets/audio/music/cognitive/bali-gamelan-xylophone.mp3',
    isPlaceholder: false,
    attribution: {
      artist: 'thedialogueproject',
      source: 'https://commons.wikimedia.org/wiki/File:Bali_xylophone.ogg',
      license: 'CC0 1.0',
      year: 2014,
    },
  },
  {
    id: 'cognitive-chimes-01',
    title: 'Goettingen Chimes',
    description: 'A recording of house chimes in central Goettingen.',
    mode: 'cognitive',
    src: '/assets/audio/music/cognitive/goettingen-chimes.mp3',
    isPlaceholder: false,
    attribution: {
      artist: 'Ramessos',
      source: 'https://commons.wikimedia.org/wiki/File:GlockenspielGoe.ogg',
      license: 'Public domain (PD-self)',
      year: 2010,
    },
  },
];

// ---------------------------------------------------------------------------
// Regional: North-East Indian Instrumental Tracks
// ---------------------------------------------------------------------------

/**
 * ⚠️  IMPORTANT — Cultural Representation Policy:
 *
 * North-East India is not a single culture.  Each entry in this section MUST
 * specify:
 *   regional.state      → the exact state of origin
 *   regional.tradition  → the specific ethnic/folk tradition
 *   attribution         → artist, source, and license (mandatory for regional music)
 *
 * These tracks can be served in either calm or cognitive mode depending on
 * their tempo.  The `mode` field reflects the primary suggested use.
 *
 * Entries here are DEMONSTRATION TEMPLATES showing the metadata structure.
 * No cultural authenticity is claimed for assets that do not yet exist.
 */
export const REGIONAL_NE_TRACKS: MusicTrack[] = [
  // ── Assam ────────────────────────────────────────────────────────────────
  {
    id: 'regional-as-bihu-instrumental-01',
    title: 'Bihu Dhol & Pepa — Assam',
    description:
      '[PLACEHOLDER] Instrumental excerpt featuring the dhol (drum) and pepa (buffalo-horn ' +
      'flute) — instruments central to Bihu, the harvest festival of Assam.',
    mode: 'calm',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Assam',
      tradition: 'Bihu',
      description:
        'Bihu is the most celebrated festival of Assam, associated with the ' +
        'Assamese new year and three seasonal harvests.  The music is lively but ' +
        'the instrumental-only version has a warm, familiar quality.',
    },
    attribution: {
      artist: '[To be determined — must use licensed or original recording]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Manipur ──────────────────────────────────────────────────────────────
  {
    id: 'regional-mn-pena-instrumental-01',
    title: 'Pena String Meditation — Manipur',
    description:
      '[PLACEHOLDER] Solo pena (Meitei bowed lute) instrumental.  The pena is ' +
      'integral to the Lai Haraoba ritual music of the Meitei people of Manipur.',
    mode: 'calm',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Manipur',
      tradition: 'Lai Haraoba',
      description:
        'The pena is a traditional bowed string instrument of the Meitei people. ' +
        'Lai Haraoba is an ancient festival celebrating indigenous deities.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Meghalaya ────────────────────────────────────────────────────────────
  {
    id: 'regional-ml-nongkrem-instrumental-01',
    title: 'Nongkrem Dance Drums — Meghalaya',
    description:
      '[PLACEHOLDER] Percussion-led instrumental inspired by the Nongkrem dance ' +
      'of the Khasi people of Meghalaya.  Moderate tempo; suggested for cognitive mode.',
    mode: 'cognitive',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Meghalaya',
      tradition: 'Nongkrem',
      description:
        'Nongkrem is a five-day thanksgiving festival of the Khasi tribe in ' +
        'Meghalaya, featuring rhythmic traditional dance and music.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Mizoram ──────────────────────────────────────────────────────────────
  {
    id: 'regional-mz-cheraw-instrumental-01',
    title: 'Cheraw Bamboo Rhythm — Mizoram',
    description:
      '[PLACEHOLDER] Percussion instrumental capturing the rhythm of Cheraw, ' +
      'the bamboo dance of the Mizo people.',
    mode: 'cognitive',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Mizoram',
      tradition: 'Cheraw (Bamboo Dance)',
      description:
        'Cheraw is one of the oldest and most spectacular folk dances of Mizoram, ' +
        'performed by the Mizo people using bamboo poles.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Nagaland ─────────────────────────────────────────────────────────────
  {
    id: 'regional-nl-hornbill-drums-01',
    title: 'Hornbill Festival Drums — Nagaland',
    description:
      '[PLACEHOLDER] Tribal drum ensemble inspired by the Hornbill Festival, ' +
      'which celebrates the diverse cultures of Nagaland\'s tribes.',
    mode: 'cognitive',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Nagaland',
      tradition: 'Hornbill Festival',
      description:
        'The Hornbill Festival is an annual cultural celebration showcasing the ' +
        'traditions of all 16 major Naga tribes through music, dance, and crafts.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Tripura ──────────────────────────────────────────────────────────────
  {
    id: 'regional-tr-garia-instrumental-01',
    title: 'Garia Festival Flute — Tripura',
    description:
      '[PLACEHOLDER] Traditional flute melody associated with the Garia festival ' +
      'of the Tripuri people, celebrating the beginning of cultivation.',
    mode: 'calm',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Tripura',
      tradition: 'Garia',
      description:
        'Garia Puja is a major festival of the Tripuri people celebrating their ' +
        'deity Garia, associated with agriculture and prosperity.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Arunachal Pradesh ────────────────────────────────────────────────────
  {
    id: 'regional-ar-monpa-instrumental-01',
    title: 'Monpa Ceremonial Flute — Arunachal Pradesh',
    description:
      '[PLACEHOLDER] Slow meditative flute inspired by the ceremonial music of ' +
      'the Monpa people of Arunachal Pradesh.',
    mode: 'calm',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Arunachal Pradesh',
      tradition: 'Monpa',
      description:
        'The Monpa are a Buddhist community in western Arunachal Pradesh with a ' +
        'rich tradition of ceremonial music tied to Tibetan-influenced rituals.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },

  // ── Sikkim ───────────────────────────────────────────────────────────────
  {
    id: 'regional-sk-losar-instrumental-01',
    title: 'Losar Monastery Chant Instrumental — Sikkim',
    description:
      '[PLACEHOLDER] Gentle instrumental inspired by the melodic patterns of ' +
      'Losar (Tibetan New Year) monastery music from Sikkim.',
    mode: 'calm',
    src: '',
    isPlaceholder: true,
    regional: {
      state: 'Sikkim',
      tradition: 'Losar',
      description:
        'Losar is the Tibetan New Year celebrated by the Lepcha, Bhutia, and ' +
        'other Buddhist communities in Sikkim with ritual music and masked dance.',
    },
    attribution: {
      artist: '[To be determined]',
      source: '[Source URL to be added]',
      license: '[License to be confirmed]',
    },
  },
];

// ---------------------------------------------------------------------------
// Catalog — Combined & Default Helpers
// ---------------------------------------------------------------------------

/**
 * Full catalog — all tracks from all categories.
 * Useful for ID lookups across the entire library.
 */
export const ALL_TRACKS: MusicTrack[] = [
  ...CALM_TRACKS,
  ...COGNITIVE_TRACKS,
  ...REGIONAL_NE_TRACKS,
];

/**
 * Default track used for calm mode when no user preference is stored.
 * Points to the first non-placeholder calm track, or any calm track while
 * all are still placeholders.
 */
export const DEFAULT_CALM_TRACK_ID: string = CALM_TRACKS[0].id;

/**
 * Default track used for cognitive mode when no user preference is stored.
 */
export const DEFAULT_COGNITIVE_TRACK_ID: string = 'cognitive-positive-game-01';

/**
 * Resolve a track by its stable ID.
 * Returns undefined if the ID is not found in the catalog.
 */
export function getTrackById(id: string): MusicTrack | undefined {
  return ALL_TRACKS.find((t) => t.id === id);
}

/**
 * Return all tracks suitable for a given MusicMode.
 * Regional tracks are included in the pool matching their primary mode.
 */
export function getTracksForMode(mode: 'calm' | 'cognitive'): MusicTrack[] {
  return ALL_TRACKS.filter((t) => t.mode === mode);
}
