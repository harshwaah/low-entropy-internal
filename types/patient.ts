/**
 * Patient Experience Types & Scaffolding
 * 
 * Supports orientation (time/place), emotional status, and routine state.
 */

export type CognitiveStage = 'early' | 'moderate' | 'advanced';

export type MoodIndicator = 'calm' | 'cheerful' | 'pensive' | 'confused' | 'anxious';

export interface OrientationContext {
  currentDayName: string;
  currentDateFormatted: string;
  timeOfDayGreeting: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  currentLocationName: string;
  weatherSummary?: string;
}

export interface PatientSummary {
  id: string;
  fullName: string;
  preferredNickname: string;
  cognitiveStage: CognitiveStage;
  emergencyCaregiverContactName: string;
  emergencyCaregiverPhone: string;
  primaryLanguage: string;
}
