import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Heart, Phone } from 'lucide-react';

export default function PatientProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header with Back button */}
      <div className="flex items-center gap-4">
        <Link href="/patient" className="focus:outline-none focus:ring-2 focus:ring-brand-primary/40 rounded-full">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-white shadow-sm border border-brand-border">
            <ArrowLeft className="w-6 h-6 text-brand-dark" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark">My Profile</h1>
          <p className="text-brand-muted font-medium text-lg">Your care team and preferences</p>
        </div>
      </div>

      {/* User Information Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-light shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-brand-primary text-3xl font-bold">
          M
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-brand-dark">Meera Sharma</h2>
          <p className="text-brand-muted font-medium">New Delhi, India • Daily Companion Active</p>
        </div>
      </section>

      {/* Caregiver Quick Contact */}
      <section className="bg-brand-light-alt rounded-3xl p-6 sm:p-8 border border-brand-border/60">
        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" /> My Primary Caregiver
        </h3>
        <div className="bg-white p-5 rounded-2xl border border-brand-border/60 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-brand-dark">Rohan Sharma (Son)</h4>
            <p className="text-brand-muted font-medium text-sm">Always available for a call</p>
          </div>
          <a href="tel:+919876543210" className="inline-block">
            <Button size="lg" className="rounded-full bg-brand-primary text-white font-bold h-12 px-6 shadow-sm">
              <Phone className="w-4 h-4 mr-2" /> Call Rohan
            </Button>
          </a>
        </div>
      </section>

      {/* Companion Message */}
      <section className="bg-[#FFF8F0] rounded-3xl p-6 text-center flex flex-col items-center">
        <Mascot size="sm" state="holding-heart" className="mb-3" />
        <p className="text-brand-dark font-bold text-lg">You are safe and surrounded by love.</p>
        <p className="text-brand-muted font-medium text-sm mt-1">Your family updates your schedule daily.</p>
      </section>

    </div>
  );
}
