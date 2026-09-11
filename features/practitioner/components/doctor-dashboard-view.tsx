'use client';

import React from 'react';
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
} from 'lucide-react';
import { ClinicalPatient, ClinicalAlertItem } from '../types';

interface DoctorDashboardViewProps {
  patients: ClinicalPatient[];
  alerts: ClinicalAlertItem[];
}

export function DoctorDashboardView({ patients, alerts }: DoctorDashboardViewProps) {
  const activePatientsCount = 42;
  const attentionCount = 4;
  const stableCount = 36;
  const improvingCount = 2;

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
            Good morning, Dr. Vance
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-[#013625] tracking-tight">Average Cognitive Performance</h2>
                <span className="text-xs text-[#414944]">Last 7 Days · Cohort Composite Trajectory</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e1ebe3] text-[#151d19] text-xs font-medium self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#1e4d3a]"></span>
                <span>Overall Cognitive Performance</span>
              </div>
            </div>

            {/* SVG Trajectory Visualization */}
            <div className="w-full h-64 pt-2 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 200">
                <defs>
                  <linearGradient id="areaGradDash" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#bbeed3" stop-opacity="0.55"></stop>
                    <stop offset="100%" stop-color="#bbeed3" stop-opacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <line stroke="#e6f0e8" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="700" y1="40" y2="40"></line>
                <line stroke="#e6f0e8" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="700" y1="90" y2="90"></line>
                <line stroke="#e6f0e8" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="700" y1="140" y2="140"></line>
                
                <path d="M 30,120 Q 130,85 230,105 T 430,70 T 550,55 T 670,45 L 670,180 L 30,180 Z" fill="url(#areaGradDash)"></path>
                <path d="M 30,120 Q 130,85 230,105 T 430,70 T 550,55 T 670,45" fill="none" stroke="#1e4d3a" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                
                <circle cx="30" cy="120" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="138" cy="92" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="245" cy="103" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="352" cy="85" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="460" cy="65" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="565" cy="54" fill="#1e4d3a" r="4.5" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="670" cy="45" fill="#013625" r="5.5" stroke="#ffffff" stroke-width="2.5"></circle>
              </svg>
              <div className="flex justify-between items-center text-[#717973] text-xs font-semibold pt-2 px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 mt-4 bg-[#ecf6ee]/60 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-2 text-[#151d19]">
              <Check className="h-4 w-4 text-[#426653]" />
              <span className="text-xs font-medium">
                Mean adherence rate: <strong className="text-[#013625]">91.4%</strong> over 7 days
              </span>
            </div>
            <span className="text-[11px] text-[#717973]">Updated 24m ago</span>
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
