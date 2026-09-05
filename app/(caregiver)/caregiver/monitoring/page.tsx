'use client';

import React, { useState } from 'react';
import {
  InsightMetricsCards,
  WeeklyEngagementChart,
  RecentActivityStream,
} from '@/features/caregiver';
import {
  SAMPLE_WEEKLY_ENGAGEMENT,
  SAMPLE_ACTIVITY_LOGS,
} from '@/features/caregiver/data/sample-caregiver-data';
import {
  LineChart,
  Activity,
  Sparkles,
  Heart,
  Calendar,
  ShieldCheck,
  Smile,
  Compass,
} from 'lucide-react';
import { Mascot } from '@/components/shared/mascot';

export default function CaregiverMonitoringPage() {
  const [weeklyData] = useState(SAMPLE_WEEKLY_ENGAGEMENT);
  const [activities] = useState(SAMPLE_ACTIVITY_LOGS);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <LineChart className="h-4 w-4" />
            <span>Circadian & Cognitive Wellness Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-0.5">
            Activity Monitoring & Trends
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Empathetic observation of daily rhythms, gentle routine adherence, and reminiscence receptivity.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-800 self-start sm:self-auto">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Patient State: Calm & Well-Oriented</span>
        </div>
      </div>

      {/* 1. Caregiver Insight Cards */}
      <section aria-label="Insight Key Metrics">
        <InsightMetricsCards
          activitiesCount={4}
          weeklyEngagementScore={88}
          memoryInteractionsCount={8}
          missedRemindersCount={0}
        />
      </section>

      {/* 2. Weekly Engagement Chart */}
      <section aria-label="Weekly Engagement Chart">
        <WeeklyEngagementChart data={weeklyData} />
      </section>

      {/* 3. Detailed Telemetry and Observation Log */}
      <section aria-label="Daily Routine Breakdown" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityStream activities={activities} />
        </div>

        {/* Geriatric Cognitive Comfort Summary */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white border border-brand-border/80 p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                <Compass className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-dark">Rhythm Analysis</h3>
                <p className="text-[11px] text-brand-muted">Observed by companion interactions</p>
              </div>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-brand-text">
              <div className="rounded-2xl bg-brand-light-alt/80 p-3.5">
                <div className="flex items-center justify-between font-bold text-brand-dark">
                  <span>Sundowning Vulnerability</span>
                  <span className="text-emerald-700 font-semibold">Low / Minimal</span>
                </div>
                <p className="mt-1 text-brand-muted text-[11px] leading-relaxed">
                  Afternoon reminiscence sessions at 2:30 PM significantly mitigate late afternoon restlessness and disorientation.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-light-alt/80 p-3.5">
                <div className="flex items-center justify-between font-bold text-brand-dark">
                  <span>Hydration Rhythm</span>
                  <span className="text-emerald-700 font-semibold">Consistently Good</span>
                </div>
                <p className="mt-1 text-brand-muted text-[11px] leading-relaxed">
                  Papa responded warmly to the mid-morning tender coconut water reminder without prompt fatigue.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-light-alt/80 p-3.5">
                <div className="flex items-center justify-between font-bold text-brand-dark">
                  <span>Auditory Nostalgia Effect</span>
                  <span className="text-brand-primary font-semibold">Highly Effective</span>
                </div>
                <p className="mt-1 text-brand-muted text-[11px] leading-relaxed">
                  Morning sitar music and birdsong audio induced immediate smiling and relaxation during balcony tea.
                </p>
              </div>
            </div>
          </div>

          {/* Supportive Mascot Tip */}
          <div className="rounded-3xl bg-emerald-50/70 border border-emerald-200/80 p-5 flex items-center gap-3.5">
            <div className="shrink-0">
              <Mascot size="sm" state="holding-heart" />
            </div>
            <div className="text-xs text-emerald-950 leading-relaxed">
              <p className="font-bold">Caregiver Self-Care Reminder</p>
              <p className="text-emerald-800 mt-0.5">
                Remember to take a 15-minute breather for yourself today, Priya. You are doing a wonderful job caring for Papa.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
