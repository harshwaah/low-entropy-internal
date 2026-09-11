import { MemoryEntry } from '../types';

import { IMemoryRepository } from '../repositories/MemoryRepository';
import { localStorageMemoryRepository } from '../repositories/LocalStorageMemoryRepository';

class MemoryStorageService {
  constructor(private repository: IMemoryRepository = localStorageMemoryRepository) {}

  async getMemories(patientId: string = 'patient-1'): Promise<MemoryEntry[]> {
    return this.repository.getMemories(patientId);
  }

  async saveMemory(entry: MemoryEntry): Promise<MemoryEntry> {
    return this.repository.saveMemory(entry);
  }

  async getMemoryById(id: string): Promise<MemoryEntry | null> {
    return this.repository.getMemoryById(id);
  }

  async deleteMemory(id: string): Promise<boolean> {
    return this.repository.deleteMemory(id);
  }
}

export const memoryStorageService = new MemoryStorageService();
