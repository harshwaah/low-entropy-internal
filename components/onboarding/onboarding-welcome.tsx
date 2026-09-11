'use client';

import React from 'react';
import { OnboardingStep } from './onboarding-step';
import { OnboardingIllustration } from './onboarding-illustration';
import { OnboardingRole } from '@/types/onboarding';
import { BookHeart, CalendarClock, ShieldCheck } from 'lucide-react';

interface OnboardingWelcomeProps {
  role?: OnboardingRole;
  title: string;
  subtitle: string;
  mascotGreeting?: string;
  pillars?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

export function OnboardingWelcome({
  role = 'patient',
  title,
  subtitle,
  mascotGreeting = 'Hello! I am Saathi, your gentle companion.',
  pillars,
}: OnboardingWelcomeProps) {
  const defaultPillars = [
    {
      icon: <BookHeart className="w-5 h-5 text-emerald-700" />,
      title: 'Cherished Memories',
      description: 'Preserve and celebrate meaningful stories with loved ones.',
    },
    {
      icon: <CalendarClock className="w-5 h-5 text-amber-700" />,
      title: 'Daily Rhythms',
      description: 'Gentle, unhurried guidance through medicine and restful routines.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2C5545]" />,
      title: 'Connected Circle',
      description: 'Strengthen peace of mind between family and care partners.',
    },
  ];

  const activePillars = pillars || defaultPillars;

  return (
    <OnboardingStep
      title={title}
      subtitle={subtitle}
      illustration={
        <OnboardingIllustration
          mascotState="greeting"
          showSpeechBubble
          speechText={<span className="font-bold text-sm text-brand-dark">{mascotGreeting}</span>}
        />
      }
    >
      <div className="grid grid-cols-1 gap-2.5 pt-2 text-left">
        {activePillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs"
          >
            <div className="p-2 rounded-xl bg-slate-50 shrink-0">
              {pillar.icon}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-tight">
                {pillar.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OnboardingStep>
  );
}
