'use client';

import React from 'react';
import { GameCharacter } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Heart } from 'lucide-react';

interface EndScreenProps {
  character: GameCharacter;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function EndScreen({ character, onPlayAgain, onHome }: EndScreenProps) {
  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Heart & Character Illustration */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-red-400 text-3xl mb-2 animate-bounce">❤️</div>
          <div className={`w-32 h-32 rounded-full ${character.headBgClass} border-4 border-white flex items-center justify-center shadow-lg`}>
            <span className="text-7xl">{character.avatarEmoji}</span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C5545]">
            Every Little Step Counts!
          </h2>
          <p className="text-base sm:text-lg text-[#5C7065] font-medium leading-relaxed">
            Thank you for playing today.<br />
            <span className="font-bold text-[#2C5545]">A brighter mind is a happier you.</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={onPlayAgain}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Play Again</span>
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
