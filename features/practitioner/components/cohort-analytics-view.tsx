'use client';

import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Sparkles,
  Calendar,
  ShieldCheck,
  Heart,
  Music,
  Clock,
  Sun,
  Sunset,
  Moon,
  Coffee,
} from 'lucide-react';
import { CohortAnalyticsSummary } from '../types';

interface CohortAnalyticsViewProps {
  analytics: CohortAnalyticsSummary;
}

export function CohortAnalyticsView({ analytics }: CohortAnalyticsViewProps) {
  const [activeMetric, setActiveMetric] = useState<'all' | 'memory' | 'routine'>('all');

  return (
    <div id="cohort-analytics-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-blue-700" />
            <span>Cohort Cognitive & Adherence Analytics</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective longitudinal telemetry aggregated across active SmritiSaathi patient companions.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveMetric('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Combined View
          </button>
          <button
            onClick={() => setActiveMetric('memory')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'memory'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Memory Scores
          </button>
          <button
            onClick={() => setActiveMetric('routine')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeMetric === 'routine'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Routine Adherence
          </button>
        </div>
      </div>

      {/* Main Trends & Circadian Adherence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 7-Day Visual Trends */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  7-Day Longitudinal Stability Index
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily tracking of memory interaction fluency vs scheduled routine adherence.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                {(activeMetric === 'all' || activeMetric === 'memory') && (
                  <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span>Memory ({analytics.averageMemoryActivity}%)</span>
                  </div>
                )}
                {(activeMetric === 'all' || activeMetric === 'routine') && (
                  <div className="flex items-center gap-1.5 text-teal-700 font-medium">
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                    <span>Routines ({analytics.averageRoutineAdherence}%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-52 pt-6 pb-2 border-b border-slate-100">
                {analytics.weeklyTrends.map((trend) => (
                  <div
                    key={trend.day}
                    className="flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Hover Tooltip */}
                    <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-mono font-bold text-white shadow-md pointer-events-none whitespace-nowrap z-20">
                      {trend.day}: Mem {trend.memoryScore}% • Rout {trend.routineScore}%
                    </div>

                    {/* Dual / Stacked Visual Bars */}
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                      {(activeMetric === 'all' || activeMetric === 'memory') && (
                        <div className="w-full max-w-[18px] bg-amber-50 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                          <div
                            className="w-full rounded-t-lg bg-amber-500 group-hover:bg-amber-600 transition-all duration-300"
                            style={{ height: `${trend.memoryScore}%` }}
                          />
                        </div>
                      )}
                      {(activeMetric === 'all' || activeMetric === 'routine') && (
                        <div className="w-full max-w-[18px] bg-teal-50 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                          <div
                            className="w-full rounded-t-lg bg-teal-600 group-hover:bg-teal-700 transition-all duration-300"
                            style={{ height: `${trend.routineScore}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Day Label */}
                    <span className="mt-2 text-xs font-semibold text-slate-600">
                      {trend.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Cohort preservation variance: ±2.4% (Within expected baseline)
                </span>
                <span>Values updated hourly</span>
              </div>
            </div>
          </div>

          {/* Key Observation Note */}
          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Clinical Interpretation:</span> Weekend memory interaction surges (+5%) align with scheduled family video calls and active caregiver photo uploads.
          </div>
        </div>

        {/* Right Col: Circadian Adherence Windows */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Circadian Routine Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Adherence broken down by circadian temporal gates.
            </p>

            <div className="mt-5 space-y-3.5">
              {/* Morning */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>Morning Window (08:00 - 11:00)</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    94.2%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Morning medication & breakfast chai prompt.
                </p>
              </div>

              {/* Afternoon */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Coffee className="h-4 w-4 text-amber-700" />
                    <span>Afternoon Window (12:30 - 15:30)</span>
                  </div>
                  <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    86.5%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Hydration reminders and nostalgic scrapbook browse.
                </p>
              </div>

              {/* Dusk / Sundowning */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-amber-900">
                    <Sunset className="h-4 w-4 text-amber-600" />
                    <span>Dusk Sundowning (17:00 - 19:00)</span>
                  </div>
                  <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                    78.1%
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  Higher variance zone; calming audio mitigates agitation.
                </p>
              </div>

              {/* Bedtime */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Moon className="h-4 w-4 text-indigo-500" />
                    <span>Bedtime Window (20:30 - 22:00)</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    88.4%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bedtime routine completion and sleep audio chimes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Time intervals tailored to dementia circadian rhythms</span>
          </div>
        </div>
      </div>

      {/* Therapeutic Modality Distribution & Weekly Wellbeing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Modality 1 */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Reminiscence Therapy
            </span>
            <span className="font-mono font-bold text-slate-900 text-sm">42%</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-3">
            Autobiographical Scrapbooks
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Revisiting wedding archives, vintage hometown landmarks, and family photographs with vocal accompaniment.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }} />
          </div>
        </div>

        {/* Modality 2 */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Circadian Anchoring
            </span>
            <span className="font-mono font-bold text-slate-900 text-sm">34%</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-3">
            Autonomous Daily Routines
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Prompted medication taking, morning tea rituals, hydration verification, and simple guided physical stretches.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '34%' }} />
          </div>
        </div>

        {/* Modality 3 */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Sensory Regulation
            </span>
            <span className="font-mono font-bold text-slate-900 text-sm">24%</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-3">
            Calming Auditory Therapy
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Classical ragas, sitar recordings, temple bells, and family vocal messages configured to mitigate sensory overload.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '24%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
