'use client';

import React, { useState } from 'react';
import { cognitiveService } from '../../services';
import { RoutineScenario, RoutineSequenceOption } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, HelpCircle, ArrowDown, RotateCcw } from 'lucide-react';
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
          celebrationTitle="Delightful Work, Meera!"
          celebrationMessage="You guided every daily ritual with natural ease and clarity. Morning chai, sunny gardens, and peaceful nights."
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
        `Let’s look at our ritual together. What is the comforting next step?`
      }
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetGame}
          className="rounded-full border-brand-border bg-white text-brand-dark hover:bg-brand-light-alt font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-brand-primary" />
          <span>Start Over</span>
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

      {/* Routine Timeline Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-brand-border/70 shadow-sm space-y-6">
        {/* Story Intro */}
        <div className="border-b border-brand-border/50 pb-4">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            {currentScenario.theme}
          </span>
          <p className="text-base sm:text-lg text-brand-muted font-medium mt-2">
            {currentScenario.storyDescription}
          </p>
        </div>

        {/* Chronological Steps Timeline */}
        <div className="space-y-3">
          {currentScenario.sequenceSteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="bg-brand-light-alt rounded-2xl p-4 sm:p-5 border border-brand-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-3xl shadow-xs shrink-0">
                  {step.symbol}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-primary uppercase">
                      Step {step.order}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-brand-dark">
                    {step.title}
                  </h4>
                  <p className="text-sm text-brand-muted font-medium">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Gentle Arrow Connector */}
              <div className="flex justify-center text-brand-muted/60 py-0.5">
                <ArrowDown className="w-5 h-5 stroke-[2.5]" />
              </div>
            </React.Fragment>
          ))}

          {/* Missing Step Placeholder Question Box */}
          <div
            className={cn(
              "rounded-2xl p-4 sm:p-5 border-2 transition-all flex items-center gap-4",
              isStepSolved
                ? "bg-emerald-50 border-emerald-300 shadow-sm"
                : "bg-amber-50/70 border-dashed border-amber-300 shadow-inner"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform",
                isStepSolved
                  ? "bg-emerald-100 text-emerald-700 scale-110"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              {isStepSolved ? '✨' : <HelpCircle className="w-7 h-7" />}
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  "text-xs font-black uppercase tracking-wider",
                  isStepSolved ? "text-emerald-700" : "text-amber-800"
                )}
              >
                {isStepSolved ? 'Next Step Discovered!' : 'Step 3: What Comes Next?'}
              </span>
              <p
                className={cn(
                  "text-base sm:text-lg font-bold leading-snug",
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

        {/* Options to Choose: Large buttons, clear iconography */}
        {!isStepSolved && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block px-1">
              Choose the natural next step:
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
                      "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 focus:outline-none focus:ring-4 focus:ring-brand-primary/30 active:scale-[0.99]",
                      isSelected && option.isCorrect
                        ? "bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-200"
                        : isSelected && !option.isCorrect
                        ? "bg-amber-50 border-amber-300 shadow-sm"
                        : "bg-white border-brand-border hover:bg-brand-light-alt hover:border-brand-primary/40 shadow-xs"
                    )}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-light-alt border border-brand-border flex items-center justify-center text-3xl shrink-0 shadow-xs">
                      {option.symbol}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-bold text-brand-dark leading-tight">
                        {option.title}
                      </p>
                      <p className="text-sm text-brand-muted font-medium mt-0.5 leading-relaxed">
                        {option.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Continue to Next Ritual Button once solved */}
        {isStepSolved && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button
              size="lg"
              onClick={handleNextScenario}
              className="w-full h-16 rounded-full text-xl font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
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
