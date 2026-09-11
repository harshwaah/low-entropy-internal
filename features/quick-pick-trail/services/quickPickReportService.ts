import { QuickPickProgressRecord, QuickPickProgressReport } from '../types';
import { quickPickStorageService } from './quickPickStorageService';

class QuickPickReportService {
  async generateReport(patientId: string = 'patient-1'): Promise<QuickPickProgressReport> {
    const history = await quickPickStorageService.getProgressRecords(patientId);

    const sessionsPlayed = history.length;
    const totalPlayTimeSeconds = history.reduce((acc, curr) => acc + (curr.totalDurationSeconds || 0), 0);
    const questionsAttempted = history.reduce((acc, curr) => acc + (curr.questionsAttempted || 0), 0);
    const correctResponses = history.reduce((acc, curr) => acc + (curr.correctAnswers || 0), 0);
    const incorrectResponses = history.reduce((acc, curr) => acc + (curr.incorrectAnswers || 0), 0);

    const accuracyPercentage =
      questionsAttempted > 0 ? Math.round((correctResponses / questionsAttempted) * 100) : 100;

    const avgTimeSum = history.reduce((acc, curr) => acc + (curr.averageResponseTime || 0), 0);
    const averageResponseTime =
      history.length > 0 ? Math.round((avgTimeSum / history.length) * 10) / 10 : 0;

    // Preferred mode count
    const modeCounts: Record<string, number> = {};
    history.forEach(h => {
      modeCounts[h.mode] = (modeCounts[h.mode] || 0) + 1;
    });
    let preferredMode = 'Math';
    let maxCount = 0;
    Object.entries(modeCounts).forEach(([m, count]) => {
      if (count > maxCount) {
        maxCount = count;
        preferredMode = m.charAt(0).toUpperCase() + m.slice(1);
      }
    });

    // Highest level
    const highestLevelReached = history.reduce((max, curr) => Math.max(max, curr.levelReached || 1), 1);

    // Recent engagement
    const recentRecords = history.slice(0, 5);
    const recentEngagementLevel =
      recentRecords.length > 0 ? recentRecords[0].engagementLevel : 'medium';

    let engagementTrend: QuickPickProgressReport['engagementTrend'] = 'insufficient_data';
    if (history.length >= 3) {
      const highCount = history.filter(h => h.engagementLevel === 'high').length;
      const lowCount = history.filter(h => h.engagementLevel === 'low').length;
      if (highCount > lowCount) engagementTrend = 'increasing';
      else if (lowCount > highCount) engagementTrend = 'decreasing';
      else engagementTrend = 'stable';
    } else if (history.length > 0) {
      engagementTrend = 'stable';
    }

    const summaryNotes =
      sessionsPlayed > 0
        ? `The patient completed ${sessionsPlayed} Quick Pick Trail game sessions solving ${correctResponses} questions with ${accuracyPercentage}% accuracy.`
        : 'The patient completed initial game rounds.';

    return {
      id: `qp-report-${Date.now()}`,
      patientId,
      activityType: 'quick_pick_trail',
      generatedAt: new Date().toISOString(),
      sessionsPlayed,
      totalPlayTimeSeconds,
      questionsAttempted,
      correctResponses,
      incorrectResponses,
      accuracyPercentage,
      averageResponseTime,
      preferredMode,
      difficultyProgression: history.length > 0 ? history[0].difficulty : 'gentle',
      highestLevelReached,
      recentEngagementLevel,
      engagementTrend,
      summaryNotes,
    };
  }
}

export const quickPickReportService = new QuickPickReportService();
