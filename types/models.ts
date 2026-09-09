/**
 * SmritiSaathi Unified Domain Models & Firestore Entity Schemas
 * Phase: v0.8.1 — Shared Data Architecture & Firestore Foundation
 * 
 * Provides single source of truth models for:
 * - Patient
 * - Memory
 * - Narration
 * - Reminder
 * - Activity
 * - Caregiver
 * - Practitioner
 * - Observation
 * - LoveNote
 * - Alert
 * 
 * Includes future-proofing fields for:
 * - AI Generated Memoirs
 * - Audio/Voice Recordings
 * - Photo Uploads & Archive Metadata
 * - Longitudinal Cognitive Analytics
 */

import type { CognitiveStage, MoodIndicator } from './patient';

export type ClinicalRiskIndicator = 'optimal' | 'attention' | 'elevated';
export type EngagementTrend = 'improving' | 'stable' | 'declining';
export type ReminderCategory = 'medication' | 'routine' | 'custom' | 'hydration' | 'movement';
export type ReminderPeriod = 'morning' | 'afternoon' | 'evening' | 'bedtime';
export type ReminderStatus = 'pending' | 'completed' | 'upcoming' | 'missed';
export type ActivityStatus = 'completed' | 'scheduled' | 'in-progress';
export type ObservationSeverity = 'info' | 'positive' | 'concern' | 'action_needed';
export type ObservationDomain = 'memory' | 'mood' | 'routine' | 'orientation' | 'communication' | 'motor' | 'attention' | 'cognition' | string;

// ==========================================
// 1. PATIENT MODEL
// ==========================================
export interface PatientMedicationRecord {
  name: string;
  dosage: string;
  timing: string;
  adherenceRate: number;
}

export interface PatientWeeklyHistoryRecord {
  day: string;
  engagement: number;
  memory: number;
  adherence: number;
}

export interface Patient {
  id: string; // e.g. 'p-101'
  name: string;
  preferredName: string;
  relationToCaregiver?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  stage: CognitiveStage;
  location: string;
  currentStatus: string;
  mood: MoodIndicator;
  todayEngagement: number; // 0-100
  primaryCaregiverId: string;
  primaryCaregiverName: string;
  primaryCaregiverPhone: string;
  attendingPhysician: string;
  onboardingDate: string;
  daysActive: number;
  engagementScore: number;
  engagementTrend: EngagementTrend;
  memoryActivityScore: number;
  routineAdherenceScore: number;
  lastInteraction: string;
  riskIndicator: ClinicalRiskIndicator;
  riskLabel: string;
  riskContextNote: string;
  primaryNostalgicTriggers: string[];
  activeMedications: PatientMedicationRecord[];
  avatarUrl?: string;
  weeklyHistory?: PatientWeeklyHistoryRecord[];
  createdAt: string;
  updatedAt: string;

  // Future-proofing architecture hooks
  analyticsProfile?: {
    totalSessions: number;
    averageEngagement: number;
    lastAssessmentDate?: string;
    cognitiveTrendIndex?: number;
  };
  voicePreference?: {
    speed: number;
    pitch: number;
    dialect: string;
  };
}

// ==========================================
// 2. LOVE NOTE MODEL (Family Messages)
// ==========================================
export interface LoveNote {
  id: string;
  patientId: string;
  memoryId?: string;
  authorId: string;
  authorName: string;
  relation: string;
  text: string;
  date: string;
  avatarInitials: string;
  avatarBg: string;
  createdAt: string;

  // Future voice notes hook
  audioVoiceNoteUrl?: string;
  reactionsCount?: number;
}

// ==========================================
// 3. NARRATION MODEL (Voice & Stories)
// ==========================================
export interface Narration {
  id: string;
  memoryId: string;
  patientId: string;
  authorId: string;
  authorName: string;
  relation: string;
  title: string;
  durationFormatted: string;
  durationSeconds: number;
  transcript?: string;
  status: 'draft' | 'published' | 'processing';
  createdAt: string;
  updatedAt?: string;

  // Future audio & AI synthesis hooks
  audioUrl?: string;
  recordingMethod?: 'voice_upload' | 'in_app_recorder' | 'ai_synthesized';
}

