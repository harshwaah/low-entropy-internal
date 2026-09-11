'use client';

import React from 'react';
import { GameCharacter } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

interface CorrectFeedbackProps {
  character: GameCharacter;
  correctAnswer?: string | number;
  onNextQuestion: () => void;
}

export function CorrectFeedback({
  character,
  correctAnswer,
  onNextQuestion,
}: CorrectFeedbackProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      {/* Center Character & Glowing Apple */}
      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Speech Bubble */}
        <div className="bg-white border-2 border-[#4A8B71] rounded-3xl p-5 shadow-md relative max-w-xs mx-auto animate-bounce duration-1000">
          <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
            <Sparkles className="w-5 h-5 fill-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider">{t('quickPick.spotOn')}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#2C5545]">
            {t('quickPick.correctTitle')}
          </h2>
          <p className="text-base text-[#5C7065] font-bold mt-1">
            {t('quickPick.thatsRightAnswer')}
          </p>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-b-2 border-r-2 border-[#4A8B71] rotate-45" />
        </div>

        {/* Character & Glowing Apple */}
        <div className="flex items-center justify-center gap-6 py-4">
          {/* Happy Snake */}
          <div className={`w-28 h-28 rounded-full ${character.headBgClass} border-4 border-white flex items-center justify-center shadow-lg relative animate-bounce`}>
            <span className="text-6xl">{character.avatarEmoji}</span>
            <div className="absolute -top-2 -right-2 text-2xl">✨</div>
          </div>

          {/* Correct Apple Glow */}
          {correctAnswer !== undefined && (
            <div className="w-20 h-20 rounded-full bg-red-500 border-4 border-amber-300 shadow-xl flex items-center justify-center relative ring-8 ring-amber-300/40">
              <span className="text-3xl font-black text-white">{correctAnswer}</span>
              <div className="absolute -top-3 right-3 text-xl">🌟</div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={onNextQuestion}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>{t('quickPick.greatJobTryAnother')}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
