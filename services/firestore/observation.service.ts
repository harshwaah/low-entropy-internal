import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Observation } from '@/types/models';
import { SEED_OBSERVATIONS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'observations';

export const observationService = {
  /**
   * Real-time subscription to clinical observations
   */
  subscribeToObservations(
    patientId?: string,
    callback?: (observations: Observation[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Observation[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Observation));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_OBSERVATIONS.filter((o) => o.patientId === patientId)
              : SEED_OBSERVATIONS;
            callback(fallback.length ? fallback : SEED_OBSERVATIONS);
          }
        },
        (error) => {
          console.warn('subscribeToObservations warning, using seed data:', error);
          const fallback = patientId
            ? SEED_OBSERVATIONS.filter((o) => o.patientId === patientId)
            : SEED_OBSERVATIONS;
          callback(fallback.length ? fallback : SEED_OBSERVATIONS);
        }
      );
    } catch (err) {
      console.warn('subscribeToObservations error:', err);
      const fallback = patientId
        ? SEED_OBSERVATIONS.filter((o) => o.patientId === patientId)
        : SEED_OBSERVATIONS;
      callback(fallback.length ? fallback : SEED_OBSERVATIONS);
      return () => {};
    }
  },

  /**
   * Get all observations (Promise)
   */
  async getObservations(patientId?: string): Promise<Observation[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Observation[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Observation));
        return list;
      }
      return patientId
        ? SEED_OBSERVATIONS.filter((o) => o.patientId === patientId)
        : SEED_OBSERVATIONS;
    } catch (err) {
      console.warn('getObservations error, returning seed observations:', err);
      return patientId
        ? SEED_OBSERVATIONS.filter((o) => o.patientId === patientId)
        : SEED_OBSERVATIONS;
    }
  },

  /**
   * Create new clinical observation
   */
  async createObservation(observation: Observation): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, observation.id);
      await setDoc(docRef, {
        ...observation,
        createdAt: observation.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error('createObservation error:', err);
      throw err;
    }
  },

  /**
   * Update clinical observation
   */
  async updateObservation(id: string, updates: Partial<Observation>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`updateObservation ${id} error:`, err);
      throw err;
    }
  },
};
