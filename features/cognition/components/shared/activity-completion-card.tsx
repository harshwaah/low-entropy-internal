'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { usePatientTranslation } from '@/features/patient-i18n';

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
  celebrationTitle,
  celebrationMessage,
  companionSpeech,
  statBadgeText,
  onReplay,
  replayLabel,
  nextActivityHref = '/patient/activities',
  nextActivityLabel,
}: ActivityCompletionCardProps) {
  const { t } = usePatientTranslation();

  const finalTitle = celebrationTitle || t('cognition.wellDone');
  const finalSpeech = companionSpeech || t('cognition.keepGoing');
  const finalBadge = statBadgeText || t('cognition.activityCompleted');
  const finalReplay = replayLabel || t('quickPick.playAgain');
  const finalNext = nextActivityLabel || t('quickPick.backToActivities');

  return (
    <div className="bg-gradient-to-b from-brand-light-alt via-white to-brand-light-alt/60 rounded-[2.5rem] p-6 sm:p-8 border-2 border-brand-primary/20 shadow-md text-center space-y-6 animate-in zoom-in-95 duration-500">
      {/* Companion in Celebrating State */}
      <div className="pt-2">
        <Mascot
          size="lg"
          state="celebrating"
          showSpeechBubble={true}
          speechPosition="top-right"
          speechText={finalSpeech}
          className="mb-2"
        />
      </div>

      {/* Celebration Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-extrabold tracking-wide">
          <Sparkles className="w-4 h-4" />
          <span>{finalBadge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
          {finalTitle}
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
          <p className="text-sm font-bold text-brand-dark">{t('activities.progressTitle')}</p>
          <p className="text-xs text-brand-muted font-semibold">{t('activities.subtitle')}</p>
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
          <span>{finalReplay}</span>
        </Button>

        <Link href={nextActivityHref} className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-16 rounded-full text-lg font-bold bg-white hover:bg-brand-light-alt text-brand-dark border-2 border-brand-border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2.5"
          >
            <span>{finalNext}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
