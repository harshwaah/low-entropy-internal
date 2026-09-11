'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Heart, Phone, RotateCcw } from 'lucide-react';
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
      {/* Header with Back button */}
      <div className="flex items-center gap-4">
        <Link href="/patient" className="focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-full">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-white shadow-sm border border-brand-border">
            <ArrowLeft className="w-6 h-6 text-brand-dark" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark">{t('profile.title')}</h1>
          <p className="text-brand-muted font-medium text-lg">{t('profile.subtitle')}</p>
        </div>
      </div>

      {/* User Information Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-light shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-brand-primary text-3xl font-bold">
          {patientName.charAt(0) || 'M'}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-brand-dark">{patientName}</h2>
          <p className="text-brand-muted font-medium">New Delhi, India • {t('profile.dailyCompanionActive')}</p>
        </div>
      </section>

      {/* Caregiver Quick Contact */}
      <section className="bg-brand-light-alt rounded-3xl p-6 sm:p-8 border border-brand-border/60">
        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" /> {t('profile.primaryCaregiver')}
        </h3>
        <div className="bg-white p-5 rounded-2xl border border-brand-border/60 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-brand-dark">Rohan Sharma</h4>
            <p className="text-brand-muted font-medium text-sm">{t('profile.alwaysAvailable')}</p>
          </div>
          <a href="tel:+919876543210" className="inline-block">
            <Button size="lg" className="rounded-full bg-brand-primary text-white font-bold h-12 px-6 shadow-sm">
              <Phone className="w-4 h-4 mr-2" /> {t('profile.callCaregiver', { name: 'Rohan' })}
            </Button>
          </a>
        </div>
      </section>

      {/* Companion Message */}
      <section className="bg-[#FFF8F0] rounded-3xl p-6 text-center flex flex-col items-center">
        <Mascot size="sm" state="holding-heart" className="mb-3" />
        <p className="text-brand-dark font-bold text-lg">{t('profile.reassuranceTitle')}</p>
        <p className="text-brand-muted font-medium text-sm mt-1">{t('profile.reassuranceSub')}</p>
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
