'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image as ImageIcon, Sparkles, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all min-w-[72px] min-h-[56px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40",
        isActive
          ? "text-brand-primary bg-brand-primary/10 shadow-sm font-bold scale-105"
          : "text-brand-muted hover:bg-brand-light/50 hover:text-brand-dark"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={cn("mb-1 transition-transform duration-200", isActive && "scale-110")}>
        {icon}
      </div>
      <span className={cn("text-xs font-bold tracking-tight", isActive ? "text-brand-primary" : "text-brand-muted")}>
        {label}
      </span>
    </Link>
  );
}

export function PatientBottomNav({ activeTab }: { activeTab?: 'home' | 'memories' | 'activities' | 'profile' }) {
  const pathname = usePathname();

  const isHome = activeTab ? activeTab === 'home' : pathname === '/patient';
  const isMemories = activeTab ? activeTab === 'memories' : pathname?.startsWith('/patient/memories');
  const isActivities = activeTab ? activeTab === 'activities' : pathname?.startsWith('/patient/activities');
  const isProfile = activeTab ? activeTab === 'profile' : pathname?.startsWith('/patient/profile');

  return (
    <nav
      aria-label="Patient Navigation"
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-border/80 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)] z-50 pb-safe"
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-3 py-2">
        <NavItem
          href="/patient"
          icon={<Home size={26} className={isHome ? 'fill-brand-primary/20 stroke-[2.5]' : 'stroke-2'} />}
          label="Home"
          isActive={Boolean(isHome)}
        />
        <NavItem
          href="/patient/memories"
          icon={<ImageIcon size={26} className={isMemories ? 'fill-brand-primary/20 stroke-[2.5]' : 'stroke-2'} />}
          label="Memories"
          isActive={Boolean(isMemories)}
        />
        <NavItem
          href="/patient/activities"
          icon={<Sparkles size={26} className={isActivities ? 'fill-brand-primary/20 stroke-[2.5]' : 'stroke-2'} />}
          label="Activities"
          isActive={Boolean(isActivities)}
        />
        <NavItem
          href="/patient/profile"
          icon={<UserCircle size={26} className={isProfile ? 'fill-brand-primary/20 stroke-[2.5]' : 'stroke-2'} />}
          label="Profile"
          isActive={Boolean(isProfile)}
        />
      </div>
    </nav>
  );
}

