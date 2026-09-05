'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';

interface ActivityCompletionCardProps {
  activityTitle: string;
  celebrationTitle?: string;
  celebrationMessage: string;
  companionSpeech?: React.ReactNode;
  statBadgeText?: string;
  onReplay: () => void;
  replayLabel?: string;
  nextActivityHref?: string;
  nextActivityLabel?: string;
}

export function ActivityCompletionCard({
  activityTitle,
  celebrationTitle = 'Joyful Job, Meera!',
  celebrationMessage,
  companionSpeech = <>You did wonderfully!<br/>I loved playing with you! 🌸</>,
  statBadgeText = 'Mindful Moment Completed',
  onReplay,
  replayLabel = 'Play Another Round',
  nextActivityHref = '/patient/activities',
  nextActivityLabel = 'Explore More Activities',
}: ActivityCompletionCardProps) {
  return (
    <div className="bg-gradient-to-b from-brand-light-alt via-white to-brand-light-alt/60 rounded-[2.5rem] p-6 sm:p-8 border-2 border-brand-primary/20 shadow-md text-center space-y-6 animate-in zoom-in-95 duration-500">
      {/* Companion in Celebrating State */}
      <div className="pt-2">
        <Mascot
          size="lg"
          state="celebrating"
          showSpeechBubble={true}
          speechPosition="top-right"
          speechText={companionSpeech}
          className="mb-2"
        />
      </div>

      {/* Celebration Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-extrabold tracking-wide">
          <Sparkles className="w-4 h-4" />
          <span>{statBadgeText}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
          {celebrationTitle}
        </h2>

        <p className="text-lg sm:text-xl text-brand-muted font-medium max-w-md mx-auto leading-relaxed">
          {celebrationMessage}
        </p>
      </div>

      {/* Reassuring Positive Impact Note */}
      <div className="bg-white/80 rounded-2xl p-4 border border-brand-border/60 max-w-sm mx-auto shadow-sm flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-accent-yellow flex items-center justify-center text-lg">
          ☀️
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-brand-dark">Mind Kept Bright & Active</p>
          <p className="text-xs text-brand-muted font-semibold">Every gentle activity sparks comfort and focus.</p>
        </div>
      </div>

      {/* Action Buttons: Large touch targets */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          size="lg"
          onClick={onReplay}
          className="w-full sm:w-auto min-w-[200px] h-16 rounded-full text-lg font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2.5"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          <span>{replayLabel}</span>
        </Button>

        <Link href={nextActivityHref} className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-16 rounded-full text-lg font-bold bg-white hover:bg-brand-light-alt text-brand-dark border-2 border-brand-border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2.5"
          >
            <span>{nextActivityLabel}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
