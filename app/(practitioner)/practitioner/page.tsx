import React from 'react';
import { practitionerService } from '@/features/practitioner';
import { PractitionerDashboardClient } from '@/features/practitioner/components/practitioner-dashboard-client';

export default async function PractitionerDashboardPage() {
  const [patients, analytics, observations, recommendations] = await Promise.all([
    practitionerService.getPatients(),
    practitionerService.getCohortAnalytics(),
    practitionerService.getObservations(),
    practitionerService.getRecommendations(),
  ]);

  return (
    <PractitionerDashboardClient
      patients={patients}
      analytics={analytics}
      observations={observations}
      recommendations={recommendations}
    />
  );
}
