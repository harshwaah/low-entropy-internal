import React from 'react';
import {
  practitionerService,
  ObservationTimelineView,
} from '@/features/practitioner';
import { ClipboardList, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default async function PractitionerObservationsPage() {
  const [patients, observations] = await Promise.all([
    practitionerService.getPatients(),
    practitionerService.getObservations(),
  ]);

  const patientOptions = patients.map((p) => ({ id: p.id, name: p.name }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-700" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Clinical Observation & Care Note Timeline
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Longitudinal chronological stream of physician encounter notes, automated companion telemetry, caregiver family updates, and significant clinical events.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-800">
              {observations.length} Observations Recorded
            </span>
          </div>
        </div>
      </div>

      {/* Observation Timeline Stream */}
      <ObservationTimelineView
        initialObservations={observations}
        patients={patientOptions}
        showAddButton={true}
      />
    </div>
  );
}
