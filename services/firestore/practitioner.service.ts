import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Practitioner } from '@/types/models';
import { SEED_PRACTITIONERS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'practitioners';

export const practitionerService = {
  subscribeToPractitioners(callback: (practitioners: Practitioner[]) => void): Unsubscribe {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Practitioner[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Practitioner));
            callback(list);
          } else {
            callback(SEED_PRACTITIONERS);
          }
        },
        (error) => {
          console.warn('subscribeToPractitioners warning:', error);
          callback(SEED_PRACTITIONERS);
        }
      );
    } catch (err) {
      console.warn('subscribeToPractitioners catch:', err);
      callback(SEED_PRACTITIONERS);
      return () => {};
    }
  },

  async getPractitioners(): Promise<Practitioner[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const list: Practitioner[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Practitioner));
        return list;
      }
      return SEED_PRACTITIONERS;
    } catch (err) {
      console.warn('getPractitioners error:', err);
      return SEED_PRACTITIONERS;
    }
  },

  async getPractitionerById(id: string): Promise<Practitioner | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Practitioner;
      }
      return SEED_PRACTITIONERS.find((p) => p.id === id) || null;
    } catch (err) {
      console.warn(`getPractitionerById ${id} error:`, err);
      return SEED_PRACTITIONERS.find((p) => p.id === id) || null;
    }
  },

  async upsertPractitioner(practitioner: Practitioner): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, practitioner.id);
      await setDoc(docRef, { ...practitioner, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error(`upsertPractitioner ${practitioner.id} error:`, err);
      throw err;
    }
  },
};
