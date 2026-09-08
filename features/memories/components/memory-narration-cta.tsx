'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MemoryItem, MemoryStory } from '../types';
import { storyService } from '../services/story-service';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Mic, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';

interface MemoryNarrationCtaProps {
  memory: MemoryItem;
}

export function MemoryNarrationCta({ memory }: MemoryNarrationCtaProps) {
  const [existingStory] = useState<MemoryStory | null>(() => 
    storyService.getStoryByMemoryId(memory.id) || null
  );

  return (
    <section 
      id="tell-me-about-this-memory-section"
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFF9F0] via-[#FFF5E6] to-[#FFF0D4] p-6 sm:p-8 border-2 border-amber-200/90 shadow-md"
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-300/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-radial from-orange-300/15 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Saathi Mascot & Companion Invitation */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left flex-1">
          <div className="shrink-0">
            <Mascot
              size="md"
              state="encouraging"
              showSpeechBubble={false}
              className="drop-shadow-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-amber-300/80 text-xs font-black uppercase tracking-wider text-brand-primary shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voice Storytelling</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-snug">
              &ldquo;Would you like to tell me something about this special day?&rdquo;
            </h2>

            <p className="text-base sm:text-lg text-brand-muted font-medium max-w-xl leading-relaxed">
              Your voice brings this cherished moment to life. Speak naturally about the sights, songs, or people you remember—Saathi will weave your reflections into a treasured storybook page.
            </p>

            {existingStory && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span>Story Saved: &ldquo;{existingStory.storyTitle}&rdquo;</span>
                </span>
                <span className="text-xs text-brand-muted font-semibold">
                  {existingStory.formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Primary Call to Action Button */}
        <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link 
            href={`/patient/memories/${memory.id}/narrate`}
            className="w-full sm:w-auto"
            id="tell-memory-narrate-btn"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-16 px-8 rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3.5 border-2 border-white/40 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mic className="w-6 h-6 animate-pulse" />
              </div>
              <span>{existingStory ? 'Tell Another Story' : 'Tell Me About This Memory'}</span>
            </Button>
          </Link>

          {existingStory && (
            <Link 
              href={`/patient/memories/${memory.id}/story`}
              className="w-full sm:w-auto"
              id="view-saved-story-btn"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-13 px-6 rounded-full bg-white hover:bg-amber-50 text-brand-dark font-bold text-base border-2 border-amber-200 shadow-xs flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-brand-primary" />
                <span>Read Treasured Story</span>
                <ArrowRight className="w-4 h-4 text-brand-muted" />
              </Button>
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
