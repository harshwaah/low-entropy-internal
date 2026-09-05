/**
 * Memory Service Scaffolding (Phase 2 Target)
 * Owned by: Contributor 1
 */

import { MemoryItem } from '../types';

export interface IMemoryService {
  getMemoriesByPatientId(patientId: string): Promise<MemoryItem[]>;
  getMemoryById(id: string): Promise<MemoryItem | null>;
}

export const memoryServicePlaceholder: IMemoryService = {
  async getMemoriesByPatientId(_patientId: string): Promise<MemoryItem[]> {
    // Scaffolding placeholder — actual persistence in Phase 2
    return [];
  },
  async getMemoryById(_id: string): Promise<MemoryItem | null> {
    return null;
  },
};
