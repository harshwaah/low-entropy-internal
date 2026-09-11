import { ActivityProgress, EngagementLevel, ProgressReport } from '../types';

import { IActivityProgressRepository } from '../repositories/ActivityProgressRepository';
import { localStorageProgressRepository } from '../repositories/LocalStorageProgressRepository';

export function calculateEngagement(progressPartial: Partial<ActivityProgress>): EngagementLevel {
  let score = 0;

  if (progressPartial.familyContentViewed) score += 1;
  if (progressPartial.familyContentInteracted) score += 1;
  if (progressPartial.optionalPromptSelected) score += 1;
  if (progressPartial.responseProvided) score += 2;
  if (progressPartial.responseType === 'voice' || progressPartial.responseType === 'voice_and_text') score += 2;
  if (progressPartial.memorySaved) score += 2;

  if (score >= 5) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

class ProgressReportService {
  constructor(private repository: IActivityProgressRepository = localStorageProgressRepository) {}

  async saveProgress(progress: ActivityProgress): Promise<ActivityProgress> {
    return this.repository.saveProgress(progress);
  }

  async getProgressHistory(patientId: string = 'patient-1'): Promise<ActivityProgress[]> {
    return this.repository.getProgressHistory(patientId);
  }

  async generateProgressReport(patientId: string = 'patient-1'): Promise<ProgressReport> {
    const history = await this.repository.getProgressHistory(patientId);

    const sessionsCompleted = history.filter(h => h.completed).length;
    const uniqueLocations = new Set(history.map(h => h.locationId)).size;
    const memoriesShared = history.filter(h => h.memorySaved).length;
    const voiceResponses = history.filter(h => h.voiceRecordingAvailable).length;
    const textResponses = history.filter(h => h.responseType === 'text' || h.responseType === 'voice_and_text').length;
    const skippedResponses = history.filter(h => h.responseType === 'skipped').length;

    const totalDuration = history.reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
    const averageSessionDuration = history.length > 0 ? Math.round(totalDuration / history.length) : 0;

    const recentRecords = history.slice(0, 5);
    const recentEngagementLevel: EngagementLevel =
      recentRecords.length > 0 ? recentRecords[0].engagementLevel : 'medium';

    let engagementTrend: ProgressReport['engagementTrend'] = 'insufficient_data';
    if (history.length >= 3) {
      const highCount = history.filter(h => h.engagementLevel === 'high').length;
      const lowCount = history.filter(h => h.engagementLevel === 'low').length;
      if (highCount > lowCount) {
        engagementTrend = 'increasing';
      } else if (lowCount > highCount) {
        engagementTrend = 'decreasing';
      } else {
        engagementTrend = 'stable';
      }
    } else if (history.length > 0) {
      engagementTrend = 'stable';
    }

    const summaryNotes =
      memoriesShared > 0
        ? `The patient actively participated in ${memoriesShared} memory sessions and interacted warmly with family contributions and locations.`
        : 'The patient explored initial memory locations.';

    return {
      id: `report-${Date.now()}`,
      patientId,
      activityType: 'memory_trail',
      generatedAt: new Date().toISOString(),
      sessionsCompleted,
      locationsVisited: uniqueLocations,
      memoriesShared,
      voiceResponses,
      textResponses,
      skippedResponses,
      averageSessionDuration,
      engagementTrend,
      recentEngagementLevel,
      summaryNotes,
    };
  }
}

export const progressReportService = new ProgressReportService();
