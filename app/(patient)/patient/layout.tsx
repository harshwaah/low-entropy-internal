import React from 'react';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { BrandLogo } from '@/components/shared/brand-logo';
import { Sun, PhoneCall, ShieldAlert } from 'lucide-react';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50/50 text-stone-900 flex flex-col justify-between">
      {/* Top Testing Utility Bar */}
      <aside aria-label="Portal Switcher" className="w-full border-b border-amber-200/70 bg-amber-100/40 px-4 py-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-amber-900">
          Mobile-First Patient Layout
        </span>
        <PortalSwitcher />
      </aside>

      {/* Main Patient Frame (Constrained to mobile-first viewport width) */}
      <div className="mx-auto w-full max-w-md flex-1 flex flex-col bg-white shadow-xs border-x border-amber-100">
        {/* Patient Orientation Header */}
        <header className="border-b border-amber-100 bg-amber-50/60 p-4">
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              <Sun className="h-3.5 w-3.5 text-amber-700" />
              <span>Saturday Morning</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-stone-900">
              Good Morning, Kamal-ji
            </p>
            <p className="text-xs text-stone-600 mt-0.5">
              Today is September 5 • Peaceful & Clear
            </p>
          </div>
        </header>

        {/* Patient Experience Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>

        {/* High-Contrast Immediate Help / Caregiver Touchpoint */}
        <footer className="border-t border-amber-100 bg-amber-50/70 p-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white p-4 font-semibold text-base shadow-sm active:scale-98 transition-transform"
          >
            <PhoneCall className="h-5 w-5" />
            <span>Call Daughter (Priya)</span>
          </button>
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 font-medium">
              <ShieldAlert className="h-3 w-3 text-amber-600" />
              Safe Companion Mode Active
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
