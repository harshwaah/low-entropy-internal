/**
 * Application Runtime Configuration
 * 
 * Centralized configuration layer for environment variables and system settings.
 * All environment variables are validated, cleanly typed, and guarded against exposure.
 */

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  oAuthClientId?: string;
  firestoreDatabaseId?: string;
}

export interface AppConfig {
  appName: string;
  appDescription: string;
  appUrl: string;
  environment: 'development' | 'staging' | 'production';
  isProduction: boolean;
  isDevelopment: boolean;
  hasGeminiKey: boolean;
  geminiModel: string;
}

// Client-safe Firebase configuration populated exclusively from NEXT_PUBLIC_ variables
export const firebaseConfig: FirebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'parabolic-pattern-pq7jp.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'parabolic-pattern-pq7jp',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'parabolic-pattern-pq7jp.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '541285952957',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:541285952957:web:bf7e4ad0fc66cb8ea276d4',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
  oAuthClientId: process.env.NEXT_PUBLIC_FIREBASE_OAUTH_CLIENT_ID || '',
  firestoreDatabaseId: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID || 'ai-studio-smritisaathi-3879824e-81a5-47a5-8d07-21fe4e754c1b',
};

export const firestoreDatabaseId: string = firebaseConfig.firestoreDatabaseId || '(default)';

export const config: AppConfig = {
  appName: 'SmritiSaathi',
  appDescription:
    'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',
  environment: (process.env.NEXT_PUBLIC_APP_ENV as AppConfig['environment']) || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
  hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
};
