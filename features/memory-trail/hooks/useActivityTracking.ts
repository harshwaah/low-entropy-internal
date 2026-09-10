import { useState, useRef, useCallback } from 'react';
import { ActivityEvent, ActivityProgress, ActivitySession, EngagementLevel } from '../types';
import { calculateEngagement, progressReportService } from '../services/progressReportService';

export function useActivityTracking(patientId: string = 'patient-1') {
  const [sessionId] = useState<string>(() => `sess-${Date.now()}`);
  const startTimeRef = useRef<number>(Date.now());
  const eventsRef = useRef<ActivityEvent[]>([]);

  const trackEvent = useCallback(
    (eventType: ActivityEvent['eventType'], metadata?: Record<string, unknown>) => {
      const event: ActivityEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        sessionId,
        eventType,
        timestamp: new Date().toISOString(),
        metadata,
      };
      eventsRef.current.push(event);
    },
    [sessionId]
  );

  const saveProgressRecord = useCallback(
    async (params: {
      locationId: string;
      locationName: string;
      questionAsked?: string;
      responseType: ActivityProgress['responseType'];
      responseProvided: boolean;
      optionalPromptSelected?: string;
      voiceRecordingAvailable: boolean;
      transcriptAvailable: boolean;
      memorySaved: boolean;
      completed: boolean;
      familyContentViewed?: boolean;
      familyContentInteracted?: boolean;
    }): Promise<ActivityProgress> => {
      const now = Date.now();
      const durationSeconds = Math.max(1, Math.round((now - startTimeRef.current) / 1000));

      const engagementLevel: EngagementLevel = calculateEngagement({
        familyContentViewed: params.familyContentViewed,
        familyContentInteracted: params.familyContentInteracted,
        optionalPromptSelected: params.optionalPromptSelected,
        responseProvided: params.responseProvided,
        responseType: params.responseType,
        memorySaved: params.memorySaved,
      });

      const progressRecord: ActivityProgress = {
        id: `prog-${Date.now()}`,
        patientId,
        activityType: 'memory_trail',
        activityId: 'memory_trail',
        locationId: params.locationId,
        locationName: params.locationName,
        sessionId,
        startedAt: new Date(startTimeRef.current).toISOString(),
        completedAt: new Date(now).toISOString(),
        durationSeconds,
        questionAsked: params.questionAsked,
        responseType: params.responseType,
        responseProvided: params.responseProvided,
        optionalPromptSelected: params.optionalPromptSelected,
        voiceRecordingAvailable: params.voiceRecordingAvailable,
        transcriptAvailable: params.transcriptAvailable,
        memorySaved: params.memorySaved,
        completed: params.completed,
        engagementLevel,
        familyContentViewed: params.familyContentViewed,
        familyContentInteracted: params.familyContentInteracted,
      };

      await progressReportService.saveProgress(progressRecord);
      return progressRecord;
    },
    [sessionId, patientId]
  );

  return {
    sessionId,
    trackEvent,
    saveProgressRecord,
    events: eventsRef.current,
  };
}
