/**
 * AI Companion Conversation & Tone Scaffolding
 * Owned by: Contributor 6 (AI Lead)
 */

export type CompanionEmotionalTone = 'soothing' | 'cheerful' | 'gentle_clarification' | 'validating';

export interface CompanionInteractionPrompt {
  patientNickname: string;
  timeOfDay: string;
  currentMoodContext?: string;
  recentMemoryTrigger?: string;
  userSpokenUtterance?: string;
}

export interface CompanionResponsePayload {
  displayText: string;
  spokenAudioSsml?: string;
  toneSuggested: CompanionEmotionalTone;
  suggestedActionLabel?: string;
}
