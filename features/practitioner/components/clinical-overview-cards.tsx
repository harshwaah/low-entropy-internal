'use client';

import React from 'react';
import { Users, Activity, CheckCircle2, AlertCircle, ArrowUpRight, TrendingUp } from 'lucide-react';
import { CohortAnalyticsSummary } from '../types';

interface ClinicalOverviewCardsProps {
  analytics: CohortAnalyticsSummary;
  patientCount: number;
}

export function ClinicalOverviewCards({
  analytics,
  patientCount,
}: ClinicalOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Active Cohort Roster */}
      <div
        id="cohort-roster-metric-card"
        className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-blue-300/80 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Active Cohort
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {patientCount}
          </span>
          <span className="text-xs font-semibold text-slate-500">Patients</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>+2 onboarded this quarter</span>
        </div>
      </div>

      {/* Metric 2: Average Engagement Score */}
      <div
        id="cohort-engagement-metric-card"
        className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-emerald-300/80 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Engagement Harmony
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Activity className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {analytics.averageEngagement.toFixed(1)}%
          </span>
          <span className="text-xs font-semibold text-emerald-700">Cohort Mean</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          <span>+3.2% preservation index</span>
        </div>
      </div>

      {/* Metric 3: Routine Adherence */}
      <div
        id="cohort-adherence-metric-card"
        className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-teal-300/80 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Routine Adherence
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {analytics.averageRoutineAdherence.toFixed(1)}%
          </span>
          <span className="text-xs font-semibold text-teal-700">On-Time</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <span className="h-2 w-2 rounded-full bg-teal-500" />
          <span>High morning compliance</span>
        </div>
      </div>

      {/* Metric 4: Clinical Review Items */}
      <div
        id="cohort-attention-metric-card"
        className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-amber-300/80 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Clinical Reviews
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {analytics.observationsNeedingReview}
          </span>
          <span className="text-xs font-semibold text-amber-700">Pending</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-800 font-medium">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>1 sundowning pattern note</span>
        </div>
      </div>
    </div>
  );
}
