'use client';

import React from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  ChevronRight,
  Clock,
  Stethoscope,
  Cpu,
  Heart,
  AlertCircle,
} from 'lucide-react';
import { ClinicalObservation, ObservationType } from '../types';

interface RecentObservationsFeedProps {
  observations: ClinicalObservation[];
  maxItems?: number;
}

export function RecentObservationsFeed({
  observations,
  maxItems = 4,
}: RecentObservationsFeedProps) {
  const displayed = observations.slice(0, maxItems);

  const getIcon = (type: ObservationType) => {
    switch (type) {
      case 'care_note':
        return <Stethoscope className="h-3.5 w-3.5 text-blue-600" />;
      case 'observation':
        return <Cpu className="h-3.5 w-3.5 text-emerald-600" />;
      case 'family_update':
        return <Heart className="h-3.5 w-3.5 text-amber-600" />;
      case 'significant_event':
        return <AlertCircle className="h-3.5 w-3.5 text-indigo-600" />;
    }
  };

  return (
    <div
      id="recent-observations-card"
      className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Recent Clinical Observations
            </h3>
          </div>
          <Link
            href="/practitioner/observations"
            className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <span>View Full Timeline</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {displayed.map((obs) => (
            <div
              key={obs.id}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  {getIcon(obs.type)}
                  <Link
                    href={`/practitioner/patient/${obs.patientId}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {obs.patientName}
                  </Link>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {obs.timestamp}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-1.5 line-clamp-1">
                {obs.title}
              </p>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                {obs.summary}
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>By {obs.author.name}</span>
                <span className="capitalize">{obs.type.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <Link
          href="/practitioner/observations"
          className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline"
        >
          Explore all {observations.length} clinical observation records →
        </Link>
      </div>
    </div>
  );
}