// ==========================================
// 4. MEMORY MODEL (Scrapbook & Reminiscence)
// ==========================================
export interface Memory {
  id: string;
  patientId: string;
  title: string;
  shortDescription: string;
  dateEra: string;
  yearApproximate?: string;
  location?: string;
  category: 'childhood' | 'family' | 'school' | 'celebrations' | 'places' | 'things' | string;
  emotionalTag: string;
  emotionalColor?: string;
  companionIntro?: string;
  coverImage: string;
  imageAlt?: string;
  imageCaption?: string;
  familiarPeople: string[];
  isMemoryOfTheDay?: boolean;
  story: string[];
  familyNotes: LoveNote[];
  audioNarration?: {
    narrator: string;
    relation: string;
    duration: string;
    title: string;
    audioUrl?: string;
  };
  createdAt: string;
  updatedAt: string;

  // Future AI Memoir & Photo Upload hooks
  aiMemoirDraft?: {
    generatedAt?: string;
    promptUsed?: string;
    status?: 'none' | 'queued' | 'generated' | 'reviewed';
    narrativeText?: string;
    keyThemes?: string[];
  };
  photoUploadMetadata?: {
    originalFileName?: string;
    storagePath?: string;
    resolution?: string;
    isOriginalScanned?: boolean;
  };
}

// ==========================================
// 5. REMINDER MODEL (Medications & Routines)
// ==========================================
export interface Reminder {
  id: string;
  patientId: string;
  title: string;
  category: ReminderCategory;
  period: ReminderPeriod;
  timeFormatted: string;
  time?: string;
  time24?: string;
  instructions: string;
  description?: string;
  recurrence: 'daily' | 'weekdays' | 'as-needed' | string;
  requiresCaregiverValidation: boolean;
  status: ReminderStatus;
  completedAt?: string;
  completedBy?: string;
  medicationDosageNote?: string;
  dosage?: string;
  assignedTo: string;
  iconName?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 6. ACTIVITY MODEL (Logs & Cognitive Games)
// ==========================================
export interface Activity {
  id: string;
  patientId: string;
  type: 'game' | 'reminiscence' | 'routine' | 'hydration' | 'movement' | 'social';
  gameType?: 'memory-match' | 'find-the-object' | 'what-comes-next' | null;
  title: string;
  category: string;
  time: string;
  timestamp: string;
  status: ActivityStatus;
  score?: number;
  stars?: number;
  durationSeconds?: number;
  description?: string;
  companionFeedback?: string;
  cognitiveDomain?: 'visual-spatial' | 'executive' | 'memory' | 'attention' | 'orientation' | 'language' | string;
  createdAt: string;

  // Future analytics payload
  analyticsPayload?: {
    errorCount?: number;
    reactionTimeMs?: number;
    hesitationDetected?: boolean;
  };
}

// ==========================================
// 7. CAREGIVER MODEL
// ==========================================
export interface Caregiver {
  id: string;
  name: string;
  preferredName?: string;
  relation: string;
  phone: string;
  email: string;
  associatedPatientIds: string[];
  validationFrequency: string;
  receiveInstantAlerts: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// 8. PRACTITIONER MODEL
// ==========================================
export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  email: string;
  phone: string;
  assignedPatientIds: string[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// 9. OBSERVATION MODEL (Clinical Notes)
// ==========================================
export interface Observation {
  id: string;
  patientId: string;
  patientName?: string;
  practitionerId?: string;
  practitionerName?: string;
  authorName?: string;
  authorRole?: string;
  type?: 'care_note' | 'observation' | 'family_update' | 'significant_event' | string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  date?: string;
  timestamp: string;
  domain?: ObservationDomain;
  severity?: ObservationSeverity;
  observationText?: string;
  recommendationText?: string;
  metricsSnapshot?: {
    engagementScore?: number;
    adherenceRate?: number;
    mocaScoreEstimate?: number;
  };
  isSharedWithCaregiver?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// 10. ALERT MODEL (Caregiver Safety/Alerts)
// ==========================================
export interface Alert {
  id: string;
  patientId: string;
  severity: 'info' | 'gentle' | 'attention' | 'action-required';
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  acknowledged: boolean;
  actionRecommended?: string;
  createdAt: string;
}
