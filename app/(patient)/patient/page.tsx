'use client';

import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Sparkles, CheckCircle2, ChevronRight, Pill, Heart } from 'lucide-react';
import { MemoryOfTheDay } from '@/features/memories/components/memory-of-the-day';
import { getMemoryOfTheDay } from '@/features/memories/data/sample-memories';
import { useSharedData } from '@/services/context/shared-data-context';
import { usePatientTranslation, LanguageSelector } from '@/features/patient-i18n';

export default function PatientHomePage() {
  const { selectedPatient, reminders, markReminderCompleted, memories } = useSharedData();
  const { t } = usePatientTranslation();
  
  // Find primary morning/medication reminder or first active reminder
  const morningReminder = reminders.find(
    (r) => r.category === 'medication' || r.title.toLowerCase().includes('medication')
  ) || reminders[0];

  const medicationTaken = morningReminder ? morningReminder.status === 'completed' : false;
  const patientFirstName = onboardingData?.name
    ? onboardingData.name.split(' ')[0]
    : selectedPatient?.name
    ? selectedPatient.name.split(' ')[0]
    : 'Meera';
  const memoryOfTheDay = (memories && memories.length > 0) ? (memories[0] as any) : getMemoryOfTheDay();
  const pendingCount = reminders.filter((r) => r.status !== 'completed').length;

  if (!isLoading && !isCompleted) {
    return <PatientOnboarding initialName={patientFirstName} />;
  }

  const handleContinueDay = () => {
    const nextSection = document.getElementById('up-next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTakeMedication = () => {
    if (morningReminder) {
      markReminderCompleted(morningReminder.id, `${selectedPatient?.name || 'Patient'} (Patient App)`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Header bar with Language Selector */}
      <div className="flex items-center justify-between px-2 pt-2 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-brand-dark">
            {t('home.appName')}
          </span>
        </div>
        <LanguageSelector />
      </div>

      {/* 1. Companion Welcome Card */}
      <section className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
        <div className="pt-2 mb-4">
          <Mascot 
            size="lg" 
            state={medicationTaken ? "celebrating" : "happy"}
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={
              medicationTaken ? (
                <>{t('home.wonderfulJob', { name: patientFirstName })}<br/>{t('home.doingGreat')} <Heart className="inline w-4 h-4 fill-red-500 text-red-500" /></>
              ) : (
                <>{t('home.goodMorning', { name: patientFirstName })}<br/>{t('home.gladToSeeYou')} <Heart className="inline w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" /></>
              )
            }
          />
        </div>
        
        <h1 className="text-3xl font-extrabold text-brand-dark mb-3 tracking-tight">
          {t('home.readyForDay')}
        </h1>
        
        <p className="text-xl text-brand-muted font-medium mb-8 max-w-sm leading-relaxed">
          {t('home.scheduleText')}
        </p>

        <Button 
          size="lg" 
          onClick={handleContinueDay}
          className="w-full sm:w-auto text-lg h-16 px-10 rounded-full shadow-md font-bold hover:scale-105 transition-all"
        >
          {t('home.continueDay')}
          <ChevronRight className="ml-2 w-6 h-6" />
        </Button>
      </section>

      {/* 2. Daily Overview Card */}
      <section>
        <Card className="bg-white border-2 border-brand-light hover:border-brand-primary/30 transition-colors shadow-sm rounded-3xl">
          <CardContent className="p-6 sm:p-8 flex items-center justify-between">
            <div>
              <p className="text-brand-primary font-bold text-lg mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> {t('home.today')}
              </p>
              <h2 className="text-4xl font-extrabold text-brand-dark">{t('home.saturday')}</h2>
              <p className="text-xl text-brand-muted font-medium mt-1">{t('home.septemberDate')}</p>
            </div>
            <div className="hidden sm:flex flex-col items-center justify-center bg-brand-light-alt rounded-2xl p-4 min-w-[120px]">
              <span className="text-3xl font-black text-brand-dark">
                {pendingCount}
              </span>
              <span className="text-sm font-bold text-brand-muted text-center leading-tight mt-1">
                {t('home.gentleItems')}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Up Next Reminder Card */}
      <section id="up-next-section" className="scroll-mt-6">
        <h3 className="text-2xl font-bold text-brand-dark mb-4 px-2">{t('home.upNext')}</h3>
        <Card className="bg-[#F0F7FF] border-0 shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-blue-100">
              <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
                <Pill className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-blue-950 mb-1">{morningReminder?.title ? morningReminder.title : t('home.morningMedication')}</p>
                <p className="text-blue-700 font-medium text-base">{morningReminder?.description ? morningReminder.description : t('home.medicationDesc')}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-blue-950">{morningReminder?.time || '9:30'}</p>
                <p className="text-blue-700 font-bold uppercase text-xs">AM</p>
              </div>
            </div>
            
            {medicationTaken ? (
              <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-lg h-16 rounded-2xl flex items-center justify-center font-bold gap-3 shadow-inner">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                {t('home.completed', { name: patientFirstName })}
              </div>
            ) : (
              <Button 
                size="lg" 
                onClick={handleTakeMedication}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-16 rounded-2xl shadow-sm font-bold active:scale-[0.99] transition-transform"
              >
                <CheckCircle2 className="mr-3 w-7 h-7" />
                {t('home.taken')}
              </Button>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 4. Memory Of The Day Preview */}
      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-2xl font-bold text-brand-dark">{t('home.memoryOfTheDay')}</h3>
          <Link 
            href="/patient/memories" 
            className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>{t('home.viewAll')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <MemoryOfTheDay memory={memoryOfTheDay} variant="compact" />
      </section>

      {/* 5. Activities Preview */}
      <section>
        <h3 className="text-2xl font-bold text-brand-dark mb-4 px-2">{t('home.gentleActivities')}</h3>
        <Link href="/patient/activities" className="block focus:outline-none focus:ring-4 focus:ring-brand-primary/20 rounded-3xl">
          <Card className="bg-[#F3F0FF] border-0 shadow-sm hover:shadow-md transition-all group rounded-3xl">
            <CardContent className="p-6 sm:p-8 flex flex-row items-center">
              <div className="bg-purple-200 p-4 rounded-2xl text-purple-700 shrink-0 mr-6 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-purple-950 mb-2">{t('home.relaxingPuzzles')}</h4>
                <p className="text-lg text-purple-800 font-medium">{t('home.puzzleDesc')}</p>
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
