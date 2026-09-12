'use client';

import React, { useState } from 'react';
import { INITIAL_CAREGIVER_REMINDERS } from '@/features/caregiver/data/sample-caregiver-data';
import { CaregiverReminder, ReminderCategory } from '@/features/caregiver/types';
import { AddReminderModal, EditReminderModal } from '@/features/caregiver';
import {
  CalendarClock,
  Plus,
  Edit3,
  CheckCircle2,
  Clock,
  Pill,
  Sun,
  Moon,
  HeartPulse,
  BookOpen,
  GlassWater,
  Music,
  ShieldCheck,
  Filter,
  Check,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Mascot } from '@/components/shared/mascot';
import { useSharedData } from '@/services/context/shared-data-context';

export default function CaregiverRemindersPage() {
  const {
    selectedPatient,
    reminders: sharedReminders,
    toggleReminderStatus,
    createReminder,
    updateReminder,
    deleteReminder,
  } = useSharedData();

  const [activeCategory, setActiveCategory] = useState<'all' | ReminderCategory>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<CaregiverReminder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Map shared reminders into CaregiverReminder shape for UI
  const reminders: CaregiverReminder[] = sharedReminders.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category === 'medication' ? 'medication' : r.category === 'custom' ? 'custom' : 'routine',
    period: r.period || 'morning',
    timeFormatted: r.timeFormatted || r.time || '9:00 AM',
    instructions: r.instructions || r.description || '',
    recurrence: (r.recurrence as any) || 'daily',
    requiresCaregiverValidation: false,
    status: r.status,
    completedAt: r.completedAt,
    assignedTo: r.assignedTo || 'Heena Sharma',
    iconName: r.iconName,
    medicationDosageNote: r.medicationDosageNote || r.dosage,
  }));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleStatus = (id: string) => {
    const rem = reminders.find((r) => r.id === id);
    const newStatus = rem?.status === 'completed' ? 'upcoming' : 'completed';
    toggleReminderStatus(id, newStatus, 'Heena Sharma (Caregiver Portal)');
    showToast('Updated reminder status');
  };

  const handleAddReminder = (newRem: Omit<CaregiverReminder, 'id' | 'status'>) => {
    const item = {
      id: `rem-custom-${Date.now()}`,
      patientId: selectedPatient?.id || 'p-101',
      title: newRem.title,
      timeFormatted: newRem.timeFormatted,
      time: newRem.timeFormatted,
      category: newRem.category,
      period: newRem.period,
      status: 'upcoming' as const,
      instructions: newRem.instructions,
      recurrence: newRem.recurrence,
      assignedTo: newRem.assignedTo,
      requiresCaregiverValidation: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    createReminder(item);
    showToast(`Added reminder: "${item.title}"`);
  };

  const handleSaveEditedReminder = (updated: CaregiverReminder) => {
    updateReminder(updated.id, {
      title: updated.title,
      time: updated.timeFormatted,
      category: updated.category,
      period: updated.period,
      instructions: updated.instructions,
      recurrence: updated.recurrence,
      assignedTo: updated.assignedTo,
    });
    setEditingReminder(null);
    showToast(`Saved changes to "${updated.title}"`);
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id);
    showToast('Reminder removed from schedule');
  };

  const filteredReminders = reminders.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const getCategoryIcon = (category: ReminderCategory, iconName?: string) => {
    if (category === 'medication' || iconName === 'Pill') return <Pill className="h-4 w-4 text-rose-600" />;
    if (iconName === 'Sun') return <Sun className="h-4 w-4 text-amber-600" />;
    if (iconName === 'Moon') return <Moon className="h-4 w-4 text-indigo-600" />;
    if (iconName === 'GlassWater') return <GlassWater className="h-4 w-4 text-sky-600" />;
    if (iconName === 'Music') return <Music className="h-4 w-4 text-teal-600" />;
    if (iconName === 'BookOpen') return <BookOpen className="h-4 w-4 text-amber-700" />;
    return <Clock className="h-4 w-4 text-brand-primary" />;
  };

  const completedCount = reminders.filter((r) => r.status === 'completed').length;
  const totalReminderCount = reminders.length;
  const progressPercentage = totalReminderCount === 0 ? 0 : Math.round((completedCount / totalReminderCount) * 100);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="caregiver-reminders-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-brand-dark px-5 py-3 text-xs font-bold text-white shadow-xl animate-fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <CalendarClock className="h-4 w-4" />
            <span>Circadian Rhythm & Medication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-0.5">
            Daily Reminders & Routines
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Configure medication schedules, daily hydration breaks, and gentle companion cues for Papa.
          </p>
        </div>

        <button
          type="button"
          id="add-reminder-btn-page"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Companion Guidance Strip */}
      <div className="rounded-3xl bg-brand-light/70 border border-brand-primary/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Mascot size="sm" state="encouraging" />
          <div className="text-xs sm:text-sm text-brand-text leading-relaxed">
            <h3 className="font-bold text-brand-dark">
              {totalReminderCount === 0
                ? 'No reminders are scheduled yet'
                : `Today&apos;s Schedule Progress: ${completedCount} of ${totalReminderCount} Done`}
            </h3>
            <p className="text-brand-muted mt-0.5">
              {totalReminderCount === 0
                ? 'Start by adding a gentle reminder for medication, hydration, or a warm family ritual.'
                : 'Morning medications were verified at 8:12 AM. The companion will chime gently with sitar music for the afternoon scrapbook session.'}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="h-2.5 w-36 sm:w-44 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-brand-dark">
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            activeCategory === 'all'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          All ({reminders.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('medication')}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            activeCategory === 'medication'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          <Pill className="h-3.5 w-3.5 text-rose-500" />
          <span>Medication Reminders ({reminders.filter((r) => r.category === 'medication').length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('routine')}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            activeCategory === 'routine'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>Daily Routines ({reminders.filter((r) => r.category === 'routine').length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('custom')}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            activeCategory === 'custom'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          <GlassWater className="h-3.5 w-3.5 text-sky-500" />
          <span>Custom Reminders ({reminders.filter((r) => r.category === 'custom').length})</span>
        </button>
      </div>

      {/* Reminder Cards Grid */}
      <section aria-label="Reminders List" className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-border/80 bg-white p-10 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-brand-dark">
              {totalReminderCount === 0 ? 'No reminders yet' : 'No reminders match this filter'}
            </h3>
            <p className="mt-1 text-xs text-brand-muted">
              {totalReminderCount === 0
                ? 'Create a gentle reminder for medication, hydration, or daily companionship.'
                : 'Try another reminder category to view the full caregiver schedule.'}
            </p>
          </div>
        ) : (
          filteredReminders.map((reminder) => {
            const isDone = reminder.status === 'completed';
            return (
              <div
                key={reminder.id}
                id={`reminder-card-${reminder.id}`}
                className={cn(
                  'rounded-3xl border p-5 sm:p-6 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4',
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200/70'
                    : 'bg-white border-brand-border/80 hover:shadow-md'
                )}
              >
              {/* Left Details */}
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs',
                    isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-light text-brand-dark'
                  )}
                >
                  {getCategoryIcon(reminder.category, reminder.iconName)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 capitalize">
                      {reminder.period}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-extrabold text-brand-dark">
                      <Clock className="h-3 w-3 text-brand-primary" />
                      {reminder.timeFormatted}
                    </span>
                    <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-bold text-brand-dark capitalize">
                      {reminder.category}
                    </span>
                    {reminder.requiresCaregiverValidation && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 border border-teal-200/80 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                        <ShieldCheck className="h-2.5 w-2.5" />
                        Caregiver Verification
                      </span>
                    )}
                  </div>

                  <h3
                    className={cn(
                      'text-base sm:text-lg font-bold mt-1.5 truncate',
                      isDone ? 'line-through text-slate-500' : 'text-brand-dark'
                    )}
                  >
                    {reminder.title}
                  </h3>

                  {reminder.medicationDosageNote && (
                    <p className="text-xs font-semibold text-rose-800 mt-0.5">
                      Dosage: {reminder.medicationDosageNote}
                    </p>
                  )}

                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {reminder.instructions}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Recurrence: {reminder.recurrence}</span>
                    <span>•</span>
                    <span>Assigned to: {reminder.assignedTo}</span>
                    {reminder.completedAt && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">
                          Completed at {reminder.completedAt}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  id={`edit-btn-${reminder.id}`}
                  onClick={() => setEditingReminder(reminder)}
                  className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                >
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  id={`toggle-done-btn-${reminder.id}`}
                  onClick={() => handleToggleStatus(reminder.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs',
                    isDone
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-brand-dark text-white hover:bg-brand-dark/90'
                  )}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                </button>

                <button
                  type="button"
                  aria-label="Delete Reminder"
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="rounded-full p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
              );
            })
          )}
      </section>

      {/* Add Reminder Modal */}
      <AddReminderModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddReminder={handleAddReminder}
      />

      {/* Edit Reminder Modal */}
      <EditReminderModal
        isOpen={!!editingReminder}
        reminder={editingReminder}
        onClose={() => setEditingReminder(null)}
        onSaveReminder={handleSaveEditedReminder}
      />

    </div>
  );
}
