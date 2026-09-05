'use client';

import React, { useState } from 'react';
import { X, Clock, CalendarClock, ShieldCheck } from 'lucide-react';
import { CaregiverReminder, ReminderCategory, ReminderPeriod } from '../types';

interface EditReminderModalProps {
  isOpen: boolean;
  reminder: CaregiverReminder | null;
  onClose: () => void;
  onSaveReminder: (updatedReminder: CaregiverReminder) => void;
}

export function EditReminderModal(props: EditReminderModalProps) {
  if (!props.isOpen || !props.reminder) return null;
  return <EditReminderForm key={props.reminder.id} {...props} reminder={props.reminder} />;
}

function EditReminderForm({
  reminder,
  onClose,
  onSaveReminder,
}: {
  reminder: CaregiverReminder;
  onClose: () => void;
  onSaveReminder: (updatedReminder: CaregiverReminder) => void;
}) {
  const [title, setTitle] = useState(reminder.title);
  const [category, setCategory] = useState<ReminderCategory>(reminder.category);
  const [period, setPeriod] = useState<ReminderPeriod>(reminder.period);
  const [timeFormatted, setTimeFormatted] = useState(reminder.timeFormatted);
  const [instructions, setInstructions] = useState(reminder.instructions);
  const [dosageNote, setDosageNote] = useState(reminder.medicationDosageNote || '');
  const [requiresCaregiverValidation, setRequiresCaregiverValidation] = useState(
    reminder.requiresCaregiverValidation
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveReminder({
      ...reminder,
      title: title.trim(),
      category,
      period,
      timeFormatted: timeFormatted.trim() || reminder.timeFormatted,
      instructions: instructions.trim(),
      medicationDosageNote: category === 'medication' ? dosageNote.trim() : undefined,
      requiresCaregiverValidation,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="edit-reminder-dialog"
        className="relative w-full max-w-lg rounded-3xl bg-white border border-brand-border p-6 sm:p-8 shadow-2xl transition-all my-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <CalendarClock className="h-4 w-4" />
            <span>Edit Scheduled Reminder</span>
          </div>
          <h2 className="text-xl font-bold text-brand-dark mt-1">
            Update Schedule
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Modify timing, instructions, or dosage for Papa&apos;s daily companion.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="edit-reminder-title" className="block text-xs font-bold text-brand-dark mb-1">
              Title *
            </label>
            <input
              id="edit-reminder-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-reminder-category" className="block text-xs font-bold text-brand-dark mb-1">
                Category
              </label>
              <select
                id="edit-reminder-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ReminderCategory)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
              >
                <option value="medication">💊 Medication</option>
                <option value="routine">🌿 Daily Routine</option>
                <option value="custom">⭐ Custom Reminder</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-reminder-period" className="block text-xs font-bold text-brand-dark mb-1">
                Time Period
              </label>
              <select
                id="edit-reminder-period"
                value={period}
                onChange={(e) => setPeriod(e.target.value as ReminderPeriod)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
              >
                <option value="morning">🌅 Morning</option>
                <option value="afternoon">☀️ Afternoon</option>
                <option value="evening">🌇 Evening</option>
                <option value="bedtime">🌙 Bedtime</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-reminder-time" className="block text-xs font-bold text-brand-dark mb-1">
                Scheduled Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="edit-reminder-time"
                  type="text"
                  value={timeFormatted}
                  onChange={(e) => setTimeFormatted(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>

            {category === 'medication' && (
              <div>
                <label htmlFor="edit-reminder-dosage" className="block text-xs font-bold text-brand-dark mb-1">
                  Dosage Note
                </label>
                <input
                  id="edit-reminder-dosage"
                  type="text"
                  value={dosageNote}
                  onChange={(e) => setDosageNote(e.target.value)}
                  placeholder="e.g. 5mg tablet"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="edit-reminder-instructions" className="block text-xs font-bold text-brand-dark mb-1">
              Instructions
            </label>
            <textarea
              id="edit-reminder-instructions"
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-brand-light-alt/80 border border-brand-border/60 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              <div>
                <p className="text-xs font-bold text-brand-dark">Require Caregiver Validation</p>
                <p className="text-[11px] text-brand-muted">Notify caregiver to verify confirmation</p>
              </div>
            </div>
            <input
              type="checkbox"
              id="edit-caregiver-val-checkbox"
              checked={requiresCaregiverValidation}
              onChange={(e) => setRequiresCaregiverValidation(e.target.checked)}
              className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-edit-reminder-btn"
              className="rounded-full bg-brand-dark px-6 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 shadow-sm transition-all"
            >
              Update Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
