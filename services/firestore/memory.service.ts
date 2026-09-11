import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Memory, LoveNote } from '@/types/models';
import { SEED_MEMORIES } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'memories';

export const memoryService = {
  /**
   * Real-time subscription to memories for a given patient (or all memories)
   */
  subscribeToMemories(
    patientId?: string,
    callback?: (memories: Memory[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Memory[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Memory));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_MEMORIES.filter((m) => m.patientId === patientId)
              : SEED_MEMORIES;
            callback(fallback.length ? fallback : SEED_MEMORIES);
          }
        },
        (error) => {
          console.warn('Firestore subscribeToMemories warning, using seed data:', error);
          const fallback = patientId
            ? SEED_MEMORIES.filter((m) => m.patientId === patientId)
            : SEED_MEMORIES;
          callback(fallback.length ? fallback : SEED_MEMORIES);
        }
      );
    } catch (err) {
      console.warn('subscribeToMemories error:', err);
      const fallback = patientId
        ? SEED_MEMORIES.filter((m) => m.patientId === patientId)
        : SEED_MEMORIES;
      callback(fallback.length ? fallback : SEED_MEMORIES);
      return () => {};
    }
  },

  /**
   * Real-time subscription to single memory
   */
  subscribeToMemory(id: string, callback: (memory: Memory | null) => void): Unsubscribe {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      return onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data() as Memory);
          } else {
            const fallback = SEED_MEMORIES.find((m) => m.id === id) || null;
            callback(fallback);
          }
        },
        (error) => {
          console.warn(`Firestore subscribeToMemory ${id} warning:`, error);
          const fallback = SEED_MEMORIES.find((m) => m.id === id) || null;
          callback(fallback);
        }
      );
    } catch (err) {
      console.warn(`subscribeToMemory ${id} error:`, err);
      const fallback = SEED_MEMORIES.find((m) => m.id === id) || null;
      callback(fallback);
      return () => {};
    }
  },

  /**
   * Get all memories (Promise)
   */
  async getMemories(patientId?: string): Promise<Memory[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Memory[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Memory));
        return list;
      }
      return patientId
        ? SEED_MEMORIES.filter((m) => m.patientId === patientId)
        : SEED_MEMORIES;
    } catch (err) {
      console.warn('getMemories error, returning seed memories:', err);
      return patientId
        ? SEED_MEMORIES.filter((m) => m.patientId === patientId)
        : SEED_MEMORIES;
    }
  },

  /**
   * Get memory by ID
   */
  async getMemoryById(id: string): Promise<Memory | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Memory;
      }
      return SEED_MEMORIES.find((m) => m.id === id) || null;
    } catch (err) {
      console.warn(`getMemoryById ${id} error:`, err);
      return SEED_MEMORIES.find((m) => m.id === id) || null;
    }
  },

  /**
   * Create or update memory
   */
  async createMemory(memory: Memory): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, memory.id);
      await setDoc(docRef, {
        ...memory,
        createdAt: memory.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('createMemory failed:', err);
      throw err;
    }
  },

  /**
   * Update memory
   */
  async updateMemory(id: string, updates: Partial<Memory>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`updateMemory ${id} failed:`, err);
      throw err;
    }
  },

  /**
   * Add a family LoveNote to a memory
   */
  async addFamilyNote(memoryId: string, note: LoveNote): Promise<void> {
    try {
      const memory = await this.getMemoryById(memoryId);
      if (memory) {
        const updatedNotes = [...(memory.familyNotes || []), note];
        await this.updateMemory(memoryId, { familyNotes: updatedNotes });
      }
    } catch (err) {
      console.error(`addFamilyNote to ${memoryId} failed:`, err);
      throw err;
    }
  },

  /**
   * Delete memory
   */
  async deleteMemory(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`deleteMemory ${id} failed:`, err);
      throw err;
    }
  },
};
