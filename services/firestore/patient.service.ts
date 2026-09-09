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
import { Patient } from '@/types/models';
import { SEED_PATIENTS } from '@/services/seed/demo-seed-data';

const COLLECTION_NAME = 'patients';

export const patientService = {
  /**
   * Subscribe to all patients with real-time updates
   */
  subscribeToPatients(callback: (patients: Patient[]) => void): Unsubscribe {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Patient[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as Patient);
            });
            callback(list);
          } else {
            // Initial fallback to seed patients
            callback(SEED_PATIENTS);
          }
        },
        (error) => {
          console.warn('Firestore subscribeToPatients warning, using fallback:', error);
          callback(SEED_PATIENTS);
        }
      );
    } catch (err) {
      console.warn('subscribeToPatients error:', err);
      callback(SEED_PATIENTS);
      return () => {};
    }
  },

  /**
   * Subscribe to single patient by ID with real-time updates
   */
  subscribeToPatient(id: string, callback: (patient: Patient | null) => void): Unsubscribe {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      return onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data() as Patient);
          } else {
            const fallback = SEED_PATIENTS.find((p) => p.id === id) || SEED_PATIENTS[0];
            callback(fallback);
          }
        },
        (error) => {
          console.warn(`Firestore subscribeToPatient ${id} warning, using fallback:`, error);
          const fallback = SEED_PATIENTS.find((p) => p.id === id) || SEED_PATIENTS[0];
          callback(fallback);
        }
      );
    } catch (err) {
      console.warn(`subscribeToPatient ${id} error:`, err);
      const fallback = SEED_PATIENTS.find((p) => p.id === id) || SEED_PATIENTS[0];
      callback(fallback);
      return () => {};
    }
  },

  /**
   * Fetch all patients (Promise)
   */
  async getPatients(): Promise<Patient[]> {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const list: Patient[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Patient));
        return list;
      }
      return SEED_PATIENTS;
    } catch (err) {
      console.warn('getPatients fetch failed, returning seed data:', err);
      return SEED_PATIENTS;
    }
  },

  /**
   * Fetch patient by ID (Promise)
   */
  async getPatientById(id: string): Promise<Patient | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Patient;
      }
      return SEED_PATIENTS.find((p) => p.id === id) || null;
    } catch (err) {
      console.warn(`getPatientById ${id} failed, returning seed data:`, err);
      return SEED_PATIENTS.find((p) => p.id === id) || null;
    }
  },

  /**
   * Create or update patient in Firestore
   */
  async upsertPatient(patient: Patient): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, patient.id);
      await setDoc(docRef, { ...patient, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error(`upsertPatient ${patient.id} failed:`, err);
      throw err;
    }
  },

  /**
   * Update partial patient record
   */
  async updatePatient(id: string, updates: Partial<Patient>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.error(`updatePatient ${id} failed:`, err);
      throw err;
    }
  },
};
