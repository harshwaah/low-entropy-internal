'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Phone, RotateCcw, Sparkles } from 'lucide-react';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PatientOnboardingData } from '@/types/onboarding';

export default function PatientProfilePage() {
  const router = useRouter();
  const { resetOnboarding, data } = useOnboarding('patient');
  const [resetting, setResetting] = useState(false);
  const patientData = data as PatientOnboardingData | null;

  const handleRestartIntroduction = () => {
    setResetting(true);
    resetOnboarding();
    setTimeout(() => {
      router.push('/patient/onboarding');
    }, 200);
  };

  const patientName = patientData?.name || patientData?.preferredName || 'Meera Sharma';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Header with Back button */}
      <div className="flex items-center gap-4">
        <Link href="/patient" className="focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-full">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-white shadow-sm border border-brand-border">
            <ArrowLeft className="w-6 h-6 text-brand-dark" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark">My Profile</h1>
          <p className="text-brand-muted font-medium text-lg">Your care team and preferences</p>
        </div>
      </div>

      {/* User Information Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-light shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-brand-primary text-3xl font-bold">
          {patientName.charAt(0) || 'M'}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-brand-dark">{patientName}</h2>
          <p className="text-brand-muted font-medium">New Delhi, India • Daily Companion Active</p>
          {patientData?.joys && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {patientData.joys.map((j) => (
                <span key={j} className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                  {j}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Caregiver Quick Contact */}
      <section className="bg-brand-light-alt rounded-3xl p-6 sm:p-8 border border-brand-border/60">
        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" /> My Primary Caregiver
        </h3>
        <div className="bg-white p-5 rounded-2xl border border-brand-border/60 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-brand-dark">Rohan Sharma (Son)</h4>
            <p className="text-brand-muted font-medium text-sm">Always available for a call</p>
          </div>
          <a href="tel:+919876543210" className="inline-block">
            <Button size="lg" className="rounded-full bg-brand-primary text-white font-bold h-12 px-6 shadow-sm">
              <Phone className="w-4 h-4 mr-2" /> Call Rohan
            </Button>
          </a>
        </div>
      </section>

      {/* Companion Message */}
      <section className="bg-[#FFF8F0] rounded-3xl p-6 text-center flex flex-col items-center">
        <Mascot size="sm" state="holding-heart" className="mb-3" />
        <p className="text-brand-dark font-bold text-lg">You are safe and surrounded by love.</p>
        <p className="text-brand-muted font-medium text-sm mt-1">Your family updates your schedule daily.</p>
      </section>

      {/* Discrete Introduction Settings / Reset Action */}
      <section className="pt-2 flex flex-col items-center border-t border-slate-200/60 text-center">
        <button
          type="button"
          id="patient-restart-intro-btn"
          disabled={resetting}
          onClick={handleRestartIntroduction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-brand-dark hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Introduction</span>
        </button>
        <span className="text-[11px] text-slate-600 mt-1">
          Replay the welcoming companion setup and personalize your choices anytime
        </span>
      </section>
    </div>
  );
}
