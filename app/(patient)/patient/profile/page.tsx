'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Heart, Phone, RotateCcw, ShieldCheck, MapPin } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';
import { useSharedData } from '@/services/context/shared-data-context';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PatientOnboardingData } from '@/types/onboarding';

export default function PatientProfilePage() {
  const router = useRouter();
  const { t } = usePatientTranslation();
  const { selectedPatient } = useSharedData();
  const { data: onboardingData, resetOnboarding } = useOnboarding('patient');
  const patientData = onboardingData as PatientOnboardingData | null;
  const [resetting, setResetting] = useState(false);

  const patientName = patientData?.preferredName || patientData?.name || selectedPatient?.name || 'Meera Sharma';

  const handleRestartIntroduction = () => {
    setResetting(true);
    resetOnboarding();
    router.push('/patient');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Header with Back to Journey */}
      <header className="flex items-center gap-4 pt-1">
        <Link href="/patient" className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full">
          <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full bg-white shadow-xs border border-brand-border hover:bg-brand-light-alt">
            <ArrowLeft className="w-7 h-7 text-brand-dark" />
          </Button>
        </Link>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <User className="w-3.5 h-3.5" />
            <span>My Profile & Family</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            {t('profile.title')}
          </h1>
        </div>
      </header>

      {/* User Information Card */}
      <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-brand-light shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-white shadow-xs flex items-center justify-center text-brand-dark text-4xl font-black shrink-0">
          {patientName.charAt(0) || 'M'}
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Companion Active & Safe</span>
          </div>
          <h2 className="text-3xl font-black text-brand-dark">{patientName}</h2>
          <p className="text-brand-muted font-medium text-base flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
            <span>New Delhi, India</span>
          </p>
        </div>
      </section>

      {/* Primary Family Caregiver Contact Card */}
      <section className="bg-brand-light-alt rounded-[2.5rem] p-6 sm:p-8 border border-brand-border/60 space-y-4">
        <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" /> 
          <span>{t('profile.primaryCaregiver')}</span>
        </h3>
        
        <div className="bg-white p-6 rounded-3xl border border-brand-border/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-black text-brand-dark">Rohan Sharma</h4>
            <p className="text-brand-muted font-medium text-base mt-0.5">{t('profile.alwaysAvailable')} • +91 98922 56502</p>
          </div>
          
          <a href="tel:+919892256502" className="w-full sm:w-auto inline-block">
            <Button size="lg" className="w-full sm:w-auto h-16 px-8 rounded-full bg-[#2C5545] hover:bg-[#1E3B30] text-white text-lg font-bold shadow-sm flex items-center justify-center gap-3 cursor-pointer">
              <Phone className="w-5 h-5" /> 
              <span>Call Rohan (9892256502)</span>
            </Button>
          </a>
        </div>
      </section>

      {/* Companion Message */}
      <section className="bg-[#FFF8F0] rounded-[2.5rem] p-6 text-center flex flex-col items-center border border-amber-200/80">
        <Mascot size="sm" state="holding-heart" className="mb-2" />
        <p className="text-brand-dark font-extrabold text-xl">{t('profile.reassuranceTitle')}</p>
        <p className="text-brand-muted font-medium text-base mt-1 max-w-sm">{t('profile.reassuranceSub')}</p>
      </section>

      {/* Return to Journey Action */}
      <div className="text-center">
        <Link href="/patient" className="inline-block w-full">
          <Button
            size="lg"
            className="w-full h-18 text-xl rounded-full font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
            <span>Return to Daily Journey</span>
          </Button>
        </Link>
      </div>

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
