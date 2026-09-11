'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/use-onboarding';
import { CaregiverOnboardingData } from '@/types/onboarding';
import {
  Settings,
  Heart,
  User,
  Shield,
  Bell,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Phone,
  ChevronRight,
} from 'lucide-react';

export default function CaregiverSettingsPage() {
  const router = useRouter();
  const { resetOnboarding, data } = useOnboarding('caregiver');
  const [resetting, setResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const caregiverData = (data as CaregiverOnboardingData) || {
    relationship: 'Daughter',
    patientName: 'Kamal Sharma',
    preferredName: 'Papa',
    manageAreas: ['Memories', 'Reminders', 'Care Updates'],
  };

  const handleRestartIntroduction = () => {
    setResetting(true);
    resetOnboarding();
    setToastMessage('Introduction reset. Redirecting to onboarding...');
    setTimeout(() => {
      router.push('/caregiver/onboarding');
    }, 400);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-brand-dark text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C5545] mb-1">
            <Settings className="w-4 h-4" />
            <span>Care Circle Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Caregiver Settings
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage your care preferences, loved one profile, and application introductions.
          </p>
        </div>
      </div>

      {/* Profile & Care Circle Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-3xl p-6 border border-brand-border/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2C5545] flex items-center justify-center font-bold text-lg">
              <Heart className="w-6 h-6 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-dark">Loved One Profile</h2>
              <p className="text-xs text-brand-muted">Active recipient of companion care</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Full Name:</span>
              <span className="font-bold text-brand-dark">{caregiverData.patientName}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Preferred Call Name:</span>
              <span className="font-bold text-brand-dark">&ldquo;{caregiverData.preferredName}&rdquo;</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Relationship:</span>
              <span className="font-bold text-brand-dark">{caregiverData.relationship}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Managed Care Domains:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {caregiverData.manageAreas?.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#2C5545] text-xs font-bold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Caregiver Card */}
        <section className="bg-white rounded-3xl p-6 border border-brand-border/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-dark">Primary Caregiver</h2>
              <p className="text-xs text-brand-muted">Account owner & alert recipient</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Name:</span>
              <span className="font-bold text-brand-dark">Priya Sharma</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Role:</span>
              <span className="font-bold text-brand-dark">Primary Daughter & Care Partner</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Phone:</span>
              <span className="font-bold text-brand-dark">+91 98765 43210</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3.5 flex items-center gap-2.5 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-[#2C5545] shrink-0" />
            <span>Telemetry access authorized by Memorial Cognitive Care Institute.</span>
          </div>
        </section>
      </div>

      {/* Hidden/Discrete Reset Section */}
      <section className="bg-white rounded-3xl p-6 border border-brand-border/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-dark">Guided Introduction</h2>
            <p className="text-xs text-brand-muted">
              Replay the 5-screen first-time onboarding flow to reconfigure care priorities.
            </p>
          </div>

          <button
            type="button"
            id="caregiver-restart-intro-btn"
            disabled={resetting}
            onClick={handleRestartIntroduction}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-[#2C5545] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Introduction</span>
          </button>
        </div>
      </section>
    </div>
  );
}
