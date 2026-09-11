import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  SEED_PATIENTS,
  SEED_MEMORIES,
  SEED_REMINDERS,
  SEED_ACTIVITIES,
  SEED_OBSERVATIONS,
  SEED_CAREGIVERS,
  SEED_PRACTITIONERS,
  SEED_NARRATIONS,
  SEED_LOVE_NOTES,
  SEED_ALERTS,
} from '@/services/seed/demo-seed-data';

export const seedService = {
  /**
   * Automatically seed Firestore if the patients collection is empty.
   */
  async seedDatabaseIfEmpty(): Promise<boolean> {
    try {
      const patientCol = collection(db, 'patients');
      const snapshot = await getDocs(patientCol);

      if (!snapshot.empty) {
        // Database already populated
        return false;
      }

      console.info('Database empty. Seeding realistic clinical & patient dataset into Firestore...');
      await this.forceReSeedDatabase();
      return true;
    } catch (err) {
      console.warn('seedDatabaseIfEmpty warning (may be offline or initializing):', err);
      return false;
    }
  },

  /**
   * Seed/re-seed all collections into Firestore.
   */
  async forceReSeedDatabase(): Promise<void> {
    try {
      // 1. Patients
      for (const p of SEED_PATIENTS) {
        await setDoc(doc(db, 'patients', p.id), p, { merge: true });
      }

      // 2. Memories
      for (const m of SEED_MEMORIES) {
        await setDoc(doc(db, 'memories', m.id), m, { merge: true });
      }

      // 3. Reminders
      for (const r of SEED_REMINDERS) {
        await setDoc(doc(db, 'reminders', r.id), r, { merge: true });
      }

      // 4. Activities
      for (const a of SEED_ACTIVITIES) {
        await setDoc(doc(db, 'activities', a.id), a, { merge: true });
      }

      // 5. Observations
      for (const o of SEED_OBSERVATIONS) {
        await setDoc(doc(db, 'observations', o.id), o, { merge: true });
      }

      // 6. Caregivers
      for (const c of SEED_CAREGIVERS) {
        await setDoc(doc(db, 'caregivers', c.id), c, { merge: true });
      }

      // 7. Practitioners
      for (const pr of SEED_PRACTITIONERS) {
        await setDoc(doc(db, 'practitioners', pr.id), pr, { merge: true });
      }

      // 8. Narrations
      for (const n of SEED_NARRATIONS) {
        await setDoc(doc(db, 'narrations', n.id), n, { merge: true });
      }

      // 9. Love Notes
      for (const ln of SEED_LOVE_NOTES) {
        await setDoc(doc(db, 'loveNotes', ln.id), ln, { merge: true });
      }

      // 10. Alerts
      for (const al of SEED_ALERTS) {
        await setDoc(doc(db, 'alerts', al.id), al, { merge: true });
      }

      console.info('Firestore dataset seeded successfully!');
    } catch (err) {
      console.error('forceReSeedDatabase error:', err);
      throw err;
    }
  },
};
