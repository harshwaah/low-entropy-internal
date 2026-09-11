'use client';

import React from 'react';
import { OnboardingStep } from './onboarding-step';
import { OnboardingIllustration } from './onboarding-illustration';
import { OnboardingRole } from '@/types/onboarding';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface SummaryItem {
  label: string;
  value: string | string[];
}

interface OnboardingCompletionProps {
  role?: OnboardingRole;
  title?: string;
  subtitle?: string;
  reassuranceText?: string;
  summaryItems?: SummaryItem[];
}

export function OnboardingCompletion({
  role = 'patient',
  title = 'You are all set!',
  subtitle = 'Everything has been customized to your pace and comfort.',
  reassuranceText = 'Your memories, stories, and daily rhythms are cherished and safe here.',
  summaryItems,
}: OnboardingCompletionProps) {
  return (
    <OnboardingStep
      title={title}
      subtitle={subtitle}
      illustration={
        <OnboardingIllustration
          mascotState="celebrating"
          showSpeechBubble
          speechText={
            <span className="font-bold text-sm text-brand-dark flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Welcome to SmritiSaathi!</span>
            </span>
          }
        />
      }
    >
      <div className="space-y-4 pt-2">
        {/* Reassurance Banner */}
        <div className="p-4 rounded-2xl sm:rounded-3xl bg-emerald-50 border border-emerald-200/80 text-left flex items-start gap-3 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-[#2C5545] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-semibold text-[#2C5545] leading-relaxed">
            {reassuranceText}
          </p>
        </div>

        {/* Summary Card if present */}
        {summaryItems && summaryItems.length > 0 && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-left space-y-2.5 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Initial Preferences
            </h2>
            <div className="divide-y divide-slate-100">
              {summaryItems.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">{item.label}:</span>
                  <span className="font-bold text-slate-800 text-right">
                    {Array.isArray(item.value) ? item.value.join(', ') : item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </OnboardingStep>
  );
}
