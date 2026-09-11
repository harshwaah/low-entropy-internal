'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { storyService } from '@/features/memories/services/story-service';
import { Sparkles, Mic, Calendar, Heart, ArrowRight, BookHeart, Volume2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentNarrationsCardProps {
  maxItems?: number;
  showAllLink?: boolean;
}

export function RecentNarrationsCard({ maxItems = 3, showAllLink = true }: RecentNarrationsCardProps) {
  const [narrations] = useState<ReturnType<typeof storyService.getCaregiverNarrations>>(() => 
    storyService.getCaregiverNarrations()
  );
  const [repliedId, setRepliedId] = useState<string | null>(null);

  const handleQuickNote = (id: string) => {
    setRepliedId(id);
    setTimeout(() => setRepliedId(null), 3000);
  };

  const displayed = narrations.slice(0, maxItems);

  return (
    <div 
      id="recent-memory-narrations-section"
      className="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-primary">
            <Mic className="w-3.5 h-3.5" />
            <span>AI Memory Layer Telemetry</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-brand-dark tracking-tight">
            Recent Memory Narrations
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Oral history memoirs narrated by Meera and structured by companion Saathi
          </p>
        </div>

        <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-900 shrink-0 self-start sm:self-auto">
          {narrations.length} Stories Recorded
        </span>
      </div>

      {/* Narrations List */}
      <div className="space-y-4">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#FFFDF9] border border-amber-200/70 p-4 sm:p-5 hover:border-amber-300 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border border-amber-200 shadow-xs">
                  <Image
                    src={item.coverImage}
                    alt={item.storyTitle}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-brand-primary">
                      Story: &ldquo;{item.storyTitle}&rdquo;
                    </span>
                    <span className="rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 flex items-center gap-0.5">
                      <Volume2 className="w-2.5 h-2.5" />
                      {item.audioDuration}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-brand-dark">
                    {item.memoryTitle}
                  </h4>

                  <div className="flex items-center gap-2 text-[11px] text-brand-muted font-medium mt-0.5">
                    <Calendar className="w-3 h-3 text-brand-primary" />
                    <span>Narrated {item.date}</span>
                    <span>•</span>
                    <span>By {item.narratedBy}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <Link href={`/patient/memories/${item.memoryId}/story`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-amber-200 text-xs font-bold h-8 px-3 hover:bg-amber-50"
                  >
                    <span>Read Memoir</span>
                    <ArrowRight className="w-3 h-3 ml-1 text-brand-muted" />
                  </Button>
                </Link>

                <button
                  onClick={() => handleQuickNote(item.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-full shadow-xs transition-colors"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>{repliedId === item.id ? 'Note Sent! ❤️' : 'Love Note'}</span>
                </button>
              </div>
            </div>

            {/* Engagement Note from Saathi */}
            <div className="rounded-xl bg-amber-50/70 border border-amber-200/60 p-3 text-xs text-amber-950 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Caregiver Insight: </strong>
                <span>{item.engagementNote}</span>
              </div>
            </div>

            {/* Spoken Excerpt */}
            <p className="text-xs text-brand-muted italic line-clamp-2 px-1">
              &ldquo;{item.excerpt}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {showAllLink && (
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
          <span className="text-brand-muted font-medium">
            Stories automatically sync to the family scrapbook
          </span>
          <Link
            href="/caregiver/memories"
            className="inline-flex items-center gap-1 font-bold text-brand-dark hover:text-brand-primary transition-colors"
          >
            <span>Explore All Family Keepsakes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
