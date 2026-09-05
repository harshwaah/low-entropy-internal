/**
 * Practitioner Experience Types & Scaffolding
 * 
 * Supports clinical tracking, MMSE/MoCA milestone tracking, and longitudinal activity trends.
 */

export interface ClinicalPatientOverview {
  patientId: string;
  fullName: string;
  age: number;
  diagnosis: string;
  diagnosisDate: string;
  primaryCaregiverName: string;
  lastClinicalReview: string;
  activeRoutineCount: number;
  cognitiveTrendStatus: 'stable' | 'fluctuating' | 'declining';
}

export interface CognitiveTrendMetric {
  date: string;
  engagementScore: number; // 0 to 100
  routineAdherencePercent: number; // 0 to 100
  sessionCompletionRate: number; // 0 to 100
  flaggedConfusionIncidents: number;
}
