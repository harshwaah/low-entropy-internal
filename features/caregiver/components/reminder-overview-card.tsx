'use client';

import React from 'react';
import Link from 'next/link';
import { CaregiverReminder } from '../types';
import {
  CheckCircle2,
  Clock,
  Pill,
  Sun,
  Moon,
  HeartPulse,
  BookOpen,
  GlassWater,
  Music,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReminderOverviewCardProps {
  reminders: CaregiverReminder[];
  onToggleStatus?: (id: string) => void;
  onOpenAddModal?: () => void;
}

export function ReminderOverviewCard({
  reminders,
  onToggleStatus,
  onOpenAddModal,
}: ReminderOverviewCardProps) {
  const completedCount = reminders.filter((r) => r.status === 'completed').length;
  const totalCount = reminders.length;

  const getReminderIcon = (category: CaregiverReminder['category'], iconName?: string) => {
    if (iconName === 'Pill' || category === 'medication') return <Pill className="h-4 w-4 text-rose-600" />;
    if (iconName === 'Sun') return <Sun className="h-4 w-4 text-amber-600" />;
    if (iconName === 'Moon') return <Moon className="h-4 w-4 text-indigo-600" />;
    if (iconName === 'GlassWater') return <GlassWater className="h-4 w-4 text-sky-600" />;
    if (iconName === 'Music') return <Music className="h-4 w-4 text-teal-600" />;
    if (iconName === 'BookOpen') return <BookOpen className="h-4 w-4 text-amber-700" />;
    return <Clock className="h-4 w-4 text-brand-primary" />;
  };

  return (
    <div
      id="caregiver-reminder-overview-card"
      className="rounded-3xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-brand-dark">Daily Reminders &amp; Meds</h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Today&apos;s circadian medication and gentle routine schedule.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">
              {completedCount} of {totalCount} Done
            </span>
          </div>
        </div>

        {/* List of Today's Reminders */}
        <div className="mt-4 space-y-3">
          {reminders.slice(0, 4).map((reminder) => {
            const isCompleted = reminder.status === 'completed';
            return (
              <div
                key={reminder.id}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-2xl p-3.5 transition-all border',
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200/60'
                    : 'bg-brand-light-alt/60 border-brand-border/60 hover:bg-white hover:border-brand-primary/40'
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-white shadow-xs'
                    )}
                  >
                    {getReminderIcon(reminder.category, reminder.iconName)}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-xs sm:text-sm font-bold truncate',
                        isCompleted ? 'line-through text-slate-500' : 'text-brand-dark'
                      )}
                    >
                      {reminder.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-brand-muted mt-0.5">
                      <span className="font-semibold text-slate-700">{reminder.timeFormatted}</span>
                      <span>•</span>
                      <span className="capitalize">{reminder.category}</span>
                      {reminder.requiresCaregiverValidation && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-0.5 text-brand-primary font-medium">
                            <ShieldCheck className="h-3 w-3" />
                            Caregiver check
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {onToggleStatus ? (
                    <button
                      type="button"
                      onClick={() => onToggleStatus(reminder.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all',
                        isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-800'
                      )}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  ) : (
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-bold',
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-brand-light text-brand-dark'
                      )}
                    >
                      {isCompleted ? 'Done' : 'Upcoming'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        {onOpenAddModal ? (
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-4 py-2 text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Reminder</span>
          </button>
        ) : (
          <Link
            href="/caregiver/reminders"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-4 py-2 text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Reminder</span>
          </Link>
        )}

        <Link
          href="/caregiver/reminders"
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:text-brand-primary transition-colors"
        >
          <span>View All ({totalCount})</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
