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
import { Reminder, ReminderStatus } from '@/types/models';
import { SEED_REMINDERS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'reminders';

export const reminderService = {
  /**
   * Real-time subscription to reminders
   */
  subscribeToReminders(
    patientId?: string,
    callback?: (reminders: Reminder[]) => void
  ): Unsubscribe {
    if (!callback) return () => {};
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;

      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Reminder[] = [];
            snapshot.forEach((docSnap) => list.push(docSnap.data() as Reminder));
            callback(list);
          } else {
            const fallback = patientId
              ? SEED_REMINDERS.filter((r) => r.patientId === patientId)
              : SEED_REMINDERS;
            callback(fallback.length ? fallback : SEED_REMINDERS);
          }
        },
        (error) => {
          console.warn('Firestore subscribeToReminders warning, using seed data:', error);
          const fallback = patientId
            ? SEED_REMINDERS.filter((r) => r.patientId === patientId)
            : SEED_REMINDERS;
          callback(fallback.length ? fallback : SEED_REMINDERS);
        }
      );
    } catch (err) {
      console.warn('subscribeToReminders error:', err);
      const fallback = patientId
        ? SEED_REMINDERS.filter((r) => r.patientId === patientId)
        : SEED_REMINDERS;
      callback(fallback.length ? fallback : SEED_REMINDERS);
      return () => {};
    }
  },

  /**
   * Get all reminders (Promise)
   */
  async getReminders(patientId?: string): Promise<Reminder[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const q = patientId ? query(colRef, where('patientId', '==', patientId)) : colRef;
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: Reminder[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Reminder));
        return list;
      }
      return patientId
        ? SEED_REMINDERS.filter((r) => r.patientId === patientId)
        : SEED_REMINDERS;
    } catch (err) {
      console.warn('getReminders fetch error:', err);
      return patientId
        ? SEED_REMINDERS.filter((r) => r.patientId === patientId)
        : SEED_REMINDERS;
    }
  },

  /**
   * Get single reminder
   */
  async getReminderById(id: string): Promise<Reminder | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Reminder;
      }
      return SEED_REMINDERS.find((r) => r.id === id) || null;
    } catch (err) {
      console.warn(`getReminderById ${id} error:`, err);
      return SEED_REMINDERS.find((r) => r.id === id) || null;
    }
  },

  /**
   * Create new reminder
   */
  async createReminder(reminder: Reminder): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, reminder.id);
      await setDoc(docRef, {
        ...reminder,
        createdAt: reminder.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('createReminder error:', err);
      throw err;
    }
  },

  /**
   * Update reminder
   */
  async updateReminder(id: string, updates: Partial<Reminder>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`updateReminder ${id} error:`, err);
      throw err;
    }
  },

  /**
   * Toggle or set reminder status (e.g. from Patient App or Caregiver Portal)
   */
  async toggleReminderStatus(
    id: string,
    newStatus: ReminderStatus,
    completedBy?: string
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const now = new Date();
      const timeFormatted = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      await updateDoc(docRef, {
        status: newStatus,
        completedAt: newStatus === 'completed' ? timeFormatted : null,
        completedBy: newStatus === 'completed' ? (completedBy || 'Patient / Caregiver') : null,
        updatedAt: now.toISOString(),
      });
    } catch (err) {
      console.error(`toggleReminderStatus ${id} error:`, err);
      throw err;
    }
  },

  /**
   * Delete reminder
   */
  async deleteReminder(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`deleteReminder ${id} error:`, err);
      throw err;
    }
  },
};
