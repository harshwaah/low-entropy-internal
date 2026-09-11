'use client';

import React from 'react';
import { GameCharacter } from '../types';
import { Button } from '@/components/ui/button';
import { Sparkles, Check } from 'lucide-react';

interface CharacterUnlockProps {
  unlockedCharacter: GameCharacter | null;
  onUseCharacter: (charId: string) => void;
  onContinue: () => void;
}

export function CharacterUnlock({
  unlockedCharacter,
  onUseCharacter,
  onContinue,
}: CharacterUnlockProps) {
  if (!unlockedCharacter) return null;

  const handleUse = () => {
    onUseCharacter(unlockedCharacter.id);
    onContinue();
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Sparkle Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#2C5545]">
            <Sparkles className="w-7 h-7 text-amber-500 fill-amber-400" />
            <span>New Friend Unlocked!</span>
          </div>
          <p className="text-sm font-bold text-[#5C7065]">
            You&apos;ve reached Level {unlockedCharacter.unlockLevel}!
          </p>
        </div>

        {/* Big Unlocked Character Card */}
        <div className="bg-[#FAF3EB] border-4 border-[#F2DFCD] rounded-3xl p-6 shadow-md flex flex-col items-center space-y-3">
          <div className={`w-32 h-32 rounded-full ${unlockedCharacter.headBgClass} border-4 border-white flex items-center justify-center shadow-lg animate-bounce`}>
            <span className="text-7xl">{unlockedCharacter.avatarEmoji}</span>
          </div>
          <h3 className="text-2xl font-black text-[#2C5545]">
            Meet {unlockedCharacter.name}!
          </h3>
          <p className="text-sm font-bold text-[#5C7065] max-w-xs">
            {unlockedCharacter.description}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={handleUse}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-6 h-6" />
          <span>Use This Character</span>
        </Button>

        <Button
          variant="outline"
          onClick={onContinue}
          className="w-full h-14 rounded-full text-lg font-bold border-2 border-[#4A8B71] text-[#2C5545] hover:bg-[#E8F3EB] cursor-pointer"
        >
          Maybe Later
        </Button>
      </div>

    </div>
  );
}
