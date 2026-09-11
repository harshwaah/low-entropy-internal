import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfig from '@/firebase-applet-config.json';

// Ensure singleton Firebase App initialization
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore with specific database ID from config
const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth: Auth = getAuth(app);

// Test Firestore connection on boot (client-side only)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable'))) {
      console.warn('Firebase notice: operating with client cache / offline resilience.');
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection();
}

export { app, db, auth, firebaseConfig };
