'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Bell, Check, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { ClinicalAlertItem } from '../types';

interface AlertsPortalViewProps {
  initialAlerts: ClinicalAlertItem[];
}

export function AlertsPortalView({ initialAlerts }: AlertsPortalViewProps) {
  const [alerts, setAlerts] = useState<ClinicalAlertItem[]>(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredAlerts = alerts.filter(
    (a) => filterSeverity === 'all' || a.severity === filterSeverity
  );

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Clinical Alerts</h1>
          <p className="text-sm text-[#414944]">Real-time patient cognitive performance variance notifications.</p>
        </div>
      </div>

      {/* Filter severity tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterSeverity('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterSeverity === 'all'
              ? 'bg-[#013625] text-white shadow-xs'
              : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
          }`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setFilterSeverity('high')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterSeverity === 'high'
              ? 'bg-[#013625] text-white shadow-xs'
              : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
          }`}
        >
          High Severity ({alerts.filter((a) => a.severity === 'high').length})
        </button>
        <button
          onClick={() => setFilterSeverity('medium')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterSeverity === 'medium'
              ? 'bg-[#013625] text-white shadow-xs'
              : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
          }`}
        >
          Medium Severity ({alerts.filter((a) => a.severity === 'medium').length})
        </button>
        <button
          onClick={() => setFilterSeverity('low')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterSeverity === 'low'
              ? 'bg-[#013625] text-white shadow-xs'
              : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
          }`}
        >
          Low Severity ({alerts.filter((a) => a.severity === 'low').length})
        </button>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const isHigh = alert.severity === 'high';
          const isMedium = alert.severity === 'medium';
          const isResolved = alert.status === 'resolved';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl bg-white shadow-xs border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isResolved
                  ? 'opacity-60 border-emerald-900/10'
                  : isHigh
                  ? 'border-[#ffedd5] bg-[#fff7ed]/50'
                  : 'border-emerald-900/10'
              }`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0 mt-0.5 ${
                    isHigh
                      ? 'bg-[#ffdbcf] text-[#802a05]'
                      : isMedium
                      ? 'bg-[#c4ecd4] text-[#2a4e3c]'
                      : 'bg-[#dbe5dd] text-[#414944]'
                  }`}
                >
                  {alert.severity}
                </span>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#013625]">{alert.patientName}</span>
                    <span className="text-xs text-[#717973]">({alert.patientId})</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#151d19] mt-0.5">{alert.title}</h3>
                  <p className="text-xs text-[#414944] mt-0.5">{alert.message}</p>
                  <span className="text-[11px] text-[#717973] mt-1">{alert.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                {!isResolved && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#ecf6ee] hover:bg-[#e6f0e8] text-[#013625] text-xs font-semibold transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Acknowledge</span>
                  </button>
                )}
                <Link
                  href={`/practitioner/patient/${alert.patientId}`}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#013625] hover:bg-[#1e4d3a] text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  <span>View Patient</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
