'use client';

import React from 'react';
import { CaregiverAlertItem } from '../types';
import {
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Info,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalmAlertItemProps {
  alert: CaregiverAlertItem;
  onToggleAcknowledge: (id: string) => void;
  onSendMascotChime?: (id: string) => void;
}

export function CalmAlertItem({
  alert,
  onToggleAcknowledge,
  onSendMascotChime,
}: CalmAlertItemProps) {
  const getBadgeStyle = () => {
    switch (alert.type) {
      case 'reminder-missed':
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-200/80',
          icon: <Clock className="h-4 w-4 text-amber-700" />,
          label: 'Gentle Reminder Note',
        };
      case 'routine-deviation':
        return {
          badge: 'bg-teal-50 text-teal-800 border-teal-200/80',
          icon: <Sparkles className="h-4 w-4 text-teal-700" />,
          label: 'Circadian Shift',
        };
      case 'sos-beacon':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
          icon: <ShieldCheck className="h-4 w-4 text-emerald-700" />,
          label: 'Safety Beacon Active',
        };
      case 'environmental':
      default:
        return {
          badge: 'bg-purple-50 text-purple-800 border-purple-200/80',
          icon: <Heart className="h-4 w-4 text-purple-700" />,
          label: 'Companion Care Note',
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div
      id={`calm-alert-item-${alert.id}`}
      className={cn(
        'rounded-3xl border p-5 sm:p-6 transition-all shadow-xs',
        alert.acknowledged
          ? 'bg-slate-50/80 border-slate-200/80 opacity-80'
          : 'bg-white border-brand-border/90 shadow-sm hover:shadow-md'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-xs',
              style.badge
            )}
          >
            {style.icon}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[11px] font-bold',
                  style.badge
                )}
              >
                {style.label}
              </span>
              <span className="text-xs text-brand-muted">{alert.timestamp}</span>
              {alert.acknowledged && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Acknowledged
                </span>
              )}
            </div>

            <h4 className="mt-1.5 text-base font-bold text-brand-dark">
              {alert.title}
            </h4>

            <p className="mt-1 text-xs sm:text-sm text-brand-text leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center gap-2 self-end sm:self-start">
          {onSendMascotChime && !alert.acknowledged && alert.type === 'reminder-missed' && (
            <button
              type="button"
              onClick={() => onSendMascotChime(alert.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Send Gentle Chime</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onToggleAcknowledge(alert.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs',
              alert.acknowledged
                ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                : 'bg-brand-dark text-white hover:bg-brand-dark/90'
            )}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{alert.acknowledged ? 'Mark Pending' : 'Acknowledge'}</span>
          </button>
        </div>
      </div>

      {/* Contextual Empathetic Note */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-brand-muted">
          <Info className="h-3.5 w-3.5 text-brand-primary shrink-0" />
          <span>{alert.contextNote}</span>
        </div>
        {alert.recommendedAction && (
          <span className="font-semibold text-brand-dark bg-brand-light/60 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            Suggested: {alert.recommendedAction}
          </span>
        )}
      </div>
    </div>
  );
}
