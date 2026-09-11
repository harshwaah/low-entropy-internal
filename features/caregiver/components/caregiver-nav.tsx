'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookHeart,
  CalendarClock,
  Activity,
  Bell,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { BrandLogo } from '@/components/shared/brand-logo';

interface CaregiverNavProps {
  unresolvedAlertCount?: number;
}

export function CaregiverNav({ unresolvedAlertCount = 2 }: CaregiverNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Overview',
      href: '/caregiver',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Memories',
      href: '/caregiver/memories',
      icon: BookHeart,
      exact: false,
    },
    {
      label: 'Reminders',
      href: '/caregiver/reminders',
      icon: CalendarClock,
      exact: false,
    },
    {
      label: 'Monitoring',
      href: '/caregiver/monitoring',
      icon: Activity,
      exact: false,
    },
    {
      label: 'Alerts',
      href: '/caregiver/alerts',
      icon: Bell,
      exact: false,
      badge: unresolvedAlertCount > 0 ? unresolvedAlertCount : undefined,
    },
    {
      label: 'Settings',
      href: '/caregiver/settings',
      icon: Settings,
      exact: false,
    },
  ];

  const isCurrentActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname?.startsWith(itemHref);
  };

  return (
    <>
      {/* Desktop & Tablet Main Header */}
      <header className="sticky top-0 z-30 border-b border-brand-border/60 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 transition-all">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          
          {/* Logo & Patient Context */}
          <div className="flex items-center gap-4 lg:gap-6">
            <BrandLogo size="md" showTagline={false} href="/caregiver" className="shrink-0" />

            <div className="hidden sm:flex items-center gap-2.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 px-3.5 py-1 text-xs font-medium text-emerald-900 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>
                Caring for: <strong className="font-semibold text-brand-dark">Kamal Sharma</strong> (Father)
              </span>
              <span className="text-emerald-700 hidden md:inline">• Calm & Resting</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-brand-light-alt/80 border border-brand-border/80 rounded-full p-1.5 shadow-xs">
            {navItems.map((item) => {
              const active = isCurrentActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
                    active
                      ? 'bg-brand-dark text-white shadow-xs'
                      : 'text-brand-text hover:bg-white hover:text-brand-dark'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        'ml-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-extrabold',
                        active
                          ? 'bg-brand-accent-orange text-brand-dark'
                          : 'bg-emerald-700 text-white'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Profile & Alert Quick Icon */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/caregiver/alerts"
              id="header-alerts-bell-btn"
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-full border transition-all',
                isCurrentActive('/caregiver/alerts', false)
                  ? 'border-brand-dark bg-brand-light text-brand-dark'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              )}
              aria-label="Caregiver Alerts"
            >
              <Bell className="h-4 w-4" />
              {unresolvedAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent-orange border-2 border-white text-[10px] font-extrabold text-brand-dark">
                  {unresolvedAlertCount}
                </span>
              )}
            </Link>

            <Link
              href="/caregiver/settings"
              id="header-caregiver-profile-link"
              className="flex items-center gap-2.5 border-l border-slate-200 pl-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light border border-brand-primary/30 font-bold text-xs text-brand-dark shadow-xs">
                PS
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-brand-dark leading-tight">Priya Sharma</p>
                <p className="text-[11px] text-brand-muted">Primary Daughter & Caregiver</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Subnav Strip */}
        <div className="lg:hidden mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-start overflow-x-auto no-scrollbar gap-1.5 pb-0.5">
          {navItems.map((item) => {
            const active = isCurrentActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={`mobile-${item.href}`}
                id={`mobile-nav-${item.label.toLowerCase()}`}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all shrink-0',
                  active
                    ? 'bg-brand-dark text-white shadow-xs'
                    : 'bg-white border border-slate-200/80 text-brand-text hover:bg-slate-50'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                      active
                        ? 'bg-brand-accent-orange text-brand-dark'
                        : 'bg-emerald-600 text-white'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}
