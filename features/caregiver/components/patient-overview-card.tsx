'use client';

import React from 'react';
import Link from 'next/link';
import { CaregiverPatientOverview } from '../types';
import {
  Heart,
  Sparkles,
  CalendarCheck,
  BookOpen,
  Activity,
  Clock,
  ChevronRight,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { Mascot } from '@/components/shared/mascot';

interface PatientOverviewCardProps {
  patient: CaregiverPatientOverview;
}

export function PatientOverviewCard({ patient }: PatientOverviewCardProps) {
  return (
    <div
      id="caregiver-patient-overview-card"
      className="relative overflow-hidden rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
    >
      {/* Background Soft Accent Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-brand-light/60 blur-2xl pointer-events-none" />

      {/* Top Bar: Profile Header & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-light border-2 border-brand-primary/20 text-xl font-bold text-brand-dark shadow-xs">
            <span>KS</span>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-brand-border shadow-xs">
              <Smile className="h-3.5 w-3.5 text-emerald-600" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
                {patient.name}
              </h2>
              <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                {patient.preferredName} ({patient.relation})
              </span>
              <span className="text-xs text-brand-muted">
                Age {patient.age} • {patient.condition}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-primary" />
              <span>Last checked in: {patient.lastCheckInTime}</span>
            </p>
          </div>
        </div>

        {/* Prominent Live Status Indicator */}
        <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-4 py-2 text-xs font-semibold text-emerald-900 shadow-xs self-start sm:self-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-700 block font-bold">
              Current Status
            </span>
            <span className="font-bold text-brand-dark">{patient.currentStatus}</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Visual Indicators */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Today's Engagement Harmony */}
        <div className="rounded-2xl bg-brand-light-alt/80 border border-brand-border/60 p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Today&apos;s Rhythm
            </span>
            <Sparkles className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-brand-dark">
              {patient.todayEngagement}%
            </span>
            <span className="text-xs font-semibold text-emerald-700">Calm Harmony</span>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-primary transition-all duration-500"
              style={{ width: `${patient.todayEngagement}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-brand-muted">
            3 routines & 2 memories reviewed
          </p>
        </div>

        {/* Metric 2: Reminder Completion Status */}
        <div className="rounded-2xl bg-brand-light-alt/80 border border-brand-border/60 p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Reminders Status
            </span>
            <CalendarCheck className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-brand-dark">
              {patient.reminderCompletion.completed}/{patient.reminderCompletion.total}
            </span>
            <span className="text-xs font-semibold text-brand-primary">Completed Today</span>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500"
              style={{ width: `${patient.reminderCompletion.percentage}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-brand-muted">
            Next: Afternoon Scrapbook (2:30 PM)
          </p>
        </div>

        {/* Metric 3: Last Memory Viewed */}
        <div className="rounded-2xl bg-brand-light-alt/80 border border-brand-border/60 p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Last Memory Viewed
            </span>
            <BookOpen className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-sm font-bold text-brand-dark line-clamp-1">
            {patient.lastMemoryViewed.title}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-brand-muted">
            <span className="rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
              {patient.lastMemoryViewed.era}
            </span>
            <span>{patient.lastMemoryViewed.timeAgo}</span>
          </div>
          <p className="mt-2 text-[11px] text-brand-muted">
            Category: Family Keepsake
          </p>
        </div>

        {/* Metric 4: Last Activity Completed */}
        <div className="rounded-2xl bg-brand-light-alt/80 border border-brand-border/60 p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Last Activity Done
            </span>
            <Activity className="h-4 w-4 text-teal-600" />
          </div>
          <p className="mt-2 text-sm font-bold text-brand-dark line-clamp-1">
            {patient.lastActivityCompleted.title}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted">
            <span className="rounded-md bg-teal-100/80 px-1.5 py-0.5 text-[10px] font-bold text-teal-800">
              {patient.lastActivityCompleted.category}
            </span>
            <span>at {patient.lastActivityCompleted.time}</span>
          </div>
          <p className="mt-2 text-[11px] text-brand-muted">
            Assisted by companion encouragement
          </p>
        </div>
      </div>

      {/* Reassuring Companion Mascot Speech Banner */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl bg-brand-light/70 border border-brand-primary/20 p-4 sm:p-5">
        <div className="shrink-0">
          <Mascot size="sm" state="happy" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-brand-primary" />
            <span>Companion Saathi Daily Note</span>
          </div>
          <p className="mt-1 text-sm sm:text-base font-medium text-brand-text leading-relaxed">
            &ldquo;{patient.companionNote}&rdquo;
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <Link
            href="/caregiver/memories"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-dark border border-brand-border/80 shadow-xs hover:bg-brand-light transition-all"
          >
            <span>Add Memory</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/caregiver/reminders"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-dark/90 transition-all"
          >
            <span>Manage Schedule</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
