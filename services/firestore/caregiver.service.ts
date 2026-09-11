import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Caregiver } from '@/types/models';
import { SEED_CAREGIVERS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'caregivers';

export const caregiverService = {
  subscribeToCaregivers(callback: (caregivers: Caregiver[]) => void): Unsubscribe {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Caregiver[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Caregiver));
            callback(list);
          } else {
            callback(SEED_CAREGIVERS);
          }
        },
        (error) => {
          console.warn('subscribeToCaregivers warning:', error);
          callback(SEED_CAREGIVERS);
        }
      );
    } catch (err) {
      console.warn('subscribeToCaregivers catch:', err);
      callback(SEED_CAREGIVERS);
      return () => {};
    }
  },

  async getCaregivers(): Promise<Caregiver[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const list: Caregiver[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Caregiver));
        return list;
      }
      return SEED_CAREGIVERS;
    } catch (err) {
      console.warn('getCaregivers error:', err);
      return SEED_CAREGIVERS;
    }
  },

  async getCaregiverById(id: string): Promise<Caregiver | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Caregiver;
      }
      return SEED_CAREGIVERS.find((c) => c.id === id) || null;
    } catch (err) {
      console.warn(`getCaregiverById ${id} error:`, err);
      return SEED_CAREGIVERS.find((c) => c.id === id) || null;
    }
  },

  async upsertCaregiver(caregiver: Caregiver): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, caregiver.id);
      await setDoc(docRef, { ...caregiver, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error(`upsertCaregiver ${caregiver.id} error:`, err);
      throw err;
    }
  },
};
