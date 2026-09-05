import React from 'react';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { CaregiverNav } from '@/features/caregiver';
import Link from 'next/link';
import { HeartHandshake, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBFBF9] text-brand-text flex flex-col font-sans selection:bg-brand-light selection:text-brand-dark">
      {/* Top Testing Utility Bar */}
      <aside
        aria-label="Portal Switcher"
        className="w-full border-b border-brand-border/60 bg-emerald-50/70 px-4 py-2 flex items-center justify-between text-xs backdrop-blur-xs"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
          <span className="font-bold text-emerald-950">
            Caregiver Portal Foundation • SmritiSaathi
          </span>
          <span className="hidden sm:inline text-emerald-700 text-[11px]">
            (Family-oriented, supportive oversight)
          </span>
        </div>
        <PortalSwitcher />
      </aside>

      {/* Persistent Caregiver Navigation Bar */}
      <CaregiverNav unresolvedAlertCount={2} />

      {/* Main Caregiver Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Caregiver Portal Footer */}
      <footer className="border-t border-brand-border/60 bg-white px-4 sm:px-8 py-6 text-xs text-brand-muted">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link
              href="/caregiver"
              className="font-bold text-brand-dark hover:text-brand-primary transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/caregiver/memories"
              className="text-brand-text hover:text-brand-dark transition-colors"
            >
              Memory Vault
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/caregiver/reminders"
              className="text-brand-text hover:text-brand-dark transition-colors"
            >
              Routines & Meds
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/caregiver/monitoring"
              className="text-brand-text hover:text-brand-dark transition-colors"
            >
              Activity Insights
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/caregiver/alerts"
              className="text-brand-text hover:text-brand-dark transition-colors"
            >
              Calm Alerts
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <HeartHandshake className="h-3.5 w-3.5 text-brand-primary" />
            <span>SmritiSaathi Caregiver Companion • Dignity, Calmness & Family Empowerment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
