/**
 * Memory Scrapbook & Reminiscence Domain Types
 * Owned by: Contributor 1 (Memories Lead)
 */

export type MemoryCategoryKey = 
  | 'childhood' 
  | 'family' 
  | 'school' 
  | 'celebrations' 
  | 'places' 
  | 'things';

export interface MemoryCategory {
  id: MemoryCategoryKey;
  label: string;
  emoji: string;
  description: string;
  accentBg: string;
  accentColor: string;
  borderColor: string;
}

export interface FamilyNote {
  id: string;
  author: string;
  relation: string;
  text: string;
  date?: string;
  avatarInitials?: string;
  avatarBg?: string;
}

export interface AudioNarration {
  narrator: string;
  relation?: string;
  duration: string;
  title: string;
  previewUrl?: string;
}

export interface MemoryItem {
  id: string;
  patientId: string;
  title: string;
  shortDescription: string;
  story: string[];
  dateEra: string;
  yearApproximate?: string;
  location?: string;
  category: MemoryCategoryKey;
  emotionalTag: string;
  emotionalColor?: string;
  companionIntro: string;
  coverImage: string;
  imageAlt: string;
  imageCaption?: string;
  familiarPeople: string[];
  familyNotes: FamilyNote[];
  audioNarration?: AudioNarration;
  isMemoryOfTheDay?: boolean;
  createdAt: string;
}

export interface MemorySessionState {
  activeMemoryId: string | null;
  isPlayingAudio: boolean;
  promptStep: number;
}

