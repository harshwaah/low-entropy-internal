/**
 * Memory Scrapbook & Reminiscence Domain Types
 * Owned by: Contributor 1 (Memories Lead)
 */

export interface MemoryItem {
  id: string;
  patientId: string;
  title: string;
  yearApproximate?: string;
  eraDescription?: string;
  mediaType: 'image' | 'audio' | 'story';
  mediaUrl?: string;
  familiarPeople: string[];
  relationshipContext: string;
  sensoryPrompts: string[];
  createdAt: string;
}

export interface MemorySessionState {
  activeMemoryId: string | null;
  isPlayingAudio: boolean;
  promptStep: number;
}
