'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Heart,
  Clock,
  Pill,
  BookOpen,
  Users,
  CheckCircle2,
  Stethoscope,
  AlertCircle,
  FileText,
  Share2,
  Printer,
  ChevronRight,
} from 'lucide-react';
import {
  ClinicalPatient,
  ClinicalObservation,
  ClinicalRecommendation,
} from '../types';
import { ObservationTimelineView } from './observation-timeline-view';
import { RecommendationsPanel } from './recommendations-panel';

interface PatientDetailViewProps {
  patient: ClinicalPatient;
  observations: ClinicalObservation[];
  recommendations: ClinicalRecommendation[];
  allPatients: { id: string; name: string }[];
}

export function PatientDetailView({
  patient,
  observations,
  recommendations,
  allPatients,
}: PatientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'observations' | 'recommendations'>(
    'overview'
  );

  return (
    <div id="patient-detail-container" className="space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/practitioner"
            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Patient Roster</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900">{patient.name}</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
            ID: {patient.id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print Clinical Record</span>
          </button>
        </div>
      </div>

      {/* Patient Clinical Profile Hero Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Left: Avatar & Demographics */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-2xl font-mono shrink-0 shadow-inner">
              {patient.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {patient.name}
                </h1>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-semibold text-blue-800">
                  {patient.stage.toUpperCase()} STAGE
                </span>
                {patient.riskIndicator === 'optimal' && (
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>{patient.riskLabel}</span>
                  </span>
                )}
                {patient.riskIndicator === 'mild_variance' && (
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs font-semibold text-amber-800 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>{patient.riskLabel}</span>
                  </span>
                )}
                {patient.riskIndicator === 'review_recommended' && (
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-0.5 text-xs font-semibold text-indigo-800 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{patient.riskLabel}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {patient.condition}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>
                  Age: <strong className="text-slate-800">{patient.age} years</strong>
                </span>
                <span>•</span>
                <span>
                  Preferred: <strong className="text-slate-800">&ldquo;{patient.preferredName}&rdquo;</strong>
                </span>
                <span>•</span>
                <span>
                  Physician: <strong className="text-slate-800">{patient.attendingPhysician}</strong>
                </span>
                <span>•</span>
                <span>
                  Active: <strong className="text-slate-800">{patient.daysActive} days</strong> on SmritiSaathi
                </span>
              </div>
            </div>
          </div>

          {/* Right: Caregiver Contact Card */}
          <div className="w-full lg:w-72 shrink-0 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Primary Caregiver Contact
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Verified
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              <p className="font-bold text-slate-900 text-sm">
                {patient.primaryCaregiver.name}
              </p>
              <p className="text-slate-600">
                Relation: <span className="font-medium text-slate-800">{patient.primaryCaregiver.relation}</span>
              </p>
              <div className="flex items-center gap-1.5 text-slate-600 pt-1">
                <Phone className="h-3 w-3 text-slate-400" />
                <span>{patient.primaryCaregiver.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Mail className="h-3 w-3 text-slate-400" />
                <span className="truncate">{patient.primaryCaregiver.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Note Context */}
        <div className="mt-5 rounded-2xl bg-blue-50/60 border border-blue-100 p-3.5 text-xs text-blue-900">
          <strong className="font-bold">Attending Clinician Baseline:</strong> {patient.riskContextNote}
        </div>
      </div>

      {/* Navigation Tabs: Clinical Overview vs Observations vs Recommendations */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Clinical Deep-Dive & Metrics
        </button>
        <button
          onClick={() => setActiveTab('observations')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'observations'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Observation History</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.2 text-[10px] text-slate-700 font-bold">
            {observations.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'recommendations'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Clinical Recommendations</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.2 text-[10px] text-amber-900 font-bold">
            {recommendations.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Clinical Deep-Dive & Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 3 Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Score 1 */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Overall Engagement
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="h-3 w-3" />
                  Preserved
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 font-mono">
                  {patient.engagementScore}%
                </span>
                <span className="text-xs text-slate-500">30-day baseline</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${patient.engagementScore}%` }}
                />
              </div>
            </div>

            {/* Score 2 */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Memory Scrapbook Score
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  High Fluency
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 font-mono">
                  {patient.memoryActivityScore}%
                </span>
                <span className="text-xs text-slate-500">Episodic recall index</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${patient.memoryActivityScore}%` }}
                />
              </div>
            </div>

            {/* Score 3 */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Routine Adherence
                </span>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  On Schedule
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 font-mono">
                  {patient.routineAdherenceScore}%
                </span>
                <span className="text-xs text-slate-500">Autonomous execution</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-full rounded-full"
                  style={{ width: `${patient.routineAdherenceScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Longitudinal 7-Day Patient Trend Visualizer */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  7-Day Individual Trajectory (Memory vs Adherence)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison between daily reminiscence engagement and scheduled circadian routine compliance.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span>Memory ({patient.memoryActivityScore}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-teal-700 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                  <span>Routines ({patient.routineAdherenceScore}%)</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-44 pt-4 pb-2 border-b border-slate-100">
                {patient.weeklyHistory.map((day) => (
                  <div key={day.day} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-mono font-bold text-white shadow-md pointer-events-none whitespace-nowrap z-20">
                      {day.day}: Mem {day.memory}% • Rout {day.adherence}%
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                      <div className="w-full max-w-[20px] bg-amber-50 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                        <div
                          className="w-full rounded-t-lg bg-amber-500 group-hover:bg-amber-600 transition-all duration-300"
                          style={{ height: `${day.memory}%` }}
                        />
                      </div>
                      <div className="w-full max-w-[20px] bg-teal-50 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                        <div
                          className="w-full rounded-t-lg bg-teal-600 group-hover:bg-teal-700 transition-all duration-300"
                          style={{ height: `${day.adherence}%` }}
                        />
                      </div>
                    </div>

                    <span className="mt-2 text-xs font-semibold text-slate-600">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two-Column Clinical Grid: Medications & Reminiscence Triggers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Active Regimen & Circadian Timing */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Active Medications & Prompt Compliance
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    Avg 92% Compliance
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {patient.activeMedications.map((med) => (
                    <div
                      key={med.name}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{med.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {med.dosage} • {med.timing}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800">
                          {med.adherenceRate}%
                        </span>
                        <p className="text-[10px] text-emerald-700 font-semibold">On Schedule</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Last verified dose: {patient.lastInteraction}</span>
              </div>
            </div>

            {/* Right: Memory Reminiscence Anchors & Triggers */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Autobiographical Reminiscence Anchors
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    Strongest Recall
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {patient.primaryNostalgicTriggers.map((trigger, idx) => (
                    <div
                      key={trigger}
                      className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-xs flex items-center gap-2.5 text-slate-800"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{trigger}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed italic">
                Clinical Tip: Auditory anchors (sitar chords and grandson vocal notes) yield instantaneous facial recognition and calmness within 60 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Observation History for this patient */}
      {activeTab === 'observations' && (
        <div className="space-y-4">
          <ObservationTimelineView
            initialObservations={observations}
            patients={allPatients}
            currentPatientId={patient.id}
          />
        </div>
      )}

      {/* Tab 3: Recommendations for this patient */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <RecommendationsPanel
            initialRecommendations={recommendations}
            patientId={patient.id}
          />
        </div>
      )}
    </div>
  );
}
