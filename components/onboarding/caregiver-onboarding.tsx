'use client';

import React, { useState } from 'react';
import { OnboardingLayout } from './onboarding-layout';
import { OnboardingStep } from './onboarding-step';
import { OnboardingWelcome } from './onboarding-welcome';
import { OnboardingCompletion } from './onboarding-completion';
import { OnboardingChoiceCard } from './onboarding-choice-card';
import { OnboardingIllustration } from './onboarding-illustration';
import { useOnboarding } from '@/hooks/use-onboarding';
import { CaregiverOnboardingData } from '@/types/onboarding';
import { BookHeart, CalendarClock, Activity, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CaregiverOnboardingProps {
  onComplete?: () => void;
}

export function CaregiverOnboarding({ onComplete }: CaregiverOnboardingProps) {
  const { completeOnboarding } = useOnboarding('caregiver');
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [relationship, setRelationship] = useState<string>('Parent (Father)');
  const [patientName, setPatientName] = useState<string>('Kamal Sharma');
  const [preferredName, setPreferredName] = useState<string>('Papa');
  const [selectedManageAreas, setSelectedManageAreas] = useState<string[]>([
    'Daily schedule',
    'Medicine reminders',
    'Memory scrapbook',
  ]);

  const relationshipOptions = [
    { id: 'Parent (Father)', label: 'Parent (Father)', emoji: '👨', desc: 'Caring for your father or father-in-law' },
    { id: 'Parent (Mother)', label: 'Parent (Mother)', emoji: '👩', desc: 'Caring for your mother or mother-in-law' },
    { id: 'Spouse / Partner', label: 'Spouse / Partner', emoji: '💍', desc: 'Caring for your life partner' },
    { id: 'Grandparent', label: 'Grandparent', emoji: '👵', desc: 'Caring for grandmother or grandfather' },
    { id: 'Relative / Friend', label: 'Relative or Dear Friend', emoji: '🤝', desc: 'Extended family or trusted companion' },
  ];

  const manageOptions = [
    { id: 'Daily schedule', label: 'Daily Schedule & Circadian Flow', emoji: '🌅', desc: 'Morning, afternoon, and evening routines' },
    { id: 'Medicine reminders', label: 'Medicine & Vital Reminders', emoji: '💊', desc: 'Gentle nudges with visual pill instructions' },
    { id: 'Memory scrapbook', label: 'Memory Scrapbook & Oral Stories', emoji: '📖', desc: 'Curate family photos and listen to recordings' },
    { id: 'Cognitive exercises', label: 'Cognitive Activities & Games', emoji: '🧩', desc: 'Track engaging memory puzzles and games' },
  ];

  const toggleManageArea = (id: string) => {
    setSelectedManageAreas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const data: CaregiverOnboardingData = {
        relationship,
        patientName: patientName.trim() || 'Loved One',
        preferredName: preferredName.trim() || 'Papa',
        manageAreas: selectedManageAreas,
      };
      completeOnboarding(data);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const getNextButtonLabel = () => {
    switch (step) {
      case 1:
        return 'Get Started';
      case 2:
        return 'Continue';
      case 3:
        return 'Confirm Details';
      case 4:
        return 'Save Management Focus';
      case 5:
        return 'Open Caregiver Dashboard';
      default:
        return 'Continue';
    }
  };

  return (
    <OnboardingLayout
      role="caregiver"
      currentStep={step}
      totalSteps={totalSteps}
      canGoBack={step > 1 && step < totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={getNextButtonLabel()}
      isNextDisabled={step === 3 && (!patientName.trim() || !preferredName.trim())}
    >
      {/* Screen 1: Welcome Caregiver */}
      {step === 1 && (
        <OnboardingWelcome
          role="caregiver"
          title="Caring Together, Effortlessly"
          subtitle="A centralized care hub empowering families to protect routines, preserve memories, and coordinate without burnout."
          mascotGreeting="Welcome! We are honored to support your caregiving journey."
          pillars={[
            {
              icon: <BookHeart className="w-5 h-5 text-emerald-700" />,
              title: 'Preserve Treasured Memories',
              description: 'Upload old family pictures and receive AI-guided oral memoirs.',
            },
            {
              icon: <CalendarClock className="w-5 h-5 text-amber-700" />,
              title: 'Circadian Routine Synchronization',
              description: 'Adjust medicine schedules and daily checklist items remotely in real-time.',
            },
            {
              icon: <HeartHandshake className="w-5 h-5 text-[#2C5545]" />,
              title: 'Collaborative Care Circle',
              description: 'Stay seamlessly connected with siblings, nurses, and clinical practitioners.',
            },
          ]}
        />
      )}

      {/* Screen 2: Who are you caring for? */}
      {step === 2 && (
        <OnboardingStep
          eyebrow="Care Context"
          title="Who are you caring for?"
          subtitle="Understanding your family bond helps us calibrate tone, notifications, and permissions."
          illustration={
            <OnboardingIllustration
              mascotState="holding-heart"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">Every bond is sacred and unique.</span>}
            />
          }
        >
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {relationshipOptions.map((opt) => (
              <OnboardingChoiceCard
                key={opt.id}
                id={`rel-${opt.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                value={opt.id}
                variant="radio"
                label={opt.label}
                emoji={opt.emoji}
                description={opt.desc}
                selected={relationship === opt.id}
                onToggle={() => setRelationship(opt.id)}
              />
            ))}
          </div>
        </OnboardingStep>
      )}

      {/* Screen 3: Patient Information */}
      {step === 3 && (
        <OnboardingStep
          eyebrow="Loved One Profile"
          title="Loved One Information"
          subtitle="Provide their legal name for medical coordination, and the loving name they respond to best."
          illustration={
            <OnboardingIllustration
              mascotState="thinking"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">What should Saathi call them?</span>}
            />
          }
        >
          <div className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="patient-full-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Legal Name (For Clinic Records)
              </label>
              <input
                id="patient-full-name-input"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Kamal Sharma"
                className="w-full text-base font-bold py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-[#2C5545] focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 shadow-2xs transition-all"
              />
            </div>

            <div>
              <label htmlFor="patient-preferred-call-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Preferred Call Name (In Daily App & Stories)
              </label>
              <input
                id="patient-preferred-call-name-input"
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                placeholder="e.g. Papa, Maa, Uncle Raj"
                className="w-full text-base font-bold py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-[#2C5545] focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 shadow-2xs transition-all"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              💡 Saathi companion voice prompts will always use <strong>&ldquo;{preferredName || 'Papa'}&rdquo;</strong> to preserve immediate emotional comfort.
            </div>
          </div>
        </OnboardingStep>
      )}

      {/* Screen 4: What would you like to manage? */}
      {step === 4 && (
        <OnboardingStep
          eyebrow="Care Priorities"
          title="What would you like to manage?"
          subtitle="Choose the domains you will oversee most frequently. You can change these anytime."
          illustration={
            <OnboardingIllustration
              mascotState="happy"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">We will streamline your dashboard!</span>}
            />
          }
        >
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {manageOptions.map((opt) => (
              <OnboardingChoiceCard
                key={opt.id}
                id={`manage-${opt.id.toLowerCase().replace(/\s+/g, '-')}`}
                value={opt.id}
                label={opt.label}
                emoji={opt.emoji}
                description={opt.desc}
                selected={selectedManageAreas.includes(opt.id)}
                onToggle={() => toggleManageArea(opt.id)}
              />
            ))}
          </div>
        </OnboardingStep>
      )}

      {/* Screen 5: Ready to Support */}
      {step === 5 && (
        <OnboardingCompletion
          role="caregiver"
          title="Care Circle Configured!"
          subtitle={`You are ready to oversee ${patientName}'s daily rhythms and memories.`}
          reassuranceText="Your settings and schedules are synchronized in real time across the patient tablet and clinical workstations."
          summaryItems={[
            { label: 'Caring for', value: `${patientName} ("${preferredName}")` },
            { label: 'Relationship', value: relationship },
            { label: 'Active Management Focus', value: selectedManageAreas },
          ]}
        />
      )}
    </OnboardingLayout>
  );
}
