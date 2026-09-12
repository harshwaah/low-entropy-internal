'use client';

import React, { useState } from 'react';
import { X, Clock, Pill, CalendarClock, ShieldCheck, Sparkles } from 'lucide-react';
import { CaregiverReminder, ReminderCategory, ReminderPeriod } from '../types';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: (reminder: Omit<CaregiverReminder, 'id' | 'status'>) => void;
}

export function AddReminderModal({ isOpen, onClose, onAddReminder }: AddReminderModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReminderCategory>('medication');
  const [period, setPeriod] = useState<ReminderPeriod>('morning');
  const [timeFormatted, setTimeFormatted] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('');
  const [dosageNote, setDosageNote] = useState('');
  const [recurrence, setRecurrence] = useState<'daily' | 'weekdays' | 'weekends' | 'custom'>('daily');
  const [requiresCaregiverValidation, setRequiresCaregiverValidation] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddReminder({
      title: title.trim(),
      category,
      period,
      timeFormatted: timeFormatted.trim() || '08:00 AM',
      instructions: instructions.trim() || 'Gentle reminder scheduled for Papa.',
      medicationDosageNote: category === 'medication' ? dosageNote.trim() : undefined,
      recurrence,
      requiresCaregiverValidation,
      assignedTo: 'Heena Sharma',
      iconName: category === 'medication' ? 'Pill' : 'Sun',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="add-reminder-dialog"
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
            <span>Circadian Schedule & Medication</span>
          </div>
          <h2 className="text-xl font-bold text-brand-dark mt-1">
            Add New Reminder
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Configure a gentle reminder or medication prompt for Papa&apos;s daily rhythm.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Title */}
          <div>
            <label htmlFor="reminder-title-input" className="block text-xs font-bold text-brand-dark mb-1">
              Reminder Title *
            </label>
            <input
              id="reminder-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Donepezil 5mg or Balcony Morning Chai"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>

          {/* Category & Period */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reminder-category-select" className="block text-xs font-bold text-brand-dark mb-1">
                Category
              </label>
              <select
                id="reminder-category-select"
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
              <label htmlFor="reminder-period-select" className="block text-xs font-bold text-brand-dark mb-1">
                Time Period
              </label>
              <select
                id="reminder-period-select"
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

          {/* Scheduled Time & Recurrence */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reminder-time-input" className="block text-xs font-bold text-brand-dark mb-1">
                Scheduled Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="reminder-time-input"
                  type="text"
                  value={timeFormatted}
                  onChange={(e) => setTimeFormatted(e.target.value)}
                  placeholder="e.g. 08:30 AM"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reminder-recurrence-select" className="block text-xs font-bold text-brand-dark mb-1">
                Recurrence
              </label>
              <select
                id="reminder-recurrence-select"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
              >
                <option value="daily">Every Day</option>
                <option value="weekdays">Weekdays Only</option>
                <option value="weekends">Weekends Only</option>
                <option value="custom">Specific Days</option>
              </select>
            </div>
          </div>

          {/* Dosage Note if Medication */}
          {category === 'medication' && (
            <div>
              <label htmlFor="reminder-dosage-input" className="block text-xs font-bold text-brand-dark mb-1">
                Dosage & Administration Note
              </label>
              <input
                id="reminder-dosage-input"
                type="text"
                value={dosageNote}
                onChange={(e) => setDosageNote(e.target.value)}
                placeholder="e.g. 1 tablet with warm milk after breakfast"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
              />
            </div>
          )}

          {/* Instructions */}
          <div>
            <label htmlFor="reminder-instructions-input" className="block text-xs font-bold text-brand-dark mb-1">
              Instructions & Companion Voice Prompt
            </label>
            <textarea
              id="reminder-instructions-input"
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Gentle guidance shown to Papa and companion..."
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
            />
          </div>

          {/* Caregiver Validation Toggle */}
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
              id="caregiver-val-checkbox"
              checked={requiresCaregiverValidation}
              onChange={(e) => setRequiresCaregiverValidation(e.target.checked)}
              className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary"
            />
          </div>

          {/* Form Actions */}
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
              id="submit-add-reminder-btn"
              className="rounded-full bg-brand-dark px-6 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 shadow-sm transition-all"
            >
              Save Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
