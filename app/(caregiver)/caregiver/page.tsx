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
import { CaregiverReminder, CaregiverActivityLog } from '@/features/caregiver/types';
import { useSharedData } from '@/services/context/shared-data-context';
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

import { MemoryTrailProgressReportModal } from '@/features/memory-trail/components/MemoryTrailProgressReportModal';
import { QuickPickProgressReportModal } from '@/features/quick-pick-trail/components/QuickPickProgressReportModal';
import { useOnboarding } from '@/hooks/use-onboarding';
import { CaregiverOnboarding } from '@/components/onboarding';

export default function CaregiverDashboardPage() {
  const { isCompleted: isOnboardingComplete, isLoading: isOnboardingLoading } = useOnboarding('caregiver');
  const {
    selectedPatient,
    reminders: sharedReminders,
    activities: sharedActivities,
    toggleReminderStatus,
    createReminder,
    addMemory,
    logActivity,
  } = useSharedData();

  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isMemoryTrailReportOpen, setIsMemoryTrailReportOpen] = useState(false);
  const [isQuickPickReportOpen, setIsQuickPickReportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOnboardingLoading && !isOnboardingComplete) {
    return <CaregiverOnboarding />;
  }

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

  // Patient overview calculated from shared state
  const completedCount = reminders.filter((r) => r.status === 'completed').length;
  const totalCount = reminders.length || 1;
  const patient = {
    ...SAMPLE_PATIENT_OVERVIEW,
    id: selectedPatient?.id || SAMPLE_PATIENT_OVERVIEW.id,
    name: selectedPatient?.name || SAMPLE_PATIENT_OVERVIEW.name,
    preferredName: selectedPatient?.preferredName || SAMPLE_PATIENT_OVERVIEW.preferredName,
    age: selectedPatient?.age || SAMPLE_PATIENT_OVERVIEW.age,
    condition: selectedPatient?.stage ? `${selectedPatient.stage} Dementia` : SAMPLE_PATIENT_OVERVIEW.condition,
    reminderCompletion: {
      completed: completedCount,
      total: totalCount,
      percentage: Math.round((completedCount / totalCount) * 100),
    },
  };

  // Activities from shared state
  const activities: CaregiverActivityLog[] = sharedActivities.map((a) => {
    let cat: CaregiverActivityLog['category'] = 'routine';
    if (a.category === 'memory' || a.type === 'reminiscence') cat = 'memory';
    else if (a.category === 'hydration') cat = 'hydration';
    else if (a.category === 'movement') cat = 'movement';
    else if (a.category === 'social') cat = 'social';

    return {
      id: a.id,
      title: a.title,
      category: cat,
      time: a.time || 'Today',
      status: (a.status === 'scheduled' ? 'scheduled' : 'completed') as CaregiverActivityLog['status'],
      description: a.description || '',
      companionFeedback: a.companionFeedback,
    };
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleReminder = (id: string) => {
    const rem = reminders.find((r) => r.id === id);
    const newStatus = rem?.status === 'completed' ? 'upcoming' : 'completed';
    toggleReminderStatus(id, newStatus, 'Heena Sharma (Caregiver Portal)');
    showToast('Reminder status updated successfully');
  };

  const handleAddReminder = (newRem: Omit<CaregiverReminder, 'id' | 'status'>) => {
    const item = {
      id: `rem-${Date.now()}`,
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

  const handleAddMemory = (newMem: {
    title: string;
    category: any;
    story: string;
    dateEra: string;
    location: string;
    familyNote: any;
    coverImage: string;
  }) => {
    const memId = `mem-${Date.now()}`;
    addMemory({
      id: memId,
      patientId: selectedPatient?.id || 'p-101',
      title: newMem.title,
      shortDescription: newMem.story.slice(0, 120),
      category: newMem.category || 'Family',
      dateEra: newMem.dateEra || 'Family Heirloom',
      location: newMem.location || '',
      story: [newMem.story],
      emotionalTag: 'Warm & Cherished',
      familiarPeople: ['Family'],
      coverImage: newMem.coverImage || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80',
      familyNotes: newMem.familyNote ? [newMem.familyNote] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    logActivity({
      id: `act-${Date.now()}`,
      patientId: selectedPatient?.id || 'p-101',
      type: 'reminiscence',
      title: `Curated New Memory: ${newMem.title}`,
      category: 'Memory Reminiscence',
      time: 'Just now',
      timestamp: new Date().toISOString(),
      status: 'completed',
      description: `Added by Priya for Papa's afternoon reminiscence.`,
      companionFeedback: 'Memory ready for companion introduction.',
      createdAt: new Date().toISOString(),
    });

    showToast(`Added cherished memory: "${newMem.title}" to scrapbook`);
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
                  <p className="font-bold text-brand-dark">Heena Sharma</p>
                  <p className="text-[11px] text-brand-muted">Primary Daughter • In-home</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">+91 98922 56502</span>
                  <a
                    href="tel:+919892256502"
                    className="inline-flex items-center gap-1 font-bold text-brand-primary hover:underline bg-white px-2 py-0.5 rounded-full border border-emerald-200"
                  >
                    <PhoneCall className="h-3 w-3" />
                    <span>Call</span>
                  </a>
                </div>
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
            <p className="text-brand-muted mb-3">
              SmritiSaathi communicates through gentle orientation prompts and familiar family voices. We never present alarming fail timers or clinical tests to Papa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setIsMemoryTrailReportOpen(true)}
                className="w-full py-2.5 px-4 rounded-full bg-[#2C5545] hover:bg-[#1E3B30] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📊 Memory Trail Report</span>
              </button>

              <button
                onClick={() => setIsQuickPickReportOpen(true)}
                className="w-full py-2.5 px-4 rounded-full bg-[#4A8B71] hover:bg-[#2C5545] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🐍 Quick Pick Trail Report</span>
              </button>
            </div>
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

      {/* Memory Trail Progress Report Modal */}
      <MemoryTrailProgressReportModal
        isOpen={isMemoryTrailReportOpen}
        onClose={() => setIsMemoryTrailReportOpen(false)}
      />

      {/* Quick Pick Trail Progress Report Modal */}
      <QuickPickProgressReportModal
        isOpen={isQuickPickReportOpen}
        onClose={() => setIsQuickPickReportOpen(false)}
      />

    </div>
  );
}
