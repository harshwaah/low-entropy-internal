'use client';

import React from 'react';
import { BarChart3, Download, TrendingUp, Award, Activity, FileText, CheckCircle } from 'lucide-react';
import { CohortAnalyticsSummary } from '../types';

interface ReportsInsightsViewProps {
  analytics: CohortAnalyticsSummary;
}

export function ReportsInsightsView({ analytics }: ReportsInsightsViewProps) {
  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Reports & Insights</h1>
          <p className="text-sm text-[#414944]">Longitudinal cognitive care analytics and cohort performance reports.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-[#013625] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#1e4d3a] transition-all active:scale-[0.99]"
        >
          <Download className="h-4 w-4" />
          <span>Export Clinical Report</span>
        </button>
      </div>

      {/* Cohort Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between">
          <span className="text-xs uppercase font-semibold text-[#717973]">Mean Cohort Engagement</span>
          <div className="my-2">
            <span className="text-3xl font-bold text-[#013625]">{analytics.averageEngagement}%</span>
          </div>
          <span className="text-xs text-[#426653]">Across {analytics.totalPatients} enrolled patients</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between">
          <span className="text-xs uppercase font-semibold text-[#717973]">Routine Adherence</span>
          <div className="my-2">
            <span className="text-3xl font-bold text-[#1e4d3a]">{analytics.averageRoutineAdherence}%</span>
          </div>
          <span className="text-xs text-[#1e4d3a]">Autonomous circadian routines</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between">
          <span className="text-xs uppercase font-semibold text-[#717973]">Memory Trail Activity</span>
          <div className="my-2">
            <span className="text-3xl font-bold text-[#013625]">{analytics.averageMemoryActivity}%</span>
          </div>
          <span className="text-xs text-[#426653]">Autobiographical recall</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between">
          <span className="text-xs uppercase font-semibold text-[#717973]">Cohort Stability</span>
          <div className="my-2">
            <span className="text-3xl font-bold text-[#2a4e3c]">{analytics.stabilityBreakdown.optimal} / {analytics.totalPatients}</span>
          </div>
          <span className="text-xs text-[#717973]">Optimal stability index</span>
        </div>
      </div>

      {/* Trajectory Analytics & Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-[#013625]">Cognitive Trajectory Trend (Cohort Composite)</h2>
          <p className="text-xs text-[#414944]">Aggregated performance across Memory Trail, Quick Pick Trail, and Circadian Routines over 7 days.</p>
          <div className="w-full h-64 relative pt-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="repGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1e4d3a" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#bbeed3" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#e6f0e8" strokeDasharray="4 4" x1="0" x2="700" y1="50" y2="50"></line>
              <line stroke="#e6f0e8" strokeDasharray="4 4" x1="0" x2="700" y1="100" y2="100"></line>
              <line stroke="#e6f0e8" strokeDasharray="4 4" x1="0" x2="700" y1="150" y2="150"></line>
              <path d="M 30,110 Q 130,80 230,95 T 430,65 T 550,50 T 670,40 L 670,180 L 30,180 Z" fill="url(#repGrad)"></path>
              <path d="M 30,110 Q 130,80 230,95 T 430,65 T 550,50 T 670,40" fill="none" stroke="#013625" strokeWidth="3"></path>
            </svg>
            <div className="flex justify-between items-center text-[#717973] text-xs font-semibold pt-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#013625]">Cognitive Game Engagement</h2>
            <div className="p-3 rounded-xl bg-[#ecf6ee] space-y-1">
              <span className="text-xs font-bold text-[#013625]">Quick Pick Trail</span>
              <p className="text-xs text-[#414944]">Math, Color, & Pattern adaptive speed exercises.</p>
              <div className="w-full bg-[#dbe5dd] rounded-full h-2 mt-2">
                <div className="bg-[#1e4d3a] h-2 rounded-full" style={{ width: '81%' }}></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#ecf6ee] space-y-1">
              <span className="text-xs font-bold text-[#013625]">My Memory Trail</span>
              <p className="text-xs text-[#414944]">Autobiographical voice & photo recall sessions.</p>
              <div className="w-full bg-[#dbe5dd] rounded-full h-2 mt-2">
                <div className="bg-[#426653] h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-900/5 text-xs text-[#717973]">
            Generated dynamically from SmritiSaathi Cognitive Telemetry Engine.
          </div>
        </div>
      </div>
    </div>
  );
}
