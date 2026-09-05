/**
 * Caregiver Feature Domain Types
 * Owned by: Contributor 4 (Caregiver Lead)
 */

export interface CaregiverDashboardState {
  activePatientId: string;
  isOnline: boolean;
  lastPatientActiveTimestamp: string;
  unresolvedAlertCount: number;
}

export interface CaregiverNote {
  id: string;
  patientId: string;
  authorId: string;
  content: string;
  category: 'behavior' | 'sleep' | 'nutrition' | 'mood' | 'general';
  createdAt: string;
}
