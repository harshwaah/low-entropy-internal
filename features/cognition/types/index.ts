/**
 * Cognitive Engagement & Stimulation Domain Types
 * Owned by: Contributor 3 (Cognitive Lead)
 * Version: v0.7.0 - Cognitive Activities Foundation
 */

export type ActivityCategoryId = 'memory_matching' | 'routine_sequencing' | 'visual_recognition';

export interface ActivityCategory {
  id: ActivityCategoryId;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  colorTheme: {
    bg: string;
    lightBg: string;
    border: string;
    text: string;
    badgeBg: string;
  };
  activitiesCount: number;
}

export interface CognitiveActivityMeta {
  id: string;
  categoryId: ActivityCategoryId;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  iconName: string;
  estimatedMinutes: string;
  difficultyLabel: string;
  encouragementPrompt: string;
  badgeLabel: string;
  themeColor: string;
  isCompletedToday: boolean;
}

export interface ActivityProgressSummary {
  activitiesCompletedToday: number;
  totalAvailable: number;
  mindfulMinutesSpent: number;
  positiveAffirmation: string;
  streakDays: number;
}

// ----------------------------------------------------
// Memory Match Game Types
// ----------------------------------------------------

export interface MemoryCardItem {
  id: string;
  pairId: string;
  title: string;
  subtitle: string;
  symbol: string;
  iconType?: string;
  description: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type MemoryMatchDifficulty = 'gentle' | 'standard'; // gentle = 6 cards (3 pairs), standard = 8 cards (4 pairs)

// ----------------------------------------------------
// Routine Sequencing ("What Comes Next?") Types
// ----------------------------------------------------

export interface RoutineSequenceStep {
  id: string;
  order: number;
  title: string;
  detail: string;
  symbol: string;
  isCompleted: boolean;
}

export interface RoutineSequenceOption {
  id: string;
  title: string;
  detail: string;
  symbol: string;
  isCorrect: boolean;
  affirmation: string;
  gentleNudge: string;
}

export interface RoutineScenario {
  id: string;
  title: string;
  theme: string;
  storyDescription: string;
  sequenceSteps: RoutineSequenceStep[];
  missingStepPrompt: string;
  options: RoutineSequenceOption[];
}

// ----------------------------------------------------
// Scene-based Visual Recognition ("Find The Object") Types
// ----------------------------------------------------

export interface SceneDiscoverableObject {
  id: string;
  name: string;
  symbol: string;
  clue: string;
  locationHint: string;
  xPercent: number; // Position on scene canvas (0-100)
  yPercent: number; // Position on scene canvas (0-100)
  sizeClass?: string;
  isFound: boolean;
}

export interface SceneDecorativeElement {
  id: string;
  name: string;
  symbol: string;
  xPercent: number;
  yPercent: number;
  sizeClass?: string;
  label?: string;
}

export interface RecognitionScene {
  id: string;
  title: string;
  roomName: string;
  sceneTheme: string;
  atmosphereDescription: string;
  sceneBgClass: string;
  sceneAccentClass: string;
  objectsToFind: SceneDiscoverableObject[];
  decorativeElements: SceneDecorativeElement[];
}
