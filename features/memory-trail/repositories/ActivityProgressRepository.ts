import { ActivityProgress, ActivitySession } from '../types';

export interface IActivityProgressRepository {
  saveProgress(progress: ActivityProgress): Promise<ActivityProgress>;
  getProgressHistory(patientId: string): Promise<ActivityProgress[]>;
  saveSession(session: ActivitySession): Promise<ActivitySession>;
  getSessionHistory(patientId: string): Promise<ActivitySession[]>;
}
