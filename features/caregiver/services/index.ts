/**
 * Caregiver Service Implementation
 * Owned by: Contributor 4 (Caregiver Lead)
 */

import {
  CaregiverPatientOverview,
  CaregiverReminder,
  CaregiverActivityLog,
  CaregiverAlertItem,
  WeeklyEngagementDay,
  CaregiverNote,
} from '../types';
import {
  SAMPLE_PATIENT_OVERVIEW,
  INITIAL_CAREGIVER_REMINDERS,
  SAMPLE_ACTIVITY_LOGS,
  SAMPLE_WEEKLY_ENGAGEMENT,
  INITIAL_CAREGIVER_ALERTS,
} from '../data/sample-caregiver-data';

export interface ICaregiverService {
  getPatientOverview(patientId?: string): Promise<CaregiverPatientOverview>;
  getReminders(patientId?: string): Promise<CaregiverReminder[]>;
  getActivityLogs(patientId?: string): Promise<CaregiverActivityLog[]>;
  getWeeklyEngagement(patientId?: string): Promise<WeeklyEngagementDay[]>;
  getAlerts(patientId?: string): Promise<CaregiverAlertItem[]>;
  getCaregiverNotes(patientId: string): Promise<CaregiverNote[]>;
  createNote(note: Omit<CaregiverNote, 'id' | 'createdAt'>): Promise<CaregiverNote>;
}

export const caregiverService: ICaregiverService = {
  async getPatientOverview(_patientId?: string): Promise<CaregiverPatientOverview> {
    return SAMPLE_PATIENT_OVERVIEW;
  },

  async getReminders(_patientId?: string): Promise<CaregiverReminder[]> {
    return INITIAL_CAREGIVER_REMINDERS;
  },

  async getActivityLogs(_patientId?: string): Promise<CaregiverActivityLog[]> {
    return SAMPLE_ACTIVITY_LOGS;
  },

  async getWeeklyEngagement(_patientId?: string): Promise<WeeklyEngagementDay[]> {
    return SAMPLE_WEEKLY_ENGAGEMENT;
  },

  async getAlerts(_patientId?: string): Promise<CaregiverAlertItem[]> {
    return INITIAL_CAREGIVER_ALERTS;
  },

  async getCaregiverNotes(_patientId: string): Promise<CaregiverNote[]> {
    return [];
  },

  async createNote(note: Omit<CaregiverNote, 'id' | 'createdAt'>): Promise<CaregiverNote> {
    return {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },
};

export {
  SAMPLE_PATIENT_OVERVIEW,
  INITIAL_CAREGIVER_REMINDERS,
  SAMPLE_ACTIVITY_LOGS,
  SAMPLE_WEEKLY_ENGAGEMENT,
  INITIAL_CAREGIVER_ALERTS,
};
