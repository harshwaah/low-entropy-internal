/**
 * Practitioner Domain Types
 * SmritiSaathi Clinical Oversight Architecture
 * Owned by: Contributor 5 (Practitioner Lead)
 */

export type ClinicalStage = 'early' | 'moderate' | 'advanced';
export type ClinicalRiskLevel = 'optimal' | 'mild_variance' | 'review_recommended';
export type EngagementTrend = 'improving' | 'stable' | 'declining';
export type AlertSeverity = 'high' | 'medium' | 'low';

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

export interface QuickPickPatientSummary {
  totalSessionsPlayed: number;
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyPercentage: number;
  averageResponseTime: number; // in seconds
  highestLevelReached: number;
  preferredMode: string;
  currentDifficulty: string;
  trend: 'improving' | 'stable' | 'declining';
}

export interface MemoryTrailPatientSummary {
  locationsCompleted: number;
  memoriesShared: number;
  voiceResponses: number;
  textResponses: number;
  averageSessionDurationSeconds: number;
  engagementLevel: 'low' | 'medium' | 'high';
  familyContributionsCount: number;
}

export interface PatientActivityHistoryItem {
  id: string;
  name: string;
  date: string;
  score: number;
  completed: boolean;
  type: 'memory_trail' | 'quick_pick_trail' | 'routine' | 'attention_exercise';
  details?: string;
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
  targetBaselineScore?: number;
  
  lastInteraction: string;
  riskIndicator: ClinicalRiskLevel;
  riskLabel: string;
  riskContextNote: string;
  
  // Cognitive Game Data Summaries
  quickPickSummary?: QuickPickPatientSummary;
  memoryTrailSummary?: MemoryTrailPatientSummary;
  recentActivityHistory?: PatientActivityHistoryItem[];
  
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
    score?: number;
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

export interface ClinicalAlertItem {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  status: 'active' | 'reviewed' | 'resolved';
  category: 'cognitive_decline' | 'missed_activity' | 'response_delay' | 'medication';
}

export interface ClinicalCarePlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  status: 'active' | 'draft' | 'archived';
  goals: string[];
  assignedActivities: {
    name: string;
    type: 'quick_pick_trail' | 'memory_trail' | 'routine';
    frequency: string;
    difficulty: string;
  }[];
  medicationScheduleSummary: string;
  caregiverInstructions: string;
  updatedAt: string;
}

export interface ClinicalMessageThread {
  id: string;
  patientId: string;
  patientName: string;
  caregiverName: string;
  caregiverRelation: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: 'practitioner' | 'caregiver';
    text: string;
    timestamp: string;
  }[];
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

