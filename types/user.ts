/**
 * User & Role Domain Types
 * 
 * Defines the user archetypes for SmritiSaathi:
 * - PATIENT: Individual living with mild to moderate dementia.
 * - CAREGIVER: Family member or primary home caregiver monitoring routines and emotional states.
 * - PRACTITIONER: Neurologist, geriatrician, or therapist reviewing cognitive trends and care plans.
 */

export type UserRole = 'patient' | 'caregiver' | 'practitioner';

export interface UserProfile {
  id: string;
  role: UserRole;
  displayName: string;
  preferredName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSessionState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  activeRole: UserRole;
  isReady: boolean;
}
