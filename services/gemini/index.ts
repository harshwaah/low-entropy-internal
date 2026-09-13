/**
 * Server-Side Gemini AI Service Interface & Architecture Scaffolding
 * 
 * Note: Feature implementation deferred to Phase 2.
 * All Gemini interactions MUST remain server-side using process.env.GEMINI_API_KEY.
 */

import { config } from '@/lib/config';

export interface GeminiPromptPayload {
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
  model?: 'gemini-2.5-flash' | 'gemini-2.5-pro' | string;
}

export interface GeminiServiceResponse {
  content: string;
  finishReason?: string;
}

export interface IGeminiClientService {
  generateText(payload: GeminiPromptPayload): Promise<GeminiServiceResponse>;
}

export const geminiServicePlaceholder: IGeminiClientService = {
  async generateText(payload: GeminiPromptPayload): Promise<GeminiServiceResponse> {
    const selectedModel = payload.model || config.geminiModel;
    // Server route will be connected in Phase 2 with strict server-side validation
    return {
      content: `Gemini service scaffolding ready with model ${selectedModel}. Configured: ${config.hasGeminiKey}`,
    };
  },
};
