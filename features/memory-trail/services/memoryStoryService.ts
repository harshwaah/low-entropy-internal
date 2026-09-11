/**
 * Memory Story Service
 * Prepared for future AI integration (e.g. Gemini API / Life Story Generator)
 */

export class MemoryStoryService {
  /**
   * Formats raw patient speech or typed memory into a gentle, polished life story snippet.
   *
   * IMPORTANT:
   * // Future AI integration point
   * This MVP mock cleans up formatting and punctuation without inventing any new facts.
   */
  async formatLifeStorySnippet(
    rawText: string,
    locationTitle: string,
    promptSelected?: string
  ): Promise<string> {
    if (!rawText || !rawText.trim()) {
      if (promptSelected && promptSelected !== 'Someone else') {
        return `A fond memory of visiting ${locationTitle} with ${promptSelected.toLowerCase()}.`;
      }
      return `A cherished moment at ${locationTitle}.`;
    }

    const trimmed = rawText.trim();
    // Ensure proper capitalization and sentence termination
    let formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (!/[.!?]$/.test(formatted)) {
      formatted += '.';
    }

    return formatted;
  }
}

export const memoryStoryService = new MemoryStoryService();
