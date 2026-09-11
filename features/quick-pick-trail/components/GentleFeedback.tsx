'use client';

import React from 'react';
import { GameCharacter } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

interface GentleFeedbackProps {
  character: GameCharacter;
  onContinue: () => void;
}

export function GentleFeedback({ character, onContinue }: GentleFeedbackProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      {/* Center Thoughtful Character */}
      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Speech Bubble */}
        <div className="bg-[#FAF3EB] border-2 border-[#F2DFCD] rounded-3xl p-5 shadow-xs relative max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-1 text-[#8D4935] mb-1">
            <Heart className="w-4 h-4 fill-[#8D4935]" />
            <span className="text-xs font-black uppercase tracking-wider">{t('quickPick.noRush')}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#2C5545]">
            {t('quickPick.thatsOkay')}
          </h2>
          <p className="text-base text-[#5C7065] font-bold mt-1">
            {t('quickPick.tryAnotherApple')}
          </p>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FAF3EB] border-b-2 border-r-2 border-[#F2DFCD] rotate-45" />
        </div>

        {/* Thoughtful Curious Character */}
        <div className="flex flex-col items-center justify-center py-2 space-y-2">
          <div className={`w-28 h-28 rounded-full ${character.headBgClass} border-4 border-white flex items-center justify-center shadow-md relative`}>
            <span className="text-6xl">{character.avatarEmoji}</span>
            <div className="absolute -top-1 -right-1 text-2xl">💭</div>
          </div>
          <p className="text-sm font-bold text-[#5C7065]">
            &ldquo;{t('quickPick.everyTry')}&rdquo;
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={onContinue}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>{t('quickPick.takeYourTime')}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
