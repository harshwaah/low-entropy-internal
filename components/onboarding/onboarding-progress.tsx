'use client';

import React from 'react';
import { OnboardingRole } from '@/types/onboarding';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  role?: OnboardingRole;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  role = 'patient',
}: OnboardingProgressProps) {
  const progressPercent = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  const roleBarColor = {
    patient: 'bg-[#2C5545]',
    caregiver: 'bg-[#2C5545]',
    practitioner: 'bg-[#1e4d3a]',
  }[role];

  return (
    <div className="w-full space-y-1.5" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${roleBarColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
