'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Search,
  Bell,
  Check,
  Activity,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { ClinicalPatient, ClinicalAlertItem } from '../types';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PractitionerOnboarding } from '@/components/onboarding';
import { PractitionerOnboardingData } from '@/types/onboarding';

interface DoctorDashboardViewProps {
  patients: ClinicalPatient[];
  alerts: ClinicalAlertItem[];
}

type MetricMode = 'composite' | 'memory' | 'adherence';
type TimeframeMode = '7d' | '14d' | '30d';

interface TrajectoryDataPoint {
  day: string;
  date: string;
  x: number;
  y: number;
  score: number;
  domainNote: string;
  delta: string;
  adherence: number;
}

export function DoctorDashboardView({ patients, alerts }: DoctorDashboardViewProps) {
  const { isCompleted: isOnboardingComplete, isLoading: isOnboardingLoading, data: onboardingData } = useOnboarding('practitioner');

  const [metricMode, setMetricMode] = useState<MetricMode>('composite');
  const [timeframe, setTimeframe] = useState<TimeframeMode>('7d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(6);

  const activePatientsCount = 42;
  const attentionCount = 4;
  const stableCount = 36;
  const improvingCount = 2;

  const trajectoryData: Record<MetricMode, TrajectoryDataPoint[]> = useMemo(() => ({
    composite: [
      { day: 'Mon', date: 'Sep 6', x: 30, y: 120, score: 68, domainNote: 'Orientation & Attention focus', delta: '-2.0% vs target', adherence: 88 },
      { day: 'Tue', date: 'Sep 7', x: 138, y: 92, score: 74, domainNote: 'Associative memory recall', delta: '+1.5% vs target', adherence: 91 },
      { day: 'Wed', date: 'Sep 8', x: 245, y: 103, score: 71, domainNote: 'Spatial sequencing exercise', delta: '-0.5% vs target', adherence: 87 },
      { day: 'Thu', date: 'Sep 9', x: 352, y: 85, score: 78, domainNote: 'Narrative story recollection', delta: '+4.2% vs target', adherence: 94 },
      { day: 'Fri', date: 'Sep 10', x: 460, y: 65, score: 83, domainNote: 'Music & melodic cue responses', delta: '+6.1% vs target', adherence: 95 },
      { day: 'Sat', date: 'Sep 11', x: 565, y: 54, score: 86, domainNote: 'Photo album reminiscence depth', delta: '+8.0% vs target', adherence: 96 },
      { day: 'Sun', date: 'Sep 12 (Today)', x: 670, y: 45, score: 89, domainNote: 'Multi-domain composite synthesis', delta: '+9.4% (Optimal)', adherence: 98 },
    ],
    memory: [
      { day: 'Mon', date: 'Sep 6', x: 30, y: 110, score: 70, domainNote: 'Childhood photo recognition', delta: '0.0% vs target', adherence: 90 },
      { day: 'Tue', date: 'Sep 7', x: 138, y: 85, score: 76, domainNote: 'Family voice cue recognition', delta: '+2.8% vs target', adherence: 92 },
      { day: 'Wed', date: 'Sep 8', x: 245, y: 95, score: 73, domainNote: 'Familiar location orientation', delta: '+0.5% vs target', adherence: 88 },
      { day: 'Thu', date: 'Sep 9', x: 352, y: 70, score: 82, domainNote: 'Story narration engagement', delta: '+5.5% vs target', adherence: 95 },
      { day: 'Fri', date: 'Sep 10', x: 460, y: 60, score: 85, domainNote: 'Sensory melody recollection', delta: '+7.0% vs target', adherence: 97 },
      { day: 'Sat', date: 'Sep 11', x: 565, y: 48, score: 88, domainNote: 'Wedding album reminiscence', delta: '+8.5% vs target', adherence: 98 },
      { day: 'Sun', date: 'Sep 12 (Today)', x: 670, y: 38, score: 92, domainNote: 'Active family dialogue recall', delta: '+11.0% (Optimal)', adherence: 99 },
    ],
    adherence: [
      { day: 'Mon', date: 'Sep 6', x: 30, y: 70, score: 88, domainNote: 'Morning routine on time', delta: '+3.0% vs target', adherence: 88 },
      { day: 'Tue', date: 'Sep 7', x: 138, y: 60, score: 91, domainNote: 'All scheduled prompts verified', delta: '+5.0% vs target', adherence: 91 },
      { day: 'Wed', date: 'Sep 8', x: 245, y: 74, score: 87, domainNote: '1 routine prompt slightly delayed', delta: '+1.0% vs target', adherence: 87 },
      { day: 'Thu', date: 'Sep 9', x: 352, y: 52, score: 94, domainNote: 'Caregiver validation with love', delta: '+7.5% vs target', adherence: 94 },
      { day: 'Fri', date: 'Sep 10', x: 460, y: 48, score: 95, domainNote: 'Direct audio note recorded', delta: '+8.0% vs target', adherence: 95 },
      { day: 'Sat', date: 'Sep 11', x: 565, y: 42, score: 96, domainNote: 'Evening memory session logged', delta: '+9.0% vs target', adherence: 96 },
      { day: 'Sun', date: 'Sep 12 (Today)', x: 670, y: 35, score: 98, domainNote: '100% completion across all domains', delta: '+12.0% (Exceeded)', adherence: 98 },
    ],
  }), []);

  const currentPoints = trajectoryData[metricMode];
  const activePoint = hoveredIndex !== null && currentPoints[hoveredIndex] ? currentPoints[hoveredIndex] : currentPoints[currentPoints.length - 1];

  // Generate SVG path dynamically based on active metric points
  const { linePath, areaPath } = useMemo(() => {
    if (!currentPoints.length) return { linePath: '', areaPath: '' };
    const first = currentPoints[0];
    let d = `M ${first.x},${first.y}`;
    for (let i = 1; i < currentPoints.length; i++) {
      const prev = currentPoints[i - 1];
      const curr = currentPoints[i];
      const cx = (prev.x + curr.x) / 2;
      d += ` C ${cx},${prev.y} ${cx},${curr.y} ${curr.x},${curr.y}`;
    }
    const last = currentPoints[currentPoints.length - 1];
    const area = `${d} L ${last.x},180 L ${first.x},180 Z`;
    return { linePath: d, areaPath: area };
  }, [currentPoints]);

  if (!isOnboardingLoading && !isOnboardingComplete) {
    return <PractitionerOnboarding />;
  }

  const doctorGreeting = (onboardingData as PractitionerOnboardingData)?.name || 'Dr. Vance';

  const attentionPatients = [
    { id: 'SS-4102', name: 'Rameshwar Kumar', initials: 'RK', status: 'Needs Review', bg: 'bg-[#ffdbcf]', text: 'text-[#591800]' },
    { id: 'SS-3981', name: 'Sunita Sharma', initials: 'SS', status: 'Stable', bg: 'bg-[#c4ecd4]', text: 'text-[#013625]' },
    { id: 'SS-4219', name: 'Rajesh Patil', initials: 'RP', status: 'Improving', bg: 'bg-[#bbeed3]', text: 'text-[#204f3c]' },
    { id: 'SS-4054', name: 'Anita Desai', initials: 'AD', status: 'Needs Review', bg: 'bg-[#ffdbcf]', text: 'text-[#591800]' },
  ];

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      {/* 1. Header & Primary Action Context */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ecd4]/60 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#013625] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#2a4e3c]">
              Clinical Session · Cognitive Care Unit 4B
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight mt-1">
            Good morning, {doctorGreeting}
          </h1>
          <p className="text-sm text-[#414944]">
            Here is today&apos;s patient overview and cognitive care activity.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            href="/practitioner/activities"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e4d3a] text-white text-sm font-semibold hover:bg-[#013625] transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Assign Activity</span>
          </Link>
        </div>
      </section>

      {/* 2. Patient Metric Summary Cards (4-Column Bento) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Patients */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#717973] font-semibold">Active Patients</span>
            <div className="w-8 h-8 rounded-lg bg-[#ecf6ee] flex items-center justify-center text-[#013625]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <span className="text-4xl text-[#013625] font-bold tracking-tight leading-none">{activePatientsCount}</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[#414944] text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#426653]"></span>
            <span>36 Stable</span>
            <span className="text-[#c0c9c2]">·</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#591800]"></span>
            <span>6 Need Review</span>
          </div>
        </div>

        {/* Card 2: Requires Attention */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffdbcf]/40 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#802a05] font-semibold">Requires Attention</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdbcf] flex items-center justify-center text-[#591800]">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <span className="text-4xl text-[#591800] font-bold tracking-tight leading-none">{attentionCount}</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[#414944] text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>Patients requiring review</span>
          </div>
        </div>

        {/* Card 3: Stable Patients */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#717973] font-semibold">Stable Patients</span>
            <div className="w-8 h-8 rounded-lg bg-[#ecf6ee] flex items-center justify-center text-[#1e4d3a]">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <span className="text-4xl text-[#151d19] font-bold tracking-tight leading-none">{stableCount}</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[#414944] text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#a8cfb9]"></span>
            <span>Within expected range</span>
          </div>
        </div>

        {/* Card 4: Improving Patients */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#717973] font-semibold">Improving Patients</span>
            <div className="w-8 h-8 rounded-lg bg-[#c4ecd4] flex items-center justify-center text-[#013625]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <span className="text-4xl text-[#1e4d3a] font-bold tracking-tight leading-none">{improvingCount}</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[#414944] text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#a0d1b8]"></span>
            <span>Positive recent trend</span>
          </div>
        </div>
      </section>

      {/* 3. Analytical Overview & Clinical Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Trajectory Chart Card (~65% width) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#013625] tracking-tight">Average Cognitive Performance</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#ecf6ee] text-[#1e4d3a] text-[10px] font-bold uppercase tracking-wider">
                    Interactive CDS
                  </span>
                </div>
                <span className="text-xs text-[#414944]">
                  {timeframe === '7d' ? 'Last 7 Days' : timeframe === '14d' ? 'Last 14 Days' : 'Last 30 Days'} · Cohort Trajectory &amp; Real-time Adherence
                </span>
              </div>

              {/* Timeframe & Metric Filter Controls */}
              <div className="flex items-center flex-wrap gap-1.5 self-start sm:self-auto">
                <div className="flex items-center bg-[#f0f4f1] p-1 rounded-xl gap-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setMetricMode('composite')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      metricMode === 'composite'
                        ? 'bg-white text-[#013625] shadow-2xs font-bold'
                        : 'text-[#414944] hover:text-[#013625]'
                    }`}
                  >
                    Composite
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricMode('memory')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      metricMode === 'memory'
                        ? 'bg-white text-[#013625] shadow-2xs font-bold'
                        : 'text-[#414944] hover:text-[#013625]'
                    }`}
                  >
                    Memory
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricMode('adherence')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      metricMode === 'adherence'
                        ? 'bg-white text-[#013625] shadow-2xs font-bold'
                        : 'text-[#414944] hover:text-[#013625]'
                    }`}
                  >
                    Adherence
                  </button>
                </div>

                <div className="hidden sm:flex items-center bg-[#f0f4f1] p-1 rounded-xl text-xs font-semibold">
                  {(['7d', '14d', '30d'] as TimeframeMode[]).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-1 rounded-lg uppercase transition-all cursor-pointer ${
                        timeframe === tf
                          ? 'bg-[#1e4d3a] text-white shadow-2xs'
                          : 'text-[#717973] hover:text-[#013625]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Selected Point Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 pb-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#013625] bg-[#c4ecd4]/50 px-2 py-0.5 rounded-md">
                  {activePoint.day} ({activePoint.date}):
                </span>
                <span className="font-semibold text-[#151d19]">
                  Score: <strong className="text-sm text-[#013625]">{activePoint.score}%</strong>
                </span>
                <span className="text-[#717973]">· {activePoint.domainNote}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#1e4d3a] bg-[#ecf6ee] px-2 py-0.5 rounded-full">
                  {activePoint.delta}
                </span>
                <span className="text-[11px] text-[#414944]">
                  Adherence: <strong>{activePoint.adherence}%</strong>
                </span>
              </div>
            </div>

            {/* SVG Trajectory Visualization */}
            <div className="w-full h-64 pt-2 relative select-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 200">
                <defs>
                  <linearGradient id="areaGradDash" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#bbeed3" stopOpacity="0.6"></stop>
                    <stop offset="100%" stopColor="#bbeed3" stopOpacity="0.02"></stop>
                  </linearGradient>
                  <filter id="pointGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#013625" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Grid guidelines */}
                <line stroke="#edf3ef" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="40" y2="40"></line>
                <line stroke="#edf3ef" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="90" y2="90"></line>
                <line stroke="#edf3ef" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="140" y2="140"></line>

                {/* Clinical Target Baseline Threshold Line */}
                <line stroke="#ba1a1a" strokeDasharray="6 4" strokeWidth="1.25" strokeOpacity="0.45" x1="0" x2="700" y1="100" y2="100"></line>
                <text x="690" y="96" fill="#802a05" fontSize="10" fontWeight="600" textAnchor="end" opacity="0.8">
                  Clinical Target Baseline (70%)
                </text>

                {/* Filled Area */}
                <path d={areaPath} fill="url(#areaGradDash)"></path>

                {/* Main Trajectory Stroke */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1e4d3a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                  className="transition-all duration-300"
                ></path>

                {/* Vertical Cursor Indicator Line on Hovered Point */}
                {hoveredIndex !== null && currentPoints[hoveredIndex] && (
                  <line
                    x1={currentPoints[hoveredIndex].x}
                    x2={currentPoints[hoveredIndex].x}
                    y1="20"
                    y2="180"
                    stroke="#1e4d3a"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    strokeOpacity="0.5"
                  />
                )}

                {/* Interactive Points */}
                {currentPoints.map((pt, idx) => {
                  const isHovered = hoveredIndex === idx;
                  return (
                    <g
                      key={pt.day}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => setHoveredIndex(idx)}
                    >
                      {/* Invisible larger touch/hover target */}
                      <circle cx={pt.x} cy={pt.y} r="20" fill="transparent" />

                      {/* Highlight Outer Ring */}
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10"
                          fill="#c4ecd4"
                          fillOpacity="0.7"
                          className="animate-ping"
                        />
                      )}

                      {/* Visible Point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        fill={isHovered ? '#013625' : '#1e4d3a'}
                        r={isHovered ? 6.5 : 4.5}
                        stroke="#ffffff"
                        strokeWidth={isHovered ? 3 : 2}
                        filter="url(#pointGlow)"
                        className="transition-all duration-150"
                      />

                      {/* Score Value Floating Tag on Active/Hovered Point */}
                      {isHovered && (
                        <g transform={`translate(${pt.x}, ${Math.max(16, pt.y - 14)})`}>
                          <rect
                            x="-22"
                            y="-16"
                            width="44"
                            height="18"
                            rx="5"
                            fill="#013625"
                            filter="url(#pointGlow)"
                          />
                          <text
                            x="0"
                            y="-3.5"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {pt.score}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* X-Axis Day Markers (Interactive buttons) */}
              <div className="flex justify-between items-center text-xs font-semibold pt-1 px-1">
                {currentPoints.map((pt, idx) => {
                  const isSelected = hoveredIndex === idx;
                  return (
                    <button
                      key={pt.day}
                      type="button"
                      onClick={() => setHoveredIndex(idx)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className={`px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#013625] text-white font-bold shadow-2xs scale-105'
                          : 'text-[#717973] hover:text-[#013625] hover:bg-[#ecf6ee]'
                      }`}
                    >
                      {pt.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card Summary Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-4 bg-[#ecf6ee]/70 px-4 py-3 rounded-xl border border-emerald-900/5">
            <div className="flex items-center gap-2 text-[#151d19]">
              <Check className="h-4 w-4 text-[#426653] shrink-0" />
              <span className="text-xs font-medium">
                Active Cohort Mean: <strong className="text-[#013625]">91.4% adherence</strong> ·{' '}
                <span className="text-[#1e4d3a] font-semibold">{activePoint.day} performance: {activePoint.score}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Link
                href="/practitioner/reports"
                className="text-xs font-bold text-[#1e4d3a] hover:text-[#013625] hover:underline inline-flex items-center gap-1"
              >
                <span>Full Longitudinal Analytics</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Insights Rail (~35% width) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e1ebe3] flex items-center justify-center text-[#1e4d3a]">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#013625]">Care Insights</h2>
                <p className="text-xs text-[#717973]">Cognitive decision-support signals</p>
              </div>
            </div>

            {/* Observation Callout Box */}
            <div className="p-4 rounded-xl bg-[#ffdbcf]/20 border-l-4 border-[#591800] flex flex-col gap-1.5">
              <p className="text-sm font-semibold text-[#390c00]">
                4 patients show changes in recent cognitive activity.
              </p>
              <p className="text-xs text-[#414944] leading-relaxed">
                Review flagged patients for further clinical assessment.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/practitioner/alerts"
              className="w-full py-2.5 px-4 rounded-xl bg-[#c4ecd4] text-[#2a4e3c] hover:bg-[#a8cfb9] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Alerts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-[11px] text-[#717973] text-center">
              Clinical decision support only. Requires neurological confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Lower Section: Alerts & Attention Focus */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
        {/* Left Column: Recent Alerts (8 Columns) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-lg font-bold text-[#013625]">Recent Alerts</h2>
              <p className="text-xs text-[#414944]">Patients requiring attention</p>
            </div>
            <Link
              href="/practitioner/alerts"
              className="text-xs font-semibold text-[#1e4d3a] hover:text-[#013625] inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Alerts</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Alert Rows */}
          <div className="flex flex-col gap-3">
            {/* Row 1: High Priority */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#ecf6ee]/70 hover:bg-[#ecf6ee] transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcf] text-[#802a05] text-[11px] uppercase font-bold shrink-0 mt-0.5">
                  High
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#151d19] truncate">Rameshwar Kumar</span>
                  <p className="text-xs text-[#414944]">
                    Cognitive task performance has declined compared with recent baseline (68% vs 70% target).
                  </p>
                </div>
              </div>
              <Link
                href="/practitioner/patient/SS-4102"
                className="self-end sm:self-center px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#e1ebe3] text-[#1e4d3a] text-xs font-semibold transition-colors shadow-2xs shrink-0"
              >
                View Patient
              </Link>
            </div>

            {/* Row 2: Medium Priority */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#ecf6ee]/70 hover:bg-[#ecf6ee] transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[11px] uppercase font-bold shrink-0 mt-0.5">
                  Medium
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#151d19] truncate">Sunita Sharma</span>
                  <p className="text-xs text-[#414944]">
                    Three scheduled cognitive activities were missed this week.
                  </p>
                </div>
              </div>
              <Link
                href="/practitioner/patient/SS-3981"
                className="self-end sm:self-center px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#e1ebe3] text-[#1e4d3a] text-xs font-semibold transition-colors shadow-2xs shrink-0"
              >
                View Patient
              </Link>
            </div>

            {/* Row 3: Low Priority */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#ecf6ee]/70 hover:bg-[#ecf6ee] transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#dbe5dd] text-[#414944] text-[11px] uppercase font-bold shrink-0 mt-0.5">
                  Low
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#151d19] truncate">Rajesh Patil</span>
                  <p className="text-xs text-[#414944]">
                    Response time has increased during attention exercises.
                  </p>
                </div>
              </div>
              <Link
                href="/practitioner/patient/SS-4219"
                className="self-end sm:self-center px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#e1ebe3] text-[#1e4d3a] text-xs font-semibold transition-colors shadow-2xs shrink-0"
              >
                View Patient
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Attention Focus (4 Columns) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/5 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#013625]">Attention Focus</h2>
              <p className="text-xs text-[#414944]">Patients requiring review</p>
            </div>

            {/* Patient Shortlist */}
            <div className="flex flex-col gap-1.5">
              {attentionPatients.map((p) => (
                <Link
                  key={p.id}
                  href={`/practitioner/patient/${p.id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ecf6ee]/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${p.bg} ${p.text} flex items-center justify-center text-xs font-bold shrink-0`}>
                      {p.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-[#151d19] group-hover:text-[#013625] truncate">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-[#717973]">ID: {p.id}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${p.bg} ${p.text}`}>
                    {p.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/practitioner/patients"
            className="w-full py-2.5 px-4 rounded-xl bg-[#e6f0e8] text-[#151d19] hover:bg-[#e1ebe3] text-sm font-semibold text-center transition-colors block"
          >
            Explore All Patients
          </Link>
        </div>
      </section>
    </div>
  );
}
