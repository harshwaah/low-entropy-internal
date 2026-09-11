'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface MemorySavedProps {
  onContinueJourney: () => void;
  onViewMemoryBook: () => void;
}

export function MemorySaved({ onContinueJourney, onViewMemoryBook }: MemorySavedProps) {
  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">

      <div />

      <div className="space-y-6 max-w-md mx-auto my-auto w-full">
        {/* Sparkle Heading */}
        <div className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-[#2C5545]">
          <span>Memory Saved!</span>
          <Sparkles className="w-8 h-8 text-amber-500 fill-amber-400" />
        </div>

        {/* Open Memory Book Illustration */}
        <div className="mx-auto w-56 h-44 sm:w-64 sm:h-48 bg-[#FFF9F2] border-4 border-[#E8D7C3] rounded-3xl p-4 shadow-md flex items-center justify-between relative overflow-hidden">
          {/* Spine */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-[#D9C4AC]" />

          {/* Left Page (Photo) */}
          <div className="w-[45%] h-full bg-[#FAF3EB] border border-[#E8D7C3] rounded-xl p-2 flex flex-col items-center justify-center space-y-1 shadow-xs">
            <div className="w-16 h-12 bg-[#4A8B71]/20 rounded-lg flex items-center justify-center text-2xl">
              🖼️
            </div>
            <div className="w-12 h-1.5 bg-[#DCE5E0] rounded-full" />
            <div className="w-8 h-1 bg-[#DCE5E0] rounded-full" />
          </div>

          {/* Right Page (Story lines) */}
          <div className="w-[45%] h-full bg-white border border-[#E8D7C3] rounded-xl p-3 flex flex-col justify-center space-y-2 shadow-xs">
            <div className="w-full h-2 bg-[#4A8B71]/30 rounded-full" />
            <div className="w-4/5 h-2 bg-[#5C7065]/20 rounded-full" />
            <div className="w-full h-2 bg-[#5C7065]/20 rounded-full" />
            <div className="w-3/4 h-2 bg-[#5C7065]/20 rounded-full" />
          </div>
        </div>

        <p className="text-lg sm:text-xl text-[#5C7065] font-bold leading-relaxed">
          Your story is now a part of<br />
          <span className="text-[#2C5545]">your Memory Book.</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full pt-4">
        <Button
          size="lg"
          onClick={onContinueJourney}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>

        <Button
          variant="outline"
          onClick={onViewMemoryBook}
          className="w-full h-14 rounded-full text-lg font-bold border-2 border-[#4A8B71] text-[#2C5545] hover:bg-[#E8F3EB] flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-[#4A8B71]" />
          <span>View My Memory Book</span>
        </Button>
      </div>

    </div>
  );
}
