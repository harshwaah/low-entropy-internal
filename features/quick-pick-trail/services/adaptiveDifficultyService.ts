import { GameDifficulty } from '../types';

export interface AdaptationState {
  currentLevel: number;
  speedLevel: number; // 1 to 5 (always capped for elderly safety)
  optionsCount: number; // 3 or 4 apples
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
}

export class AdaptiveDifficultyService {
  /**
   * Safe speed multiplier bounds for elderly dementia patients:
   * Gentle: 0.6x -> 0.8x max
   * Comfortable: 0.8x -> 1.0x max
   * Active: 1.0x -> 1.2x max
   */
  getSpeedMultiplier(difficulty: GameDifficulty, speedLevel: number): number {
    const baseSpeed = difficulty === 'gentle' ? 0.6 : difficulty === 'comfortable' ? 0.8 : 1.0;
    const increment = (speedLevel - 1) * 0.05;
    const total = baseSpeed + increment;

    // Cap strictly at 1.25x max so it never becomes an aggressive arcade game!
    return Math.min(total, 1.25);
  }

  evaluateAdaptation(
    currentState: AdaptationState,
    isCorrect: boolean,
    responseTimeSeconds: number
  ): AdaptationState {
    let { currentLevel, speedLevel, optionsCount, consecutiveCorrect, consecutiveIncorrect } =
      currentState;

    if (isCorrect) {
      consecutiveCorrect += 1;
      consecutiveIncorrect = 0;

      // If player has 3 consecutive correct answers with fast response (< 6s) -> gentle adaptation
      if (consecutiveCorrect >= 3) {
        consecutiveCorrect = 0;
        if (speedLevel < 5 && responseTimeSeconds < 6) {
          speedLevel += 1;
        }
        if (optionsCount < 4) {
          optionsCount = 4;
        }
      }
    } else {
      consecutiveIncorrect += 1;
      consecutiveCorrect = 0;

      // If player struggles -> quietly slow down speed and reduce options count
      if (speedLevel > 1) {
        speedLevel -= 1;
      }
      optionsCount = 3;
    }

    return {
      currentLevel,
      speedLevel,
      optionsCount,
      consecutiveCorrect,
      consecutiveIncorrect,
    };
  }
}

export const adaptiveDifficultyService = new AdaptiveDifficultyService();
