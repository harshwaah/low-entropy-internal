/**
 * Caregiver Experience Types & Scaffolding
 * 
 * Supports remote check-ins, routine compliance, alerts, and notes.
 */

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface CaregiverAlert {
  id: string;
  patientId: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface CaregiverProfile {
  id: string;
  name: string;
  relationshipToPatient: string;
  associatedPatientIds: string[];
  contactEmail: string;
  contactPhone: string;
  receiveInstantAlerts: boolean;
}
