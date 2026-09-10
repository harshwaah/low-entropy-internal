import React from 'react';
import { practitionerService, ReportsInsightsView } from '@/features/practitioner';

export default async function PractitionerReportsPage() {
  const analytics = await practitionerService.getCohortAnalytics();

  return (
    <div className="max-w-7xl mx-auto">
      <ReportsInsightsView analytics={analytics} />
    </div>
  );
}
