import React from 'react';
import { PlaceholderModule } from '@/components/shared/placeholder-module';
import { Activity, CalendarCheck, BookHeart, HeartPulse, BellRing, Sparkles } from 'lucide-react';

export default function CaregiverPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-emerald-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Caregiver Dashboard Scaffolding</h1>
            <p className="text-xs text-emerald-800 mt-0.5">
              Empathetic remote monitoring, routine adherence, and family story orchestration.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-200/80 px-3 py-1 text-xs font-semibold text-emerald-900">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            Patient Status: Active at Home
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlaceholderModule
          title="Live Patient Status & Telemetry"
          description="Real-time check-in status, last activity completed, and gentle mood indicators without intrusive surveillance."
          icon={Activity}
          featureKey="features/caregiver"
          assignedTo="Contributor 4 (Caregiver Lead)"
          targetFolder="features/caregiver/*"
          badgeText="Contributor 4"
          badgeVariant="success"
        />

        <PlaceholderModule
          title="Routine & Medication Manager"
          description="Configure daily rhythms, set gentle reminders, and verify medication acknowledgments."
          icon={CalendarCheck}
          featureKey="features/routines"
          assignedTo="Contributor 2 (Routines Lead)"
          targetFolder="features/routines/*"
          badgeText="Contributor 2"
          badgeVariant="secondary"
        />

        <PlaceholderModule
          title="Family Memory Vault & Stories"
          description="Upload family photographs, record warm voice notes, and annotate people to trigger positive reminiscence."
          icon={BookHeart}
          featureKey="features/memories"
          assignedTo="Contributor 1 (Memories Lead)"
          targetFolder="features/memories/*"
          badgeText="Contributor 1"
          badgeVariant="default"
        />

        <PlaceholderModule
          title="Caregiver Well-being & Respite"
          description="Caregiver burnout check-ins, respite care resources, and shared care-team handoff notes."
          icon={HeartPulse}
          featureKey="features/caregiver"
          assignedTo="Contributor 4 (Caregiver Lead)"
          targetFolder="features/caregiver/*"
          badgeText="Contributor 4"
          badgeVariant="success"
        />

        <PlaceholderModule
          title="Alerts & Anomaly Notifications"
          description="Discreet alerts for skipped routines, unusual night-time wakefulness, or confusion episodes."
          icon={BellRing}
          featureKey="features/caregiver"
          assignedTo="Contributor 4 (Caregiver Lead)"
          targetFolder="features/caregiver/*"
          badgeText="Contributor 4"
          badgeVariant="warning"
        />

        <PlaceholderModule
          title="AI Companion Personalization"
          description="Set communication preferences, preferred nicknames, topics of comfort, and calming subjects."
          icon={Sparkles}
          featureKey="features/companion"
          assignedTo="Contributor 6 (AI Architecture)"
          targetFolder="features/companion/*"
          badgeText="Contributor 6"
          badgeVariant="warning"
        />
      </div>
    </div>
  );
}
