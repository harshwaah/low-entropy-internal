/**
 * My Memory Trail — Type Definitions
 * A personalized cognitive and autobiographical memory experience for elderly patients.
 */

export interface MemoryLocation {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  colorTheme: {
    cardBg: string;
    border: string;
    accent: string;
    tagBg: string;
    iconBg: string;
  };
  samplePhotoUrl: string;
  sampleAudioUrl?: string;
  sampleSongUrl?: string;
  defaultQuestions: string[];
  familyContribution?: FamilyContribution;
}

export interface FamilyContribution {
  id: string;
  patientId: string;
  locationId?: string;
  type: 'photo' | 'audio' | 'song' | 'text';
  contentUrl?: string;
  contentText?: string;
  photoCaption?: string;
  audioDuration?: string;
  question?: string;
  contributedBy: string;
  relationship: string; // e.g. "Daughter", "Son"
  createdAt: string;
}

export interface MemoryEntry {
  id: string;
  patientId: string;
  locationId: string;
  locationTitle: string;
  locationEmoji: string;
  questionAsked: string;
  promptSelected?: string;
  patientResponseText?: string;
  voiceRecordingUrl?: string;
  voiceTranscript?: string;
  familyContribution?: FamilyContribution;
  formattedStory?: string;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  sessionId: string;
  eventType:
    | 'game_started'
    | 'location_selected'
    | 'memory_viewed'
    | 'family_content_viewed'
    | 'audio_played'
    | 'song_played'
    | 'question_asked'
    | 'prompt_selected'
    | 'voice_recording_started'
    | 'voice_recording_completed'
    | 'speech_transcript_generated'
    | 'text_response_entered'
    | 'memory_skipped'
    | 'memory_saved'
    | 'activity_completed';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ActivitySession {
  sessionId: string;
  patientId: string;
  locationId: string;
  locationName: string;
  startedAt: string;
  completedAt?: string;
  events: ActivityEvent[];
}

export type EngagementLevel = 'low' | 'medium' | 'high';

export interface ActivityProgress {
  id: string;
  patientId: string;
  activityType: 'memory_trail';
  activityId: string;
  locationId: string;
  locationName: string;
  sessionId: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  questionAsked?: string;
  responseType: 'voice' | 'text' | 'voice_and_text' | 'skipped';
  responseProvided: boolean;
  optionalPromptSelected?: string;
  voiceRecordingAvailable: boolean;
  transcriptAvailable: boolean;
  memorySaved: boolean;
  completed: boolean;
  engagementLevel: EngagementLevel;
  familyContentViewed?: boolean;
  familyContentInteracted?: boolean;
}

export interface ProgressReport {
  id: string;
  patientId: string;
  activityType: 'memory_trail';
  generatedAt: string;
  sessionsCompleted: number;
  locationsVisited: number;
  memoriesShared: number;
  voiceResponses: number;
  textResponses: number;
  skippedResponses: number;
  averageSessionDuration: number; // in seconds
  engagementTrend: 'increasing' | 'stable' | 'decreasing' | 'insufficient_data';
  recentEngagementLevel: EngagementLevel;
  summaryNotes: string;
}
