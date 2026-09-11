'use client';

import React, { useState } from 'react';
import { OnboardingLayout } from './onboarding-layout';
import { OnboardingStep } from './onboarding-step';
import { OnboardingWelcome } from './onboarding-welcome';
import { OnboardingCompletion } from './onboarding-completion';
import { OnboardingChoiceCard } from './onboarding-choice-card';
import { OnboardingIllustration } from './onboarding-illustration';
import { useOnboarding } from '@/hooks/use-onboarding';
import { PatientOnboardingData } from '@/types/onboarding';
import { Mic, Heart, Smile, Sparkles } from 'lucide-react';

interface PatientOnboardingProps {
  initialName?: string;
  onComplete?: () => void;
}

export function PatientOnboarding({ initialName, onComplete }: PatientOnboardingProps) {
  const { completeOnboarding } = useOnboarding('patient');
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [preferredName, setPreferredName] = useState<string>(initialName || 'Papa');
  const [selectedJoys, setSelectedJoys] = useState<string[]>(['Family', 'Music', 'Nature']);
  const [selectedHelp, setSelectedHelp] = useState<string[]>([
    'Remembering people',
    'Daily routines',
  ]);

  const namePresets = ['Papa', 'Maa', 'Dadaji', 'Meera', 'Kamal', 'Bapu'];

  const joyOptions = [
    { id: 'Family', label: 'Family & Loved Ones', emoji: '👨‍👩‍👧‍👦', desc: 'Photos, stories, and letters from family' },
    { id: 'Nature', label: 'Nature & Walking', emoji: '🌿', desc: 'Gardens, birds, fresh morning air' },
    { id: 'Music', label: 'Old Melodies & Songs', emoji: '🎵', desc: 'Classic songs, bhajans, and acoustic tunes' },
    { id: 'Travel', label: 'Travel & Sacred Places', emoji: '✈️', desc: 'Past journeys, holy shrines, and hometowns' },
    { id: 'Festivals', label: 'Festivals & Celebrations', emoji: '🪔', desc: 'Diwali, Holi, and family gatherings' },
    { id: 'Food', label: 'Home Food & Sweets', emoji: '🍲', desc: 'Favorite home recipes, chai, and sweets' },
  ];

  const helpOptions = [
    { id: 'Remembering people', label: 'Remembering Faces & Names', emoji: '👥', desc: 'Familiar photos and family ties' },
    { id: 'Daily routines', label: 'Daily Medicine & Routines', emoji: '⏰', desc: 'Gentle, unhurried time reminders' },
    { id: 'Fun activities', label: 'Relaxing Mind Games', emoji: '🧩', desc: 'Memory cards and visual trails' },
    { id: 'Gentle reminders', label: 'Comforting Companion Chat', emoji: '💬', desc: 'Empathetic conversation and stories' },
  ];

  const toggleJoy = (id: string) => {
    setSelectedJoys((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleHelp = (id: string) => {
    setSelectedHelp((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const data: PatientOnboardingData = {
        name: preferredName.trim() || 'Friend',
        preferredName: preferredName.trim() || 'Friend',
        joys: selectedJoys,
        helpAreas: selectedHelp,
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
        return 'Begin Together';
      case 2:
        return 'Continue';
      case 3:
        return 'Looks Wonderful';
      case 4:
        return 'Save Choices';
      case 5:
        return 'Go to My Home';
      default:
        return 'Continue';
    }
  };

  return (
    <OnboardingLayout
      role="patient"
      currentStep={step}
      totalSteps={totalSteps}
      canGoBack={step > 1 && step < totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={getNextButtonLabel()}
      isNextDisabled={step === 2 && !preferredName.trim()}
    >
      {/* Screen 1: Welcome to SmritiSaathi */}
      {step === 1 && (
        <OnboardingWelcome
          role="patient"
          title="Welcome to SmritiSaathi"
          subtitle="A gentle, loving companion designed to keep memories vivid and daily life peaceful."
          mascotGreeting="Pranam! I am Saathi. I am right here with you."
          pillars={[
            {
              icon: <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />,
              title: 'Your Family Circle',
              description: 'Photos and notes from those who cherish you most.',
            },
            {
              icon: <Smile className="w-5 h-5 text-emerald-700" />,
              title: 'Gentle Peace of Mind',
              description: 'No timers, no tests, and zero rush. Everything at your rhythm.',
            },
            {
              icon: <Sparkles className="w-5 h-5 text-amber-600" />,
              title: 'Everyday Joys',
              description: 'Stories, favorite music, and pleasant mental moments.',
            },
          ]}
        />
      )}

      {/* Screen 2: What should I call you? */}
      {step === 2 && (
        <OnboardingStep
          eyebrow="Personal Greeting"
          title="What should I call you?"
          subtitle="Choose the name you feel warmest and most comfortable hearing."
          illustration={
            <OnboardingIllustration
              mascotState="thinking"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">Tell me your sweet name!</span>}
            />
          }
        >
          <div className="space-y-4 max-w-md mx-auto">
            <div className="relative">
              <input
                id="patient-preferred-name-input"
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                placeholder="Type your name or nickname..."
                className="w-full text-xl sm:text-2xl font-bold text-center py-4 px-6 rounded-3xl bg-white border-2 border-emerald-200 focus:border-[#2C5545] focus:ring-4 focus:ring-emerald-100 outline-none text-[#2C5545] shadow-xs transition-all"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Popular Quick Choices:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {namePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPreferredName(preset)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer ${
                      preferredName === preset
                        ? 'bg-[#2C5545] text-white border-[#2C5545] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro voice hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <Mic className="w-3.5 h-3.5 text-emerald-600" />
              <span>You can also simply speak your name when practicing stories</span>
            </div>
          </div>
        </OnboardingStep>
      )}

      {/* Screen 3: What brings you joy? */}
      {step === 3 && (
        <OnboardingStep
          eyebrow="Personal Delights"
          title="What brings you joy?"
          subtitle="Select the things that make you smile. We will weave them into your stories."
          illustration={
            <OnboardingIllustration
              mascotState="happy"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">Choose all that you like!</span>}
            />
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {joyOptions.map((opt) => (
              <OnboardingChoiceCard
                key={opt.id}
                id={`joy-${opt.id.toLowerCase()}`}
                label={opt.label}
                emoji={opt.emoji}
                description={opt.desc}
                selected={selectedJoys.includes(opt.id)}
                onToggle={toggleJoy}
              />
            ))}
          </div>
        </OnboardingStep>
      )}

      {/* Screen 4: What would you like help with? */}
      {step === 4 && (
        <OnboardingStep
          eyebrow="Your Companionship"
          title="What would you like help with?"
          subtitle="Choose the areas where a friendly hand is most reassuring."
          illustration={
            <OnboardingIllustration
              mascotState="encouraging"
              showSpeechBubble
              speechText={<span className="font-bold text-sm">I will guide you step by step.</span>}
            />
          }
        >
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {helpOptions.map((opt) => (
              <OnboardingChoiceCard
                key={opt.id}
                id={`help-${opt.id.toLowerCase().replace(/\s+/g, '-')}`}
                label={opt.label}
                emoji={opt.emoji}
                description={opt.desc}
                selected={selectedHelp.includes(opt.id)}
                onToggle={toggleHelp}
              />
            ))}
          </div>
        </OnboardingStep>
      )}

      {/* Screen 5: All Set! */}
      {step === 5 && (
        <OnboardingCompletion
          role="patient"
          title={`All Set, ${preferredName}!`}
          subtitle="Your companion room is peaceful, warm, and prepared for you."
          reassuranceText="Your cherished memories and routines are always safe, protected by your loving family."
          summaryItems={[
            { label: 'We will call you', value: preferredName },
            { label: 'Your favorite joys', value: selectedJoys },
            { label: 'Focused companion help', value: selectedHelp },
          ]}
        />
      )}
    </OnboardingLayout>
  );
}
