import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig, firestoreDatabaseId } from './config';

// Ensure singleton Firebase App initialization
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore with specific database ID or default
const databaseId = firestoreDatabaseId && firestoreDatabaseId !== '(default)'
  ? firestoreDatabaseId
  : '(default)';

let db: Firestore;
try {
  db = getFirestore(app, databaseId);
} catch (error) {
  // Fallback to default if named database initialization fails
  console.warn('Initializing Firestore with custom databaseId failed, falling back to default:', error);
  db = getFirestore(app);
}

const auth: Auth = getAuth(app);

export { app, db, auth, firebaseConfig, databaseId };
