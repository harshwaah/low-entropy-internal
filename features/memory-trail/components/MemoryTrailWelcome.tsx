'use client';

import React from 'react';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

interface MemoryTrailWelcomeProps {
  onStart: () => void;
}

export function MemoryTrailWelcome({ onStart }: MemoryTrailWelcomeProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-6 bg-[#FDFBF7] text-[#2C5545] animate-in fade-in duration-300">
      
      {/* Header section */}
      <div className="text-center pt-2 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C5545] tracking-tight">
          {t('memoryTrail.welcomeTitle')}
        </h1>
        <p className="text-lg sm:text-xl text-[#5C7065] font-medium leading-relaxed max-w-sm mx-auto">
          {t('memoryTrail.welcomeSubtitle')}
        </p>
      </div>

      {/* Mascot & Nature Landscape Banner */}
      <div className="my-6 relative flex flex-col items-center justify-center">
        {/* Soft background nature circle & rolling hills glow */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-b from-[#E8F3EB] via-[#F3F8F5] to-[#E2EFE6] flex items-center justify-center relative shadow-xs overflow-hidden border border-[#DCE5E0]">
          
          {/* Background hills SVG decoration */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full text-[#4A8B71]/15"
            viewBox="0 0 200 60"
            fill="currentColor"
          >
            <path d="M0,40 Q50,10 100,35 Q150,60 200,30 L200,60 L0,60 Z" />
            <path d="M0,45 Q70,20 140,40 Q180,50 200,42 L200,60 L0,60 Z" className="text-[#4A8B71]/25" />
          </svg>

          {/* Plant icons */}
          <div className="absolute top-4 left-6 text-[#4A8B71]/40">🌿</div>
          <div className="absolute bottom-10 right-6 text-[#4A8B71]/40">🌱</div>

          {/* Center Mascot Companion */}
          <Mascot
            size="lg"
            state="happy"
            className="z-10 transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Reassuring card & Primary Button */}
      <div className="space-y-6 text-center max-w-md mx-auto w-full pb-4">
        <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 shadow-xs">
          <p className="text-base sm:text-lg text-[#2C5545] font-bold leading-snug">
            {t('memoryTrail.subtitle')}<br />
            <span className="text-[#5C7065] font-medium">{t('memoryTrail.sharePrompt')}</span>
          </p>
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>{t('common.startJourney')}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>

        {/* Footer Text */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#5C7065]">
          <Leaf className="w-4 h-4 text-[#4A8B71]" />
          <span>{t('memoryTrail.title')}</span>
        </div>
      </div>

    </div>
  );
}
