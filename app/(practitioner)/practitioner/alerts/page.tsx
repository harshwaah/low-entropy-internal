import React from 'react';
import { practitionerService, AlertsPortalView } from '@/features/practitioner';

export default async function PractitionerAlertsPage() {
  const alerts = await practitionerService.getAlerts();

  return (
    <div className="max-w-7xl mx-auto">
      <AlertsPortalView initialAlerts={alerts} />
    </div>
  );
}
