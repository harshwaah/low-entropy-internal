import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  practitionerService,
  PatientDetailView,
} from '@/features/practitioner';
import { ArrowLeft, UserX } from 'lucide-react';

export default async function PractitionerPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [patient, observations, recommendations, allPatients] = await Promise.all([
    practitionerService.getPatientById(id),
    practitionerService.getObservations(id),
    practitionerService.getRecommendations(id),
    practitionerService.getPatients(),
  ]);

  if (!patient) {
    return (
      <div className="max-w-xl mx-auto my-12 rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-xs space-y-4">
        <UserX className="h-12 w-12 text-slate-300 mx-auto" />
        <h1 className="text-lg font-bold text-slate-900">Patient Record Not Found</h1>
        <p className="text-xs text-slate-500">
          The requested clinical record for ID &ldquo;{id}&rdquo; does not exist in the active cohort.
        </p>
        <div className="pt-2">
          <Link
            href="/practitioner"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Patient Roster</span>
          </Link>
        </div>
      </div>
    );
  }

  const patientOptions = allPatients.map((p) => ({ id: p.id, name: p.name }));

  return (
    <div className="max-w-7xl mx-auto">
      <PatientDetailView
        patient={patient}
        observations={observations}
        recommendations={recommendations}
        allPatients={patientOptions}
      />
    </div>
  );
}
