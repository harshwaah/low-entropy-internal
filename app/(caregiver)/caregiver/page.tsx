'use client';

import React, { useState } from 'react';
import {
  PatientOverviewCard,
  ReminderOverviewCard,
  MemoryEngagementSummary,
  RecentNarrationsCard,
  RecentActivityStream,
  AddMemoryModal,
  AddReminderModal,
} from '@/features/caregiver';
import {
  SAMPLE_PATIENT_OVERVIEW,
  INITIAL_CAREGIVER_REMINDERS,
  SAMPLE_ACTIVITY_LOGS,
} from '@/features/caregiver/data/sample-caregiver-data';
import { CaregiverReminder } from '@/features/caregiver/types';
import {
  Heart,
  Plus,
  Bell,
  Calendar,
  Sparkles,
  BookHeart,
  PhoneCall,
  CheckCircle2,
  Smile,
} from 'lucide-react';
import Link from 'next/link';

export default function CaregiverDashboardPage() {
  const [patient, setPatient] = useState(SAMPLE_PATIENT_OVERVIEW);
  const [reminders, setReminders] = useState<CaregiverReminder[]>(INITIAL_CAREGIVER_REMINDERS);
  const [activities, setActivities] = useState(SAMPLE_ACTIVITY_LOGS);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newStatus = r.status === 'completed' ? 'upcoming' : 'completed';
          const isDone = newStatus === 'completed';
          return {
            ...r,
            status: newStatus,
            completedAt: isDone ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
          };
        }
        return r;
      })
    );

    // Update patient completion stats
    setPatient((prev) => {
      const updatedReminders = reminders.map((r) =>
        r.id === id ? { ...r, status: r.status === 'completed' ? 'upcoming' : 'completed' } : r
      );
      const completed = updatedReminders.filter((r) => r.status === 'completed').length;
      const total = updatedReminders.length;
      return {
        ...prev,
        reminderCompletion: {
          completed,
          total,
          percentage: Math.round((completed / total) * 100),
        },
      };
    });

    showToast('Reminder status updated successfully');
  };

  const handleAddReminder = (newRem: Omit<CaregiverReminder, 'id' | 'status'>) => {
    const item: CaregiverReminder = {
      ...newRem,
      id: `rem-${Date.now()}`,
      status: 'upcoming',
    };
    setReminders((prev) => [...prev, item]);
    showToast(`Added reminder: "${item.title}"`);
  };

  const handleAddMemory = (newMem: {
    title: string;
    category: any;
    story: string;
    dateEra: string;
    location: string;
    familyNote: any;
    coverImage: string;
  }) => {
    showToast(`Added cherished memory: "${newMem.title}" to scrapbook`);
    // Add an activity log entry
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: `Curated New Memory: ${newMem.title}`,
        category: 'memory',
        time: 'Just now',
        status: 'completed',
        description: `Added by Priya for Papa's afternoon reminiscence.`,
        companionFeedback: 'Memory ready for companion introduction.',
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          id="caregiver-toast-banner"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-brand-dark px-5 py-3 text-xs font-bold text-white shadow-xl animate-fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Welcome Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Caregiver Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-0.5">
            Family Caregiving Portal
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Empathetic remote oversight, circadian routine management, and reminiscence curation for Papa.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            id="quick-add-memory-btn"
            onClick={() => setIsAddMemoryOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-4 py-2 text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all shadow-xs"
          >
            <BookHeart className="h-3.5 w-3.5" />
            <span>Add Memory</span>
          </button>

          <button
            type="button"
            id="quick-add-reminder-btn"
            onClick={() => setIsAddReminderOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Reminder</span>
          </button>

          <Link
            href="/caregiver/alerts"
            id="quick-view-alerts-btn"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300/80 px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 transition-all shadow-xs"
          >
            <Bell className="h-3.5 w-3.5 text-amber-800" />
            <span>Alerts (2)</span>
          </Link>
        </div>
      </div>

      {/* 1. Prominent Patient Overview Card */}
      <section aria-label="Patient Overview">
        <PatientOverviewCard patient={patient} />
      </section>

      {/* 2. Middle Two-Column Grid: Reminders & Memory Engagement */}
      <section aria-label="Schedules and Memories" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReminderOverviewCard
          reminders={reminders}
          onToggleStatus={handleToggleReminder}
          onOpenAddModal={() => setIsAddReminderOpen(true)}
        />

        <MemoryEngagementSummary
          onOpenAddMemory={() => setIsAddMemoryOpen(true)}
        />
      </section>

      {/* 3. Recent Memory Narrations (AI Memory Layer) */}
      <section aria-label="Recent Memory Narrations">
        <RecentNarrationsCard maxItems={2} />
      </section>

      {/* 4. Bottom Two-Column: Today's Activity Stream & Emergency Safety Beacon Info */}
      <section aria-label="Activity and Safety Telemetry" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityStream activities={activities} />
        </div>

        {/* Caregiver Quick Resources & Emergency Contact Card */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white border border-brand-border/80 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-dark">Family Care Team</h3>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Connected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-brand-light-alt/80 p-3 text-xs">
                <div>
                  <p className="font-bold text-brand-dark">Priya Sharma</p>
                  <p className="text-[11px] text-brand-muted">Primary Daughter • In-home</p>
                </div>
                <span className="font-semibold text-slate-700">+91 98112 34567</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-brand-light-alt/80 p-3 text-xs">
                <div>
                  <p className="font-bold text-brand-dark">Dr. Alok Verma</p>
                  <p className="text-[11px] text-brand-muted">Consulting Geriatrician</p>
                </div>
                <a
                  href="tel:+919811299999"
                  className="inline-flex items-center gap-1 font-bold text-brand-primary hover:underline"
                >
                  <PhoneCall className="h-3 w-3" />
                  <span>Call</span>
                </a>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-brand-light-alt/80 p-3 text-xs">
                <div>
                  <p className="font-bold text-brand-dark">Ananya (Granddaughter)</p>
                  <p className="text-[11px] text-brand-muted">Memory Co-Curator</p>
                </div>
                <span className="text-[11px] text-slate-500">Active Contributor</span>
              </div>
            </div>
          </div>

          {/* Calming Philosophy Note */}
          <div className="rounded-3xl bg-brand-light-alt/90 border border-brand-border/60 p-5 text-xs text-brand-text leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-brand-dark mb-1">
              <Smile className="h-4 w-4 text-brand-primary" />
              <span>Caregiver Guidance Principle</span>
            </div>
            <p className="text-brand-muted">
              SmritiSaathi communicates through gentle orientation prompts and familiar family voices. We never present alarming fail timers or clinical tests to Papa.
            </p>
          </div>
        </div>
      </section>

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onAddMemory={handleAddMemory}
      />

      {/* Add Reminder Modal */}
      <AddReminderModal
        isOpen={isAddReminderOpen}
        onClose={() => setIsAddReminderOpen(false)}
        onAddReminder={handleAddReminder}
      />

    </div>
  );
}
