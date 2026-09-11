'use client';

import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

export default function MemoryNotFound() {
  const { t } = usePatientTranslation();

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6">
      <Mascot
        size="lg"
        state="encouraging"
        showSpeechBubble={true}
        speechPosition="top-right"
        speechText={t('memories.speechBubbleReturn')}
      />

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-brand-dark">
          {t('memories.notFoundTitle')}
        </h1>
        <p className="text-lg text-brand-muted font-medium">
          {t('memories.notFoundDesc')}
        </p>
      </div>

      <Link href="/patient/memories">
        <Button size="lg" className="rounded-full text-base h-14 px-8 font-bold shadow-md hover:scale-105 transition-all">
          <BookOpen className="w-5 h-5 mr-2" />
          {t('memories.backToScrapbook')}
        </Button>
      </Link>
    </div>
  );
}
