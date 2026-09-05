/**
 * Companion Service Scaffolding (Phase 2 Target)
 * Owned by: Contributor 6
 */

import { CompanionInteractionPrompt, CompanionResponsePayload } from '../types';

export interface ICompanionService {
  generateEmpatheticResponse(prompt: CompanionInteractionPrompt): Promise<CompanionResponsePayload>;
}

export const companionServicePlaceholder: ICompanionService = {
  async generateEmpatheticResponse(_prompt: CompanionInteractionPrompt): Promise<CompanionResponsePayload> {
    return {
      displayText: 'Hello! I am right here with you today.',
      toneSuggested: 'soothing',
    };
  },
};
