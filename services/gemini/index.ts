/**
 * Server-Side Gemini AI Service Interface & Architecture Scaffolding
 * 
 * Note: Feature implementation deferred to Phase 2.
 * All Gemini interactions MUST remain server-side using process.env.GEMINI_API_KEY.
 */

export interface GeminiPromptPayload {
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
  model?: 'gemini-2.5-flash' | 'gemini-2.5-pro';
}

export interface GeminiServiceResponse {
  content: string;
  finishReason?: string;
}

export interface IGeminiClientService {
  generateText(payload: GeminiPromptPayload): Promise<GeminiServiceResponse>;
}

export const geminiServicePlaceholder: IGeminiClientService = {
  async generateText(_payload: GeminiPromptPayload): Promise<GeminiServiceResponse> {
    // Scaffolding contract only - server route will be connected in Phase 2
    return {
      content: 'Gemini service scaffolding ready for Phase 2 implementation.',
    };
  },
};
