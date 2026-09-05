/**
 * Practitioner Feature Domain Types
 * Owned by: Contributor 5 (Practitioner Lead)
 */

export interface ClinicalCohortFilter {
  stage?: 'early' | 'moderate' | 'advanced';
  status?: 'stable' | 'fluctuating' | 'declining';
  searchQuery?: string;
}

export interface ClinicalAuditLog {
  id: string;
  practitionerId: string;
  patientId: string;
  action: 'review_trends' | 'update_care_plan' | 'add_clinical_note';
  timestamp: string;
}
