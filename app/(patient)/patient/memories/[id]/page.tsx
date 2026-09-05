import React from 'react';
import { notFound } from 'next/navigation';
import { 
  getMemoryById, 
  getAllMemories, 
  SAMPLE_MEMORIES 
} from '@/features/memories/data/sample-memories';
import { MemoryDetailView } from '@/features/memories/components/memory-detail-view';
import { Metadata } from 'next';

interface MemoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_MEMORIES.map((memory) => ({
    id: memory.id,
  }));
}

export async function generateMetadata({ params }: MemoryDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const memory = getMemoryById(id);

  if (!memory) {
    return {
      title: 'Memory Scrapbook | SmritiSaathi',
    };
  }

  return {
    title: `${memory.title} | SmritiSaathi Memory Scrapbook`,
    description: memory.shortDescription,
  };
}

export default async function MemoryDetailPage({ params }: MemoryDetailPageProps) {
  const { id } = await params;
  const memory = getMemoryById(id);

  if (!memory) {
    notFound();
  }

  const allMemories = getAllMemories();
  const currentIndex = allMemories.findIndex((m) => m.id === id);
  const nextMemory = allMemories[(currentIndex + 1) % allMemories.length];
  const previousMemory = allMemories[(currentIndex - 1 + allMemories.length) % allMemories.length];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <MemoryDetailView 
        memory={memory} 
        nextMemoryId={nextMemory ? nextMemory.id : undefined}
        previousMemoryId={previousMemory ? previousMemory.id : undefined}
      />
    </div>
  );
}
