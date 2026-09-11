'use client';

import React from 'react';
import { GameMode } from '../types';
import { ArrowLeft, ArrowRight, Calculator, Palette, Apple, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModeSelectionProps {
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
  onNext: () => void;
}

const MODES: Array<{
  id: GameMode;
  title: string;
  emoji: string;
  icon: React.ReactNode;
  description: string;
  cardBg: string;
  border: string;
}> = [
  {
    id: 'math',
    title: 'Math Mode',
    emoji: '🧮',
    icon: <Calculator className="w-8 h-8 text-[#2C5545]" />,
    description: 'Add, subtract and choose the answer!',
    cardBg: 'bg-[#E8F3EB]',
    border: 'border-[#4A8B71]',
  },
  {
    id: 'colors',
    title: 'Colors',
    emoji: '🎨',
    icon: <Palette className="w-8 h-8 text-pink-600" />,
    description: 'Find the right color!',
    cardBg: 'bg-[#FCE7F3]',
    border: 'border-pink-300',
  },
  {
    id: 'objects',
    title: 'Objects',
    emoji: '🍎',
    icon: <Apple className="w-8 h-8 text-red-600" />,
    description: 'Find the right item!',
    cardBg: 'bg-[#FEF2F2]',
    border: 'border-red-300',
  },
  {
    id: 'patterns',
    title: 'Patterns',
    emoji: '🧩',
    icon: <Puzzle className="w-8 h-8 text-amber-600" />,
    description: 'What comes next?',
    cardBg: 'bg-[#FEF3C7]',
    border: 'border-amber-300',
  },
];

export function ModeSelection({
  selectedMode,
  onSelectMode,
  onBack,
  onNext,
}: ModeSelectionProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      <div className="space-y-4">
        {/* Top Navigation Header */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DCE5E0] hover:bg-[#F3F8F5]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#2C5545]" />
          </Button>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545]">
            Choose a Mode
          </h2>
          <p className="text-base sm:text-lg text-[#5C7065] font-medium">
            Pick what you&apos;d like to play today.
          </p>
        </div>

        {/* 2 x 2 Card Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`group rounded-3xl p-5 text-center border-2 transition-all flex flex-col items-center justify-between min-h-[160px] cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98] ${
                  mode.cardBg
                } ${isSelected ? 'border-[#2C5545] ring-4 ring-[#2C5545]/20 scale-[1.02]' : mode.border}`}
              >
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  {mode.emoji}
                </div>

                <div className="space-y-1 mt-2">
                  <h3 className="text-lg font-extrabold text-[#2C5545]">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-[#5C7065] font-medium leading-tight">
                    {mode.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4 max-w-md mx-auto w-full">
        <Button
          size="lg"
          onClick={onNext}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
