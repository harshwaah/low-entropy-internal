import React from 'react';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { PractitionerSidebar } from '@/features/practitioner';
import { Stethoscope } from 'lucide-react';

export default function PractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Clinical & Testing Utility Bar */}
      <aside
        aria-label="Portal Switcher"
        className="w-full border-b border-blue-200 bg-blue-900 text-white px-4 py-2 flex items-center justify-between text-xs"
      >
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-blue-300" />
          <span className="font-semibold tracking-wide">
            Practitioner Clinical Oversight Portal
          </span>
          <span className="hidden md:inline-block rounded-sm bg-blue-800 px-2 py-0.5 text-[10px] text-blue-200 uppercase font-mono tracking-wider">
            Clinical Environment
          </span>
        </div>
        <PortalSwitcher />
      </aside>

      {/* Main Desktop Dashboard Shell */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Clinical Sidebar */}
        <PractitionerSidebar />

        {/* Content Area */}
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
