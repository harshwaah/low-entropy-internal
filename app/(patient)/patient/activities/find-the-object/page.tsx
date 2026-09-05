import React from 'react';
import { Metadata } from 'next';
import { FindTheObjectGame } from '@/features/cognition/components';

export const metadata: Metadata = {
  title: 'Find The Object | SmritiSaathi',
  description: 'Scene-based mindful visual recognition activity for dementia care.',
};

export default function FindTheObjectPage() {
  return <FindTheObjectGame />;
}
