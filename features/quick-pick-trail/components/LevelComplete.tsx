'use client';

import React from 'react';
import { GameCharacter, GameDifficulty } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Clock, CheckCircle2, Home } from 'lucide-react';

interface LevelCompleteProps {
  character: GameCharacter;
  level: number;
  score: number;
  durationSeconds?: number;
  difficulty: GameDifficulty;
  onNextLevel: () => void;
  onHome: () => void;
}

export function LevelComplete({
  character,
  level,
  score,
  durationSeconds = 80,
  difficulty,
  onNextLevel,
  onHome,
}: LevelCompleteProps) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const formattedTime = `${minutes > 0 ? `${minutes} min ` : ''}${seconds} sec`;

  const paceEmoji = difficulty === 'gentle' ? '🐢' : difficulty === 'comfortable' ? '🐍' : '🦋';
  const paceTitle = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Confetti & Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-black text-[#2C5545]">
            <span>Level Complete!</span>
            <span>🎉</span>
          </div>
          <p className="text-base sm:text-lg text-[#5C7065] font-bold">
            You solved 5 questions! Amazing effort!
          </p>
        </div>

        {/* Happy Character */}
        <div className="flex justify-center my-2">
          <div className={`w-32 h-32 rounded-full ${character.headBgClass} border-4 border-white flex items-center justify-center shadow-lg relative animate-bounce`}>
            <span className="text-7xl">{character.avatarEmoji}</span>
            <div className="absolute -top-2 right-0 text-3xl">🥳</div>
          </div>
        </div>

        {/* Activity Summary Card */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-sm space-y-3 text-left">
          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4A8B71]" /> Time Taken
            </span>
            <span className="text-base font-extrabold text-[#2C5545]">{formattedTime}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A8B71]" /> Correct Answers
            </span>
            <span className="text-base font-extrabold text-[#2C5545]">5 / 5</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-bold text-[#5C7065] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#4A8B71]" /> Your Pace
            </span>
            <span className="text-base font-extrabold text-[#2C5545] flex items-center gap-1">
              <span>{paceEmoji}</span> <span>{paceTitle}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={onNextLevel}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Next Level</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>

        <Button
          variant="outline"
          onClick={onHome}
          className="w-full h-14 rounded-full text-lg font-bold border-2 border-[#4A8B71] text-[#2C5545] hover:bg-[#E8F3EB] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#4A8B71]" />
          <span>Back to Home</span>
        </Button>
      </div>

    </div>
  );
}
