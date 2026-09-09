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
import { Activity } from '@/types/models';
import { SEED_ACTIVITIES } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'activities';

export const activityService = {
  /**
   * Real-time subscription to activities
   */
  subscribeToActivities(
    patientId?: string,
    callback?: (activities: Activity[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Activity[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Activity));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_ACTIVITIES.filter((a) => a.patientId === patientId)
              : SEED_ACTIVITIES;
            callback(fallback.length ? fallback : SEED_ACTIVITIES);
          }
        },
        (error) => {
          console.warn('Firestore subscribeToActivities warning, using seed data:', error);
          const fallback = patientId
            ? SEED_ACTIVITIES.filter((a) => a.patientId === patientId)
            : SEED_ACTIVITIES;
          callback(fallback.length ? fallback : SEED_ACTIVITIES);
        }
      );
    } catch (err) {
      console.warn('subscribeToActivities error:', err);
      const fallback = patientId
        ? SEED_ACTIVITIES.filter((a) => a.patientId === patientId)
        : SEED_ACTIVITIES;
      callback(fallback.length ? fallback : SEED_ACTIVITIES);
      return () => {};
    }
  },

  /**
   * Get all activities (Promise)
   */
  async getActivities(patientId?: string): Promise<Activity[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Activity[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Activity));
        return list;
      }
      return patientId
        ? SEED_ACTIVITIES.filter((a) => a.patientId === patientId)
        : SEED_ACTIVITIES;
    } catch (err) {
      console.warn('getActivities error, returning seed data:', err);
      return patientId
        ? SEED_ACTIVITIES.filter((a) => a.patientId === patientId)
        : SEED_ACTIVITIES;
    }
  },

  /**
   * Log an activity (e.g. from cognitive games, tea routine, walking, memory session)
   */
  async logActivity(activity: Activity): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, activity.id);
      await setDoc(docRef, {
        ...activity,
        createdAt: activity.createdAt || new Date().toISOString(),
        timestamp: activity.timestamp || new Date().toISOString(),
      });
    } catch (err) {
      console.error('logActivity error:', err);
      throw err;
    }
  },
};
