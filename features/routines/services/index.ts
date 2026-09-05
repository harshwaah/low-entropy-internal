/**
 * Routine Service Scaffolding (Phase 2 Target)
 * Owned by: Contributor 2
 */

import { DailyRoutineSchedule, RoutineTask } from '../types';

export interface IRoutineService {
  getDailySchedule(patientId: string, date: string): Promise<DailyRoutineSchedule | null>;
  markTaskAcknowledged(taskId: string): Promise<boolean>;
}

export const routineServicePlaceholder: IRoutineService = {
  async getDailySchedule(_patientId: string, _date: string): Promise<DailyRoutineSchedule | null> {
    return null;
  },
  async markTaskAcknowledged(_taskId: string): Promise<boolean> {
    return true;
  },
};
