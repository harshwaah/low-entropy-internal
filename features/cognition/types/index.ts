/**
 * Cognitive Engagement & Stimulation Domain Types
 * Owned by: Contributor 3 (Cognitive Lead)
 */

export type ActivityType = 'word_association' | 'music_reminiscence' | 'visual_pairing' | 'story_completion';

export interface CognitiveActivity {
  id: string;
  type: ActivityType;
  title: string;
  theme: string;
  encouragementMessage: string;
  isCompletedToday: boolean;
  timeSpentSeconds?: number;
}

export interface CognitiveEngagementTelemetry {
  patientId: string;
  activityId: string;
  timestamp: string;
  durationSeconds: number;
  perceivedFrustrationFlag: boolean;
}
