'use client';

import React from 'react';
import Link from 'next/link';
import { BookHeart, Sparkles, Heart, Plus, ArrowRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface MemoryEngagementSummaryProps {
  onOpenAddMemory?: () => void;
}

export function MemoryEngagementSummary({ onOpenAddMemory }: MemoryEngagementSummaryProps) {
  const categories = [
    { name: 'Family', count: 4, emoji: '👨‍👩‍👧', active: true },
    { name: 'Childhood', count: 3, emoji: '🏠', active: true },
    { name: 'Celebrations', count: 3, emoji: '🎂', active: true },
    { name: 'Favorite Places', count: 2, emoji: '🌳', active: false },
  ];

  return (
    <div
      id="caregiver-memory-engagement-summary"
      className="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-brand-dark">Memory Engagement</h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Reminiscence tracking, photo vault, and loved ones&apos; notes.
            </p>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-bold text-amber-800">
            12 Curated Keepsakes
          </span>
        </div>

        {/* Featured Memory Preview Card */}
        <div className="mt-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/60 p-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-amber-200 shadow-xs">
              <Image
                src="https://picsum.photos/seed/dance1998/400/300"
                alt="Kathak Dance Memory"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="rounded-md bg-amber-100/90 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Most Revisited
                </span>
                <span className="text-[11px] text-brand-muted">Revisited 5x this month</span>
              </div>
              <p className="mt-1 text-sm font-bold text-brand-dark truncate">
                Ananya&apos;s First Kathak Dance (1998)
              </p>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                &ldquo;Papa smiles each time he sees Ananya in her ghungroos...&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Category Distribution Pills */}
        <div className="mt-4">
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
            Active Reminiscence Chapters
          </p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between rounded-xl bg-brand-light-alt/80 border border-brand-border/60 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-brand-dark">
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </div>
                <span className="text-xs font-semibold text-brand-muted">{cat.count} stories</span>
              </div>
            ))}
          </div>
        </div>

        {/* Family Love Notes Counter */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-rose-50/70 border border-rose-200/60 p-3.5 text-xs text-rose-900">
          <div className="flex items-center gap-2 font-medium">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500 shrink-0" />
            <span>24 Family Love Notes contributed by 4 relatives</span>
          </div>
          <span className="font-bold text-rose-800">Priya, Ananya, Rohan</span>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        {onOpenAddMemory ? (
          <button
            type="button"
            onClick={onOpenAddMemory}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Family Memory</span>
          </button>
        ) : (
          <Link
            href="/caregiver/memories"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Family Memory</span>
          </Link>
        )}

        <Link
          href="/caregiver/memories"
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:text-brand-primary transition-colors"
        >
          <span>Memory Vault</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
