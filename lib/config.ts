/**
 * Application Runtime Configuration
 * 
 * Provides validated, centralized access to environment variables and system settings.
 * Safe for both server-side execution and client-side consumption where appropriate.
 */

export interface AppConfig {
  appName: string;
  appDescription: string;
  appUrl: string;
  environment: 'development' | 'staging' | 'production';
  isProduction: boolean;
  isDevelopment: boolean;
  hasGeminiKey: boolean;
}

export const config: AppConfig = {
  appName: 'SmritiSaathi',
  appDescription:
    'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  environment: (process.env.NEXT_PUBLIC_APP_ENV as AppConfig['environment']) || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
  hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
};
