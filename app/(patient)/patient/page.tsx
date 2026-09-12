'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mascot, MascotState } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Pill, 
  BookOpen, 
  RotateCcw,
  Music,
  Sun,
  Moon,
  Sunrise,
  Check
} from 'lucide-react';
import { useSharedData } from '@/services/context/shared-data-context';
import { usePatientTranslation, LanguageSelector } from '@/features/patient-i18n';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PatientOnboarding } from '@/components/onboarding';
import { PatientOnboardingData } from '@/types/onboarding';
import { useCircadianStage, CircadianStage } from '@/hooks/use-circadian-stage';
import { getMemoryOfTheDay } from '@/features/memories/data/sample-memories';
import { cognitiveService } from '@/features/cognition/services';
import { useMusic } from '@/features/music';

type JourneyStep = 'greeting' | 'reminder' | 'memory' | 'activity' | 'celebration';

const JOURNEY_STEPS: { id: JourneyStep; label: string; icon: string; shortTitle: string }[] = [
  { id: 'greeting', label: '1. Welcome', icon: '🌅', shortTitle: 'Orientation' },
  { id: 'reminder', label: '2. Daily Care', icon: '💊', shortTitle: 'Medicine' },
  { id: 'memory', label: '3. Memory', icon: '📸', shortTitle: 'Scrapbook' },
  { id: 'activity', label: '4. Activity', icon: '🌸', shortTitle: 'Gentle Play' },
  { id: 'celebration', label: '5. Joy & Rest', icon: '✨', shortTitle: 'Affirmation' },
];

