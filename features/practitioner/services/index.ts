/**
 * Practitioner Service Implementation
 * Owned by: Contributor 5 (Practitioner Lead)
 */

import {
  ClinicalPatient,
  ClinicalObservation,
  ObservationType,
  ClinicalRecommendation,
  CohortAnalyticsSummary,
  ClinicalCohortFilter,
  ClinicalAuditLog,
  RecommendationStatus,
} from '../types';
import {
  SAMPLE_CLINICAL_PATIENTS,
  SAMPLE_CLINICAL_OBSERVATIONS,
  SAMPLE_CLINICAL_RECOMMENDATIONS,
  SAMPLE_COHORT_ANALYTICS,
} from '../data/sample-practitioner-data';
import { observationService } from '@/services/firestore/observation.service';

export interface IPractitionerService {
  getPatients(filter?: ClinicalCohortFilter): Promise<ClinicalPatient[]>;
  getPatientById(id: string): Promise<ClinicalPatient | null>;
  getCohortAnalytics(): Promise<CohortAnalyticsSummary>;
  getObservations(patientId?: string, type?: string): Promise<ClinicalObservation[]>;
  getRecommendations(patientId?: string, category?: string): Promise<ClinicalRecommendation[]>;
  addObservation(obs: Omit<ClinicalObservation, 'id' | 'timestamp'>): Promise<ClinicalObservation>;
  updateRecommendationStatus(id: string, status: RecommendationStatus): Promise<void>;
  recordClinicalAudit(log: Omit<ClinicalAuditLog, 'id' | 'timestamp'>): Promise<void>;
}

class PractitionerServiceImpl implements IPractitionerService {
  private patients: ClinicalPatient[] = [...SAMPLE_CLINICAL_PATIENTS];
  private observations: ClinicalObservation[] = [...SAMPLE_CLINICAL_OBSERVATIONS];
  private recommendations: ClinicalRecommendation[] = [...SAMPLE_CLINICAL_RECOMMENDATIONS];
  private analytics: CohortAnalyticsSummary = { ...SAMPLE_COHORT_ANALYTICS };
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
    const patient = this.patients.find((p) => p.id === id);
    return patient || null;
  }

  async getCohortAnalytics(): Promise<CohortAnalyticsSummary> {
    return this.analytics;
  }

  async getObservations(patientId?: string, type?: string): Promise<ClinicalObservation[]> {
    try {
      const remoteObs = await observationService.getObservations(patientId);
      if (remoteObs && remoteObs.length > 0) {
        // Merge any remote observation not yet in memory
        for (const ro of remoteObs) {
          if (!this.observations.some((o) => o.id === ro.id)) {
            this.observations.push({
              id: ro.id,
              patientId: ro.patientId,
              patientName: ro.patientName || 'Kamal Sharma',
              type: (ro.type as ObservationType) || 'observation',
              title: ro.title || 'Clinical Observation',
              summary: ro.summary || ro.description || ro.observationText || 'Observation recorded',
              detail: ro.description || ro.summary || ro.observationText || '',
              timestamp: ro.timestamp ? new Date(ro.timestamp).toLocaleDateString() : 'Recent',
              author: {
                name: ro.authorName || 'Healthcare Team',
                role: ro.authorRole || 'Clinical Staff',
                type: (ro.authorRole?.toLowerCase().includes('physician') ? 'physician' : 'caregiver') as any,
              },
              tags: ro.tags || ['Clinical'],
              sentiment: (ro.severity === 'concern' || ro.severity === 'action_needed' ? 'attention' : ro.severity === 'positive' ? 'positive' : 'neutral'),
            });
          }
        }
      }
    } catch (e) {
      console.warn('Syncing practitioner observations with Firestore warning:', e);
    }

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

  async addObservation(
    obs: Omit<ClinicalObservation, 'id' | 'timestamp'>
  ): Promise<ClinicalObservation> {
    const newObs: ClinicalObservation = {
      ...obs,
      id: `obs-${Date.now()}`,
      timestamp: 'Just now',
    };
    this.observations.unshift(newObs);

    // Persist to shared Firestore observation collection
    try {
      await observationService.createObservation({
        id: newObs.id,
        patientId: newObs.patientId,
        patientName: newObs.patientName,
        type: newObs.type,
        title: newObs.title,
        description: newObs.detail || newObs.summary,
        summary: newObs.summary,
        authorName: newObs.author.name,
        authorRole: newObs.author.role,
        tags: newObs.tags,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Persisting observation to Firestore failed, stored locally:', err);
    }

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
