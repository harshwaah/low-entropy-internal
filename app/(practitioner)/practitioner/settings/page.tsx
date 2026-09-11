'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PractitionerOnboardingData } from '@/types/onboarding';
import {
  Settings,
  Stethoscope,
  Building2,
  Activity,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  FileText,
  Lock,
} from 'lucide-react';

export default function PractitionerSettingsPage() {
  const router = useRouter();
  const { resetOnboarding, data } = useOnboarding('practitioner');
  const [resetting, setResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const practitionerData = (data as PractitionerOnboardingData) || {
    name: 'Dr. Elena Vance',
    role: 'Attending Neurologist',
    organization: 'Memorial Cognitive Care Institute',
    priorities: ['Observations', 'Adherence', 'Engagement'],
  };

  const handleRestartIntroduction = () => {
    setResetting(true);
    resetOnboarding();
    setToastMessage('Introduction reset. Redirecting to onboarding...');
    setTimeout(() => {
      router.push('/practitioner/onboarding');
    }, 400);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#013625] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e4d3a] mb-1">
            <Settings className="w-4 h-4" />
            <span>Clinical Workstation Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#013625] tracking-tight">
            Practitioner Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your physician credentials, telemetry focus priorities, and clinical orientation.
          </p>
        </div>
      </div>

      {/* Profile & Clinic Configuration Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#c4ecd4] text-[#013625] flex items-center justify-center font-bold text-lg">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#013625]">Clinician Profile</h2>
              <p className="text-xs text-slate-500">Authenticated prescribing physician</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Physician Name:</span>
              <span className="font-bold text-[#013625]">{practitionerData.name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Specialty Role:</span>
              <span className="font-bold text-[#013625]">{practitionerData.role}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Facility / Hospital:</span>
              <span className="font-bold text-[#013625]">{practitionerData.organization}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Primary Telemetry Priorities:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {practitionerData.priorities?.map((priority) => (
                <span
                  key={priority}
                  className="px-2.5 py-1 rounded-full bg-[#ecf6ee] text-[#1e4d3a] text-xs font-bold"
                >
                  {priority}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Regulatory Oversight Card */}
        <section className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#013625]">Regulatory & Security</h2>
              <p className="text-xs text-slate-500">HIPAA compliant clinical session</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Audit Trail Logging:</span>
              <span className="font-bold text-emerald-700">Enforced & Active</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Session Protocol:</span>
              <span className="font-bold text-slate-800">TLS 1.3 / OAuth Role-Gated</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Cohort Authorization:</span>
              <span className="font-bold text-[#013625]">Unit 4B (42 Active Records)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3.5 flex items-center gap-2.5 text-xs text-slate-600">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>All chart revisions and telemetry exports are sealed with your clinician signature.</span>
          </div>
        </section>
      </div>

      {/* Hidden/Discrete Reset Section */}
      <section className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#013625]">Clinical Orientation & Onboarding</h2>
            <p className="text-xs text-slate-500">
              Replay the 4-screen clinical orientation flow to adjust telemetry priorities or profile data.
            </p>
          </div>

          <button
            type="button"
            id="practitioner-restart-intro-btn"
            disabled={resetting}
            onClick={handleRestartIntroduction}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-[#1e4d3a] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Introduction</span>
          </button>
        </div>
      </section>
    </div>
  );
}
