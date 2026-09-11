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
import { Alert } from '@/types/models';
import { SEED_ALERTS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'alerts';

export const alertService = {
  subscribeToAlerts(
    patientId?: string,
    callback?: (alerts: Alert[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Alert[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Alert));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_ALERTS.filter((a) => a.patientId === patientId)
              : SEED_ALERTS;
            callback(fallback);
          }
        },
        (error) => {
          console.warn('subscribeToAlerts warning:', error);
          const fallback = patientId
            ? SEED_ALERTS.filter((a) => a.patientId === patientId)
            : SEED_ALERTS;
          callback(fallback);
        }
      );
    } catch (err) {
      console.warn('subscribeToAlerts catch:', err);
      const fallback = patientId
        ? SEED_ALERTS.filter((a) => a.patientId === patientId)
        : SEED_ALERTS;
      callback(fallback);
      return () => {};
    }
  },

  async getAlerts(patientId?: string): Promise<Alert[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Alert[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Alert));
        return list;
      }
      return patientId
        ? SEED_ALERTS.filter((a) => a.patientId === patientId)
        : SEED_ALERTS;
    } catch (err) {
      console.warn('getAlerts error:', err);
      return patientId
        ? SEED_ALERTS.filter((a) => a.patientId === patientId)
        : SEED_ALERTS;
    }
  },

  async acknowledgeAlert(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { acknowledged: true });
    } catch (err) {
      console.error(`acknowledgeAlert ${id} error:`, err);
      throw err;
    }
  },

  async createAlert(alert: Alert): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, alert.id);
      await setDoc(docRef, {
        ...alert,
        createdAt: alert.createdAt || new Date().toISOString(),
        timestamp: alert.timestamp || new Date().toISOString(),
      });
    } catch (err) {
      console.error('createAlert error:', err);
      throw err;
    }
  },
};
