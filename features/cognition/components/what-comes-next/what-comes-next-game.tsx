'use client';

import React, { useState } from 'react';
import { cognitiveService } from '../../services';
import { RoutineScenario, RoutineSequenceOption } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, HelpCircle, ArrowDown, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhatComesNextGame() {
  const scenarios = cognitiveService.getRoutineScenarios();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'nudge' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isCompleted, setIsCompleted] = useState(false);

  const currentScenario: RoutineScenario = scenarios[currentScenarioIndex];

  const handleOptionSelect = (option: RoutineSequenceOption) => {
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      setFeedback({
        type: 'correct',
        message: option.affirmation,
      });
    } else {
      // Gentle nudge - never punitive, never say "Wrong"
      setFeedback({
        type: 'nudge',
        message: option.affirmation || option.gentleNudge,
      });
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setFeedback({ type: null, message: '' });

    if (currentScenarioIndex + 1 < scenarios.length) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetGame = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionId(null);
    setFeedback({ type: null, message: '' });
    setIsCompleted(false);
  };

  // Completion State
  if (isCompleted) {
    return (
      <ActivityLayout
        title="What Comes Next?"
        subtitle="Follow soothing daily life rhythms"
        categoryName="Daily Routines"
      >
        <ActivityCompletionCard
          activityTitle="What Comes Next?"
          celebrationTitle="Delightful Flow, Meera!"
          celebrationMessage="You guided all 4 daily rituals with natural ease and clarity. Morning sunshine, fresh masala chai, balcony blooms, and peaceful starlight."
          companionSpeech={<>You know every gentle rhythm of the day so well! 🌸✨</>}
          statBadgeText="All 4 Rituals Completed"
          onReplay={handleResetGame}
          replayLabel="Play Another Round"
          nextActivityHref="/patient/activities"
          nextActivityLabel="Back to Activities"
        />
      </ActivityLayout>
    );
  }

  const isStepSolved = selectedOptionId !== null && feedback.type === 'correct';

  return (
    <ActivityLayout
      title="What Comes Next?"
      subtitle="Follow soothing daily life rhythms"
      categoryName="Daily Routines"
      companionState={feedback.type === 'correct' ? 'celebrating' : feedback.type === 'nudge' ? 'thinking' : 'encouraging'}
      companionMessage={
        feedback.message ||
        `Let’s follow this peaceful story together. What is the comforting next step?`
      }
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetGame}
          className="rounded-full border-brand-border bg-white text-brand-dark hover:bg-brand-light-alt font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-brand-primary" />
          <span>Restart</span>
        </Button>
      }
    >
      {/* Progress Card */}
      <ActivityProgressCard
        currentStep={currentScenarioIndex + 1}
        totalSteps={scenarios.length}
        label="Routine Progress"
        stepName={`Ritual ${currentScenarioIndex + 1} of ${scenarios.length}: ${currentScenario.title}`}
        showHearts={false}
      />

      {/* Routine Timeline Card: Tangible Story Journal */}
      <div className="bg-white rounded-[2.5rem] p-5 sm:p-7 border-2 border-brand-border/70 shadow-sm space-y-6">

        {/* Story Journal Header */}
        <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-brand-light-alt rounded-3xl p-4 sm:p-5 border border-amber-200/80 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full shadow-2xs">
              🌿 {currentScenario.theme}
            </span>
            <span className="text-xs font-bold text-amber-800">
              Story {currentScenarioIndex + 1} of {scenarios.length}
            </span>
          </div>
          <p className="text-base sm:text-lg text-brand-dark font-bold leading-relaxed">
            {currentScenario.storyDescription}
          </p>
        </div>

        {/* Chronological Steps Flow */}
        <div className="space-y-3">
          {currentScenario.sequenceSteps.map((step) => (
            <React.Fragment key={step.id}>
              <div className="bg-brand-light-alt/90 rounded-3xl p-4 sm:p-5 border-2 border-brand-border/80 flex items-center gap-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-white border border-brand-border/80 flex items-center justify-center text-3xl shadow-xs shrink-0 select-none">
                  {step.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wide">
                      Step {step.order}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-brand-dark leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-muted font-medium mt-0.5 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Gentle Connecting Flow Arrow */}
              <div className="flex justify-center text-brand-primary/60 py-0.5">
                <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Missing Step / Solved Step Card */}
          <div
            className={cn(
              "rounded-3xl p-5 border-3 transition-all flex items-center gap-4",
              isStepSolved
                ? "bg-gradient-to-r from-emerald-50 to-teal-50/80 border-emerald-400 shadow-md ring-4 ring-emerald-200/60"
                : "bg-amber-50/80 border-dashed border-amber-300 shadow-xs"
            )}
          >
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform shadow-xs",
                isStepSolved
                  ? "bg-white text-emerald-700 scale-105 border border-emerald-300"
                  : "bg-white text-amber-700 border border-amber-200"
              )}
            >
              {isStepSolved ? (
                currentScenario.options.find(o => o.isCorrect)?.symbol || '✨'
              ) : (
                <HelpCircle className="w-8 h-8 stroke-[2.5]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "text-xs font-black uppercase tracking-wider block",
                  isStepSolved ? "text-emerald-800" : "text-amber-900"
                )}
              >
                {isStepSolved ? 'Step 3: Next Step Completed! ✨' : 'Step 3: What Comes Next?'}
              </span>
              <p
                className={cn(
                  "text-base sm:text-lg font-black leading-snug mt-0.5",
                  isStepSolved ? "text-emerald-950" : "text-amber-950"
                )}
              >
                {isStepSolved
                  ? currentScenario.options.find(o => o.isCorrect)?.title
                  : currentScenario.missingStepPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* Big Meaningful Option Cards */}
        {!isStepSolved && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black text-brand-dark uppercase tracking-wider block px-1">
              Choose the natural next step in our ritual:
            </span>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {currentScenario.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "w-full text-left p-4 sm:p-5 rounded-3xl border-2 transition-all flex items-center gap-4 focus:outline-none focus:ring-4 focus:ring-brand-primary/40 active:scale-[0.99] cursor-pointer",
                      isSelected && option.isCorrect
                        ? "bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-200"
                        : isSelected && !option.isCorrect
                          ? "bg-amber-50 border-amber-300 shadow-sm"
                          : "bg-white border-brand-border hover:bg-brand-light-alt hover:border-brand-primary/50 shadow-xs"
                    )}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-light-alt border border-brand-border/80 flex items-center justify-center text-3xl shrink-0 shadow-2xs select-none">
                      {option.symbol}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-brand-dark leading-tight">
                        {option.title}
                      </p>
                      <p className="text-xs sm:text-sm text-brand-muted font-medium mt-0.5 leading-relaxed">
                        {option.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Continue Button once solved */}
        {isStepSolved && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button
              size="lg"
              onClick={handleNextScenario}
              className="w-full h-16 rounded-full text-xl font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6" />
              <span>
                {currentScenarioIndex + 1 < scenarios.length
                  ? 'Continue to Next Ritual'
                  : 'Complete Routine Activity'}
              </span>
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </Button>
          </div>
        )}
      </div>
    </ActivityLayout>
  );
}

