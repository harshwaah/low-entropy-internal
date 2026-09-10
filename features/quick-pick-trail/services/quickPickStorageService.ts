import { AudioSettings, GameCharacter, QuickPickProgressRecord } from '../types';
import { INITIAL_CHARACTERS } from '../data/characters';

const STORAGE_PROGRESS_KEY = 'quick_pick_trail_progress';
const STORAGE_SETTINGS_KEY = 'quick_pick_trail_settings';
const STORAGE_CHARACTERS_KEY = 'quick_pick_trail_characters';

const DEFAULT_SETTINGS: AudioSettings = {
  musicOn: true,
  sfxOn: true,
  characterVoiceOn: true,
  musicStyle: 'calm',
  movementSpeed: 2,
};

const SEED_PROGRESS: QuickPickProgressRecord[] = [
  {
    id: 'seed-qp-1',
    patientId: 'patient-1',
    activityType: 'quick_pick_trail',
    sessionId: 'sess-qp-1',
    mode: 'math',
    difficulty: 'gentle',
    questionsAttempted: 5,
    correctAnswers: 5,
    incorrectAnswers: 0,
    accuracyPercentage: 100,
    averageResponseTime: 4.2,
    totalDurationSeconds: 80,
    levelReached: 2,
    speedLevel: 2,
    engagementLevel: 'high',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'seed-qp-2',
    patientId: 'patient-1',
    activityType: 'quick_pick_trail',
    sessionId: 'sess-qp-2',
    mode: 'colors',
    difficulty: 'comfortable',
    questionsAttempted: 4,
    correctAnswers: 3,
    incorrectAnswers: 1,
    accuracyPercentage: 75,
    averageResponseTime: 5.1,
    totalDurationSeconds: 70,
    levelReached: 1,
    speedLevel: 2,
    engagementLevel: 'medium',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

class QuickPickStorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // PROGRESS RECORDS
  async getProgressRecords(patientId: string = 'patient-1'): Promise<QuickPickProgressRecord[]> {
    if (!this.isBrowser()) return SEED_PROGRESS;
    try {
      const data = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(SEED_PROGRESS));
        return SEED_PROGRESS;
      }
      const list: QuickPickProgressRecord[] = JSON.parse(data);
      return list.filter(r => !patientId || r.patientId === patientId);
    } catch {
      return SEED_PROGRESS;
    }
  }

  async saveProgressRecord(record: QuickPickProgressRecord): Promise<QuickPickProgressRecord> {
    const records = await this.getProgressRecords(record.patientId);
    const idx = records.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    if (this.isBrowser()) {
      try {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(records));
      } catch (e) {
        console.error('Failed to save Quick Pick progress:', e);
      }
    }
    return record;
  }

  // SETTINGS
  getSettings(): AudioSettings {
    if (!this.isBrowser()) return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(STORAGE_SETTINGS_KEY);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(settings: AudioSettings): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }

  // CHARACTERS
  getCharacters(): GameCharacter[] {
    if (!this.isBrowser()) return INITIAL_CHARACTERS;
    try {
      const data = localStorage.getItem(STORAGE_CHARACTERS_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_CHARACTERS_KEY, JSON.stringify(INITIAL_CHARACTERS));
        return INITIAL_CHARACTERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CHARACTERS;
    }
  }

  saveCharacters(characters: GameCharacter[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_CHARACTERS_KEY, JSON.stringify(characters));
    } catch (e) {
      console.error('Failed to save characters:', e);
    }
  }

  unlockCharacter(characterId: string): GameCharacter[] {
    const chars = this.getCharacters();
    const updated = chars.map(c => {
      if (c.id === characterId) {
        return { ...c, unlocked: true };
      }
      return c;
    });
    this.saveCharacters(updated);
    return updated;
  }

  selectCharacter(characterId: string): GameCharacter[] {
    const chars = this.getCharacters();
    const updated = chars.map(c => ({
      ...c,
      selected: c.id === characterId,
    }));
    this.saveCharacters(updated);
    return updated;
  }
}

export const quickPickStorageService = new QuickPickStorageService();
