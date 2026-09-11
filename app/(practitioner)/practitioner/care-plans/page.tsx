import React from 'react';
import { practitionerService, CarePlansView } from '@/features/practitioner';

export default async function PractitionerCarePlansPage() {
  const carePlans = await practitionerService.getCarePlans();

  return (
    <div className="max-w-7xl mx-auto">
      <CarePlansView carePlans={carePlans} />
    </div>
  );
}
