import { FamilyContribution } from '../types';

import { MOCK_FAMILY_CONTRIBUTIONS } from '../data/mockFamilyContributions';

class FamilyContributionService {
  private contributions: FamilyContribution[] = MOCK_FAMILY_CONTRIBUTIONS;

  async getFamilyContributions(patientId: string = 'patient-1'): Promise<FamilyContribution[]> {
    return this.contributions.filter(c => !patientId || c.patientId === patientId);
  }

  async getContributionForLocation(locationId: string): Promise<FamilyContribution | null> {
    return this.contributions.find(c => c.locationId === locationId) || null;
  }

  async addContribution(contribution: FamilyContribution): Promise<FamilyContribution> {
    this.contributions.unshift(contribution);
    return contribution;
  }
}

export const familyContributionService = new FamilyContributionService();
