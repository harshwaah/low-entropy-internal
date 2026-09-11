'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMemoryById } from '@/features/memories/data/sample-memories';
import { getNarrationTemplateForMemory } from '@/features/memories/data/sample-stories';
import { storyService } from '@/features/memories/services/story-service';
import { MemoryStory } from '@/features/memories/types';
import { StoryMemoirView } from '@/features/memories/components/story-memoir-view';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Mic } from 'lucide-react';
import Link from 'next/link';
import { usePatientTranslation } from '@/features/patient-i18n';

export default function MemoryStoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { t } = usePatientTranslation();
  
  const [story] = useState<MemoryStory | null>(() => {
    if (!id) return null;
    let found = storyService.getStoryByMemoryId(id);
    if (!found) {
      const memory = getMemoryById(id);
      if (memory) {
        const template = getNarrationTemplateForMemory(memory.id, memory.title);
        const fallbackStory: MemoryStory = {
          id: `story-${memory.id}-default`,
          memoryId: memory.id,
          memoryTitle: memory.title,
          storyTitle: template.generatedStoryTitle,
          narratedBy: 'Meera Sharma',
          narratedRole: 'Narrated with Saathi',
          recordedAt: new Date().toISOString(),
          formattedDate: 'Cherished Moment',
          category: memory.category,
          coverImage: memory.coverImage,
          location: memory.location || 'India',
          yearEra: memory.dateEra || 'Treasured Years',
          transcriptExcerpt: template.mockSpokenTranscript,
          narrativeParagraphs: template.generatedStoryChapters,
          emotionalTakeaway: template.emotionalTakeaway,
          keyPhrases: template.keyPhrases,
          peopleMentioned: memory.familiarPeople?.length ? memory.familiarPeople : template.peopleMentioned,
          audioDuration: '1:45',
          caregiverNote: `Meera spoke with great tenderness about "${memory.title}".`,
          practitionerEngagement: {
            verbalParticipation: 'High',
            emotionalResonance: 'Deeply Joyful',
            sessionDurationSeconds: 150,
            promptResponseLatency: 'Natural',
          },
        };
        storyService.saveStory(fallbackStory);
        found = fallbackStory;
      }
    }
    return found || null;
  });

  if (!story) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-dark">{t('memories.noStoryTitle')}</h2>
        <p className="text-brand-muted">{t('memories.noStoryDesc')}</p>
        <Link href={`/patient/memories/${id}/narrate`}>
          <Button className="rounded-full bg-brand-primary text-white font-bold px-6 py-3">
            <Mic className="w-4 h-4 mr-2" />
            <span>{t('memories.tellMeAboutThisMemory')}</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <StoryMemoirView story={story} />
    </div>
  );
}
