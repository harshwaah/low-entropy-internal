import React from 'react';
import { practitionerService, DoctorDashboardView } from '@/features/practitioner';

export default async function PractitionerDashboardPage() {
  const [patients, alerts] = await Promise.all([
    practitionerService.getPatients(),
    practitionerService.getAlerts(),
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <DoctorDashboardView patients={patients} alerts={alerts} />
    </div>
  );
}

