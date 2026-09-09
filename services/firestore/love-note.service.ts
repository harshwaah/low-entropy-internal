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
import { LoveNote } from '@/types/models';
import { SEED_LOVE_NOTES } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'loveNotes';

export const loveNoteService = {
  subscribeToLoveNotes(
    patientId?: string,
    callback?: (notes: LoveNote[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: LoveNote[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as LoveNote));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_LOVE_NOTES.filter((n) => n.patientId === patientId)
              : SEED_LOVE_NOTES;
            callback(fallback);
          }
        },
        (error) => {
          console.warn('subscribeToLoveNotes warning:', error);
          const fallback = patientId
            ? SEED_LOVE_NOTES.filter((n) => n.patientId === patientId)
            : SEED_LOVE_NOTES;
          callback(fallback);
        }
      );
    } catch (err) {
      console.warn('subscribeToLoveNotes catch:', err);
      const fallback = patientId
        ? SEED_LOVE_NOTES.filter((n) => n.patientId === patientId)
        : SEED_LOVE_NOTES;
      callback(fallback);
      return () => {};
    }
  },

  async getLoveNotes(patientId?: string): Promise<LoveNote[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: LoveNote[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as LoveNote));
        return list;
      }
      return patientId
        ? SEED_LOVE_NOTES.filter((n) => n.patientId === patientId)
        : SEED_LOVE_NOTES;
    } catch (err) {
      console.warn('getLoveNotes error:', err);
      return patientId
        ? SEED_LOVE_NOTES.filter((n) => n.patientId === patientId)
        : SEED_LOVE_NOTES;
    }
  },

  async sendLoveNote(note: LoveNote): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, note.id);
      await setDoc(docRef, {
        ...note,
        createdAt: note.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error('sendLoveNote error:', err);
      throw err;
    }
  },
};
