'use client';

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  Heart,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { ClinicalPatient, ClinicalRiskLevel } from '../types';

interface PatientSummaryCardProps {
  patient: ClinicalPatient;
}

export function PatientSummaryCard({ patient }: PatientSummaryCardProps) {
  const getRiskBadge = (level: ClinicalRiskLevel) => {
    switch (level) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            <span>Optimal Stability</span>
          </span>
        );
      case 'mild_variance':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Mild Variance</span>
          </span>
        );
      case 'review_recommended':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span>Review Suggested</span>
          </span>
        );
    }
  };

  const getTrendIcon = (trend: ClinicalPatient['engagementTrend']) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />;
      case 'declining':
        return <TrendingDown className="h-3.5 w-3.5 text-slate-500" />;
      case 'stable':
      default:
        return <Minus className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div
      id={`patient-summary-card-${patient.id}`}
      className="group relative rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Patient Name, Age & Risk Indicator */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/practitioner/patient/${patient.id}`}
                className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors"
              >
                {patient.name}
              </Link>
              <span className="text-xs text-slate-500 font-mono">
                {patient.age}y • {patient.gender[0]}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5 line-clamp-1">
              {patient.condition}
            </p>
          </div>

          <div className="shrink-0">
            {getRiskBadge(patient.riskIndicator)}
          </div>
        </div>

        {/* Caregiver & Attending Line */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 border-t border-slate-100 pt-2.5">
          <UserCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            Caregiver: <strong className="text-slate-700 font-medium">{patient.primaryCaregiver.name}</strong> ({patient.primaryCaregiver.relation})
          </span>
        </div>

        {/* 3 Core Clinical Scores Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50/80 border border-slate-100 p-3 text-center">
          {/* Score 1: Engagement Score */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Engagement
            </span>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg font-bold text-slate-900 font-mono">
                {patient.engagementScore}%
              </span>
              {getTrendIcon(patient.engagementTrend)}
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${patient.engagementScore}%` }}
              />
            </div>
          </div>

          {/* Score 2: Memory Activity Score */}
          <div className="flex flex-col items-center border-x border-slate-200/60 px-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Memory
            </span>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg font-bold text-slate-900 font-mono">
                {patient.memoryActivityScore}%
              </span>
              <Sparkles className="h-3 w-3 text-amber-500" />
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${patient.memoryActivityScore}%` }}
              />
            </div>
          </div>

          {/* Score 3: Routine Adherence Score */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Adherence
            </span>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg font-bold text-slate-900 font-mono">
                {patient.routineAdherenceScore}%
              </span>
              <Heart className="h-3 w-3 text-teal-600" />
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-teal-600 h-full rounded-full"
                style={{ width: `${patient.routineAdherenceScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Clinical Context / Observation Note */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
          &ldquo;{patient.riskContextNote}&rdquo;
        </p>
      </div>

      {/* Footer: Last Interaction & Link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] truncate mr-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{patient.lastInteraction}</span>
        </div>

        <Link
          href={`/practitioner/patient/${patient.id}`}
          className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-800 hover:underline shrink-0"
        >
          <span>Clinical File</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
