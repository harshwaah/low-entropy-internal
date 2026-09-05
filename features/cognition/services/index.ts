/**
 * Cognitive Service Scaffolding (Phase 2 Target)
 * Owned by: Contributor 3
 */

import { CognitiveActivity, CognitiveEngagementTelemetry } from '../types';

export interface ICognitiveService {
  getDailyActivities(patientId: string): Promise<CognitiveActivity[]>;
  recordActivitySession(telemetry: CognitiveEngagementTelemetry): Promise<void>;
}

export const cognitiveServicePlaceholder: ICognitiveService = {
  async getDailyActivities(_patientId: string): Promise<CognitiveActivity[]> {
    return [];
  },
  async recordActivitySession(_telemetry: CognitiveEngagementTelemetry): Promise<void> {
    // Scaffolding only
  },
};
