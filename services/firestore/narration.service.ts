import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Narration } from '@/types/models';
import { SEED_NARRATIONS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'narrations';

export const narrationService = {
  /**
   * Subscribe to narrations for a memory
   */
  subscribeToNarrations(
    memoryId?: string,
    callback?: (narrations: Narration[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = memoryId ? query(colRef, where('memoryId', '==', memoryId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Narration[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Narration));
            callback(list);
          } else {
            const fallback = memoryId
              ? SEED_NARRATIONS.filter((n) => n.memoryId === memoryId)
              : SEED_NARRATIONS;
            callback(fallback);
          }
        },
        (error) => {
          console.warn('subscribeToNarrations error:', error);
          const fallback = memoryId
            ? SEED_NARRATIONS.filter((n) => n.memoryId === memoryId)
            : SEED_NARRATIONS;
          callback(fallback);
        }
      );
    } catch (err) {
      console.warn('subscribeToNarrations catch:', err);
      const fallback = memoryId
        ? SEED_NARRATIONS.filter((n) => n.memoryId === memoryId)
        : SEED_NARRATIONS;
      callback(fallback);
      return () => {};
    }
  },

  /**
   * Get narrations (Promise)
   */
  async getNarrations(memoryId?: string): Promise<Narration[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = memoryId ? query(colRef, where('memoryId', '==', memoryId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Narration[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Narration));
        return list;
      }
      return memoryId
        ? SEED_NARRATIONS.filter((n) => n.memoryId === memoryId)
        : SEED_NARRATIONS;
    } catch (err) {
      console.warn('getNarrations error:', err);
      return memoryId
        ? SEED_NARRATIONS.filter((n) => n.memoryId === memoryId)
        : SEED_NARRATIONS;
    }
  },

  /**
   * Create narration
   */
  async createNarration(narration: Narration): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, narration.id);
      await setDoc(docRef, {
        ...narration,
        createdAt: narration.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error('createNarration error:', err);
      throw err;
    }
  },
};
