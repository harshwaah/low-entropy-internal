'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PractitionerOnboarding } from '@/components/onboarding';

export default function PractitionerOnboardingPage() {
  const router = useRouter();

  return (
    <PractitionerOnboarding
      onComplete={() => {
        router.push('/practitioner');
      }}
    />
  );
}
