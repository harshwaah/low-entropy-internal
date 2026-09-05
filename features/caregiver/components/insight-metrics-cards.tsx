'use client';

import React from 'react';
import { Activity, Sparkles, BookHeart, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface InsightMetricsCardsProps {
  activitiesCount?: number;
  weeklyEngagementScore?: number;
  memoryInteractionsCount?: number;
  missedRemindersCount?: number;
}

export function InsightMetricsCards({
  activitiesCount = 4,
  weeklyEngagementScore = 88,
  memoryInteractionsCount = 8,
  missedRemindersCount = 0,
}: InsightMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Activities Completed Today */}
      <div
        id="insight-card-activities-completed"
        className="rounded-3xl bg-white border border-brand-border/80 p-5 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Activities Today
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Activity className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-brand-dark">{activitiesCount}</span>
          <span className="text-xs font-semibold text-teal-700">Completed</span>
        </div>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">
          Morning walk, tea check-in, sitar music, and reminiscence.
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50/80 rounded-lg px-2 py-1">
          <CheckCircle2 className="h-3 w-3" />
          <span>All morning routines on track</span>
        </div>
      </div>

      {/* 2. Weekly Engagement */}
      <div
        id="insight-card-weekly-engagement"
        className="rounded-3xl bg-white border border-brand-border/80 p-5 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Weekly Engagement
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-brand-dark">{weeklyEngagementScore}%</span>
          <span className="text-xs font-semibold text-emerald-700">+4% vs last week</span>
        </div>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">
          Strong routine participation and active companion check-ins.
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50/80 rounded-lg px-2 py-1">
          <ShieldCheck className="h-3 w-3" />
          <span>High cognitive comfort</span>
        </div>
      </div>

      {/* 3. Memory Interactions */}
      <div
        id="insight-card-memory-interactions"
        className="rounded-3xl bg-white border border-brand-border/80 p-5 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Memory Interactions
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <BookHeart className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-brand-dark">{memoryInteractionsCount}</span>
          <span className="text-xs font-semibold text-amber-800">Moments this week</span>
        </div>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">
          Top chapter: Family & Celebrations. 24 family notes loved.
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50/80 rounded-lg px-2 py-1">
          <HeartHandshake className="h-3 w-3" />
          <span>Ananya&apos;s dance most cherished</span>
        </div>
      </div>

      {/* 4. Missed Reminders (Zero Panic / Calm Indicator) */}
      <div
        id="insight-card-missed-reminders"
        className="rounded-3xl bg-white border border-brand-border/80 p-5 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
            Missed Reminders
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-brand-dark">{missedRemindersCount}</span>
          <span className="text-xs font-semibold text-emerald-700">0 Missed Today</span>
        </div>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">
          1 routine gently shifted yesterday with peaceful afternoon rest.
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-1">
          <span>98% medication compliance rate</span>
        </div>
      </div>

    </div>
  );
}
