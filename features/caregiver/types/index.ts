/**
 * Caregiver Feature Domain Types
 * Owned by: Contributor 4 (Caregiver Lead)
 * 
 * Supports caregiver command center, patient status overview,
 * reminder management, memory curation, activity monitoring, and calm alert center.
 */

export interface CaregiverDashboardState {
  activePatientId: string;
  isOnline: boolean;
  lastPatientActiveTimestamp: string;
  unresolvedAlertCount: number;
}

export interface CaregiverPatientOverview {
  id: string;
  name: string;
  preferredName: string;
  relation: string;
  age: number;
  condition: string;
  location: string;
  currentStatus: string;
  todayEngagement: number; // percentage, e.g. 84
  lastMemoryViewed: {
    id: string;
    title: string;
    era: string;
    timeAgo: string;
    category: string;
  };
  lastActivityCompleted: {
    title: string;
    category: string;
    time: string;
  };
  reminderCompletion: {
    completed: number;
    total: number;
    percentage: number;
  };
  companionNote: string;
  lastCheckInTime: string;
  mood: 'calm' | 'cheerful' | 'pensive' | 'peaceful';
}

export type ReminderCategory = 'medication' | 'routine' | 'custom';
export type ReminderPeriod = 'morning' | 'afternoon' | 'evening' | 'bedtime';
export type ReminderStatus = 'completed' | 'upcoming' | 'pending' | 'missed';

export interface CaregiverReminder {
  id: string;
  title: string;
  category: ReminderCategory;
  period: ReminderPeriod;
  timeFormatted: string;
  instructions: string;
  recurrence: 'daily' | 'weekdays' | 'weekends' | 'custom';
  requiresCaregiverValidation: boolean;
  status: ReminderStatus;
  completedAt?: string;
  medicationDosageNote?: string;
  assignedTo: string;
  iconName?: string;
}

export interface CaregiverActivityLog {
  id: string;
  title: string;
  category: 'routine' | 'memory' | 'hydration' | 'movement' | 'social';
  time: string;
  status: 'completed' | 'assisted' | 'scheduled';
  description: string;
  companionFeedback?: string;
}

export type CaregiverAlertSeverity = 'info' | 'gentle' | 'attention';
export type CaregiverAlertType = 'reminder-missed' | 'routine-deviation' | 'sos-beacon' | 'environmental';

export interface CaregiverAlertItem {
  id: string;
  patientId: string;
  severity: CaregiverAlertSeverity;
  type: CaregiverAlertType;
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  contextNote: string;
  recommendedAction?: string;
}

export interface WeeklyEngagementDay {
  day: string; // "Mon", "Tue", etc.
  dateFormatted: string;
  score: number; // 0 - 100
  routinesCompleted: number;
  routinesTotal: number;
  memoriesEngaged: number;
  isToday?: boolean;
}

export interface CaregiverNote {
  id: string;
  patientId: string;
  authorId: string;
  content: string;
  category: 'behavior' | 'sleep' | 'nutrition' | 'mood' | 'general';
  createdAt: string;
}

export interface NewMemoryFormData {
  title: string;
  category: 'childhood' | 'family' | 'school' | 'celebrations' | 'places' | 'things';
  story: string;
  dateEra: string;
  location: string;
  emotionalTag: string;
  familyNote: {
    author: string;
    relation: string;
    text: string;
  };
  photoUrl: string;
  familiarPeople: string[];
}
