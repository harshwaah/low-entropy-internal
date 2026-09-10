import { IActivityProgressRepository } from './ActivityProgressRepository';
import { ActivityProgress, ActivitySession } from '../types';

const PROGRESS_KEY = 'memory_trail_activity_progress';
const SESSIONS_KEY = 'memory_trail_sessions';

const SEED_PROGRESS: ActivityProgress[] = [
  {
    id: 'seed-prog-1',
    patientId: 'patient-1',
    activityType: 'memory_trail',
    activityId: 'memory_trail',
    locationId: 'childhood-home',
    locationName: 'Childhood Home',
    sessionId: 'session-seed-1',
    startedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 24 * 2 + 240000).toISOString(),
    durationSeconds: 240,
    questionAsked: 'Who used to come here with you?',
    responseType: 'voice_and_text',
    responseProvided: true,
    optionalPromptSelected: 'My sister',
    voiceRecordingAvailable: true,
    transcriptAvailable: true,
    memorySaved: true,
    completed: true,
    engagementLevel: 'high',
    familyContentViewed: true,
    familyContentInteracted: true,
  },
  {
    id: 'seed-prog-2',
    patientId: 'patient-1',
    activityType: 'memory_trail',
    activityId: 'memory_trail',
    locationId: 'school',
    locationName: 'School',
    sessionId: 'session-seed-2',
    startedAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 24 * 4 + 180000).toISOString(),
    durationSeconds: 180,
    questionAsked: 'Who was your favourite teacher?',
    responseType: 'text',
    responseProvided: true,
    voiceRecordingAvailable: false,
    transcriptAvailable: false,
    memorySaved: true,
    completed: true,
    engagementLevel: 'medium',
    familyContentViewed: true,
    familyContentInteracted: false,
  },
];

export class LocalStorageProgressRepository implements IActivityProgressRepository {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private readProgress(): ActivityProgress[] {
    if (!this.isBrowser()) return SEED_PROGRESS;
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (!data) {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(SEED_PROGRESS));
        return SEED_PROGRESS;
      }
      return JSON.parse(data);
    } catch {
      return SEED_PROGRESS;
    }
  }

  private writeProgress(records: ActivityProgress[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to write progress to localStorage:', e);
    }
  }

  private readSessions(): ActivitySession[] {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private writeSessions(sessions: ActivitySession[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to write sessions to localStorage:', e);
    }
  }

  async saveProgress(progress: ActivityProgress): Promise<ActivityProgress> {
    const list = this.readProgress();
    const idx = list.findIndex(p => p.id === progress.id);
    if (idx >= 0) {
      list[idx] = progress;
    } else {
      list.unshift(progress);
    }
    this.writeProgress(list);
    return progress;
  }

  async getProgressHistory(patientId: string): Promise<ActivityProgress[]> {
    const list = this.readProgress();
    return list.filter(p => !patientId || p.patientId === patientId);
  }

  async saveSession(session: ActivitySession): Promise<ActivitySession> {
    const sessions = this.readSessions();
    const idx = sessions.findIndex(s => s.sessionId === session.sessionId);
    if (idx >= 0) {
      sessions[idx] = session;
    } else {
      sessions.unshift(session);
    }
    this.writeSessions(sessions);
    return session;
  }

  async getSessionHistory(patientId: string): Promise<ActivitySession[]> {
    const sessions = this.readSessions();
    return sessions.filter(s => !patientId || s.patientId === patientId);
  }
}

export const localStorageProgressRepository = new LocalStorageProgressRepository();
