'use client';

import React from 'react';
import { GameDifficulty } from '../types';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DifficultySelectionProps {
  selectedDifficulty: GameDifficulty;
  onSelectDifficulty: (difficulty: GameDifficulty) => void;
  onBack: () => void;
  onStartGame: () => void;
}

const DIFFICULTIES: Array<{
  id: GameDifficulty;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  cardBg: string;
  border: string;
}> = [
  {
    id: 'gentle',
    title: 'Gentle',
    emoji: '🐢',
    subtitle: 'Slower pace',
    description: 'Easier questions & calm movement',
    cardBg: 'bg-[#E8F3EB]',
    border: 'border-[#4A8B71]',
  },
  {
    id: 'comfortable',
    title: 'Comfortable',
    emoji: '🐍',
    subtitle: 'A little faster',
    description: 'Moderate questions & steady flow',
    cardBg: 'bg-[#FAF3EB]',
    border: 'border-[#F2DFCD]',
  },
  {
    id: 'active',
    title: 'Active',
    emoji: '🦋',
    subtitle: 'More challenge',
    description: 'Slightly faster & lively questions',
    cardBg: 'bg-[#EBF3FA]',
    border: 'border-[#D2E4F5]',
  },
];

export function DifficultySelection({
  selectedDifficulty,
  onSelectDifficulty,
  onBack,
  onStartGame,
}: DifficultySelectionProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      <div className="space-y-4">
        {/* Navigation */}
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
            Choose Difficulty
          </h2>
          <p className="text-base sm:text-lg text-[#5C7065] font-medium">
            You can change this anytime.
          </p>
        </div>

        {/* 3 Vertical Cards */}
        <div className="space-y-3 pt-2">
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;

            return (
              <button
                key={diff.id}
                onClick={() => onSelectDifficulty(diff.id)}
                className={`w-full rounded-3xl p-5 border-2 transition-all flex items-center gap-4 text-left cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] ${
                  diff.cardBg
                } ${isSelected ? 'border-[#2C5545] ring-4 ring-[#2C5545]/20 scale-[1.01]' : diff.border}`}
              >
                {/* Emoji Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-xs shrink-0">
                  {diff.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-extrabold text-[#2C5545]">
                    {diff.title}
                  </h3>
                  <p className="text-sm font-bold text-[#4A8B71]">
                    {diff.subtitle}
                  </p>
                  <p className="text-xs text-[#5C7065] font-medium mt-0.5">
                    {diff.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-[#2C5545] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Game Button */}
      <div className="pt-4 max-w-md mx-auto w-full">
        <Button
          size="lg"
          onClick={onStartGame}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Start Game</span>
          <Play className="w-6 h-6 fill-white ml-1" />
        </Button>
      </div>

    </div>
  );
}
