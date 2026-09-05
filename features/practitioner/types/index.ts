/**
 * Practitioner Domain Types
 * SmritiSaathi Clinical Oversight Architecture
 * Owned by: Contributor 5 (Practitioner Lead)
 */

export type ClinicalStage = 'early' | 'moderate' | 'advanced';
export type ClinicalRiskLevel = 'optimal' | 'mild_variance' | 'review_recommended';
export type EngagementTrend = 'improving' | 'stable' | 'declining';

export interface PatientCaregiverInfo {
  name: string;
  relation: string;
  phone: string;
  email: string;
  validationFrequency: string;
}

export interface PatientMedicationSummary {
  name: string;
  dosage: string;
  timing: string;
  adherenceRate: number; // percentage (0-100)
}

export interface ClinicalPatient {
  id: string;
  name: string;
  preferredName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  stage: ClinicalStage;
  primaryCaregiver: PatientCaregiverInfo;
  attendingPhysician: string;
  onboardingDate: string;
  daysActive: number;
  
  // Clinical Metric Scores (0-100)
  engagementScore: number;
  engagementTrend: EngagementTrend;
  memoryActivityScore: number;
  routineAdherenceScore: number;
  
  lastInteraction: string;
  riskIndicator: ClinicalRiskLevel;
  riskLabel: string;
  riskContextNote: string;
  
  // Clinical Profile Details
  primaryNostalgicTriggers: string[];
  activeMedications: PatientMedicationSummary[];
  recentAlertsCount: number;
  notesCount: number;
  avatarUrl?: string;
  
  // Longitudinal Trends for Charts
  weeklyHistory: {
    day: string;
    engagement: number;
    memory: number;
    adherence: number;
  }[];
}

export type ObservationType = 'care_note' | 'observation' | 'family_update' | 'significant_event';
export type ObservationSentiment = 'positive' | 'neutral' | 'attention';

export interface ClinicalObservation {
  id: string;
  patientId: string;
  patientName: string;
  type: ObservationType;
  title: string;
  summary: string;
  detail: string;
  timestamp: string;
  author: {
    name: string;
    role: string;
    type: 'physician' | 'caregiver' | 'companion_telemetry';
  };
  tags: string[];
  sentiment: ObservationSentiment;
  actionTaken?: string;
  vitalContext?: string;
}

export type RecommendationCategory =
  | 'memory_activity'
  | 'engagement_improvement'
  | 'routine_reinforcement'
  | 'follow_up_prompt';

export type RecommendationPriority = 'routine' | 'recommended' | 'priority';
export type RecommendationStatus = 'pending' | 'applied' | 'dismissed';

export interface ClinicalRecommendation {
  id: string;
  patientId: string;
  patientName: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  rationale: string;
  suggestedAction: string;
  status: RecommendationStatus;
  createdAt: string;
  badgeLabel: string;
}

export interface CohortAnalyticsSummary {
  totalPatients: number;
  averageEngagement: number;
  averageRoutineAdherence: number;
  averageMemoryActivity: number;
  activeObservationsCount: number;
  observationsNeedingReview: number;
  stabilityBreakdown: {
    optimal: number;
    mildVariance: number;
    reviewRecommended: number;
  };
  weeklyTrends: {
    day: string;
    memoryScore: number;
    routineScore: number;
    overallEngagement: number;
  }[];
}

export interface ClinicalCohortFilter {
  stage?: ClinicalStage | 'all';
  risk?: ClinicalRiskLevel | 'all';
  searchQuery?: string;
  sortBy?: 'name' | 'engagement' | 'adherence' | 'lastInteraction';
  sortOrder?: 'asc' | 'desc';
}

export interface ClinicalAuditLog {
  id: string;
  practitionerId: string;
  patientId: string;
  action: 'review_trends' | 'update_care_plan' | 'add_clinical_note';
  timestamp: string;
  details?: string;
}
