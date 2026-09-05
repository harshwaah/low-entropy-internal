import React from 'react';
import { Metadata } from 'next';
import { MemoryMatchGame } from '@/features/cognition/components';

export const metadata: Metadata = {
  title: 'Memory Match | SmritiSaathi',
  description: 'Gentle, comforting pair matching game designed for dementia care.',
};

export default function MemoryMatchPage() {
  return <MemoryMatchGame />;
}
