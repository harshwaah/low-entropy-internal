'use client';

import React, { useState, useCallback } from 'react';
import { cognitiveService } from '../../services';
import { MemoryCardItem, MemoryMatchDifficulty } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MemoryMatchGame() {
  const [difficulty, setDifficulty] = useState<MemoryMatchDifficulty>('gentle');
  const [cards, setCards] = useState<MemoryCardItem[]>(() =>
    cognitiveService.getMemoryMatchDeck('gentle')
  );
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [companionFeedback, setCompanionFeedback] = useState<string>(
    'Tap any card to turn it over. We are in no rush at all! 🌸'
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const totalPairs = difficulty === 'gentle' ? 3 : 4;

  // Initialize or reset game
  const resetGame = useCallback((selectedDiff: MemoryMatchDifficulty = difficulty) => {
    const deck = cognitiveService.getMemoryMatchDeck(selectedDiff);
    setCards(deck);
    setFlippedIndices([]);
    setIsChecking(false);
    setMatchedPairsCount(0);
    setIsCompleted(false);
    setCompanionFeedback('Tap any card to turn it over. We are in no rush at all! 🌸');
  }, [difficulty]);

  const handleStartGame = () => {
    setGameStarted(true);
    resetGame(difficulty);
  };

  const handleDifficultyChange = (newDiff: MemoryMatchDifficulty) => {
    setDifficulty(newDiff);
    resetGame(newDiff);
  };

  const handleCardClick = (index: number) => {
    if (isChecking || flippedIndices.includes(index) || cards[index].isMatched) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If first card flipped
    if (newFlipped.length === 1) {
      setCompanionFeedback(`You turned over the ${cards[index].title}. Let's find its twin!`);
      return;
    }

    // If second card flipped, check for match
    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
          const newMatchedCount = matchedPairsCount + 1;
          setMatchedPairsCount(newMatchedCount);

          if (newMatchedCount >= totalPairs) {
            setIsCompleted(true);
            setCompanionFeedback(`Splendid, Meera! You remembered every single pair! 🎉`);
          } else {
            setCompanionFeedback(
              `Wonderful match! You found both ${firstCard.title}s! 🌼`
            );
          }
        }, 500);
      } else {
        // NO MATCH - Gentle pause, zero penalty
        setTimeout(() => {
          setCompanionFeedback(
            `No hurry at all! Let's remember where they are and try another card.`
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1100);
      }
    }
  };

  // 1. Initial Visual Start State View (Clean, scannable, visual preview)
  if (!gameStarted) {
    return (
      <ActivityLayout
        title="Memory Match"
        subtitle="Pairing comforting memories"
        categoryName="Memory & Matching"
      >
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-brand-light shadow-sm text-center space-y-6">
          <Mascot
            size="lg"
            state="greeting"
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={<>Hello Meera!<br />Let&apos;s match some sweet memories! 🫖✨</>}
            className="mb-1"
          />

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              Gentle Memory Match
            </h2>
            <p className="text-base sm:text-lg text-brand-muted font-medium leading-relaxed">
              Turn over the tiles to pair up familiar treasures.
            </p>
          </div>

          {/* Visual Sample Preview of Treasures */}
          <div className="bg-brand-light-alt/80 rounded-3xl p-4 border border-brand-border/80 max-w-sm mx-auto space-y-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-brand-primary block">
              Treasures To Match:
            </span>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded-2xl border border-brand-border/60 text-center shadow-2xs">
                <span className="text-2xl block">☕</span>
                <span className="text-[10px] font-bold text-brand-dark block mt-0.5">Hot Chai</span>
              </div>
              <div className="bg-white p-2 rounded-2xl border border-brand-border/60 text-center shadow-2xs">
                <span className="text-2xl block">🌼</span>
                <span className="text-[10px] font-bold text-brand-dark block mt-0.5">Marigold</span>
              </div>
              <div className="bg-white p-2 rounded-2xl border border-brand-border/60 text-center shadow-2xs">
                <span className="text-2xl block">🥭</span>
                <span className="text-[10px] font-bold text-brand-dark block mt-0.5">Mango</span>
              </div>
              <div className="bg-white p-2 rounded-2xl border border-brand-border/60 text-center shadow-2xs">
                <span className="text-2xl block">🦚</span>
                <span className="text-[10px] font-bold text-brand-dark block mt-0.5">Peacock</span>
              </div>
            </div>
          </div>

          {/* Difficulty Pace Selector */}
          <div className="bg-white rounded-2xl p-3.5 max-w-sm mx-auto border-2 border-brand-border/80 space-y-2">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
              Choose your comfortable pace:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDifficulty('gentle')}
                className={cn(
                  "p-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer active:scale-95",
                  difficulty === 'gentle'
                    ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                    : "bg-brand-light-alt text-brand-dark border-brand-border hover:bg-white"
                )}
              >
                🌸 Gentle
                <span className="block text-xs font-semibold opacity-90 mt-0.5">3 Pairs (6 Tiles)</span>
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('standard')}
                className={cn(
                  "p-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer active:scale-95",
                  difficulty === 'standard'
                    ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                    : "bg-brand-light-alt text-brand-dark border-brand-border hover:bg-white"
                )}
              >
                🌿 Relaxing
                <span className="block text-xs font-semibold opacity-90 mt-0.5">4 Pairs (8 Tiles)</span>
              </button>
            </div>
          </div>

          {/* Big Accessible Start Button */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleStartGame}
              className="w-full sm:w-auto min-w-[240px] h-16 rounded-full text-xl font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              <span>Start Matching</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </ActivityLayout>
    );
  }

  // 2. Completion State View
  if (isCompleted) {
    return (
      <ActivityLayout
        title="Memory Match"
        subtitle="Pairing comforting memories"
        categoryName="Memory & Matching"
      >
        <ActivityCompletionCard
          activityTitle="Memory Match"
          celebrationTitle="Splendid Job, Meera!"
          celebrationMessage={`You matched all ${totalPairs} pairs with calm focus and patience. Every memory is a sweet treasure.`}
          companionSpeech={<>Marvelous work, Meera!<br />Your mind was so bright today! 🌟</>}
          statBadgeText={`${totalPairs} Pairs Discovered`}
          onReplay={() => resetGame(difficulty)}
          replayLabel="Play Another Round"
          nextActivityHref="/patient/activities"
          nextActivityLabel="Back to Activities"
        />
      </ActivityLayout>
    );
  }

  // 3. Play State View (High-quality Board & Tactile Wooden Keepsake Cards)
  return (
    <ActivityLayout
      title="Memory Match"
      subtitle="Find matching pairs of familiar treasures"
      categoryName="Memory & Matching"
      companionState={isChecking ? "thinking" : matchedPairsCount > 0 ? "celebrating" : "encouraging"}
      companionMessage={companionFeedback}
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={() => resetGame(difficulty)}
          className="rounded-full border-brand-border bg-white text-brand-dark hover:bg-brand-light-alt font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-brand-primary" />
          <span>Shuffle</span>
        </Button>
      }
    >
      {/* Progress Indicator */}
      <ActivityProgressCard
        currentStep={matchedPairsCount}
        totalSteps={totalPairs}
        label="Gentle Pairs Found"
        stepName={`${matchedPairsCount} of ${totalPairs} pairs matched`}
        showHearts={true}
      />

      {/* Board Presentation Container */}
      <div className="bg-stone-50/80 p-4 sm:p-6 rounded-[2.5rem] border-2 border-brand-border/80 shadow-inner">
        {/* Card Grid: Accessible, large tactile cards with rich front and back */}
        <div
          className={cn(
            "grid gap-3.5 sm:gap-5 justify-center mx-auto",
            totalPairs === 3
              ? "grid-cols-2 sm:grid-cols-3 max-w-lg"
              : "grid-cols-2 sm:grid-cols-4 max-w-xl"
          )}
        >
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || card.isMatched;
            const isMatched = card.isMatched;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(idx)}
                disabled={isMatched || isChecking}
                aria-label={
                  isFlipped
                    ? `${card.title}, ${isMatched ? 'already matched' : 'face up'}`
                    : `Hidden card ${idx + 1}`
                }
                className={cn(
                  "relative aspect-square w-full min-h-[120px] sm:min-h-[145px] rounded-3xl p-3 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary/40 active:scale-95 flex flex-col items-center justify-center select-none shadow-sm cursor-pointer",
                  isMatched
                    ? "bg-gradient-to-b from-emerald-50 to-emerald-100/90 border-3 border-emerald-400 shadow-md ring-4 ring-emerald-200/70"
                    : isFlipped
                      ? "bg-white border-3 border-brand-primary shadow-lg scale-[1.03]"
                      : "bg-gradient-to-br from-brand-primary via-[#366854] to-brand-dark border-3 border-brand-dark/90 hover:brightness-105 shadow-md"
                )}
              >
                {isFlipped ? (
                  // Front Face (Revealed Artwork)
                  <div className="flex flex-col items-center justify-center space-y-1 animate-in zoom-in-75 duration-200">
                    <span className="text-4xl sm:text-5xl drop-shadow-sm select-none" role="img" aria-hidden="true">
                      {card.symbol}
                    </span>
                    <p className="text-xs sm:text-sm font-black text-brand-dark leading-tight line-clamp-1">
                      {card.title}
                    </p>
                    {isMatched ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" /> Matched
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-brand-muted">
                        Finding Twin...
                      </span>
                    )}
                  </div>
                ) : (
                  // Back Face (Embossed Keepsake Motif)
                  <div className="flex flex-col items-center justify-center text-white space-y-1.5 pointer-events-none">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/30 shadow-inner">
                      <span className="text-xl">🪷</span>
                    </div>
                    <span className="text-[11px] font-black text-white/90 tracking-widest uppercase">
                      Tap
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Pace Switcher below during active play */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <span className="text-xs font-bold text-brand-muted">Active Mode:</span>
        <button
          type="button"
          onClick={() => handleDifficultyChange('gentle')}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors border-2 cursor-pointer",
            difficulty === 'gentle'
              ? "bg-brand-primary text-white border-brand-primary shadow-xs"
              : "bg-white text-brand-dark border-brand-border hover:bg-brand-light-alt"
          )}
        >
          3 Pairs (6 Cards)
        </button>
        <button
          type="button"
          onClick={() => handleDifficultyChange('standard')}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors border-2 cursor-pointer",
            difficulty === 'standard'
              ? "bg-brand-primary text-white border-brand-primary shadow-xs"
              : "bg-white text-brand-dark border-brand-border hover:bg-brand-light-alt"
          )}
        >
          4 Pairs (8 Cards)
        </button>
      </div>
    </ActivityLayout>
  );
}

