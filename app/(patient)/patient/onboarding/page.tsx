'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PatientOnboarding } from '@/components/onboarding';

export default function PatientOnboardingPage() {
  const router = useRouter();

  return (
    <PatientOnboarding
      onComplete={() => {
        router.push('/patient');
      }}
    />
  );
}
