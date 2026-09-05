'use client';

import React, { useState } from 'react';
import { cognitiveService } from '../../services';
import { RecognitionScene, SceneDiscoverableObject } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FindTheObjectGame() {
  const scenes = cognitiveService.getRecognitionScenes();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [foundObjectIds, setFoundObjectIds] = useState<string[]>([]);
  const [highlightedHintId, setHighlightedHintId] = useState<string | null>(null);
  const [companionFeedback, setCompanionFeedback] = useState<string>(
    'Take your time looking around. Tap any item when you spot it! 🔍'
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const currentScene: RecognitionScene = scenes[currentSceneIndex];
  const totalInScene = currentScene.objectsToFind.length;
  const foundInSceneCount = currentScene.objectsToFind.filter(o =>
    foundObjectIds.includes(o.id)
  ).length;

  const handleObjectTap = (obj: SceneDiscoverableObject) => {
    if (foundObjectIds.includes(obj.id)) {
      setCompanionFeedback(`You already found the ${obj.name}! What a wonderful eye. 🌸`);
      return;
    }

    const newFoundList = [...foundObjectIds, obj.id];
    setFoundObjectIds(newFoundList);
    setHighlightedHintId(null);

    const updatedSceneCount = currentScene.objectsToFind.filter(o =>
      newFoundList.includes(o.id)
    ).length;

    if (updatedSceneCount >= totalInScene) {
      setCompanionFeedback(`Hooray! You discovered every single treasure in ${currentScene.title}! 🎉`);
      if (currentSceneIndex + 1 >= scenes.length) {
        setIsCompleted(true);
      }
    } else {
      setCompanionFeedback(`Splendid! You spotted the ${obj.name}! ✨`);
    }
  };

  const handleRequestHint = () => {
    // Find first item in current scene that has not been found yet
    const unfound = currentScene.objectsToFind.find(o => !foundObjectIds.includes(o.id));
    if (unfound) {
      setHighlightedHintId(unfound.id);
      setCompanionFeedback(
        `Companion Hint: ${unfound.locationHint} (${unfound.name} ${unfound.symbol})`
      );
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex + 1 < scenes.length) {
      setCurrentSceneIndex(prev => prev + 1);
      setHighlightedHintId(null);
      setCompanionFeedback('Welcome to a new cozy corner! Let’s explore together. 🌿');
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetGame = () => {
    setCurrentSceneIndex(0);
    setFoundObjectIds([]);
    setHighlightedHintId(null);
    setIsCompleted(false);
    setCompanionFeedback('Take your time looking around. Tap any item when you spot it! 🔍');
  };

  const isSceneFullyDiscovered = foundInSceneCount >= totalInScene;

  // Completion State
  if (isCompleted) {
    return (
      <ActivityLayout
        title="Find The Object"
        subtitle="Spot comforting treasures in cozy rooms"
        categoryName="Mindful Observation"
      >
        <ActivityCompletionCard
          activityTitle="Find The Object"
          celebrationTitle="Observant & Sharp, Meera!"
          celebrationMessage="You discovered every comforting keepsake across the kitchen, veranda, and living room. Your attention to gentle beauty is heartwarming."
          companionSpeech={<>You found every sweet keepsake!<br/>You have such a sharp, caring eye! 🌟</>}
          statBadgeText="All 3 Cozy Rooms Explored"
          onReplay={handleResetGame}
          replayLabel="Play Another Round"
          nextActivityHref="/patient/activities"
          nextActivityLabel="Back to Activities"
        />
      </ActivityLayout>
    );
  }

  return (
    <ActivityLayout
      title="Find The Object"
      subtitle={currentScene.title}
      categoryName="Mindful Observation"
      companionState={isSceneFullyDiscovered ? 'celebrating' : highlightedHintId ? 'thinking' : 'encouraging'}
      companionMessage={companionFeedback}
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={handleRequestHint}
          disabled={isSceneFullyDiscovered}
          className="rounded-full border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm"
        >
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-300" />
          <span>Need a Hint?</span>
        </Button>
      }
    >
      {/* Progress Card */}
      <ActivityProgressCard
        currentStep={foundInSceneCount}
        totalSteps={totalInScene}
        label="Treasures Discovered"
        stepName={`${foundInSceneCount} of ${totalInScene} found in ${currentScene.roomName}`}
        showHearts={true}
      />

      {/* Target Items Checklist (Large, readable) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-xs space-y-2">
        <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
          Treasures to find in this room:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {currentScene.objectsToFind.map(obj => {
            const isFound = foundObjectIds.includes(obj.id);
            const isHinted = highlightedHintId === obj.id;
            return (
              <div
                key={obj.id}
                className={cn(
                  "p-3 rounded-xl border transition-all flex items-center gap-2.5 select-none",
                  isFound
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs"
                    : isHinted
                    ? "bg-amber-100/80 border-amber-400 text-amber-950 font-bold animate-pulse shadow-sm"
                    : "bg-brand-light-alt border-brand-border/80 text-brand-dark"
                )}
              >
                <span className="text-2xl shrink-0" role="img" aria-hidden="true">
                  {obj.symbol}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold truncate leading-tight">
                    {obj.name}
                  </p>
                  <span className="text-[10px] text-brand-muted font-medium">
                    {isFound ? 'Found ✓' : 'Hidden'}
                  </span>
                </div>
                {isFound && (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Illustrated Room Stage */}
      <div className="relative">
        <div
          className={cn(
            "relative w-full h-[360px] sm:h-[420px] rounded-3xl border-2 shadow-inner overflow-hidden select-none bg-gradient-to-b",
            currentScene.sceneBgClass,
            currentScene.sceneAccentClass
          )}
        >
          {/* Room Header Overlay */}
          <div className="absolute top-3 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-brand-border shadow-xs">
            <span className="text-xs font-bold text-brand-dark">
              🏡 {currentScene.roomName}
            </span>
          </div>

          {/* Decorative Elements (Contextual ambiance) */}
          {currentScene.decorativeElements.map(dec => (
            <div
              key={dec.id}
              style={{
                left: `${dec.xPercent}%`,
                top: `${dec.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-none opacity-60 text-center select-none"
            >
              <span className={cn("block drop-shadow-xs", dec.sizeClass)}>
                {dec.symbol}
              </span>
              {dec.label && (
                <span className="text-[10px] text-brand-muted font-semibold block">
                  {dec.label}
                </span>
              )}
            </div>
          ))}

          {/* Discoverable Target Objects */}
          {currentScene.objectsToFind.map(obj => {
            const isFound = foundObjectIds.includes(obj.id);
            const isHinted = highlightedHintId === obj.id;

            return (
              <button
                key={obj.id}
                type="button"
                onClick={() => handleObjectTap(obj)}
                style={{
                  left: `${obj.xPercent}%`,
                  top: `${obj.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`Find ${obj.name}`}
                className={cn(
                  "absolute z-20 transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-primary/40 active:scale-90 flex flex-col items-center justify-center p-2.5 sm:p-3",
                  isFound
                    ? "bg-emerald-100/90 border-2 border-emerald-400 shadow-md ring-2 ring-emerald-300"
                    : isHinted
                    ? "bg-amber-200 border-2 border-amber-500 shadow-lg ring-4 ring-amber-300 scale-125 animate-bounce"
                    : "bg-white/80 hover:bg-white hover:scale-110 border border-brand-border/60 shadow-xs cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "block transition-transform",
                    obj.sizeClass || 'text-4xl sm:text-5xl',
                    isFound && "brightness-105"
                  )}
                  role="img"
                  aria-hidden="true"
                >
                  {obj.symbol}
                </span>

                {isFound && (
                  <span className="text-[10px] font-black text-emerald-800 bg-white/90 px-1.5 py-0.5 rounded-full mt-0.5 shadow-xs flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> Found
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* When Scene is fully cleared: Button to advance to next room */}
      {isSceneFullyDiscovered && (
        <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Button
            size="lg"
            onClick={handleNextScene}
            className="w-full h-16 rounded-full text-xl font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            <span>
              {currentSceneIndex + 1 < scenes.length
                ? `Explore Next Room (${scenes[currentSceneIndex + 1].roomName})`
                : 'Complete Activity'}
            </span>
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </Button>
        </div>
      )}
    </ActivityLayout>
  );
}
