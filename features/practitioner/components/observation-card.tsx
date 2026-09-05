'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Activity,
  Heart,
  AlertCircle,
  User,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Stethoscope,
  Cpu,
} from 'lucide-react';
import { ClinicalObservation, ObservationType } from '../types';

interface ObservationCardProps {
  observation: ClinicalObservation;
}

export function ObservationCard({ observation }: ObservationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getTypeBadge = (type: ObservationType) => {
    switch (type) {
      case 'care_note':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800 border border-blue-200">
            <Stethoscope className="h-3 w-3 text-blue-600" />
            <span>Care Note</span>
          </span>
        );
      case 'observation':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <Cpu className="h-3 w-3 text-emerald-600" />
            <span>Companion Telemetry</span>
          </span>
        );
      case 'family_update':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
            <Heart className="h-3 w-3 text-amber-600" />
            <span>Family Update</span>
          </span>
        );
      case 'significant_event':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-800 border border-indigo-200">
            <AlertCircle className="h-3 w-3 text-indigo-600" />
            <span>Significant Event</span>
          </span>
        );
    }
  };

  return (
    <div
      id={`observation-card-${observation.id}`}
      className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all"
    >
      {/* Top Header: Badge, Patient Link, and Timestamp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {getTypeBadge(observation.type)}
          <Link
            href={`/practitioner/patient/${observation.patientId}`}
            className="text-xs font-bold text-slate-800 hover:text-blue-700 hover:underline"
          >
            Patient: {observation.patientName}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{observation.timestamp}</span>
        </div>
      </div>

      {/* Observation Title & Clinical Summary */}
      <div className="mt-3">
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {observation.title}
        </h3>
        <p className="mt-1 text-xs text-slate-700 leading-relaxed font-medium">
          {observation.summary}
        </p>

        {/* Detailed expanded content */}
        {expanded && (
          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 leading-relaxed space-y-2">
            <p>{observation.detail}</p>
            {observation.vitalContext && (
              <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-1.5">
                <strong>Vitals / Safety Context:</strong> {observation.vitalContext}
              </div>
            )}
            {observation.actionTaken && (
              <div className="text-[11px] text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Action Taken: {observation.actionTaken}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Metadata: Author, Tags & Expand Toggle */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {/* Author Attribution */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <span className="font-semibold text-slate-700">{observation.author.name}</span>
          <span>•</span>
          <span>{observation.author.role}</span>
        </div>

        {/* Tags & Expand Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 flex-wrap">
            {observation.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline pl-2 ml-auto"
          >
            <span>{expanded ? 'Less' : 'Details'}</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
