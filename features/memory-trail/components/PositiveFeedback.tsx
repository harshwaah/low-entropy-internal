'use client';

import React from 'react';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

interface PositiveFeedbackProps {
  onContinue: () => void;
}

export function PositiveFeedback({ onContinue }: PositiveFeedbackProps) {
  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-6 py-8 bg-[#FDFBF7] text-[#2C5545] text-center animate-in fade-in duration-300">
      
      <div />

      {/* Center Mascot & Celebrating Hearts */}
      <div className="relative flex flex-col items-center justify-center my-6">
        
        {/* Floating Pink Hearts */}
        <div className="absolute top-2 left-10 text-red-400 text-2xl animate-bounce">❤️</div>
        <div className="absolute top-0 right-12 text-pink-400 text-3xl animate-pulse">💖</div>
        <div className="absolute bottom-4 left-14 text-rose-400 text-xl animate-pulse">💕</div>
        <div className="absolute bottom-2 right-10 text-red-500 text-2xl animate-bounce">❤️</div>

        {/* Soft background glow */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-b from-[#E8F3EB] via-[#F3F8F5] to-[#E2EFE6] flex items-center justify-center relative shadow-xs overflow-hidden border border-[#DCE5E0]">
          <Mascot
            size="lg"
            state="celebrating"
            className="z-10 transform scale-105"
          />
        </div>
      </div>

      {/* Message & Supporting Text */}
      <div className="space-y-3 max-w-md mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C5545] tracking-tight">
          That&apos;s a lovely memory!
        </h2>
        <p className="text-lg sm:text-xl text-[#5C7065] font-medium leading-relaxed">
          Thank you for sharing that with me.<br />
          <span className="font-bold text-[#2C5545]">Every memory you share is special.</span>
        </p>
      </div>

      {/* Primary Button */}
      <div className="max-w-md mx-auto w-full pt-6">
        <Button
          size="lg"
          onClick={onContinue}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
