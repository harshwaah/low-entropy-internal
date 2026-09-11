import React from 'react';
import { PractitionerSidebar } from '@/features/practitioner';

export default function PractitionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7fbf9] text-slate-900 flex font-sans">
      <PractitionerSidebar />
      <div className="flex-1 flex flex-col min-h-screen max-w-full min-w-0">
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
