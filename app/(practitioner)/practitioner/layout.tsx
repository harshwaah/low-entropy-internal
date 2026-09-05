import React from 'react';
import { PortalSwitcher } from '@/components/shared/portal-switcher';
import { BrandLogo } from '@/components/shared/brand-logo';
import {
  Users,
  LineChart,
  ClipboardList,
  FileText,
  ShieldCheck,
  Building2,
  Stethoscope,
} from 'lucide-react';
import Link from 'next/link';

export default function PractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Top Clinical & Testing Utility Bar */}
      <aside aria-label="Portal Switcher" className="w-full border-b border-blue-200 bg-blue-900 text-white px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-blue-300" />
          <span className="font-semibold tracking-wide">
            Practitioner Clinical Oversight Portal (Desktop Layout)
          </span>
          <span className="hidden md:inline-block rounded-sm bg-blue-800 px-2 py-0.5 text-[10px] text-blue-200 uppercase font-mono tracking-wider">
            Clinical Review Environment
          </span>
        </div>
        <PortalSwitcher />
      </aside>

      {/* Main Desktop Dashboard Shell */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Clinical Sidebar */}
        <aside className="w-full md:w-64 shrink-0 border-r border-slate-200 bg-white p-4 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <BrandLogo size="sm" showTagline />
              <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Memory Clinic Center</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Practitioner: Dr. Arvind Sen, MD
                </p>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="space-y-1 text-xs">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Clinical Workflow
              </p>
              <Link
                href="/practitioner"
                className="flex items-center gap-2.5 rounded-lg bg-blue-50 text-blue-900 font-semibold px-3 py-2"
              >
                <Users className="h-4 w-4 text-blue-700" />
                <span>Patient Roster</span>
              </Link>
              <Link
                href="/practitioner"
                className="flex items-center gap-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-3 py-2"
              >
                <LineChart className="h-4 w-4" />
                <span>Cognitive Trends</span>
              </Link>
              <Link
                href="/practitioner"
                className="flex items-center gap-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-3 py-2"
              >
                <FileText className="h-4 w-4" />
                <span>Clinical Reports</span>
              </Link>
              <Link
                href="/practitioner"
                className="flex items-center gap-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-3 py-2"
              >
                <ClipboardList className="h-4 w-4" />
                <span>Consultation Notes</span>
              </Link>
            </nav>
          </div>

          {/* Compliance & Audit Footer */}
          <div className="border-t border-slate-100 pt-4 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>HIPAA Scaffolding Ready</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Audit logging enabled for clinical consultations.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
