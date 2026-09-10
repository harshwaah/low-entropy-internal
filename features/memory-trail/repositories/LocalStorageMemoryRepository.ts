import { IMemoryRepository } from './MemoryRepository';
import { MemoryEntry } from '../types';

const STORAGE_KEY = 'memory_trail_memories';

const SEED_MEMORIES: MemoryEntry[] = [
  {
    id: 'seed-ch-1',
    patientId: 'patient-1',
    locationId: 'childhood-home',
    locationTitle: 'Childhood Home',
    locationEmoji: '🏠',
    questionAsked: 'Who used to come here with you?',
    promptSelected: 'My sister',
    patientResponseText: 'I used to play outside with my sister in the evenings.',
    formattedStory: 'I used to play outside with my sister in the evenings near our veranda.',
    createdAt: '2026-09-12T17:30:00.000Z',
    familyContribution: {
      id: 'fc-ch-seed',
      patientId: 'patient-1',
      locationId: 'childhood-home',
      type: 'text',
      contentText: 'This is where you grew up with your sister.',
      contributedBy: 'Daughter',
      relationship: 'Daughter',
      createdAt: '12 Sep 2026',
    },
  },
  {
    id: 'seed-sch-1',
    patientId: 'patient-1',
    locationId: 'school',
    locationTitle: 'School',
    locationEmoji: '🏫',
    questionAsked: 'Who was your favourite teacher?',
    promptSelected: 'Someone else',
    patientResponseText: 'I loved my science teacher.',
    formattedStory: 'I loved my science teacher who taught us about plants and stars.',
    createdAt: '2026-09-10T14:15:00.000Z',
  },
  {
    id: 'seed-lm-1',
    patientId: 'patient-1',
    locationId: 'local-market',
    locationTitle: 'Local Market',
    locationEmoji: '🛍️',
    questionAsked: 'What do you remember about this place?',
    promptSelected: 'My mother',
    patientResponseText: 'We used to go there every Sunday.',
    formattedStory: 'We used to go to the local market every Sunday morning together.',
    createdAt: '2026-09-08T11:00:00.000Z',
  },
  {
    id: 'seed-pw-1',
    patientId: 'patient-1',
    locationId: 'place-of-worship',
    locationTitle: 'Place of Worship',
    locationEmoji: '🛕',
    questionAsked: 'Who did you come here with?',
    promptSelected: 'My family',
    patientResponseText: 'I remember going here with my family.',
    formattedStory: 'I remember visiting the temple every festival morning with my family.',
    createdAt: '2026-09-05T09:45:00.000Z',
  },
];

export class LocalStorageMemoryRepository implements IMemoryRepository {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private readStorage(): MemoryEntry[] {
    if (!this.isBrowser()) return SEED_MEMORIES;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MEMORIES));
        return SEED_MEMORIES;
      }
      return JSON.parse(data);
    } catch {
      return SEED_MEMORIES;
    }
  }

  private writeStorage(memories: MemoryEntry[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  async getMemories(patientId: string): Promise<MemoryEntry[]> {
    const memories = this.readStorage();
    return memories.filter(m => !patientId || m.patientId === patientId);
  }

  async saveMemory(entry: MemoryEntry): Promise<MemoryEntry> {
    const memories = this.readStorage();
    const existingIndex = memories.findIndex(m => m.id === entry.id);
    if (existingIndex >= 0) {
      memories[existingIndex] = entry;
    } else {
      memories.unshift(entry); // latest first
    }
    this.writeStorage(memories);
    return entry;
  }

  async getMemoryById(id: string): Promise<MemoryEntry | null> {
    const memories = this.readStorage();
    return memories.find(m => m.id === id) || null;
  }

  async deleteMemory(id: string): Promise<boolean> {
    let memories = this.readStorage();
    const initialLen = memories.length;
    memories = memories.filter(m => m.id !== id);
    if (memories.length !== initialLen) {
      this.writeStorage(memories);
      return true;
    }
    return false;
  }
}

export const localStorageMemoryRepository = new LocalStorageMemoryRepository();
