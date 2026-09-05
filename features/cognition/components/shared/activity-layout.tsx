'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mascot, MascotState } from '@/components/shared/mascot';

interface ActivityLayoutProps {
  title: string;
  subtitle: string;
  categoryName?: string;
  companionState?: MascotState;
  companionMessage?: React.ReactNode;
  backHref?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
}

export function ActivityLayout({
  title,
  subtitle,
  categoryName,
  companionState = 'happy',
  companionMessage,
  backHref = '/patient/activities',
  actionButton,
  children,
}: ActivityLayoutProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Header with accessible touch-target back button */}
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
            aria-label="Return to Gentle Activities"
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white shadow-sm border border-brand-border hover:bg-brand-light-alt text-brand-dark transition-transform active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </Button>
          </Link>

          <div>
            {categoryName && (
              <span className="inline-block text-xs sm:text-sm font-black uppercase tracking-wider text-brand-primary mb-0.5">
                {categoryName}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-brand-muted font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {actionButton && (
          <div className="shrink-0">
            {actionButton}
          </div>
        )}
      </header>

      {/* Gentle Companion Banner / Guidance Card */}
      {companionMessage && (
        <section
          aria-label="Companion Guidance"
          className="bg-brand-light-alt border border-brand-border/60 rounded-3xl p-4 sm:p-5 flex items-center gap-4 shadow-sm"
        >
          <div className="shrink-0">
            <Mascot size="sm" state={companionState} />
          </div>
          <div className="flex-1 text-sm sm:text-base text-brand-dark font-semibold leading-relaxed">
            {companionMessage}
          </div>
        </section>
      )}

      {/* Main Interactive Stage */}
      <main className="space-y-6">
        {children}
      </main>

      {/* Calm Grounding Reassurance */}
      <footer className="text-center pt-4 pb-2">
        <p className="text-xs sm:text-sm text-brand-muted font-semibold flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4 text-brand-accent-orange fill-brand-accent-orange" />
          <span>Take all the time you need. No clocks, no rush, pure enjoyment.</span>
        </p>
      </footer>
    </div>
  );
}
