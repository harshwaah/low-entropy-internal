'use client';

import React, { useState } from 'react';
import { cognitiveService } from '../../services';
import { RecognitionScene, SceneDiscoverableObject } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, Sparkles, ChevronRight, RotateCcw, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePatientTranslation } from '@/features/patient-i18n';

export function FindTheObjectGame() {
  const { t } = usePatientTranslation();
  const scenes = cognitiveService.getRecognitionScenes();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [foundObjectIds, setFoundObjectIds] = useState<string[]>([]);
  const [highlightedHintId, setHighlightedHintId] = useState<string | null>(null);
  const [companionFeedback, setCompanionFeedback] = useState<string>(
    'Take all the time you like. Tap any keepsake when you spot it in the room! 🔍'
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const currentScene: RecognitionScene = scenes[currentSceneIndex];
  const totalInScene = currentScene.objectsToFind.length;
  const foundInSceneCount = currentScene.objectsToFind.filter(o =>
    foundObjectIds.includes(o.id)
  ).length;

  const handleObjectTap = (obj: SceneDiscoverableObject) => {
    if (foundObjectIds.includes(obj.id)) {
      setCompanionFeedback(`You already spotted the ${obj.name}! What a wonderful eye. 🌸`);
      return;
    }

    const newFoundList = [...foundObjectIds, obj.id];
    setFoundObjectIds(newFoundList);
    setHighlightedHintId(null);

    const updatedSceneCount = currentScene.objectsToFind.filter(o =>
      newFoundList.includes(o.id)
    ).length;

    if (updatedSceneCount >= totalInScene) {
      setCompanionFeedback(`Hooray! You found every single treasure in ${currentScene.title}! 🎉`);
      if (currentSceneIndex + 1 >= scenes.length) {
        setIsCompleted(true);
      }
    } else {
      setCompanionFeedback(`Splendid! You spotted the ${obj.name}! ✨`);
    }
  };

  const handleRequestHint = () => {
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
      setCompanionFeedback('Welcome to a new cozy room! Let’s look around together. 🌿');
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetGame = () => {
    setCurrentSceneIndex(0);
    setFoundObjectIds([]);
    setHighlightedHintId(null);
    setIsCompleted(false);
    setCompanionFeedback('Take your time looking around. Tap any keepsake when you spot it! 🔍');
  };

  const isSceneFullyDiscovered = foundInSceneCount >= totalInScene;

  // Completion State
  if (isCompleted) {
    return (
      <ActivityLayout
        title={t('cognition.findTheObjectTitle')}
        subtitle={t('cognition.findTheObjectDesc')}
        categoryName={t('home.gentleActivities')}
      >
        <ActivityCompletionCard
          activityTitle={t('cognition.findTheObjectTitle')}
          celebrationTitle={t('cognition.wellDone')}
          celebrationMessage={t('cognition.keepGoing')}
          companionSpeech={<>{t('cognition.wellDone')}<br />{t('cognition.keepGoing')} 🌟</>}
          statBadgeText={t('cognition.activityCompleted')}
          onReplay={handleResetGame}
          replayLabel={t('quickPick.playAgain')}
          nextActivityHref="/patient/activities"
          nextActivityLabel={t('quickPick.backToActivities')}
        />
      </ActivityLayout>
    );
  }

  return (
    <ActivityLayout
      title={t('cognition.findTheObjectTitle')}
      subtitle={currentScene.title}
      categoryName={t('home.gentleActivities')}
      companionState={isSceneFullyDiscovered ? 'celebrating' : highlightedHintId ? 'thinking' : 'encouraging'}
      companionMessage={companionFeedback}
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={handleRequestHint}
          disabled={isSceneFullyDiscovered}
          className="rounded-full border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-300" />
          <span>{t('cognition.clue', { hint: '?' })}</span>
        </Button>
      }
    >
      {/* Progress Card */}
      <ActivityProgressCard
        currentStep={foundInSceneCount}
        totalSteps={totalInScene}
        label={t('cognition.foundCount', { found: foundInSceneCount, total: totalInScene })}
        stepName={`${foundInSceneCount} of ${totalInScene} found in ${currentScene.roomName}`}
        showHearts={true}
      />

      {/* Target Items Checklist: Clear visual cards with icons */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-border/70 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-brand-dark uppercase tracking-wider">
            {currentScene.roomName}:
          </span>
          <span className="text-xs font-bold text-brand-muted">
            {t('cognition.findTheObjectDesc')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {currentScene.objectsToFind.map(obj => {
            const isFound = foundObjectIds.includes(obj.id);
            const isHinted = highlightedHintId === obj.id;
            return (
              <div
                key={obj.id}
                className={cn(
                  "p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 select-none",
                  isFound
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs scale-[1.02]"
                    : isHinted
                      ? "bg-amber-100/90 border-amber-400 text-amber-950 font-bold animate-pulse shadow-sm ring-2 ring-amber-300"
                      : "bg-brand-light-alt border-brand-border/70 text-brand-dark"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-xs",
                  isFound ? "bg-emerald-200/70" : "bg-white"
                )}>
                  <span role="img" aria-hidden="true">
                    {obj.symbol}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-extrabold truncate leading-tight">
                    {obj.name}
                  </p>
                  <span className={cn(
                    "text-[10px] font-bold block mt-0.5",
                    isFound ? "text-emerald-700" : "text-brand-muted"
                  )}>
                    {isFound ? 'Found ✓' : 'Hidden'}
                  </span>
                </div>
                {isFound && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Illustrated Room Stage: Real Scene Composition with Depth, Layering & Shadows */}
      <div className="relative">
        <div className="relative w-full h-[400px] sm:h-[460px] rounded-[2.5rem] border-3 border-brand-border/80 shadow-md overflow-hidden select-none bg-stone-100">

          {/* Room Header Overlay Badge */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full border border-brand-border/80 shadow-sm flex items-center gap-2">
            <span className="text-sm font-extrabold text-brand-dark">
              🏡 {currentScene.roomName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-xs font-bold text-brand-muted">
              {currentScene.sceneTheme}
            </span>
          </div>

          {/* ========================================================================= */}
          {/* SCENE 1: KITCHEN COUNTER - Layered Architectural Artwork & Realistic Depth */}
          {/* ========================================================================= */}
          {currentScene.id === 'scene-kitchen' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Layer 1: Kitchen Wall & Cream Ceramic Tiles */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-50/90 via-amber-100/40 to-amber-200/50">
                {/* Tile Grid Lines */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #78350f 1px, transparent 1px), linear-gradient(to bottom, #78350f 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Layer 2: Sunlit Arched Kitchen Window on upper right */}
              <div className="absolute top-4 right-8 w-28 h-36 rounded-t-full bg-sky-100 border-4 border-amber-800/30 shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/70 via-sky-100 to-amber-100/40" />
                <div className="absolute top-2 right-2 text-2xl animate-pulse">☀️</div>
                <div className="absolute bottom-2 left-2 text-lg opacity-80">🌿</div>
                {/* Window panes */}
                <div className="absolute inset-x-0 top-1/2 h-1 bg-amber-800/20" />
                <div className="absolute inset-y-0 left-1/2 w-1 bg-amber-800/20" />
              </div>

              {/* Layer 3: Upper Wooden Spice Shelf on left */}
              <div className="absolute top-16 left-6 w-48 h-6 bg-gradient-to-r from-amber-800 to-amber-700 rounded-md shadow-md border-b-2 border-amber-950">
                <div className="absolute -top-7 left-3 text-2xl">🫙</div>
                <div className="absolute -top-7 left-12 text-2xl">🏺</div>
                <div className="absolute -top-7 left-24 text-2xl">🫚</div>
                <div className="absolute -top-6 left-36 text-xl">🌶️</div>
              </div>

              {/* Layer 4: Polished Warm Marble Kitchen Countertop (Midground) */}
              <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-stone-300 via-stone-200 to-stone-100 border-t-8 border-amber-800/40 shadow-inner">
                {/* Marble Counter edge highlight */}
                <div className="w-full h-3 bg-white/70 shadow-xs" />

                {/* Wooden Cabinet Drawers below */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-amber-800 to-amber-900 border-t-4 border-amber-950 px-8 flex justify-around items-center">
                  <div className="w-24 h-16 bg-amber-700/60 rounded-lg border-2 border-amber-900/60 flex items-center justify-center">
                    <div className="w-8 h-2 rounded-full bg-amber-400/80 shadow-xs" />
                  </div>
                  <div className="w-24 h-16 bg-amber-700/60 rounded-lg border-2 border-amber-900/60 flex items-center justify-center">
                    <div className="w-8 h-2 rounded-full bg-amber-400/80 shadow-xs" />
                  </div>
                  <div className="w-24 h-16 bg-amber-700/60 rounded-lg border-2 border-amber-900/60 flex items-center justify-center">
                    <div className="w-8 h-2 rounded-full bg-amber-400/80 shadow-xs" />
                  </div>
                </div>

                {/* Teak Cutting Board on the counter */}
                <div className="absolute top-6 left-16 w-36 h-20 bg-amber-600/70 rounded-2xl border-2 border-amber-800 shadow-md rotate-[-3deg]" />

                {/* Brass Serving Coaster & Sugar Dish */}
                <div className="absolute top-10 left-[45%] w-24 h-16 bg-amber-400/40 rounded-full border-2 border-amber-500/60 shadow-sm" />
                <div className="absolute top-8 right-16 w-20 h-16 bg-white/90 rounded-2xl border border-stone-300 shadow-sm flex items-center justify-center">
                  <span className="text-xl">🍚</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 2: SUNNY VERANDA & GARDEN - Layered Courtyard & Flowering Plants */}
          {/* ========================================================================= */}
          {currentScene.id === 'scene-veranda' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Layer 1: Sky & Garden Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-emerald-50/60 to-emerald-100/50">
                {/* Sun Glow */}
                <div className="absolute top-4 right-16 w-24 h-24 rounded-full bg-amber-200/60 blur-xl animate-pulse" />
              </div>

              {/* Layer 2: Overhead Flowering Tree Branch with Leaves & Bougainvillea */}
              <div className="absolute top-0 left-0 w-64 h-32 bg-emerald-700/10 rounded-br-[4rem] border-b-4 border-amber-900/40">
                <div className="absolute top-2 left-6 text-3xl">🌿</div>
                <div className="absolute top-4 left-20 text-3xl">🌸</div>
                <div className="absolute top-8 left-36 text-2xl">🌺</div>
                <div className="absolute top-3 left-48 text-3xl">🍃</div>
              </div>

              {/* Layer 3: Veranda Railing & Carved Teak Pillars (Midground) */}
              <div className="absolute top-28 inset-x-0 h-16 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border-y-4 border-amber-950 flex items-center justify-around opacity-80">
                <div className="w-3 h-full bg-amber-950" />
                <div className="w-3 h-full bg-amber-950" />
                <div className="w-3 h-full bg-amber-950" />
                <div className="w-3 h-full bg-amber-950" />
                <div className="w-3 h-full bg-amber-950" />
              </div>

              {/* Layer 4: Sandstone Courtyard Patio Floor (Foreground) */}
              <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-stone-200 via-amber-50 to-stone-100 border-t-8 border-amber-800/30">
                {/* Terracotta Tulsi planter on left */}
                <div className="absolute bottom-8 left-8 w-24 h-28 bg-amber-700 rounded-b-2xl rounded-t-lg border-4 border-amber-900 shadow-lg flex flex-col items-center justify-start p-1">
                  <span className="text-3xl -mt-6">🪴</span>
                  <span className="text-[10px] font-black text-amber-100 uppercase tracking-wide mt-2">Tulsi</span>
                </div>

                {/* Teak Garden Table in center */}
                <div className="absolute top-8 left-[42%] w-32 h-20 bg-amber-800/70 rounded-3xl border-2 border-amber-950 shadow-md flex items-center justify-center">
                  <div className="w-24 h-12 bg-amber-700/80 rounded-2xl border border-amber-900/60" />
                </div>

                {/* White Marble Altar Ledge on right */}
                <div className="absolute bottom-6 right-8 w-28 h-20 bg-stone-100 rounded-2xl border-4 border-amber-200/80 shadow-md flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-amber-800">Altar</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 3: NOSTALGIC READING NOOK - Deep Armchair, Bookshelf & Diya */}
          {/* ========================================================================= */}
          {currentScene.id === 'scene-living-room' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Layer 1: Warm Wall & Vintage Wallpaper Motif */}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-purple-50/40 to-stone-100">
                {/* Ambient Lamp Glow */}
                <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-amber-200/50 blur-2xl" />
              </div>

              {/* Layer 2: Wooden Bookshelf on upper left */}
              <div className="absolute top-14 left-6 w-48 h-32 bg-gradient-to-b from-amber-900 to-amber-950 rounded-2xl border-4 border-amber-950 shadow-md p-2">
                <div className="w-full h-full bg-amber-950/60 rounded-lg border-t-4 border-b-4 border-amber-800 flex flex-col justify-between p-1">
                  <div className="flex gap-1 items-end">
                    <div className="w-3 h-8 bg-rose-700 rounded-xs" />
                    <div className="w-3 h-10 bg-blue-700 rounded-xs" />
                    <div className="w-4 h-9 bg-emerald-700 rounded-xs" />
                    <div className="w-3 h-11 bg-amber-600 rounded-xs" />
                  </div>
                  <div className="w-full h-1 bg-amber-700" />
                  <div className="flex gap-1 items-end">
                    <div className="w-4 h-9 bg-purple-700 rounded-xs" />
                    <div className="w-3 h-7 bg-amber-700 rounded-xs" />
                    <div className="w-3 h-10 bg-teal-700 rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Layer 3: Gilded Ornate Picture Frame Hanging on wall in center */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-24 bg-amber-100 border-4 border-amber-600 rounded-xl shadow-md flex items-center justify-center">
                <div className="w-20 h-16 bg-white rounded-md border border-amber-300" />
              </div>

              {/* Layer 4: Living Room Floor & Persian/Kashmiri Rug (Foreground) */}
              <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-stone-300 via-stone-200 to-stone-100 border-t-8 border-stone-400/40">
                {/* Traditional Rug */}
                <div className="absolute inset-x-8 top-4 bottom-2 bg-rose-900/30 rounded-3xl border-4 border-dashed border-rose-800/40" />

                {/* Plush Velvet Armchair Base on left */}
                <div className="absolute bottom-8 left-16 w-36 h-32 bg-emerald-800 rounded-3xl border-4 border-emerald-950 shadow-xl flex items-center justify-center">
                  <div className="w-28 h-20 bg-emerald-700 rounded-2xl border border-emerald-600 shadow-inner" />
                </div>

                {/* Carved Teak Coffee Table on right */}
                <div className="absolute bottom-6 right-12 w-36 h-24 bg-amber-800 rounded-3xl border-4 border-amber-950 shadow-lg flex items-center justify-center">
                  {/* Brass Diya Tray on table */}
                  <div className="w-24 h-16 bg-amber-400/60 rounded-full border-2 border-amber-500 shadow-inner flex items-center justify-center">
                    <div className="w-12 h-8 rounded-full bg-amber-300/60 blur-xs animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* INTERACTIVE DISCOVERABLE OBJECTS: Naturally Placed with Layering & Depth */}
          {/* ========================================================================= */}
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
                aria-label={`Spot ${obj.name}`}
                className={cn(
                  "absolute z-30 transition-all duration-300 rounded-3xl focus:outline-none focus:ring-4 focus:ring-brand-primary/50 active:scale-95 flex flex-col items-center justify-center p-2.5 sm:p-3 cursor-pointer",
                  isFound
                    ? "bg-white/95 border-2 border-emerald-400 shadow-lg ring-4 ring-emerald-200/80 scale-105"
                    : isHinted
                      ? "bg-amber-100 border-3 border-amber-500 shadow-2xl ring-4 ring-amber-300 scale-125 animate-pulse"
                      : "bg-white/90 hover:bg-white hover:scale-115 border-2 border-brand-border/80 shadow-md"
                )}
              >
                {/* Object Realistic Soft Cast Shadow Base */}
                <div className="absolute -bottom-2 w-3/4 h-2 bg-black/20 rounded-full blur-[2px] pointer-events-none" />

                <span
                  className={cn(
                    "block transition-transform drop-shadow-sm select-none",
                    obj.sizeClass || 'text-4xl sm:text-5xl',
                    isFound && "brightness-105"
                  )}
                  role="img"
                  aria-hidden="true"
                >
                  {obj.symbol}
                </span>

                {isFound ? (
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full mt-1 shadow-xs flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Found
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold text-brand-dark bg-white/95 px-1.5 py-0.5 rounded-full mt-0.5 shadow-2xs border border-brand-border/60">
                    {obj.name}
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
                ? t('common.continue')
                : t('cognition.wellDone')}
            </span>
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </Button>
        </div>
      )}
    </ActivityLayout>
  );
}
