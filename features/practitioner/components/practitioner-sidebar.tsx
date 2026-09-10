'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/shared/brand-logo';
import {
  LayoutDashboard,
  Users,
  Bell,
  Puzzle,
  FileCheck,
  BarChart3,
  MessageSquare,
  ClipboardList,
  ShieldCheck,
  Building2,
  UserCheck,
} from 'lucide-react';

export function PractitionerSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/practitioner',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/practitioner',
    },
    {
      href: '/practitioner/patients',
      label: 'Patients',
      icon: Users,
      isActive: pathname === '/practitioner/patients' || pathname.startsWith('/practitioner/patient'),
    },
    {
      href: '/practitioner/alerts',
      label: 'Alerts',
      icon: Bell,
      isActive: pathname === '/practitioner/alerts',
      badgeDot: true,
    },
    {
      href: '/practitioner/activities',
      label: 'Activities',
      icon: Puzzle,
      isActive: pathname === '/practitioner/activities',
    },
    {
      href: '/practitioner/care-plans',
      label: 'Care Plans',
      icon: FileCheck,
      isActive: pathname === '/practitioner/care-plans',
    },
    {
      href: '/practitioner/reports',
      label: 'Reports & Insights',
      icon: BarChart3,
      isActive: pathname === '/practitioner/reports',
    },
    {
      href: '/practitioner/messages',
      label: 'Messages',
      icon: MessageSquare,
      isActive: pathname === '/practitioner/messages',
    },
    {
      href: '/practitioner/observations',
      label: 'Observations',
      icon: ClipboardList,
      isActive: pathname === '/practitioner/observations',
    },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-emerald-900/10 bg-[#ecf6ee] p-4 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Brand & Clinic Context */}
        <div className="pb-3 border-b border-emerald-900/10 space-y-2">
          <BrandLogo size="sm" showTagline href="/practitioner" />
          <div className="rounded-xl bg-white/80 border border-emerald-800/10 p-2.5 text-xs text-slate-700 shadow-2xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#013625]">
              <Building2 className="h-3.5 w-3.5 text-[#1e4d3a]" />
              <span>Doctor Portal</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Attending: <strong>Dr. Elena Vance</strong>
            </p>
          </div>
        </div>

        {/* Clinical Navigation */}
        <nav className="space-y-1 text-xs">
          <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#717973]">
            Clinical Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2 font-medium transition-all ${
                  item.isActive
                    ? 'bg-[#1e4d3a] text-white font-semibold shadow-xs'
                    : 'text-[#414944] hover:bg-[#e1ebe3] hover:text-[#151d19]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${item.isActive ? 'text-white' : 'text-[#717973]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badgeDot && (
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Cohort Summary */}
        <div className="rounded-xl border border-emerald-800/10 bg-white/70 p-3 text-xs space-y-1.5 shadow-2xs">
          <span className="font-bold text-[#013625] text-[10px] uppercase tracking-wider block">
            Cohort Status
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Active Patients</span>
            <strong className="font-mono text-[#013625]">42 Enrolled</strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Avg Adherence</span>
            <strong className="font-mono text-emerald-700 font-bold">91.4%</strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>Attention Flagged</span>
            <strong className="font-mono text-amber-700 font-bold">4 Patients</strong>
          </div>
        </div>
      </div>

      {/* Compliance & Audit Footer */}
      <div className="border-t border-emerald-900/10 pt-3 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 text-[#1e4d3a] font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Clinical Audit Compliant</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          SmritiSaathi Cognitive Oversight Portal
        </p>
      </div>
    </aside>
  );
}

