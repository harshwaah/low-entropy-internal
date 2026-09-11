/**
 * Memory Service Implementation
 * Owned by: Contributor 1 (Memories Lead)
 */

import { MemoryItem, MemoryCategoryKey } from '../types';
import { 
  SAMPLE_MEMORIES, 
  getAllMemories, 
  getMemoryById, 
  getMemoryOfTheDay, 
  getMemoriesByCategory,
  MEMORY_CATEGORIES
} from '../data/sample-memories';

export interface IMemoryService {
  getAllMemories(): Promise<MemoryItem[]>;
  getMemoryById(id: string): Promise<MemoryItem | null>;
  getMemoryOfTheDay(): Promise<MemoryItem>;
  getMemoriesByCategory(category: MemoryCategoryKey | string): Promise<MemoryItem[]>;
}

export const memoryService: IMemoryService = {
  async getAllMemories(): Promise<MemoryItem[]> {
    return getAllMemories();
  },
  async getMemoryById(id: string): Promise<MemoryItem | null> {
    return getMemoryById(id) || null;
  },
  async getMemoryOfTheDay(): Promise<MemoryItem> {
    return getMemoryOfTheDay();
  },
  async getMemoriesByCategory(category: MemoryCategoryKey | string): Promise<MemoryItem[]> {
    return getMemoriesByCategory(category);
  },
};

export {
  SAMPLE_MEMORIES,
  MEMORY_CATEGORIES,
  getAllMemories,
  getMemoryById,
  getMemoryOfTheDay,
  getMemoriesByCategory,
};

export { storyService } from './story-service';
