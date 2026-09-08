import React from 'react';
import { notFound } from 'next/navigation';
import { 
  getMemoryById, 
  getAllMemories, 
  SAMPLE_MEMORIES 
} from '@/features/memories/data/sample-memories';
import { NarrationStudio } from '@/features/memories/components/narration-studio';
import { Metadata } from 'next';

interface MemoryNarratePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_MEMORIES.map((memory) => ({
    id: memory.id,
  }));
}

export async function generateMetadata({ params }: MemoryNarratePageProps): Promise<Metadata> {
  const { id } = await params;
  const memory = getMemoryById(id);

  if (!memory) {
    return {
      title: 'Memory Narration | SmritiSaathi',
    };
  }

  return {
    title: `Narrate: ${memory.title} | SmritiSaathi Memory Scrapbook`,
    description: `Speak your cherished reflections about ${memory.title} with companion Saathi.`,
  };
}

export default async function MemoryNarratePage({ params }: MemoryNarratePageProps) {
  const { id } = await params;
  const memory = getMemoryById(id);

  if (!memory) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <NarrationStudio memory={memory} />
    </div>
  );
}
