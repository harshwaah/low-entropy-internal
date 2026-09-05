import React from 'react';
import { PatientBottomNav } from '@/components/shared/patient-bottom-nav';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-background text-brand-dark flex flex-col font-sans overflow-x-hidden selection:bg-brand-primary/20 pb-24">
      {/* 
        Patient Experience is optimized for mobile/tablet dimensions 
        to ensure large touch targets and prevent overwhelming information density.
      */}
      <main className="flex-1 w-full max-w-2xl mx-auto bg-white min-h-screen shadow-sm relative pb-28">
        {children}
      </main>

      <PatientBottomNav />
    </div>
  );
}
