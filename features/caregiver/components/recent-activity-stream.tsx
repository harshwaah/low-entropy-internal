'use client';

import React from 'react';
import { CaregiverActivityLog } from '../types';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Coffee,
  Heart,
  Footprints,
  Sparkles,
  Smile,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentActivityStreamProps {
  activities: CaregiverActivityLog[];
}

export function RecentActivityStream({ activities }: RecentActivityStreamProps) {
  const getCategoryIcon = (category: CaregiverActivityLog['category']) => {
    switch (category) {
      case 'memory':
        return <BookOpen className="h-4 w-4 text-amber-600" />;
      case 'hydration':
        return <Coffee className="h-4 w-4 text-sky-600" />;
      case 'movement':
        return <Footprints className="h-4 w-4 text-emerald-600" />;
      case 'social':
        return <Heart className="h-4 w-4 text-rose-600" />;
      case 'routine':
      default:
        return <Sparkles className="h-4 w-4 text-brand-primary" />;
    }
  };

  return (
    <div
      id="caregiver-recent-activity-stream"
      className="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-brand-dark">Today&apos;s Activity Stream</h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Passive check-ins, routine compliance, and emotional engagement moments.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
          Live Telemetry
        </span>
      </div>

      <div className="mt-6 flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3.5">
                  <div className="relative">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white shadow-xs',
                        activity.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-brand-light text-brand-dark'
                      )}
                    >
                      {getCategoryIcon(activity.category)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <p className="text-sm font-bold text-brand-dark">{activity.title}</p>
                      <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                        {activity.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            Completed
                          </span>
                        )}
                        {activity.status === 'scheduled' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            Scheduled
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {activity.description}
                    </p>
                    {activity.companionFeedback && (
                      <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-brand-light-alt/80 border border-brand-border/60 px-3 py-1.5 text-xs text-brand-text">
                        <Smile className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                        <span className="italic">&ldquo;{activity.companionFeedback}&rdquo;</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
