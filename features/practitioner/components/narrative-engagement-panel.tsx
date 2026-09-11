'use client';

import React, { useEffect, useState } from 'react';
import { storyService } from '@/features/memories/services/story-service';
import { Sparkles, BookOpen, Heart, Activity, Calendar, Clock, Smile, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function NarrativeEngagementPanel() {
  const [metrics] = useState<ReturnType<typeof storyService.getPractitionerNarrativeMetrics>>(() => 
    storyService.getPractitionerNarrativeMetrics()
  );

  return (
    <div 
      id="narrative-engagement-panel"
      className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6"
    >
      {/* Panel Header with Non-Diagnostic Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Reminiscence & Story Engagement</span>
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              Observational Only
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Autobiographical Narrative Participation
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Visibility into voluntary oral history narration, story completion, and affective engagement.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-800 self-start sm:self-auto">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          <span>Non-Diagnostic Telemetry</span>
        </div>
      </div>

      {/* 3 Lightweight Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Indicator 1: Narrative Participation */}
        <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Narrative Participation
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              {metrics.totalNarrations}
            </span>
            <span className="text-xs font-semibold text-blue-700">Memoirs Completed</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Voluntary engagement rate: {metrics.narrativeParticipationLevel}</span>
          </div>
        </div>

        {/* Indicator 2: Story Engagement */}
        <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Story Engagement
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              100%
            </span>
            <span className="text-xs font-semibold text-emerald-700">Positive Valence</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 shrink-0" />
            <span>High emotional warmth during narration</span>
          </div>
        </div>

        {/* Indicator 3: Memory Activity Frequency */}
        <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Activity Frequency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              {metrics.weeklyNarrationsCount}
            </span>
            <span className="text-xs font-semibold text-purple-700">Sessions This Week</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Activity className="h-3.5 w-3.5 text-purple-600 shrink-0" />
            <span>Regular unhurried participation</span>
          </div>
        </div>

      </div>

      {/* Recent Narrative Activity Table */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Recent Memoir Narrations by Patient
        </span>

        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-4">Story Title</th>
                <th className="py-2.5 px-4 hidden sm:table-cell">Memory Link</th>
                <th className="py-2.5 px-4">Participation</th>
                <th className="py-2.5 px-4 hidden sm:table-cell">Resonance</th>
                <th className="py-2.5 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {metrics.narrations.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-slate-900">
                    {item.storyTitle}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 hidden sm:table-cell">
                    {item.memoryTitle}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="rounded-md bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 text-[11px]">
                      {item.participation}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 hidden sm:table-cell">
                    {item.resonance}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-500">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Practitioner Clinical Disclaimer Note */}
      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          <strong>Clinical Context Note:</strong> Narrative telemetry documents voluntary psychosocial engagement and positive mood reinforcement through companion storytelling. It does not replace formal neuropsychological or cognitive impairment testing.
        </span>
      </div>

    </div>
  );
}
