import { MemoryStory } from '../types';
import { INITIAL_SAMPLE_STORIES } from '../data/sample-stories';

const LOCAL_STORAGE_KEY = 'smritisaathi_narrated_stories';

export class StoryService {
  private memoryStories: MemoryStory[] = [...INITIAL_SAMPLE_STORIES];

  /**
   * Returns all memory stories, merging baseline samples with any dynamically narrated stories in localStorage
   */
  getAllStories(): MemoryStory[] {
    if (typeof window === 'undefined') {
      return this.memoryStories;
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: MemoryStory[] = JSON.parse(stored);
        // Combine by unique ID, with newest first
        const map = new Map<string, MemoryStory>();
        parsed.forEach(s => map.set(s.id, s));
        this.memoryStories.forEach(s => {
          if (!map.has(s.id)) {
            map.set(s.id, s);
          }
        });
        return Array.from(map.values());
      }
    } catch {
      // ignore JSON errors and fallback
    }

    return this.memoryStories;
  }

  /**
   * Find story by ID
   */
  getStoryById(id: string): MemoryStory | null {
    const stories = this.getAllStories();
    return stories.find(s => s.id === id) || null;
  }

  /**
   * Find first story linked to a memory ID
   */
  getStoryByMemoryId(memoryId: string): MemoryStory | null {
    const stories = this.getAllStories();
    return stories.find(s => s.memoryId === memoryId) || null;
  }

  /**
   * Save a newly generated story to local memory and localStorage
   */
  saveStory(story: MemoryStory): MemoryStory {
    if (typeof window !== 'undefined') {
      try {
        const existing = this.getAllStories();
        const updated = [story, ...existing.filter(s => s.id !== story.id)];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // local storage quota or disabled
      }
    }

    // Also update in-memory
    this.memoryStories = [story, ...this.memoryStories.filter(s => s.id !== story.id)];
    return story;
  }

  /**
   * Get total stories count
   */
  getStoriesCount(): number {
    return this.getAllStories().length;
  }

  /**
   * Get caregiver recent narrations list
   */
  getCaregiverNarrations() {
    const stories = this.getAllStories();
    return stories.map(story => ({
      id: story.id,
      memoryId: story.memoryId,
      memoryTitle: story.memoryTitle,
      storyTitle: story.storyTitle,
      date: story.formattedDate,
      engagementNote: story.caregiverNote || `Meera spent time narrating her reflections about ${story.memoryTitle}.`,
      excerpt: story.transcriptExcerpt,
      coverImage: story.coverImage,
      narratedBy: story.narratedBy,
      category: story.category,
      audioDuration: story.audioDuration || '1:45',
    }));
  }

  /**
   * Get lightweight practitioner indicators
   */
  getPractitionerNarrativeMetrics() {
    const stories = this.getAllStories();
    return {
      totalNarrations: stories.length,
      weeklyNarrationsCount: Math.min(stories.length, 3),
      narrativeParticipationLevel: stories.length >= 3 ? 'High' : 'Moderate',
      primaryResonance: 'Deeply Joyful & Preserved',
      recentEngagementDate: stories[0]?.formattedDate || 'Recent',
      verbalFluencyIndicator: 'Active reminiscing observed with vivid sensory descriptors',
      narrations: stories.slice(0, 4).map(s => ({
        storyTitle: s.storyTitle,
        memoryTitle: s.memoryTitle,
        date: s.formattedDate,
        participation: s.practitionerEngagement?.verbalParticipation || 'High',
        resonance: s.practitionerEngagement?.emotionalResonance || 'Joyful',
        durationSec: s.practitionerEngagement?.sessionDurationSeconds || 150,
      })),
    };
  }
}

export const storyService = new StoryService();