export default function PatientHomePage() {
  const { selectedPatient, reminders, markReminderCompleted, toggleReminderStatus, memories } = useSharedData();
  const { isCompleted, isLoading, data } = useOnboarding('patient');
  const onboardingData = data as PatientOnboardingData | null;
  const { t } = usePatientTranslation();
  const circadian = useCircadianStage();
  const { play, status } = useMusic();
  const isPlaying = status === 'playing';

  const [activeStep, setActiveStep] = useState<JourneyStep>('greeting');
  const [showStageSelector, setShowStageSelector] = useState(false);

  // Identify patient name
  const patientFirstName = onboardingData?.preferredName
    ? onboardingData.preferredName.split(' ')[0]
    : onboardingData?.name
    ? onboardingData.name.split(' ')[0]
    : selectedPatient?.name
    ? selectedPatient.name.split(' ')[0]
    : 'Meera';

  // Primary reminder for routine step
  const activeReminder = reminders.find(
    (r) => r.category === 'medication' || r.title.toLowerCase().includes('medication')
  ) || reminders[0];

  const reminderTaken = activeReminder ? activeReminder.status === 'completed' : false;

  // Primary featured memory
  const memoryOfTheDay = (memories && memories.length > 0) ? (memories[0] as any) : getMemoryOfTheDay();

  // Primary recommended activity
  const recommendedActivity = cognitiveService.getRecommendedActivity();

  if (!isLoading && !isCompleted) {
    return <PatientOnboarding initialName={patientFirstName} />;
  }

  const handleToggleMedication = () => {
    if (!activeReminder) return;
    if (reminderTaken) {
      toggleReminderStatus(activeReminder.id, 'pending');
    } else {
      markReminderCompleted(activeReminder.id, `${selectedPatient?.name || patientFirstName} (Patient App)`);
    }
  };

  const currentStepIndex = JOURNEY_STEPS.findIndex((s) => s.id === activeStep);

  const goToNextStep = () => {
    if (currentStepIndex < JOURNEY_STEPS.length - 1) {
      setActiveStep(JOURNEY_STEPS[currentStepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setActiveStep(JOURNEY_STEPS[currentStepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Companion speech configuration per step & circadian stage
  const getCompanionConfig = (): { state: MascotState; speech: React.ReactNode } => {
    switch (activeStep) {
      case 'greeting':
        return {
          state: 'happy',
          speech: (
            <>
              {circadian.greetingPrefix}, {patientFirstName}!<br />
              <span className="text-brand-muted font-medium">I&apos;m your Saathi. Let&apos;s take today one peaceful step at a time.</span>{' '}
              <Heart className="inline w-4 h-4 fill-brand-accent-orange text-brand-accent-orange" />
            </>
          ),
        };
      case 'reminder':
        return {
          state: reminderTaken ? 'celebrating' : 'encouraging',
          speech: reminderTaken ? (
            <>
              Wonderful job, {patientFirstName}!<br />
              <span className="text-emerald-700 font-semibold">Your daily routine is taken care of.</span>{' '}
              <Heart className="inline w-4 h-4 fill-red-500 text-red-500" />
            </>
          ) : (
            <>
              Let&apos;s take care of ourselves.<br />
              <span className="text-brand-muted font-medium">A sip of warm water makes everything easier.</span>
            </>
          ),
        };
      case 'memory':
        return {
          state: 'holding-book',
          speech: (
            <>
              Look at this beautiful moment!<br />
              <span className="text-brand-muted font-medium">Family memories stay warm in our hearts.</span>{' '}
              <Heart className="inline w-4 h-4 fill-red-500 text-red-500" />
            </>
          ),
        };
      case 'activity':
        return {
          state: 'encouraging',
          speech: (
            <>
              Time for a gentle mind activity!<br />
              <span className="text-brand-muted font-medium">No timers, no scores—just relaxing fun.</span>{' '}
              <Sparkles className="inline w-4 h-4 text-brand-primary" />
            </>
          ),
        };
      case 'celebration':
        return {
          state: 'celebrating',
          speech: (
            <>
              What a peaceful journey, {patientFirstName}!<br />
              <span className="text-brand-muted font-medium">You are safe, cherished, and loved.</span>{' '}
              <Heart className="inline w-4 h-4 fill-red-500 text-red-500" />
            </>
          ),
        };
    }
  };

  const companion = getCompanionConfig();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Bar with Circadian Stage Indicator & Language */}
      <header className="flex items-center justify-between gap-3 pt-1 pb-1 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowStageSelector(!showStageSelector)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-xs ${circadian.badgeColor}`}
            title="Circadian Time & Stage"
          >
            <span>{circadian.badgeEmoji}</span>
            <span>{circadian.label}</span>
            <span className="text-xs opacity-75 hidden sm:inline">• {circadian.currentTimeFormatted}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </header>

      {/* Circadian Quick Stage Switcher (Non-intrusive modal/drawer for demo/accessibility) */}
      {showStageSelector && (
        <div className="bg-white rounded-3xl p-5 border-2 border-brand-primary/30 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Circadian Daily Rhythm
            </span>
            <button
              onClick={() => setShowStageSelector(false)}
              className="text-xs font-bold text-brand-muted hover:text-brand-dark px-2 py-1"
            >
              Close ✕
            </button>
          </div>
          <p className="text-xs text-brand-muted mb-3 font-medium">
            SmritiSaathi aligns reminders and memories to your natural daily rhythm:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['morning', 'afternoon', 'evening'] as CircadianStage[]).map((stageKey) => {
              const isSelected = circadian.stage === stageKey;
              const icons = { morning: '🌅 Morning', afternoon: '☀️ Afternoon', evening: '🌙 Evening' };
              return (
                <button
                  key={stageKey}
                  type="button"
                  onClick={() => {
                    circadian.setManualStage(stageKey);
                    setShowStageSelector(false);
                  }}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-brand-light-alt text-brand-dark border-brand-border hover:bg-white'
                  }`}
                >
                  {icons[stageKey]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Step Progress Journey Breadcrumbs (Always Obvious 'Where I Am') */}
      <nav aria-label="Daily Journey Progress" className="bg-white rounded-3xl p-2.5 sm:p-3 border-2 border-brand-light shadow-xs">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = step.id === activeStep;
            const isPassed = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStep(step.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex-1 min-w-[58px] sm:min-w-[76px] py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm font-bold scale-102'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 hover:bg-emerald-100/80'
                    : 'bg-brand-light-alt/60 text-brand-muted hover:bg-brand-light hover:text-brand-dark font-medium'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="text-base sm:text-lg mb-0.5">{step.icon}</span>
                <span className="text-[11px] sm:text-xs leading-none whitespace-nowrap">
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Companion Hero Guide Area */}
      <section aria-label="Companion Guide" className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden border border-brand-border/40">
        <div className="pt-2 mb-3">
          <Mascot
            size="lg"
            state={companion.state}
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={companion.speech}
          />
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-brand-primary px-3.5 py-1 bg-white rounded-full border border-brand-border/60 shadow-xs mb-2">
          Step {currentStepIndex + 1} of 5: {JOURNEY_STEPS[currentStepIndex].shortTitle}
        </span>
      </section>

      {/* 4. Guided Journey Step Containers */}

      {/* ── STEP 1: GREETING & ORIENTATION ── */}
      {activeStep === 'greeting' && (
        <section aria-label="Morning Orientation" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="bg-white border-2 border-brand-light shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-sm">
                <Sunrise className="w-4 h-4 text-amber-700" />
                <span>{circadian.currentDateFormatted}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
                {circadian.greetingPrefix}, {patientFirstName}!
              </h1>

              <p className="text-lg sm:text-xl text-brand-muted font-medium max-w-md mx-auto leading-relaxed">
                {circadian.tagline}. Everything is ready for a calm, comfortable time together.
              </p>

              {/* Time & Gentle Schedule Summary */}
              <div className="bg-brand-light-alt rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-around border border-brand-border/60 text-brand-dark">
                <div className="text-center">
                  <p className="text-xs font-bold text-brand-muted uppercase">Current Time</p>
                  <p className="text-xl font-black text-brand-primary">{circadian.currentTimeFormatted}</p>
                </div>
                <div className="h-8 w-px bg-brand-border/80" />
                <div className="text-center">
                  <p className="text-xs font-bold text-brand-muted uppercase">Today&apos;s Plan</p>
                  <p className="text-xl font-black text-brand-dark">4 Gentle Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Primary 64px Guided Action */}
          <Button
            size="lg"
            onClick={goToNextStep}
            className="w-full h-18 text-xl rounded-full shadow-md font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <span>Continue My Day</span>
            <ArrowRight className="w-6 h-6 stroke-[2.5]" />
          </Button>
        </section>
      )}

      {/* ── STEP 2: GENTLE CARE & ROUTINE REMINDER ── */}
      {activeStep === 'reminder' && (
        <section aria-label="Daily Care Routine" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="bg-[#F0F7FF] border-2 border-blue-200 shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleToggleMedication}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Click to toggle health routine status"
                >
                  <Pill className="w-3.5 h-3.5 text-blue-700" />
                  <span>Gentle Daily Health</span>
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-white/80 text-blue-800 rounded-full font-extrabold">
                    {reminderTaken ? '✓ Taken' : 'Tap to toggle'}
                  </span>
                </button>
                <span className="text-sm font-bold text-blue-800">
                  {activeReminder?.timeFormatted || activeReminder?.time || '9:30 AM'}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                  💊
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-blue-950 leading-tight">
                    {activeReminder?.title || 'Morning Health Routine'}
                  </h2>
                  <p className="text-base sm:text-lg text-blue-800 font-medium mt-1 leading-relaxed">
                    {activeReminder?.description || activeReminder?.instructions || 'Take with a glass of warm water after breakfast.'}
                  </p>
                </div>
              </div>

              {/* Action Button: Toggleable between I Have Taken It and Taken with love */}
              {reminderTaken ? (
                <button
                  type="button"
                  onClick={handleToggleMedication}
                  className="w-full bg-emerald-50 hover:bg-emerald-100/90 border-2 border-emerald-300 text-emerald-900 text-lg h-16 rounded-2xl flex items-center justify-center font-bold gap-3 shadow-inner cursor-pointer hover:scale-[1.005] active:scale-[0.99] transition-all group"
                  title="Click to toggle back to pending"
                >
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Taken with love for {patientFirstName} ❤️</span>
                  <span className="text-xs font-medium text-emerald-700 opacity-75 ml-1 hidden sm:inline">(tap to undo)</span>
                </button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleToggleMedication}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-2xl shadow-sm font-bold cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-7 h-7" />
                  <span>I Have Taken This Medicine</span>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Next Guided Progression */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={goToNextStep}
              className="w-full h-18 text-xl rounded-full shadow-md font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Next: Today&apos;s Memory</span>
              <ArrowRight className="w-6 h-6 stroke-[2.5]" />
            </Button>

            <button
              type="button"
              onClick={goToPrevStep}
              className="w-full py-2.5 text-sm font-bold text-brand-muted hover:text-brand-dark flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Morning Welcome</span>
            </button>
          </div>
        </section>
      )}

      {/* ── STEP 3: CHERISHED MEMORY OF THE DAY ── */}
      {activeStep === 'memory' && (
        <section aria-label="Cherished Memory" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="bg-[#FFF8F0] border-2 border-[#F6DEC8] shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Featured Memory Keepsake</span>
                </div>
                <span className="text-xs font-bold text-brand-muted">
                  {memoryOfTheDay?.dateEra || 'Family Moments'}
                </span>
              </div>

              {/* Memory Picture & Story */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden bg-amber-100 shadow-sm shrink-0 border-2 border-white">
                  <Image
                    src={memoryOfTheDay?.coverImage || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80'}
                    alt={memoryOfTheDay?.title || 'Cherished Memory'}
                    fill
                    sizes="(max-width: 640px) 100vw, 240px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {memoryOfTheDay?.location || 'Family Photo'}
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-dark leading-tight">
                    {memoryOfTheDay?.title || 'A Sunny Day Together'}
                  </h2>
                  <p className="text-base sm:text-lg text-brand-muted font-medium leading-relaxed">
                    {memoryOfTheDay?.shortDescription || 'A cherished gathering with smiling faces, stories, and warm memories.'}
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary bg-white px-3 py-1 rounded-full border border-amber-200">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>{memoryOfTheDay?.emotionalTag || 'Warm & Cherished'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Direct Action to Memory Detail */}
              <Link
                href={`/patient/memories/${memoryOfTheDay?.id || 'mem-1'}`}
                className="block focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-2xl"
              >
                <Button
                  size="lg"
                  className="w-full h-16 bg-[#8D4935] hover:bg-[#6E3524] text-white text-lg sm:text-xl rounded-2xl shadow-sm font-bold cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Open This Memory Book</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Next Guided Progression */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={goToNextStep}
              className="w-full h-18 text-xl rounded-full shadow-md font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Next: Mindful Activity</span>
              <ArrowRight className="w-6 h-6 stroke-[2.5]" />
            </Button>

            <div className="flex items-center justify-between px-2 pt-1">
              <button
                type="button"
                onClick={goToPrevStep}
                className="text-sm font-bold text-brand-muted hover:text-brand-dark flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Routine</span>
              </button>

              <Link
                href="/patient/memories"
                className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>Browse All Memories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 4: MINDFUL ACTIVITY OF THE DAY ── */}
      {activeStep === 'activity' && (
        <section aria-label="Mindful Activity" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="bg-[#F3F8F5] border-2 border-emerald-200 shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                  <span>Featured Game: {recommendedActivity?.title || 'Find The Object'}</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                  Peaceful Pace • Zero Timers
                </span>
              </div>

              {/* Activity Focus Presentation */}
              <div className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-2xl bg-white border-2 border-blue-300 text-blue-800 flex items-center justify-center text-4xl shrink-0 shadow-xs">
                  {recommendedActivity?.id === 'find-the-object' ? '🔍' : '🌱'}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-dark leading-tight">
                    {recommendedActivity?.title || 'Find The Object'}
                  </h2>
                  <p className="text-base sm:text-lg text-brand-muted font-medium mt-1 leading-relaxed">
                    {recommendedActivity?.description || 'Take your time looking around the kitchen, veranda, and living room to find everyday favorites with gentle companion hints.'}
                  </p>
                </div>
              </div>

              {/* Primary 64px CTA: Let's Play */}
              <Link
                href={recommendedActivity?.href || '/patient/activities/find-the-object'}
                className="block focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-2xl"
              >
                <Button
                  size="lg"
                  className="w-full h-16 bg-[#2C5545] hover:bg-[#1E3B30] text-white text-xl rounded-2xl shadow-sm font-bold cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <span>Play &quot;{recommendedActivity?.title || 'Find The Object'}&quot; Now</span>
                  <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Next Guided Progression */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={goToNextStep}
              className="w-full h-18 text-xl rounded-full shadow-md font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Next: Daily Peace & Reflection</span>
              <ArrowRight className="w-6 h-6 stroke-[2.5]" />
            </Button>

            <div className="flex items-center justify-between px-2 pt-1">
              <button
                type="button"
                onClick={goToPrevStep}
                className="text-sm font-bold text-brand-muted hover:text-brand-dark flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Memory</span>
              </button>

              <Link
                href="/patient/activities"
                className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>View All 5 Mindful Games</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 5: DAILY PEACE & REFLECTION ── */}
      {activeStep === 'celebration' && (
        <section aria-label="Daily Celebration" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FFF0E6] border-2 border-[#F0DDCB] shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 text-center space-y-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-sm font-bold mx-auto">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Daily Joy & Affirmation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
                You Did Wonderfully Today, {patientFirstName}!
              </h2>

              <p className="text-lg text-brand-muted font-medium max-w-md mx-auto leading-relaxed">
                You took time for your health, cherished family memories, and spent gentle moments together.
              </p>

              {/* Accomplishment Tokens */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-2xl border border-brand-border/80 shadow-xs">
                  <span className="text-2xl block mb-1">💊</span>
                  <span className="text-xs font-bold text-brand-dark">Cared for Health</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-brand-border/80 shadow-xs">
                  <span className="text-2xl block mb-1">💖</span>
                  <span className="text-xs font-bold text-brand-dark">Treasured Memories</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-brand-border/80 shadow-xs">
                  <span className="text-2xl block mb-1">🌸</span>
                  <span className="text-xs font-bold text-brand-dark">Mindful Moments</span>
                </div>
              </div>

              {/* Affirmation Note */}
              <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm font-bold text-brand-dark flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-red-500 text-red-500 shrink-0" />
                <span>Your family is always close and thinking of you.</span>
              </div>
            </CardContent>
          </Card>

          {/* Action: Listen to Soothing Indian Classical Music or Return */}
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={() => play()}
              className="w-full h-18 text-lg sm:text-xl rounded-full shadow-md font-extrabold bg-[#2C5545] hover:bg-[#1E3B30] text-white flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Music className="w-6 h-6 stroke-[2.5]" />
              <span>{isPlaying ? 'Enjoying Calming Ragas 🎵' : 'Play Calming Music for Rest 🎵'}</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setActiveStep('greeting');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full h-14 text-base rounded-full font-bold border-2 border-brand-border hover:bg-white text-brand-dark flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Review Today&apos;s Journey from Start</span>
            </Button>
          </div>
        </section>
      )}

    </div>
  );
}
