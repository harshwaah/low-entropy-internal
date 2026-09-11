import { MemoryEntry } from '../types';

export interface IMemoryRepository {
  getMemories(patientId: string): Promise<MemoryEntry[]>;
  saveMemory(entry: MemoryEntry): Promise<MemoryEntry>;
  getMemoryById(id: string): Promise<MemoryEntry | null>;
  deleteMemory(id: string): Promise<boolean>;
}
