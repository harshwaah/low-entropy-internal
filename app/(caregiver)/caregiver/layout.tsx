import React from 'react';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { BrandLogo } from '@/components/shared/brand-logo';
import { Bell, HeartHandshake, CalendarCheck, Activity, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Testing Utility Bar */}
      <aside aria-label="Portal Switcher" className="w-full border-b border-emerald-200 bg-emerald-50 px-4 py-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-emerald-950">
          Responsive Caregiver Layout
        </span>
        <PortalSwitcher />
      </aside>

      {/* Caregiver Portal Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 lg:px-8 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-6">
            <BrandLogo size="md" showTagline />
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Caring for: <strong>Kamal Sharma (Father)</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Alerts"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                2
              </span>
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-xs text-emerald-800">
                PS
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-semibold text-slate-800">Priya Sharma</p>
                <p className="text-slate-500 text-[10px]">Primary Caregiver</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Responsive Bottom / Footer Navigation for Mobile */}
      <footer className="border-t border-slate-200 bg-white p-3 text-xs text-slate-500">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link href="/caregiver" className="flex items-center gap-1.5 font-medium text-emerald-700">
              <Activity className="h-4 w-4" />
              <span>Status</span>
            </Link>
            <Link href="/caregiver" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <CalendarCheck className="h-4 w-4" />
              <span>Routines & Meds</span>
            </Link>
            <Link href="/caregiver" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <HeartHandshake className="h-4 w-4" />
              <span>Memory Vault</span>
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            Caregiver Support Engine • SmritiSaathi
          </p>
        </div>
      </footer>
    </div>
  );
}
