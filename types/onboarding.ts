export type OnboardingRole = 'patient' | 'caregiver' | 'practitioner';

export interface PatientOnboardingData {
  name?: string;
  preferredName: string;
  joys: string[];
  helpAreas: string[];
}

export interface CaregiverOnboardingData {
  name?: string;
  relationship: string;
  patientName: string;
  preferredName: string;
  manageAreas: string[];
}

export interface PractitionerOnboardingData {
  name: string;
  role: string;
  organization: string;
  priorities: string[];
}

export type OnboardingData =
  | PatientOnboardingData
  | CaregiverOnboardingData
  | PractitionerOnboardingData;
