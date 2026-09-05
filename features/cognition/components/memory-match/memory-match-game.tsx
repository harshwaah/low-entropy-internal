'use client';

import React, { useState, useCallback } from 'react';
import { cognitiveService } from '../../services';
import { MemoryCardItem, MemoryMatchDifficulty } from '../../types';
import { ActivityLayout } from '../shared/activity-layout';
import { ActivityCompletionCard } from '../shared/activity-completion-card';
import { ActivityProgressCard } from '../shared/activity-progress-card';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Check, RotateCcw } from 'lucide-react';
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
    // Ignore click if checking pair, already flipped, or matched
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
        }, 600);
      } else {
        // NO MATCH - Gentle pause, no penalty
        setTimeout(() => {
          setCompanionFeedback(
            `No hurry at all! Let's remember where they are and try another card.`
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1300);
      }
    }
  };

  // 1. Initial Start State View
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
            speechText={<>Hello Meera!<br/>Ready for a peaceful matching game? 🫖✨</>}
            className="mb-2"
          />

          <div className="max-w-md mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Familiar Pairs to Discover
            </h2>
            <p className="text-base sm:text-lg text-brand-muted font-medium leading-relaxed">
              We will turn over gentle cards to match pairs of hot chai, fresh marigolds, sweet mangoes, and cozy lamps. Take all the time you like.
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-brand-light-alt rounded-2xl p-4 max-w-sm mx-auto border border-brand-border space-y-3">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
              Choose your comfortable pace:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDifficulty('gentle')}
                className={cn(
                  "p-3 rounded-xl font-bold text-sm transition-all border-2",
                  difficulty === 'gentle'
                    ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                    : "bg-white text-brand-dark border-brand-border hover:bg-brand-light"
                )}
              >
                🌸 Gentle
                <span className="block text-xs font-medium opacity-80 mt-0.5">3 Pairs (6 Cards)</span>
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('standard')}
                className={cn(
                  "p-3 rounded-xl font-bold text-sm transition-all border-2",
                  difficulty === 'standard'
                    ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                    : "bg-white text-brand-dark border-brand-border hover:bg-brand-light"
                )}
              >
                🌿 Relaxing
                <span className="block text-xs font-medium opacity-80 mt-0.5">4 Pairs (8 Cards)</span>
              </button>
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleStartGame}
              className="w-full sm:w-auto min-w-[240px] h-16 rounded-full text-xl font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="mr-2.5 w-6 h-6" />
              Begin Activity
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
          companionSpeech={<>Marvelous work, Meera!<br/>Your mind was so bright today! 🌟</>}
          statBadgeText={`${totalPairs} Pairs Discovered`}
          onReplay={() => resetGame(difficulty)}
          replayLabel="Play Another Round"
          nextActivityHref="/patient/activities"
          nextActivityLabel="Back to Activities"
        />
      </ActivityLayout>
    );
  }

  // 3. Play State View
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
          className="rounded-full border-brand-border bg-white text-brand-dark hover:bg-brand-light-alt font-bold h-11 px-4 text-sm flex items-center gap-1.5 shadow-sm"
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

      {/* Card Grid: Accessible, large cards, clear touch targets */}
      <div
        className={cn(
          "grid gap-4 sm:gap-5 justify-center mx-auto",
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
                "relative aspect-square w-full min-h-[120px] sm:min-h-[140px] rounded-3xl p-3 sm:p-4 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary/40 active:scale-95 flex flex-col items-center justify-center select-none shadow-sm",
                isMatched
                  ? "bg-emerald-50 border-2 border-emerald-400 shadow-md ring-2 ring-emerald-200"
                  : isFlipped
                  ? "bg-white border-2 border-brand-primary shadow-md scale-[1.02]"
                  : "bg-gradient-to-br from-brand-primary to-brand-dark border-2 border-brand-dark hover:brightness-105"
              )}
            >
              {isFlipped ? (
                // Front Face (Content revealed)
                <div className="flex flex-col items-center justify-center space-y-1.5 animate-in zoom-in-75 duration-200">
                  <span className="text-4xl sm:text-5xl drop-shadow-sm" role="img" aria-hidden="true">
                    {card.symbol}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-brand-dark leading-tight line-clamp-1">
                    {card.title}
                  </p>
                  {isMatched && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" /> Matched
                    </span>
                  )}
                </div>
              ) : (
                // Back Face (Pattern)
                <div className="flex flex-col items-center justify-center text-white/80 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Sparkles className="w-6 h-6 text-brand-accent-yellow" />
                  </div>
                  <span className="text-xs font-bold text-white/70 tracking-wider uppercase">
                    Tap
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Difficulty Switcher below during play */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <span className="text-xs font-bold text-brand-muted">Game Pace:</span>
        <button
          type="button"
          onClick={() => handleDifficultyChange('gentle')}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-bold transition-colors border",
            difficulty === 'gentle'
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-white text-brand-muted border-brand-border"
          )}
        >
          3 Pairs
        </button>
        <button
          type="button"
          onClick={() => handleDifficultyChange('standard')}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-bold transition-colors border",
            difficulty === 'standard'
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-white text-brand-muted border-brand-border"
          )}
        >
          4 Pairs
        </button>
      </div>
    </ActivityLayout>
  );
}
