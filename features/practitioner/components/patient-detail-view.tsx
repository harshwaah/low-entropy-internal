'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit3,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Check,
  StickyNote,
  Lock,
  AlertTriangle,
  ShieldCheck,
  Brain,
  HelpCircle,
  Activity,
  Award,
  Clock,
  CheckCircle,
  User,
  Zap,
  BookOpen,
} from 'lucide-react';
import {
  ClinicalPatient,
  ClinicalObservation,
  ClinicalRecommendation,
} from '../types';

interface PatientDetailViewProps {
  patient: ClinicalPatient;
  observations: ClinicalObservation[];
  recommendations: ClinicalRecommendation[];
  allPatients?: { id: string; name: string }[];
}

export function PatientDetailView({
  patient,
  observations,
  recommendations,
}: PatientDetailViewProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const isDeclining = patient.engagementTrend === 'declining' || patient.riskIndicator === 'review_recommended';

  return (
    <div className="flex flex-col w-full pb-8 text-[#151d19]">
      {/* Top Meta & Navigation Breadcrumb */}
      <div className="flex items-center justify-between py-2 mb-3">
        <Link
          href="/practitioner/patients"
          className="inline-flex items-center gap-1.5 font-semibold text-sm text-[#013625] hover:text-[#1e4d3a] transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Patients</span>
        </Link>
        <div className="flex items-center gap-2 text-[#717973] text-xs font-semibold tracking-wide">
          <span>Patient Record</span>
          <span className="text-[#c0c9c2]">/</span>
          <span className="font-bold text-[#151d19]">{patient.id}</span>
        </div>
      </div>

      {/* Patient Header Card */}
      <section className="w-full bg-white rounded-2xl shadow-xs p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/10">
        <div className="flex items-center gap-4">
          {/* Initials Avatar */}
          <div className="w-14 h-14 rounded-full bg-[#1e4d3a] text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
            {initials}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#013625] tracking-tight">{patient.name}</h1>
              {isDeclining ? (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs bg-[#ffedd5] text-[#c2410c] font-semibold tracking-wide shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-1.5"></span>
                  Requires Attention
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs bg-[#c4ecd4] text-[#2a4e3c] font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#013625] mr-1.5"></span>
                  Stable Rhythm
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#414944]">
              <span className="font-semibold text-[#151d19]">ID: {patient.id}</span>
              <span className="text-[#c0c9c2]">•</span>
              <span>Age: {patient.age} yrs</span>
              <span className="text-[#c0c9c2]">•</span>
              <span>
                Caregiver: <strong className="font-semibold text-[#151d19]">{patient.primaryCaregiver.name}</strong> ({patient.primaryCaregiver.relation})
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowNoteModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c4ecd4] hover:bg-[#e1ebe3] text-[#013625] font-semibold text-xs transition-colors shadow-2xs"
            type="button"
          >
            <Edit3 className="h-4 w-4" />
            <span>Add Clinical Note</span>
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e4d3a] hover:bg-[#013625] text-white font-semibold text-xs transition-colors shadow-sm"
            type="button"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ Assign Activity</span>
          </button>
        </div>
      </section>

      {/* Main Split Layout (70% - 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / MAIN COLUMN (~70%) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Cognitive Performance Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col border border-emerald-900/10">
            <div className="flex items-center justify-between pb-3">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-[#013625]">Cognitive Performance</h2>
                <p className="text-xs text-[#414944]">Recent cognitive activity trend</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ecf6ee] text-[#151d19] text-xs font-semibold">
                7-Day Trend
              </span>
            </div>

            {/* SVG Line Chart Visualization */}
            <div className="relative w-full pt-4 pb-2 overflow-hidden">
              <div className="w-full h-56">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 220">
                  <defs>
                    <linearGradient id="mintAreaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#1e4d3a" stop-opacity="0.22"></stop>
                      <stop offset="70%" stop-color="#bbeed3" stop-opacity="0.12"></stop>
                      <stop offset="100%" stop-color="#f2fcf4" stop-opacity="0.0"></stop>
                    </linearGradient>
                  </defs>

                  <line stroke="#e1ebe3" stroke-width="1" x1="50" x2="680" y1="30" y2="30"></line>
                  <text fill="#717973" font-family="Plus Jakarta Sans" font-size="11" font-weight="500" text-anchor="end" x="38" y="34">80%</text>

                  <line stroke="#8cbda4" stroke-dasharray="4 4" stroke-width="1.5" x1="50" x2="680" y1="90" y2="90"></line>
                  <text fill="#426653" font-family="Plus Jakarta Sans" font-size="11" font-weight="600" text-anchor="end" x="38" y="94">70%</text>
                  <text fill="#426653" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" opacity="0.85" text-anchor="end" x="675" y="84">Target Baseline (70%)</text>

                  <line stroke="#e1ebe3" stroke-width="1" x1="50" x2="680" y1="150" y2="150"></line>
                  <text fill="#717973" font-family="Plus Jakarta Sans" font-size="11" font-weight="500" text-anchor="end" x="38" y="154">60%</text>

                  <polygon fill="url(#mintAreaGrad)" points="80,180 80,78 170,66 260,84 350,96 440,102 530,114 620,102 620,180"></polygon>

                  <polyline fill="none" points="80,78 170,66 260,84 350,96 440,102 530,114 620,102" stroke="#1e4d3a" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline>

                  {/* Points */}
                  <g className="cursor-pointer">
                    <circle cx="80" cy="78" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="66" y="52"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="80" y="65">72%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="170" cy="66" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="156" y="40"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="170" y="53">74%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="260" cy="84" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="246" y="58"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="260" y="71">71%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="350" cy="96" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="336" y="70"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="350" y="83">69%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="440" cy="102" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="426" y="76"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="440" y="89">68%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="530" cy="114" fill="#ffdad6" opacity="0.75" r="9"></circle>
                    <circle cx="530" cy="114" fill="#ba1a1a" r="5" stroke="#ffffff" stroke-width="2"></circle>
                    <rect fill="#ba1a1a" height="20" rx="4" width="30" x="516" y="86"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="700" text-anchor="middle" x="531" y="100">66%</text>
                  </g>
                  <g className="cursor-pointer">
                    <circle cx="620" cy="102" fill="#ffffff" r="5" stroke="#1e4d3a" stroke-width="2.5"></circle>
                    <rect fill="#1e4d3a" height="18" rx="4" width="28" x="606" y="76"></rect>
                    <text fill="#ffffff" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" text-anchor="middle" x="620" y="89">68%</text>
                  </g>

                  <line stroke="#c0c9c2" stroke-width="1" x1="50" x2="680" y1="180" y2="180"></line>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="80" y="200">Mon</text>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="170" y="200">Tue</text>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="260" y="200">Wed</text>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="350" y="200">Thu</text>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="440" y="200">Fri</text>
                  <text fill="#ba1a1a" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" text-anchor="middle" x="530" y="200">Sat</text>
                  <text fill="#414944" font-family="Plus Jakarta Sans" font-size="12" font-weight="500" text-anchor="middle" x="620" y="200">Sun</text>
                </svg>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-3 pt-4 grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#ecf6ee] rounded-xl p-3.5 border border-emerald-900/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#414944] uppercase font-semibold tracking-wider">Average score</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-bold text-[#013625]">69.7%</span>
                  <span className="text-xs text-[#717973]">weekly mean</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#414944] uppercase font-semibold tracking-wider">7-day change</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-bold text-[#591800]">-4%</span>
                  <span className="text-xs text-[#591800]">vs previous wk</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#414944] uppercase font-semibold tracking-wider">Target baseline threshold</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-bold text-[#426653]">70%</span>
                  <span className="text-xs font-semibold text-[#ba1a1a]">below target</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Pick Trail & Memory Trail Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Pick Trail Session Insights */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-900/10 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-900/5">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#1e4d3a]" />
                  <h3 className="font-bold text-sm text-[#013625]">Quick Pick Trail</h3>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#c4ecd4] text-[#2a4e3c]">
                  Adaptive Game
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 my-3">
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Accuracy</span>
                  <strong className="text-lg font-mono text-[#013625]">68.3%</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Avg Response Time</span>
                  <strong className="text-lg font-mono text-[#1e4d3a]">4.2s</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Questions Attempted</span>
                  <strong className="text-sm font-mono text-[#151d19]">120 (82 Correct)</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Difficulty</span>
                  <strong className="text-sm font-mono text-[#151d19]">Comfortable</strong>
                </div>
              </div>
            </div>

            {/* Memory Trail Session Insights */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-900/10 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-900/5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#1e4d3a]" />
                  <h3 className="font-bold text-sm text-[#013625]">My Memory Trail</h3>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#bbeed3] text-[#204f3c]">
                  Autobiographical
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 my-3">
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Locations Visited</span>
                  <strong className="text-lg font-mono text-[#013625]">4 Completed</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Memories Shared</span>
                  <strong className="text-lg font-mono text-[#1e4d3a]">9 Stories</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Voice Responses</span>
                  <strong className="text-sm font-mono text-[#151d19]">7 Transcripts</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ecf6ee]/60">
                  <span className="text-[10px] text-[#717973] uppercase font-semibold block">Family Media</span>
                  <strong className="text-sm font-mono text-[#151d19]">5 Contributions</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col border border-emerald-900/10">
            <div className="flex items-center justify-between pb-3">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-[#013625]">Recent Activities</h2>
                <p className="text-xs text-[#414944]">Latest cognitive care tasks completed by the patient</p>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#ecf6ee] text-[#414944] font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 rounded-l-lg">Activity</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4 rounded-r-lg text-right">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/5">
                  <tr className="hover:bg-[#ecf6ee]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#151d19]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#426653]"></span>
                        Memory Recall
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#414944]">Today</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 w-36">
                        <span className="font-bold text-[#013625] w-8">72%</span>
                        <div className="w-full bg-[#e6f0e8] rounded-full h-2 overflow-hidden">
                          <div className="bg-[#1e4d3a] h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[11px] font-semibold">
                        <Check className="h-3 w-3" />
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#ecf6ee]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#151d19]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#426653]"></span>
                        Word Pairing (Quick Pick)
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#414944]">Yesterday</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 w-36">
                        <span className="font-bold text-[#013625] w-8">68%</span>
                        <div className="w-full bg-[#e6f0e8] rounded-full h-2 overflow-hidden">
                          <div className="bg-[#1e4d3a] h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[11px] font-semibold">
                        <Check className="h-3 w-3" />
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#ecf6ee]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#151d19]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                        Attention Exercise
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#414944]">2 days ago</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 w-36">
                        <span className="font-bold text-[#7d2803] w-8">61%</span>
                        <div className="w-full bg-[#e6f0e8] rounded-full h-2 overflow-hidden">
                          <div className="bg-[#ea580c] h-2 rounded-full" style={{ width: '61%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[11px] font-semibold">
                        <Check className="h-3 w-3" />
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#ecf6ee]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#151d19]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#426653]"></span>
                        Family Photo Recall
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#414944]">3 days ago</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 w-36">
                        <span className="font-bold text-[#013625] w-8">75%</span>
                        <div className="w-full bg-[#e6f0e8] rounded-full h-2 overflow-hidden">
                          <div className="bg-[#426653] h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[11px] font-semibold">
                        <Check className="h-3 w-3" />
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Latest Clinical Note Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col border border-emerald-900/10">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-[#013625]" />
                <h2 className="text-lg font-bold text-[#013625]">Latest Clinical Note</h2>
              </div>
              <button
                onClick={() => setShowNoteModal(true)}
                className="inline-flex items-center gap-1 text-[#013625] font-semibold text-xs hover:text-[#1e4d3a] transition-colors"
                type="button"
              >
                + Add Note
              </button>
            </div>
            <div className="bg-[#ecf6ee] rounded-xl p-4 flex flex-col gap-2 border border-emerald-900/5">
              <p className="text-xs sm:text-sm text-[#151d19] leading-relaxed">
                Patient showed lower engagement during recent memory activities. Continue monitoring activity performance and review the recent decline during the next clinical assessment.
              </p>
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#151d19]">Dr. Elena Vance</span>
                  <span className="text-[#c0c9c2]">•</span>
                  <span className="text-[#414944]">Today, 09:15 AM</span>
                </div>
                <span className="text-[#426653] font-semibold text-[11px] flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Confidential Clinical Record
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT / CONTEXTUAL COLUMN (~30%) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Patient Summary Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col gap-4 border border-emerald-900/10">
            <h2 className="text-lg font-bold text-[#013625]">Patient Summary</h2>
            {/* Metric 1: Cognitive Score */}
            <div className="flex flex-col gap-1.5 pb-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[#414944] font-semibold text-[10px]">Cognitive Score</span>
                <span className="text-[#717973]">Target: 70%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-[#013625] font-bold leading-none">{patient.engagementScore}%</span>
                <span className="text-xs font-semibold text-[#591800]">-2% from target</span>
              </div>
              <div className="w-full bg-[#e6f0e8] rounded-full h-2.5 mt-1 overflow-hidden">
                <div className="bg-[#1e4d3a] h-2.5 rounded-full" style={{ width: `${patient.engagementScore}%` }}></div>
              </div>
            </div>
            {/* Metric 2: Trajectory Trend */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#ecf6ee]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#414944]">Trajectory Trend</span>
                <span className="text-xs text-[#717973]">30-day baseline</span>
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-[#7d2803] font-semibold">
                Declining ↘
              </div>
            </div>
            {/* Metric 3: Activity Adherence */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#ecf6ee]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#414944]">Activity Adherence</span>
                <span className="text-xs text-[#717973]">Last 7 days</span>
              </div>
              <div className="text-lg text-[#013625] font-bold">
                84% <span className="text-xs text-[#426653] font-normal">(6/7)</span>
              </div>
            </div>
          </section>

          {/* Recent Alert Card */}
          <section className="bg-[#fff7ed] rounded-2xl shadow-xs p-6 flex flex-col gap-3 border border-[#ffedd5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#c2410c]" />
                <h2 className="text-base font-bold text-[#7c2d12]">Recent Alert</h2>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffedd5] text-[#9a3412] uppercase tracking-wider">
                HIGH
              </span>
            </div>
            <p className="text-xs text-[#9a3412] leading-relaxed font-medium">
              Cognitive task performance has declined compared with the recent baseline.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#c2410c]">Today, 08:30 AM</span>
              <Link
                href="/practitioner/alerts"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                Review Alert
              </Link>
            </div>
          </section>

          {/* Caregiver Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col gap-3 border border-emerald-900/10">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#013625]">Caregiver</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#c4ecd4] text-[#2a4e3c] text-[10px] font-semibold">
                Primary Contact
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-11 h-11 rounded-full bg-[#c4ecd4] text-[#013625] flex items-center justify-center text-sm font-bold shrink-0">
                SG
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-[#151d19]">{patient.primaryCaregiver.name}</span>
                <span className="text-[#414944]">Relationship: {patient.primaryCaregiver.relation}</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <Link
                href="/practitioner/messages"
                className="inline-flex items-center gap-1 font-semibold text-[#013625] hover:text-[#1e4d3a] transition-colors"
              >
                <span>View Caregiver Messages →</span>
              </Link>
            </div>
          </section>

          {/* Care Insight Card */}
          <section className="bg-white rounded-2xl shadow-xs p-6 flex flex-col gap-3 relative overflow-hidden pl-6 border border-emerald-900/10">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1e4d3a]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#013625]" />
                <h2 className="text-base font-bold text-[#013625]">Care Insight</h2>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#e1ebe3] text-[#013625] tracking-wider uppercase">
                GUIDANCE
              </span>
            </div>
            <p className="text-xs text-[#151d19] leading-relaxed">
              Recent activity data shows a decline in cognitive task performance compared with the patient&apos;s recent baseline.
            </p>
            <div className="p-3 rounded-xl bg-[#ecf6ee] text-[#151d19] text-xs flex items-start gap-2 border border-emerald-900/5">
              <span className="font-bold text-[#013625] shrink-0">Clinical Recommendation:</span>
              <p className="text-[11px] leading-tight text-[#414944]">
                Review recent Quick Pick Trail latency and adjust session difficulty to Gentle if needed.
              </p>
            </div>
            <div className="pt-1 flex items-center gap-1 text-[11px] text-[#717973]">
              <HelpCircle className="h-3 w-3" />
              <span>Decision support only — not a medical diagnosis.</span>
            </div>
          </section>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#013625]">Add Clinical Note</h3>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter confidential observation or clinical guidance note..."
              className="w-full p-3 bg-[#ecf6ee] rounded-xl text-xs text-[#151d19] focus:outline-none border border-emerald-900/10"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#e6f0e8] text-[#151d19]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Clinical note saved successfully');
                  setShowNoteModal(false);
                  setNoteText('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#013625] text-white"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#013625]">Assign Cognitive Activity</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Activity</label>
                <select className="w-full p-2.5 bg-[#ecf6ee] rounded-xl border border-emerald-900/10">
                  <option>Quick Pick Trail (Math & Patterns)</option>
                  <option>My Memory Trail (Autobiographical)</option>
                  <option>Circadian Memory Routine</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Target Difficulty</label>
                <select className="w-full p-2.5 bg-[#ecf6ee] rounded-xl border border-emerald-900/10">
                  <option>Gentle (Level 1-2)</option>
                  <option>Comfortable (Level 3-4)</option>
                  <option>Active (Level 5)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#e6f0e8] text-[#151d19]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Activity assignment submitted to patient portal');
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#013625] text-white"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
