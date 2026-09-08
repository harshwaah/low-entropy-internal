'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MemoryStory } from '../types';
import { storyService } from '../services/story-service';
import { Sparkles, BookHeart, Calendar, Volume2, ArrowRight, Heart, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MyStoriesSection() {
  const [stories] = useState<MemoryStory[]>(() => storyService.getAllStories());

  return (
    <section id="my-stories-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E6D8] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Memory Layer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            My Stories
          </h2>
          <p className="text-sm font-medium text-brand-muted mt-0.5">
            Cherished personal memoirs narrated in your own voice and woven by companion Saathi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold shadow-xs">
            <BookHeart className="w-3.5 h-3.5 text-brand-primary" />
            <span>{stories.length} Treasured Keepsakes</span>
          </span>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <article
            key={story.id}
            className="group relative bg-[#FFFDF9] rounded-[2.5rem] p-5 border-2 border-[#EFE5D5] hover:border-amber-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Top washi tape accent */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-100/90 border border-amber-200/80 rounded-xs rotate-[-1deg] pointer-events-none" />

            <div className="space-y-4">
              {/* Image & Audio Duration Badge */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-amber-50 border border-[#EAE0CE]">
                <Image
                  src={story.coverImage}
                  alt={story.storyTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Audio Badge */}
                <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold">
                  <Volume2 className="w-3 h-3 text-amber-300" />
                  <span>{story.audioDuration || '1:45'}</span>
                </div>

                <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-amber-950 text-[10px] font-extrabold border border-amber-200">
                  <Mic className="w-3 h-3 text-brand-primary" />
                  <span>Narrated by Meera</span>
                </div>
              </div>

              {/* Memory Context Pill */}
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-brand-muted">
                <span className="truncate">
                  From: &ldquo;{story.memoryTitle}&rdquo;
                </span>
                <span className="shrink-0 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-primary" />
                  {story.formattedDate}
                </span>
              </div>

              {/* Story Title */}
              <h3 className="text-xl font-extrabold text-brand-dark tracking-tight leading-snug group-hover:text-brand-primary transition-colors font-serif">
                {story.storyTitle}
              </h3>

              {/* Pull quote excerpt */}
              <p className="text-xs sm:text-sm text-brand-muted italic line-clamp-3 leading-relaxed">
                &ldquo;{story.transcriptExcerpt}&rdquo;
              </p>
            </div>

            {/* Card Footer Action */}
            <div className="mt-5 pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                ✦ {story.keyPhrases[0] || 'Cherished Reflection'}
              </span>

              <Link href={`/patient/memories/${story.memoryId}/story`}>
                <Button
                  size="sm"
                  className="rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold px-4 h-9 shadow-xs group-hover:shadow-sm"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
