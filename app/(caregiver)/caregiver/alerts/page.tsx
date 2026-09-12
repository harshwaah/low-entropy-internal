'use client';

import React, { useState } from 'react';
import { SAMPLE_ALERTS } from '@/features/caregiver/data/sample-caregiver-data';
import { CaregiverAlertItem } from '@/features/caregiver/types';
import { CalmAlertItem } from '@/features/caregiver';
import {
  Bell,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Radio,
  PhoneCall,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Mascot } from '@/components/shared/mascot';

export default function CaregiverAlertsPage() {
  const [alerts, setAlerts] = useState<CaregiverAlertItem[]>(SAMPLE_ALERTS);
  const [filterType, setFilterType] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
    showToast('Alert status updated');
  };

  const handleSendMascotChime = (id: string) => {
    showToast('Sent a gentle sitar chime prompt to Papa\'s companion speaker');
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'all') return true;
    if (filterType === 'unresolved') return !a.acknowledged;
    return a.type === filterType;
  });

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="caregiver-alerts-toast"
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
            <Bell className="h-4 w-4" />
            <span>Gentle Alert Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-0.5">
            Calm Notifications & Safety Cues
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Empathetic notifications designed to keep family informed without causing panic or anxiety.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-300/80 px-4 py-2 text-xs font-bold text-amber-900 self-start sm:self-auto shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-amber-600" />
          <span>{unacknowledgedCount} Pending Notice{unacknowledgedCount === 1 ? '' : 's'}</span>
        </div>
      </div>

      {/* Philosophy Callout: Calm Notification Design */}
      <div className="rounded-3xl bg-brand-light/70 border border-brand-primary/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Mascot size="sm" state="thinking" />
          <div className="text-xs sm:text-sm text-brand-text leading-relaxed">
            <h3 className="font-bold text-brand-dark">
              Calm Notification Protocol
            </h3>
            <p className="text-brand-muted mt-0.5">
              Dementia care requires composed, empathetic vigilance. SmritiSaathi avoids harsh siren alerts or alarming red colors. Our companion notes guide you on gentle verification before escalating.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-bold bg-white rounded-2xl px-4 py-3 border border-brand-border/80 shadow-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-brand-dark">All Sensors & Beacons Normal</span>
        </div>
      </div>

      {/* SOS Safety Beacon Placeholder Card */}
      <div
        id="caregiver-sos-beacon-placeholder"
        className="rounded-3xl bg-[#FCFAF6] border-2 border-dashed border-emerald-300/80 p-6 sm:p-7 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-xs">
              <Radio className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                  Emergency Support System
                </span>
                <span className="text-xs text-brand-muted">Safety Beacon Status: Active & Armed</span>
              </div>
              <h3 className="text-lg font-bold text-brand-dark mt-1">
                Family SOS & Geofence Beacon
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5 leading-relaxed">
                Papa’s bedside pendant and living room Saathi hub are synced. If Papa presses the tactile family button, Priya (+91 98112 34567) and Dr. Verma will receive a prioritized prompt and instant voice intercom.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => showToast('Simulated Beacon Ping: Signal strength 100%, battery 94%')}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-300 px-4 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition-all shadow-xs"
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Test Beacon Connection</span>
            </button>
            <a
              href="tel:+919892256502"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-xs"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Direct Family Line (+91 98922 56502)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            filterType === 'all'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          All Notices ({alerts.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('unresolved')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            filterType === 'unresolved'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          Pending Action ({unacknowledgedCount})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('reminder-missed')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            filterType === 'reminder-missed'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          Reminders Missed
        </button>

        <button
          type="button"
          onClick={() => setFilterType('routine-deviation')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            filterType === 'routine-deviation'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          Routine Deviations
        </button>

        <button
          type="button"
          onClick={() => setFilterType('sos-beacon')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
            filterType === 'sos-beacon'
              ? 'bg-brand-dark text-white shadow-xs'
              : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
          )}
        >
          Safety Beacons
        </button>
      </div>

      {/* Alert Items List */}
      <section aria-label="Notifications List" className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="rounded-3xl bg-white border border-brand-border/80 p-12 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
            <h3 className="mt-2 text-sm font-bold text-brand-dark">No notices match your selection</h3>
            <p className="mt-1 text-xs text-brand-muted">All routines and circadian observations are in harmony.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <CalmAlertItem
              key={alert.id}
              alert={alert}
              onToggleAcknowledge={handleToggleAcknowledge}
              onSendMascotChime={handleSendMascotChime}
            />
          ))
        )}
      </section>

    </div>
  );
}
