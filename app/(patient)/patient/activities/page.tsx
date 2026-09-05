import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Brain } from 'lucide-react';

export default function PatientActivitiesPage() {
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
          <h1 className="text-3xl font-extrabold text-brand-dark">Gentle Activities</h1>
          <p className="text-brand-muted font-medium text-lg">Fun, frustration-free games for your mind</p>
        </div>
      </div>

      {/* Reassuring Companion Box */}
      <section className="bg-brand-light-alt rounded-[3rem] p-8 flex flex-col items-center text-center shadow-sm">
        <Mascot 
          size="lg" 
          state="encouraging"
          showSpeechBubble={true}
          speechPosition="top-right"
          speechText={<>Fun activities are on<br/>the way for us! 🧩✨</>}
          className="mb-6"
        />
        
        <h2 className="text-2xl font-bold text-brand-dark mb-3">
          Activities Coming Soon
        </h2>
        
        <p className="text-lg text-brand-muted font-medium mb-8 max-w-md">
          Simple matching games, gentle puzzles, and soothing music sessions designed to keep your mind bright and relaxed.
        </p>

        <Link href="/patient" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-md font-bold hover:scale-105 transition-transform">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </section>

      {/* Gentle Preview Card */}
      <div className="bg-[#F3F0FF] p-6 rounded-3xl border border-purple-200 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-200 flex items-center justify-center text-purple-700 shrink-0">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-purple-950">Relaxing Puzzles & Shapes</h3>
          <p className="text-purple-800 font-medium">Zero countdown timers, pure enjoyment.</p>
        </div>
      </div>

    </div>
  );
}
