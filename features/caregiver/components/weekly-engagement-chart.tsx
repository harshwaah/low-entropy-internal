'use client';

import React from 'react';
import { WeeklyEngagementDay } from '../types';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { Mascot } from '@/components/shared/mascot';

interface WeeklyEngagementChartProps {
  data: WeeklyEngagementDay[];
}

export function WeeklyEngagementChart({ data }: WeeklyEngagementChartProps) {
  const averageScore = Math.round(
    data.filter((d) => d.score > 0).reduce((acc, curr) => acc + curr.score, 0) /
      data.filter((d) => d.score > 0).length
  );

  return (
    <div
      id="weekly-engagement-chart-card"
      className="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-brand-dark">Weekly Engagement Harmony</h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Circadian consistency, daily routine completion, and memory interaction stability.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
            7-Day Avg: {averageScore}%
          </span>
        </div>
      </div>

      {/* 7-Day Visual Bars */}
      <div className="mt-6">
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 sm:h-48 pt-6 pb-2 border-b border-slate-100">
          {data.map((day) => {
            const isToday = day.isToday;
            const heightPercent = day.score;
            return (
              <div key={day.day} className="flex flex-col items-center h-full justify-end group relative">
                
                {/* Floating Value Pill */}
                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 rounded-md bg-brand-dark px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs pointer-events-none whitespace-nowrap z-10">
                  {day.score}% • {day.routinesCompleted} routines
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-brand-primary group-hover:bg-brand-dark'
                        : 'bg-emerald-300 group-hover:bg-emerald-400'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label & Date */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-xs block font-bold ${
                      isToday ? 'text-brand-dark font-extrabold' : 'text-slate-600'
                    }`}
                  >
                    {day.day}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {day.dateFormatted}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reassurance Footer Banner */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-light-alt/80 border border-brand-border/60 p-4">
        <div className="shrink-0">
          <Mascot size="sm" state="encouraging" />
        </div>
        <div className="text-xs text-brand-text leading-relaxed">
          <p className="font-bold text-brand-dark">High Circadian Stability</p>
          <p className="text-brand-muted mt-0.5">
            Papa has maintained consistent sleep-wake times and positive routine completion across the last 7 days. Reminiscence sessions in the afternoons have reliably promoted calm evenings.
          </p>
        </div>
      </div>
    </div>
  );
}
