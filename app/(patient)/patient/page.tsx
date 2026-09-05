'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Image as ImageIcon, Sparkles, CheckCircle2, ChevronRight, Pill, Heart } from 'lucide-react';

export default function PatientHomePage() {
  const [medicationTaken, setMedicationTaken] = useState(false);

  const handleContinueDay = () => {
    const nextSection = document.getElementById('up-next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* 1. Companion Welcome Card */}
      <section className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
        <div className="pt-4 mb-4">
          <Mascot 
            size="lg" 
            state={medicationTaken ? "celebrating" : "happy"}
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={
              medicationTaken ? (
                <>Wonderful job, Meera!<br/>You&apos;re doing great today! <Heart className="inline w-4 h-4 fill-red-500 text-red-500" /></>
              ) : (
                <>Good Morning, Meera.<br/>I&apos;m so glad to see you! <Heart className="inline w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" /></>
              )
            }
          />
        </div>
        
        <h1 className="text-3xl font-extrabold text-brand-dark mb-3 tracking-tight">
          Ready for a peaceful day?
        </h1>
        
        <p className="text-xl text-brand-muted font-medium mb-8 max-w-sm leading-relaxed">
          I&apos;ve put together your gentle schedule and lovely memories for us.
        </p>

        <Button 
          size="lg" 
          onClick={handleContinueDay}
          className="w-full sm:w-auto text-lg h-16 px-10 rounded-full shadow-md font-bold hover:scale-105 transition-all"
        >
          Continue Day
          <ChevronRight className="ml-2 w-6 h-6" />
        </Button>
      </section>

      {/* 2. Daily Overview Card */}
      <section>
        <Card className="bg-white border-2 border-brand-light hover:border-brand-primary/30 transition-colors shadow-sm rounded-3xl">
          <CardContent className="p-6 sm:p-8 flex items-center justify-between">
            <div>
              <p className="text-brand-primary font-bold text-lg mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Today
              </p>
              <h2 className="text-4xl font-extrabold text-brand-dark">Saturday</h2>
              <p className="text-xl text-brand-muted font-medium mt-1">September 5, 2026</p>
            </div>
            <div className="hidden sm:flex flex-col items-center justify-center bg-brand-light-alt rounded-2xl p-4 min-w-[120px]">
              <span className="text-3xl font-black text-brand-dark">
                {medicationTaken ? '2' : '3'}
              </span>
              <span className="text-sm font-bold text-brand-muted text-center leading-tight mt-1">
                Gentle<br/>Items
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Up Next Reminder Card */}
      <section id="up-next-section" className="scroll-mt-6">
        <h3 className="text-2xl font-bold text-brand-dark mb-4 px-2">Up Next</h3>
        <Card className="bg-[#F0F7FF] border-0 shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-blue-100">
              <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
                <Pill className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-blue-950 mb-1">Morning Medication</p>
                <p className="text-blue-700 font-medium text-base">Take with a warm glass of water.</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-blue-950">9:30</p>
                <p className="text-blue-700 font-bold uppercase text-xs">AM</p>
              </div>
            </div>
            
            {medicationTaken ? (
              <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-lg h-16 rounded-2xl flex items-center justify-center font-bold gap-3 shadow-inner">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                Completed! Great job, Meera ❤️
              </div>
            ) : (
              <Button 
                size="lg" 
                onClick={() => setMedicationTaken(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-16 rounded-2xl shadow-sm font-bold active:scale-[0.99] transition-transform"
              >
                <CheckCircle2 className="mr-3 w-7 h-7" />
                I have taken it
              </Button>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 4. Memory Of The Day Preview */}
      <section>
        <h3 className="text-2xl font-bold text-brand-dark mb-4 px-2">Memory of the Day</h3>
        <Link href="/patient/memories" className="block focus:outline-none focus:ring-4 focus:ring-brand-primary/20 rounded-3xl">
          <Card className="bg-[#FFF8F0] border-0 shadow-sm hover:shadow-md transition-all overflow-hidden group rounded-3xl">
            <CardContent className="p-0 flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-48 h-44 sm:h-48 bg-brand-accent-orange/20 flex items-center justify-center shrink-0">
                <ImageIcon className="w-16 h-16 text-brand-accent-orange/60 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex items-center justify-between w-full">
                <div>
                  <h4 className="text-2xl font-bold text-brand-dark mb-2">Diwali 1998</h4>
                  <p className="text-lg text-brand-muted font-medium">Family gathering at the old house.</p>
                </div>
                <div className="bg-white p-3 rounded-full shadow-sm text-brand-accent-orange group-hover:bg-brand-accent-orange group-hover:text-white transition-colors shrink-0 ml-4">
                  <ChevronRight className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* 5. Activities Preview */}
      <section>
        <h3 className="text-2xl font-bold text-brand-dark mb-4 px-2">Gentle Activities</h3>
        <Link href="/patient/activities" className="block focus:outline-none focus:ring-4 focus:ring-brand-primary/20 rounded-3xl">
          <Card className="bg-[#F3F0FF] border-0 shadow-sm hover:shadow-md transition-all group rounded-3xl">
            <CardContent className="p-6 sm:p-8 flex flex-row items-center">
              <div className="bg-purple-200 p-4 rounded-2xl text-purple-700 shrink-0 mr-6 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-purple-950 mb-2">Relaxing Puzzles</h4>
                <p className="text-lg text-purple-800 font-medium">Keep your mind active with simple, fun shapes.</p>
              </div>
              <div className="bg-white p-3 rounded-full shadow-sm text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 ml-4">
                <ChevronRight className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

    </div>
  );
}

