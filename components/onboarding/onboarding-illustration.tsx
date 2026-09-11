'use client';

import React from 'react';
import { Mascot, MascotState } from '@/components/shared/mascot';

interface OnboardingIllustrationProps {
  mascotState?: MascotState;
  showSpeechBubble?: boolean;
  speechText?: React.ReactNode;
  icon?: React.ReactNode;
  badgeText?: string;
}

export function OnboardingIllustration({
  mascotState = 'default',
  showSpeechBubble = false,
  speechText,
  icon,
  badgeText,
}: OnboardingIllustrationProps) {
  return (
    <div className="relative flex flex-col items-center justify-center my-2 select-none">
      {/* Warm Ambient Glow */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-emerald-100/60 blur-2xl -z-10" />

      {icon ? (
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-2 border-emerald-100 shadow-md flex items-center justify-center text-[#2C5545]">
          {icon}
        </div>
      ) : (
        <Mascot
          size="md"
          state={mascotState}
          showSpeechBubble={showSpeechBubble}
          speechText={speechText}
          speechPosition="top"
        />
      )}

      {badgeText && (
        <div className="mt-3 px-3.5 py-1 rounded-full bg-white/95 border border-emerald-200/80 shadow-2xs text-xs font-bold text-[#2C5545]">
          {badgeText}
        </div>
      )}
    </div>
  );
}
