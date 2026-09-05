import React from 'react';
import { Metadata } from 'next';
import { WhatComesNextGame } from '@/features/cognition/components';

export const metadata: Metadata = {
  title: 'What Comes Next? | SmritiSaathi',
  description: 'Reassuring daily routine sequencing activity for dementia care.',
};

export default function WhatComesNextPage() {
  return <WhatComesNextGame />;
}
