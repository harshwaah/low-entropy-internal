'use client';

import React from 'react';
import { ArrowLeft, RotateCw, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/shared/mascot';
import { usePatientTranslation } from '@/features/patient-i18n';

interface GentleQuestionProps {
  question: string;
  selectedPrompt?: string;
  onSelectPrompt: (prompt: string) => void;
  onRotateQuestion: () => void;
  onBack: () => void;
  onNext: () => void;
}

const DEFAULT_PROMPTS = [
  'My mother',
  'My father',
  'My siblings',
  'My friends',
  'Someone else',
];

export function GentleQuestion({
  question,
  selectedPrompt,
  onSelectPrompt,
  onRotateQuestion,
  onBack,
  onNext,
}: GentleQuestionProps) {
  const { t, speakPrompt, isSpeaking, voiceNotice } = usePatientTranslation();

  const handlePromptClick = (prompt: string) => {
    onSelectPrompt(prompt);
    onNext();
  };

  const handleListen = () => {
    speakPrompt(question);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Top Header with Step Dots */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DCE5E0] hover:bg-[#F3F8F5]"
            aria-label={t('common.back')}
          >
            <ArrowLeft className="w-6 h-6 text-[#2C5545]" />
          </Button>

          {/* 4 Step Dots — Step 2 Active */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4A8B71]/40" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#4A8B71] ring-4 ring-[#4A8B71]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
          </div>
          <div className="w-12" />
        </div>

        {/* Mascot + Speech Bubble */}
        <div className="flex flex-col gap-3 bg-[#F3F8F5] border border-[#DCE5E0] rounded-3xl p-5 shadow-xs">
          <div className="flex items-center gap-4">
            <Mascot size="sm" state="encouraging" className="shrink-0" />

            <div className="relative bg-white border border-[#DCE5E0] rounded-3xl p-4 shadow-xs flex-1">

              {/* Speech bubble pointer */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-[#DCE5E0] rotate-45" />
              <p className="text-xl sm:text-2xl font-extrabold text-[#2C5545] leading-snug relative z-10">
                {question}
              </p>
            </div>
          </div>


          {/* 🔊 LISTEN TO PROMPT BUTTON */}
          <div className="flex items-center justify-between pt-1">
            <Button
              variant="outline"
              size="lg"
              onClick={handleListen}
              className={`rounded-full h-12 px-5 font-bold text-base border-2 border-[#4A8B71] text-[#2C5545] bg-white hover:bg-[#E8F3EB] shadow-xs flex items-center gap-2 transition-transform active:scale-95 ${
                isSpeaking ? 'ring-4 ring-[#4A8B71]/30 bg-[#E8F3EB]' : ''
              }`}
            >
              <Volume2 className={`w-5 h-5 text-[#4A8B71] ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>🔊 {t('memoryTrail.listen')}</span>
            </Button>
            {isSpeaking && (
              <span className="text-xs font-bold text-[#4A8B71] animate-pulse">
                {t('speech.speaking')}
              </span>
            )}
          </div>

          {voiceNotice && (
            <p className="text-xs font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {voiceNotice}
            </p>
          )}
        </div>

        {/* Vertical List of Prompt Cards */}
        <div className="space-y-3 pt-2">
          {DEFAULT_PROMPTS.map((prompt) => {
            const isSelected = selectedPrompt === prompt;
            return (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className={`w-full py-4 px-6 rounded-full text-center text-lg sm:text-xl font-bold border-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#4A8B71] border-[#2C5545] text-white shadow-md'
                    : 'bg-white border-[#E8F3EB] text-[#2C5545] hover:bg-[#F3F8F5] hover:border-[#4A8B71]/40'
                }`}
              >
                {prompt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Row */}
      <div className="space-y-3 pt-4">
        <Button
          variant="outline"
          onClick={onRotateQuestion}
          className="w-full h-14 rounded-full text-lg font-bold border-2 border-[#4A8B71] text-[#2C5545] hover:bg-[#E8F3EB] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCw className="w-5 h-5 text-[#4A8B71]" />
          <span>{t('memoryTrail.askAnother')}</span>
        </Button>

        <Button
          size="lg"
          onClick={onNext}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t('common.continue')}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
