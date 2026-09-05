import React from 'react';
import { PlaceholderModule } from '@/components/shared/placeholder-module';
import { LineChart, Users, FileText, ClipboardList, ShieldAlert, Cpu } from 'lucide-react';

export default function PractitionerPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Clinical Oversight & Analytics Scaffolding
              </h1>
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                Desktop Density
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Longitudinal cognitive progression metrics, routine stability indices, and clinical consultation records.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">
              Cohort: 12 Active Patients
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PlaceholderModule
          title="Cognitive Trajectory Analytics"
          description="Longitudinal engagement scoring, errorless game completion speeds, and trend variation alerts."
          icon={LineChart}
          featureKey="features/practitioner"
          assignedTo="Contributor 5 (Practitioner Lead)"
          targetFolder="features/practitioner/*"
          badgeText="Contributor 5"
          badgeVariant="clinical"
        />

        <PlaceholderModule
          title="Patient Roster & Risk Stratification"
          description="Cohort management with triage filters for recent confusion spikes or sudden routine drops."
          icon={Users}
          featureKey="features/practitioner"
          assignedTo="Contributor 5 (Practitioner Lead)"
          targetFolder="features/practitioner/*"
          badgeText="Contributor 5"
          badgeVariant="clinical"
        />

        <PlaceholderModule
          title="Routine & Medication Adherence"
          description="Objectively monitored morning, afternoon, and evening medication acknowledgment rates."
          icon={Cpu}
          featureKey="features/routines"
          assignedTo="Contributor 2 (Routines Lead)"
          targetFolder="features/routines/*"
          badgeText="Contributor 2"
          badgeVariant="secondary"
        />

        <PlaceholderModule
          title="Clinical Encounter Notes"
          description="Structured physician assessment notes, MoCA/MMSE milestone correlation, and care plan modifications."
          icon={ClipboardList}
          featureKey="features/practitioner"
          assignedTo="Contributor 5 (Practitioner Lead)"
          targetFolder="features/practitioner/*"
          badgeText="Contributor 5"
          badgeVariant="clinical"
        />

        <PlaceholderModule
          title="Standardized Visit Summary Export"
          description="Automated clinical PDF summary for insurance, neurologist follow-ups, and family conferences."
          icon={FileText}
          featureKey="features/practitioner"
          assignedTo="Contributor 5 (Practitioner Lead)"
          targetFolder="features/practitioner/*"
          badgeText="Contributor 5"
          badgeVariant="clinical"
        />

        <PlaceholderModule
          title="Critical Incident Audit Trail"
          description="Timestamped logs of disorientations, night wandering flags, or caregiver distress calls."
          icon={ShieldAlert}
          featureKey="features/caregiver"
          assignedTo="Contributor 4 (Caregiver Lead)"
          targetFolder="features/caregiver/*"
          badgeText="Contributor 4"
          badgeVariant="warning"
        />
      </div>
    </div>
  );
}
