import React from 'react';
import { practitionerService, ActivitiesPortalView } from '@/features/practitioner';

export default async function PractitionerActivitiesPage() {
  const patients = await practitionerService.getPatients();

  return (
    <div className="max-w-7xl mx-auto">
      <ActivitiesPortalView patients={patients} />
    </div>
  );
}
