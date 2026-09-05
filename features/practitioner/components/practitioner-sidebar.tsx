'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/shared/brand-logo';
import {
  Users,
  LineChart,
  ClipboardList,
  FileText,
  ShieldCheck,
  Building2,
  Sparkles,
  User,
} from 'lucide-react';

export function PractitionerSidebar() {
  const pathname = usePathname();

  const isRosterActive = pathname === '/practitioner';
  const isObservationsActive = pathname === '/practitioner/observations';
  const isPatientDetailActive = pathname.startsWith('/practitioner/patient');

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-slate-200 bg-white p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Brand & Clinic Context */}
        <div className="pb-3 border-b border-slate-100">
          <BrandLogo size="sm" showTagline href="/practitioner" />
          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Dementia & Memory Clinic</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Attending: <strong>Dr. Arvind Sen, MD</strong>
            </p>
          </div>
        </div>

        {/* Clinical Workflow Navigation */}
        <nav className="space-y-1 text-xs">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Clinical Portals
          </p>

          <Link
            href="/practitioner"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium transition-colors ${
              isRosterActive
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users className={`h-4 w-4 ${isRosterActive ? 'text-blue-700' : 'text-slate-400'}`} />
            <span>Command Center</span>
          </Link>

          <Link
            href="/practitioner/observations"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium transition-colors ${
              isObservationsActive
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <ClipboardList
              className={`h-4 w-4 ${isObservationsActive ? 'text-blue-700' : 'text-slate-400'}`}
            />
            <span>Observation Timeline</span>
          </Link>

          <Link
            href="/practitioner/patient/p-101"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium transition-colors ${
              isPatientDetailActive
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60 shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <User
              className={`h-4 w-4 ${isPatientDetailActive ? 'text-blue-700' : 'text-slate-400'}`}
            />
            <span>Active Patient File</span>
          </Link>
        </nav>

        {/* Quick Cohort Summary */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs space-y-1.5">
          <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider block">
            Cohort Overview
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Enrolled Patients</span>
            <strong className="font-mono text-slate-900">6 Active</strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Avg Engagement</span>
            <strong className="font-mono text-emerald-700 font-bold">75.0%</strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Follow-up Items</span>
            <strong className="font-mono text-amber-700 font-bold">2 Pending</strong>
          </div>
        </div>
      </div>

      {/* Compliance & Audit Footer */}
      <div className="border-t border-slate-100 pt-4 text-[11px] text-slate-500 space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>HIPAA Audit Compliant</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Session access recorded in clinical audit register.
        </p>
      </div>
    </aside>
  );
}
