'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Bell,
  Activity,
  ClipboardList,
  BarChart2,
  MessageSquare,
  Settings
} from 'lucide-react';
import Image from 'next/image';

export function PractitionerSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/practitioner', icon: LayoutDashboard },
    { name: 'Patients', href: '/practitioner/patient', icon: Users, isPrefix: true },
    { name: 'Alerts', href: '/practitioner/alerts', icon: Bell, hasIndicator: true },
    { name: 'Activities', href: '/practitioner/activities', icon: Activity },
    { name: 'Care Plans', href: '/practitioner/care-plans', icon: ClipboardList },
    { name: 'Reports & Insights', href: '/practitioner/reports', icon: BarChart2 },
    { name: 'Messages', href: '/practitioner/messages', icon: MessageSquare },
  ];

  const checkIsActive = (href: string, isPrefix?: boolean) => {
    if (href === '/practitioner' && pathname === '/practitioner') return true;
    if (href !== '/practitioner' && pathname.startsWith(href)) return true;
    if (isPrefix && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="w-64 shrink-0 bg-[#eef5f1] border-r border-[#d4e4db] flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-full bg-[#134e36] flex items-center justify-center text-white">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[#134e36] font-bold text-lg leading-tight tracking-tight">SmritiSaathi</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#134e36]/70">Doctor Portal</p>
            </div>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">
            Clinical Navigation
          </div>

          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = checkIsActive(item.href, item.isPrefix);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#134e36] text-white shadow-sm'
                      : 'text-[#2C5545] hover:bg-[#dcebdd]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#2C5545]/70 group-hover:text-[#2C5545]'}`} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.hasIndicator && (
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-400' : 'bg-red-500'}`} />
                  )}
                  {isActive && !item.hasIndicator && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <Link
            href="/practitioner/settings"
            className="flex items-center gap-3 px-3 py-2.5 text-[#2C5545] hover:bg-[#dcebdd] rounded-xl transition-all font-medium text-sm mb-4"
          >
            <Settings className="h-4 w-4 text-[#2C5545]/70" />
            <span>Settings</span>
          </Link>

          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-[#dcebdd]">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-100 shrink-0">
              <Image 
                src="https://picsum.photos/seed/doctor1/100/100" 
                alt="Dr. Elena Vance" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-[#134e36] truncate">Dr. Elena Vance</div>
              <div className="text-xs text-[#2C5545]/70 truncate">Neurologist</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
