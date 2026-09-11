'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CaregiverOnboarding } from '@/components/onboarding';

export default function CaregiverOnboardingPage() {
  const router = useRouter();

  return (
    <CaregiverOnboarding
      onComplete={() => {
        router.push('/caregiver');
      }}
    />
  );
}
