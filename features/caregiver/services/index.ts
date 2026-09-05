/**
 * Caregiver Service Scaffolding (Phase 2 Target)
 * Owned by: Contributor 4
 */

import { CaregiverNote } from '../types';

export interface ICaregiverService {
  getCaregiverNotes(patientId: string): Promise<CaregiverNote[]>;
  createNote(note: Omit<CaregiverNote, 'id' | 'createdAt'>): Promise<CaregiverNote>;
}

export const caregiverServicePlaceholder: ICaregiverService = {
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
