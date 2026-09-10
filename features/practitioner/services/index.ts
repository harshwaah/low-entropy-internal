/**
 * Practitioner Service Implementation
 * Owned by: Contributor 5 (Practitioner Lead)
 */

import {
  ClinicalPatient,
  ClinicalObservation,
  ClinicalRecommendation,
  CohortAnalyticsSummary,
  ClinicalCohortFilter,
  ClinicalAuditLog,
  RecommendationStatus,
  ClinicalAlertItem,
  ClinicalCarePlan,
  ClinicalMessageThread,
} from '../types';
import {
  SAMPLE_CLINICAL_PATIENTS,
  SAMPLE_CLINICAL_OBSERVATIONS,
  SAMPLE_CLINICAL_RECOMMENDATIONS,
  SAMPLE_COHORT_ANALYTICS,
  SAMPLE_CLINICAL_ALERTS,
  SAMPLE_CLINICAL_CARE_PLANS,
  SAMPLE_CLINICAL_MESSAGES,
} from '../data/sample-practitioner-data';

export interface IPractitionerService {
  getPatients(filter?: ClinicalCohortFilter): Promise<ClinicalPatient[]>;
  getPatientById(id: string): Promise<ClinicalPatient | null>;
  getCohortAnalytics(): Promise<CohortAnalyticsSummary>;
  getObservations(patientId?: string, type?: string): Promise<ClinicalObservation[]>;
  getRecommendations(patientId?: string, category?: string): Promise<ClinicalRecommendation[]>;
  getAlerts(severity?: string): Promise<ClinicalAlertItem[]>;
  getCarePlans(patientId?: string): Promise<ClinicalCarePlan[]>;
  getMessages(patientId?: string): Promise<ClinicalMessageThread[]>;
  addObservation(obs: Omit<ClinicalObservation, 'id' | 'timestamp'>): Promise<ClinicalObservation>;
  updateRecommendationStatus(id: string, status: RecommendationStatus): Promise<void>;
  recordClinicalAudit(log: Omit<ClinicalAuditLog, 'id' | 'timestamp'>): Promise<void>;
}

class PractitionerServiceImpl implements IPractitionerService {
  private patients: ClinicalPatient[] = [...SAMPLE_CLINICAL_PATIENTS];
  private observations: ClinicalObservation[] = [...SAMPLE_CLINICAL_OBSERVATIONS];
  private recommendations: ClinicalRecommendation[] = [...SAMPLE_CLINICAL_RECOMMENDATIONS];
  private analytics: CohortAnalyticsSummary = { ...SAMPLE_COHORT_ANALYTICS };
  private alerts: ClinicalAlertItem[] = [...SAMPLE_CLINICAL_ALERTS];
  private carePlans: ClinicalCarePlan[] = [...SAMPLE_CLINICAL_CARE_PLANS];
  private messages: ClinicalMessageThread[] = [...SAMPLE_CLINICAL_MESSAGES];
  private auditLogs: ClinicalAuditLog[] = [];

  async getPatients(filter?: ClinicalCohortFilter): Promise<ClinicalPatient[]> {
    let result = [...this.patients];

    if (filter) {
      if (filter.stage && filter.stage !== 'all') {
        result = result.filter((p) => p.stage === filter.stage);
      }
      if (filter.risk && filter.risk !== 'all') {
        result = result.filter((p) => p.riskIndicator === filter.risk);
      }
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.condition.toLowerCase().includes(q) ||
            p.primaryCaregiver.name.toLowerCase().includes(q)
        );
      }
      if (filter.sortBy) {
        result.sort((a, b) => {
          let valA: any = a.name;
          let valB: any = b.name;
          if (filter.sortBy === 'engagement') {
            valA = a.engagementScore;
            valB = b.engagementScore;
          } else if (filter.sortBy === 'adherence') {
            valA = a.routineAdherenceScore;
            valB = b.routineAdherenceScore;
          }
          if (valA < valB) return filter.sortOrder === 'asc' ? -1 : 1;
          if (valA > valB) return filter.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }

    return result;
  }

  async getPatientById(id: string): Promise<ClinicalPatient | null> {
    const patient = this.patients.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase());
    return patient || null;
  }

  async getCohortAnalytics(): Promise<CohortAnalyticsSummary> {
    return this.analytics;
  }

  async getObservations(patientId?: string, type?: string): Promise<ClinicalObservation[]> {
    let result = [...this.observations];
    if (patientId) {
      result = result.filter((o) => o.patientId === patientId);
    }
    if (type && type !== 'all') {
      result = result.filter((o) => o.type === type);
    }
    return result;
  }

  async getRecommendations(patientId?: string, category?: string): Promise<ClinicalRecommendation[]> {
    let result = [...this.recommendations];
    if (patientId) {
      result = result.filter((r) => r.patientId === patientId);
    }
    if (category && category !== 'all') {
      result = result.filter((r) => r.category === category);
    }
    return result;
  }

  async getAlerts(severity?: string): Promise<ClinicalAlertItem[]> {
    let result = [...this.alerts];
    if (severity && severity !== 'all') {
      result = result.filter((a) => a.severity === severity);
    }
    return result;
  }

  async getCarePlans(patientId?: string): Promise<ClinicalCarePlan[]> {
    let result = [...this.carePlans];
    if (patientId) {
      result = result.filter((cp) => cp.patientId === patientId);
    }
    return result;
  }

  async getMessages(patientId?: string): Promise<ClinicalMessageThread[]> {
    let result = [...this.messages];
    if (patientId) {
      result = result.filter((m) => m.patientId === patientId);
    }
    return result;
  }

  async addObservation(
    obs: Omit<ClinicalObservation, 'id' | 'timestamp'>
  ): Promise<ClinicalObservation> {
    const newObs: ClinicalObservation = {
      ...obs,
      id: `obs-${Date.now()}`,
      timestamp: 'Just now',
    };
    this.observations.unshift(newObs);
    return newObs;
  }

  async updateRecommendationStatus(id: string, status: RecommendationStatus): Promise<void> {
    const rec = this.recommendations.find((r) => r.id === id);
    if (rec) {
      rec.status = status;
    }
  }

  async recordClinicalAudit(log: Omit<ClinicalAuditLog, 'id' | 'timestamp'>): Promise<void> {
    this.auditLogs.push({
      ...log,
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  }
}

export const practitionerService = new PractitionerServiceImpl();

