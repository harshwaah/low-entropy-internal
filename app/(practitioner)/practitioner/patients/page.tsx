import React from 'react';
import { practitionerService, PatientsDirectoryView } from '@/features/practitioner';

export default async function PractitionerPatientsPage() {
  const patients = await practitionerService.getPatients();

  return (
    <div className="max-w-7xl mx-auto">
      <PatientsDirectoryView initialPatients={patients} />
    </div>
  );
}
