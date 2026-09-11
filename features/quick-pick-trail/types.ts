/**
 * Quick Pick Trail — Type Definitions
 * An elderly-friendly, adaptive cognitive game inspired by Snake.
 */

export type GameMode = 'math' | 'colors' | 'objects' | 'patterns';
export type GameDifficulty = 'gentle' | 'comfortable' | 'active';
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameQuestion {
  id: string;
  mode: GameMode;
  question: string;
  questionDetail?: string;
  correctAnswer: string | number;
  options: Array<string | number>;
  difficultyLevel: number; // 1 to 5
}

export interface GameCharacter {
  id: string;
  name: string;
  description: string;
  unlockLevel: number;
  unlocked: boolean;
  selected: boolean;
  avatarEmoji: string;
  skinColor: string;
  headBgClass: string;
}

export interface ApplePosition {
  id: string;
  value: string | number;
  xPercent: number; // 10 to 90
  yPercent: number; // 15 to 85
  isCorrect: boolean;
  isFaded?: boolean;
}

export interface SnakeSegment {
  xPercent: number;
  yPercent: number;
}

export interface QuickPickGameSession {
  id: string;
  patientId: string;
  gameType: 'quick_pick_trail';
  mode: GameMode;
  difficulty: GameDifficulty;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
}

export interface QuickPickProgressRecord {
  id: string;
  patientId: string;
  activityType: 'quick_pick_trail';
  sessionId: string;
  mode: GameMode;
  difficulty: GameDifficulty;
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyPercentage: number;
  averageResponseTime: number; // in seconds
  totalDurationSeconds: number;
  levelReached: number;
  speedLevel: number;
  engagementLevel: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

export interface QuickPickProgressReport {
  id: string;
  patientId: string;
  activityType: 'quick_pick_trail';
  generatedAt: string;
  sessionsPlayed: number;
  totalPlayTimeSeconds: number;
  questionsAttempted: number;
  correctResponses: number;
  incorrectResponses: number;
  accuracyPercentage: number;
  averageResponseTime: number;
  preferredMode: string;
  difficultyProgression: string;
  highestLevelReached: number;
  recentEngagementLevel: 'low' | 'medium' | 'high';
  engagementTrend: 'increasing' | 'stable' | 'decreasing' | 'insufficient_data';
  summaryNotes: string;
}

export interface AudioSettings {
  musicOn: boolean;
  sfxOn: boolean;
  characterVoiceOn: boolean;
  musicStyle: 'calm' | 'happy' | 'nature';
  movementSpeed: number; // 1 (slower) to 5 (faster)
}
