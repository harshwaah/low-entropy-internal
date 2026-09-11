'use client';

import React from 'react';
import { GameCharacter } from '../types';
import { ArrowRight, Music, Settings, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePatientTranslation } from '@/features/patient-i18n';

interface WelcomeScreenProps {
  character: GameCharacter;
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenHowToPlay: () => void;
}

export function WelcomeScreen({
  character,
  onStart,
  onOpenSettings,
  onOpenHowToPlay,
}: WelcomeScreenProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-6 bg-[#FDFBF7] text-[#2C5545] animate-in fade-in duration-300">
      
      {/* Top Banner Tagline */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#E8F3EB] border border-[#DCE5E0] rounded-full text-xs font-black uppercase tracking-wider text-[#4A8B71] shadow-2xs">
          <span>Think • Move • Pick • Grow</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C5545] tracking-tight">
          {t('quickPick.welcomeTitle')}
        </h1>
        
        <p className="text-base sm:text-lg text-[#5C7065] font-medium leading-relaxed max-w-sm mx-auto">
          &ldquo;{t('quickPick.welcomeSubtitle')}&rdquo;
        </p>
      </div>

      {/* Center Character & Nature Illustration */}
      <div className="my-6 relative flex flex-col items-center justify-center">
        
        {/* Speech Bubble */}
        <div className="mb-4 relative bg-white border-2 border-[#DCE5E0] px-4 py-3 rounded-3xl shadow-xs text-center max-w-xs z-10 animate-bounce duration-1000">
          <p className="text-sm sm:text-base font-bold text-[#2C5545] leading-snug">
            {t('quickPick.welcomeGreeting', { name: character.name })} ✨
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#DCE5E0] rotate-45" />
        </div>

        {/* Nature Hill Circle */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-b from-[#E8F3EB] via-[#F3F8F5] to-[#E2EFE6] flex items-center justify-center relative shadow-xs overflow-hidden border border-[#DCE5E0]">
          
          <svg className="absolute bottom-0 left-0 right-0 w-full text-[#4A8B71]/20" viewBox="0 0 200 60" fill="currentColor">
            <path d="M0,40 Q50,10 100,35 Q150,60 200,30 L200,60 L0,60 Z" />
            <path d="M0,45 Q70,20 140,40 Q180,50 200,42 L200,60 L0,60 Z" className="text-[#4A8B71]/30" />
          </svg>

          {/* Cute Snake Character Illustration */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-transform duration-300">
            <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full ${character.headBgClass} border-4 border-white flex items-center justify-center shadow-md relative`}>
              <span className="text-6xl sm:text-7xl">{character.avatarEmoji}</span>
              {/* Cute Backpack Badge */}
              <div className="absolute -bottom-1 right-2 bg-amber-400 text-amber-950 text-xs font-black px-2 py-0.5 rounded-full border-2 border-white shadow-xs">
                🎒
              </div>
            </div>
            <span className="text-lg font-black text-[#2C5545] tracking-wide">{character.name}</span>
          </div>

        </div>
      </div>

      {/* Start Button & Bottom Utility Navigation Bar */}
      <div className="space-y-6 max-w-md mx-auto w-full pb-2">
        <Button
          size="lg"
          onClick={onStart}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>{t('quickPick.startAdventure')}</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>

        {/* Bottom Utility Icons */}
        <div className="flex items-center justify-around bg-white border border-[#DCE5E0] rounded-2xl py-3 px-4 shadow-2xs">
          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center text-xs font-bold text-[#5C7065] hover:text-[#2C5545] transition-colors cursor-pointer"
          >
            <Music className="w-6 h-6 text-[#4A8B71] mb-0.5" />
            <span>{t('music.title')}</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center text-xs font-bold text-[#5C7065] hover:text-[#2C5545] transition-colors cursor-pointer"
          >
            <Settings className="w-6 h-6 text-[#4A8B71] mb-0.5" />
            <span>{t('nav.profile')}</span>
          </button>

          <button
            onClick={onOpenHowToPlay}
            className="flex flex-col items-center text-xs font-bold text-[#5C7065] hover:text-[#2C5545] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-6 h-6 text-[#4A8B71] mb-0.5" />
            <span>{t('quickPick.howToPlay')}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
