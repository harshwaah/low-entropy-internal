/**
 * Daily Routines & Circadian Rhythm Domain Types
 * Owned by: Contributor 2 (Routines Lead)
 */

export type RoutinePeriod = 'morning' | 'afternoon' | 'evening' | 'bedtime';

export interface RoutineTask {
  id: string;
  title: string;
  period: RoutinePeriod;
  targetTimeFormatted: string;
  instructionPrompt: string;
  requiresCaregiverValidation: boolean;
  isMedication: boolean;
  medicationDosageNote?: string;
  audioPromptUrl?: string;
}

export interface DailyRoutineSchedule {
  patientId: string;
  date: string;
  tasks: RoutineTask[];
}
