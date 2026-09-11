import { useState, useRef, useCallback } from 'react';
import { GameDifficulty, GameMode, QuickPickProgressRecord } from '../types';
import { quickPickStorageService } from '../services/quickPickStorageService';

export function useGameTracking(patientId: string = 'patient-1') {
  const [sessionId] = useState<string>(() => `sess-qp-${Date.now()}`);
  const [startTime] = useState<number>(() => Date.now());
  const responseTimesRef = useRef<number[]>([]);

  const getStartTime = useCallback(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
    return startTimeRef.current;
  }, []);

  const recordResponseTime = useCallback((timeSeconds: number) => {
    responseTimesRef.current.push(timeSeconds);
  }, []);

  const saveGameRecord = useCallback(
    async (params: {
      mode: GameMode;
      difficulty: GameDifficulty;
      questionsAttempted: number;
      correctAnswers: number;
      incorrectAnswers: number;
      levelReached: number;
      speedLevel: number;
      completed: boolean;
    }): Promise<QuickPickProgressRecord> => {
      const now = Date.now();
      const totalDurationSeconds = Math.max(1, Math.round((now - startTime) / 1000));

      const accuracyPercentage =
        params.questionsAttempted > 0
          ? Math.round((params.correctAnswers / params.questionsAttempted) * 100)
          : 100;

      const sumTime = responseTimesRef.current.reduce((a, b) => a + b, 0);
      const averageResponseTime =
        responseTimesRef.current.length > 0
          ? Math.round((sumTime / responseTimesRef.current.length) * 10) / 10
          : 4.0;

      let engagementLevel: 'low' | 'medium' | 'high' = 'medium';
      if (params.questionsAttempted >= 5 && accuracyPercentage >= 70) {
        engagementLevel = 'high';
      } else if (params.questionsAttempted <= 2) {
        engagementLevel = 'low';
      }

      const record: QuickPickProgressRecord = {
        id: `rec-${Date.now()}`,
        patientId,
        activityType: 'quick_pick_trail',
        sessionId,
        mode: params.mode,
        difficulty: params.difficulty,
        questionsAttempted: params.questionsAttempted,
        correctAnswers: params.correctAnswers,
        incorrectAnswers: params.incorrectAnswers,
        accuracyPercentage,
        averageResponseTime,
        totalDurationSeconds,
        levelReached: params.levelReached,
        speedLevel: params.speedLevel,
        engagementLevel,
        completed: params.completed,
        createdAt: new Date().toISOString(),
      };

      await quickPickStorageService.saveProgressRecord(record);
      return record;
    },
    [sessionId, patientId, startTime]
  );

  return {
    sessionId,
    recordResponseTime,
    saveGameRecord,
  };
}
