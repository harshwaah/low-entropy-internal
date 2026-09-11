'use client';

import React, { useState } from 'react';
import { OnboardingLayout } from './onboarding-layout';
import { OnboardingStep } from './onboarding-step';
import { OnboardingWelcome } from './onboarding-welcome';
import { OnboardingCompletion } from './onboarding-completion';
import { OnboardingChoiceCard } from './onboarding-choice-card';
import { OnboardingIllustration } from './onboarding-illustration';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PractitionerOnboardingData } from '@/types/onboarding';
import { Stethoscope, Activity, FileCheck, BarChart3, ShieldCheck } from 'lucide-react';

interface PractitionerOnboardingProps {
  onComplete?: () => void;
}

export function PractitionerOnboarding({ onComplete }: PractitionerOnboardingProps) {
  const { completeOnboarding } = useOnboarding('practitioner');
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const [doctorName, setDoctorName] = useState<string>('Dr. Elena Vance');
  const [role, setRole] = useState<string>('Attending Neurologist');
  const [organization, setOrganization] = useState<string>('Memorial Cognitive Care Institute');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'Cognitive stability trends',
    'Routine adherence',
    'Clinical observations',
  ]);

  const rolePresets = [
    'Attending Neurologist',
    'Geriatrician',
    'Clinical Neuropsychologist',
    'Memory Care Coordinator',
    'Occupational Therapist',
  ];

  const priorityOptions = [
    {
      id: 'Cognitive stability trends',
      label: 'Cognitive Stability Trends',
      emoji: '📈',
      desc: 'Longitudinal engagement trends and voluntary activity participation trajectory',
    },
    {
      id: 'Routine adherence',
      label: 'Circadian Routine Adherence',
      emoji: '⏱️',
      desc: 'Medication tracking, morning/evening routine adherence rates and deviations',
    },
    {
      id: 'Activity engagement',
      label: 'Cognitive Game & Reminiscence Metrics',
      emoji: '🧠',
      desc: 'Session frequency across Memory Trail, Quick Pick, and oral history narrations',
    },
    {
      id: 'Clinical observations',
      label: 'Interdisciplinary Observations',
      emoji: '📋',
      desc: 'Caregiver reported behavioral shifts, confusion events, and clinical notes',
    },
  ];

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const data: PractitionerOnboardingData = {
        name: doctorName.trim() || 'Dr. Vance',
        role,
        organization: organization.trim() || 'Cognitive Care Center',
        priorities: selectedPriorities,
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
        return 'Initialize Clinical Workstation';
      case 2:
        return 'Confirm Credentials';
      case 3:
        return 'Save Telemetry Priorities';
      case 4:
        return 'Enter Dashboard';
      default:
        return 'Continue';
    }
  };

  return (
    <OnboardingLayout
      role="practitioner"
      currentStep={step}
      totalSteps={totalSteps}
      canGoBack={step > 1 && step < totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={getNextButtonLabel()}
      isNextDisabled={step === 2 && !doctorName.trim()}
    >
      {/* Screen 1: Clinical Orientation */}
      {step === 1 && (
        <OnboardingWelcome
          role="practitioner"
          title="Clinical Oversight Workstation"
          subtitle="Non-invasive longitudinal telemetry, adherence tracking, and interdisciplinary collaboration for mild-to-moderate dementia care."
          mascotGreeting="Welcome Doctor. Telemetry channels are calibrated for zero-friction review."
          pillars={[
            {
              icon: <BarChart3 className="w-5 h-5 text-[#1e4d3a]" />,
              title: 'Objective Longitudinal Trends',
              description: 'Passive tracking of task adherence, cognitive play, and verbal fluency indicators.',
            },
            {
              icon: <FileCheck className="w-5 h-5 text-emerald-700" />,
              title: 'Circadian Adherence Audit',
              description: 'Transparent visibility into daily routines and medication verification loops.',
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-blue-700" />,
              title: 'HIPAA & Audit Trail Compliant',
              description: 'Role-gated patient roster access with signed observation notes.',
            },
          ]}
        />
      )}

      {/* Screen 2: Professional Details */}
      {step === 2 && (
        <OnboardingStep
          eyebrow="Clinical Identity"
          title="Professional Details"
          subtitle="Your name and specialty will seal patient observation notes and treatment adjustments."
          illustration={
            <OnboardingIllustration
              mascotState="thinking"
              icon={<Stethoscope className="w-12 h-12 text-[#1e4d3a]" />}
              badgeText="Practitioner Authentication"
            />
          }
        >
          <div className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="practitioner-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Title & Name
              </label>
              <input
                id="practitioner-name-input"
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="e.g. Dr. Elena Vance, MD"
                className="w-full text-base font-bold py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-[#1e4d3a] focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 shadow-2xs transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Clinical Specialty / Role
              </label>
              <div className="flex flex-wrap gap-1.5">
                {rolePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRole(preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      role === preset
                        ? 'bg-[#1e4d3a] text-white border-[#1e4d3a] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="practitioner-org-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Affiliated Clinic / Health System
              </label>
              <input
                id="practitioner-org-input"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Memorial Cognitive Care Institute"
                className="w-full text-base font-medium py-3.5 px-4 rounded-2xl bg-white border-2 border-slate-200 focus:border-[#1e4d3a] focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 shadow-2xs transition-all"
              />
            </div>
          </div>
        </OnboardingStep>
      )}

      {/* Screen 3: What matters most to you? */}
      {step === 3 && (
        <OnboardingStep
          eyebrow="Clinical Telemetry Calibration"
          title="What matters most to you?"
          subtitle="Calibrate your clinical priority telemetry filters for the patient cohort overview."
          illustration={
            <OnboardingIllustration
              mascotState="happy"
              icon={<Activity className="w-12 h-12 text-[#1e4d3a]" />}
              badgeText="Cohort Telemetry Filters"
            />
          }
        >
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {priorityOptions.map((opt) => (
              <OnboardingChoiceCard
                key={opt.id}
                id={`prio-${opt.id.toLowerCase().replace(/\s+/g, '-')}`}
                value={opt.id}
                label={opt.label}
                emoji={opt.emoji}
                description={opt.desc}
                selected={selectedPriorities.includes(opt.id)}
                onToggle={() => togglePriority(opt.id)}
              />
            ))}
          </div>
        </OnboardingStep>
      )}

      {/* Screen 4: Workstation Ready */}
      {step === 4 && (
        <OnboardingCompletion
          role="practitioner"
          title="Workstation Initialized"
          subtitle={`Welcome, ${doctorName}. Your clinical roster is synchronized.`}
          reassuranceText="Clinical session logging enabled. All telemetry complies with longitudinal non-invasive observational protocols."
          summaryItems={[
            { label: 'Attending Clinician', value: `${doctorName} (${role})` },
            { label: 'Health System', value: organization },
            { label: 'Prioritized Metrics', value: selectedPriorities },
          ]}
        />
      )}
    </OnboardingLayout>
  );
}
