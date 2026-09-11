'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { OnboardingProgress } from './onboarding-progress';
import { OnboardingRole } from '@/types/onboarding';

interface OnboardingLayoutProps {
  role?: OnboardingRole;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack?: boolean;
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  onSkip?: () => void;
  skipLabel?: string;
  children: React.ReactNode;
}

export function OnboardingLayout({
  role = 'patient',
  currentStep,
  totalSteps,
  onBack,
  canGoBack = false,
  onNext,
  nextLabel = 'Continue',
  isNextDisabled = false,
  onSkip,
  skipLabel = 'Skip for now',
  children,
}: OnboardingLayoutProps) {
  const roleTheme = {
    patient: {
      bg: 'bg-[#FDFBF7]',
      btn: 'bg-[#2C5545] hover:bg-[#234437] text-white',
      badge: 'bg-emerald-100/70 text-[#2C5545]',
    },
    caregiver: {
      bg: 'bg-[#FDFBF7]',
      btn: 'bg-[#2C5545] hover:bg-[#234437] text-white',
      badge: 'bg-amber-100/70 text-amber-900',
    },
    practitioner: {
      bg: 'bg-[#F6FAF7]',
      btn: 'bg-[#1e4d3a] hover:bg-[#013625] text-white',
      badge: 'bg-emerald-100/70 text-[#013625]',
    },
  }[role];

  return (
    <div className={`min-h-screen w-full ${roleTheme.bg} flex flex-col justify-between text-slate-800 selection:bg-emerald-200 selection:text-emerald-900`}>
      {/* Top App Header */}
      <header className="w-full max-w-xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="w-10">
            {canGoBack && onBack ? (
              <button
                type="button"
                id="onboarding-back-btn"
                onClick={onBack}
                aria-label="Previous step"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-2xs text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs border border-black/5 bg-white">
            <span className="w-2 h-2 rounded-full bg-[#2C5545]" />
            <span>SmritiSaathi</span>
          </div>

          <div className="w-10 flex justify-end">
            {onSkip ? (
              <button
                type="button"
                id="onboarding-skip-btn"
                onClick={onSkip}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
              >
                {skipLabel}
              </button>
            ) : null}
          </div>
        </div>

        {/* Visual Progress Indicator */}
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} role={role} />
      </header>

      {/* Dynamic Step Content */}
      <main className="w-full max-w-xl mx-auto px-4 py-3 sm:py-6 flex-1 flex flex-col justify-center">
        {children}
      </main>

      {/* Sticky Bottom Actions */}
      <footer className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent">
        <button
          type="button"
          id="onboarding-next-btn"
          disabled={isNextDisabled}
          onClick={onNext}
          className={`w-full min-h-[58px] py-4 px-6 rounded-full text-base sm:text-lg font-extrabold shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] ${
            isNextDisabled
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : roleTheme.btn
          }`}
        >
          <span>{nextLabel}</span>
        </button>
      </footer>
    </div>
  );
}
