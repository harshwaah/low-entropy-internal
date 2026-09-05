'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, HeartHandshake, Stethoscope, Home } from 'lucide-react';

export function PortalSwitcher() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview', icon: Home, exact: true },
    { href: '/patient', label: 'Patient (Mobile-First)', icon: User },
    { href: '/caregiver', label: 'Caregiver (Responsive)', icon: HeartHandshake },
    { href: '/practitioner', label: 'Practitioner (Desktop)', icon: Stethoscope },
  ];

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 p-1 backdrop-blur-md shadow-xs text-xs">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = link.exact
          ? pathname === link.href
          : pathname?.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-all',
              isActive
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
