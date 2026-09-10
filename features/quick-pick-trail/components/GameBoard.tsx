'use client';

import React, { useRef } from 'react';
import {
  ApplePosition,
  Direction,
  GameCharacter,
  GameQuestion,
  SnakeSegment,
} from '../types';
import { Pause, Play, Heart, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameBoardProps {
  question: GameQuestion | null;
  apples: ApplePosition[];
  snakeBody: SnakeSegment[];
  snakeDirection: Direction;
  score: number;
  lives: number;
  isPaused: boolean;
  activeCharacter: GameCharacter;
  onSetDirection: (dir: Direction) => void;
  onSelectApple: (apple: ApplePosition) => void;
  onTogglePause: () => void;
}

export function GameBoard({
  question,
  apples,
  snakeBody,
  snakeDirection,
  score,
  lives,
  isPaused,
  activeCharacter,
  onSetDirection,
  onSelectApple,
  onTogglePause,
}: GameBoardProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Handle Touch Swipe Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20) onSetDirection('RIGHT');
      else if (dx < -20) onSetDirection('LEFT');
    } else {
      if (dy > 20) onSetDirection('DOWN');
      else if (dy < -20) onSetDirection('UP');
    }
  };

  const mode = question?.mode || 'math';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="p-4 sm:p-5 space-y-3 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between select-none animate-in fade-in duration-300 relative overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-white border border-[#DCE5E0] rounded-2xl px-4 py-2 shadow-2xs z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePause}
          className="w-10 h-10 rounded-full text-[#2C5545] hover:bg-[#F3F8F5]"
          aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
        >
          {isPaused ? <Play className="w-5 h-5 fill-[#2C5545]" /> : <Pause className="w-5 h-5" />}
        </Button>

        {/* Score Display */}
        <div className="flex items-center gap-2">
          <span className="text-[#5C7065] text-xs sm:text-sm font-bold uppercase">Score:</span>
          <span className="text-2xl font-black text-[#2C5545]">{score}</span>
        </div>

        {/* Hearts Lives (❤️ ❤️ ❤️) */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((hIndex) => (
            <Heart
              key={hIndex}
              className={`w-6 h-6 transition-all ${
                hIndex <= lives
                  ? 'fill-red-500 text-red-500 scale-100'
                  : 'fill-stone-200 text-stone-300 scale-90 opacity-40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* QUESTION WOODEN BOARD CARD */}
      <div className="mx-auto w-full max-w-sm z-20">
        <div className="bg-[#FAF3EB] border-4 border-[#E8D7C3] rounded-3xl p-4 text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D9C4AC]" />
          <span className="text-xs font-black uppercase tracking-wider text-[#8D4935] block mb-1">
            Question
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2C5545] tracking-tight">
            {question ? question.question : 'Ready?'}
          </h2>
        </div>
      </div>

      {/* GAME CANVAS FIELD (Nature landscape with real snake & answer objects) */}
      <div className="relative flex-1 w-full min-h-[340px] bg-gradient-to-b from-[#E8F3EB] via-[#F3F8F5] to-[#E2EFE6] border-2 border-[#4A8B71]/40 rounded-3xl shadow-inner overflow-hidden my-2">
        
        {/* Soft background nature hills */}
        <svg className="absolute bottom-0 left-0 right-0 w-full text-[#4A8B71]/15" viewBox="0 0 200 60" fill="currentColor">
          <path d="M0,40 Q50,10 100,35 Q150,60 200,30 L200,60 L0,60 Z" />
          <path d="M0,45 Q70,20 140,40 Q180,50 200,42 L200,60 L0,60 Z" className="text-[#4A8B71]/25" />
        </svg>

        {/* Corner Nature Decorations */}
        <div className="absolute top-3 left-3 text-xl opacity-40">🌿</div>
        <div className="absolute top-3 right-3 text-xl opacity-40">🌸</div>
        <div className="absolute bottom-4 left-4 text-xl opacity-40">🌱</div>

        {/* PAUSE OVERLAY */}
        {isPaused && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-xs z-30 flex flex-col items-center justify-center space-y-4">
            <h3 className="text-3xl font-extrabold text-[#2C5545]">Game Paused</h3>
            <Button
              size="lg"
              onClick={onTogglePause}
              className="h-14 px-8 rounded-full bg-[#2C5545] text-white font-bold text-lg"
            >
              Resume Play
            </Button>
          </div>
        )}

        {/* ANSWER OBJECTS (Apples for Math Mode, Pure Visual Illustrations for Objects/Colors Mode - NO TEXT LABELS!) */}
        {apples.map((apple) => {
          if (apple.isFaded) return null;

          return (
            <button
              key={apple.id}
              onClick={() => onSelectApple(apple)}
              style={{
                left: `${apple.xPercent}%`,
                top: `${apple.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 group flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              {mode === 'math' ? (
                /* REAL APPLE SHAPE FOR MATH MODE (Stem, Green Leaf, Indented Top, Apple Body 🍎) */
                <div className="relative flex flex-col items-center">
                  {/* Stem & Leaf */}
                  <div className="relative w-4 h-3 flex justify-center -mb-1">
                    <div className="w-1 h-3 bg-[#6B4226] rounded-t-sm" />
                    <div className="absolute top-0 right-0 w-3 h-2 bg-emerald-500 rounded-tl-full rounded-br-full border border-white" />
                  </div>
                  {/* Apple Body with Indented Top */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-[42%] border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden animate-bounce duration-1000">
                    <div className="absolute top-0 w-8 h-2 bg-red-600/30 rounded-b-full" />
                    <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-xs">
                      {apple.value}
                    </span>
                  </div>
                </div>
              ) : (
                /* PURE VISUAL RECOGNITION OBJECT FOR COLORS/OBJECTS/PATTERNS (NO TEXT LABELS PRINTED!) */
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 border-4 border-[#4A8B71] rounded-3xl shadow-md flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform animate-bounce duration-1000">
                  {apple.value}
                </div>
              )}
            </button>
          );
        })}

        {/* ONE CONTINUOUS CONNECTED SNAKE SHAPE */}
        {snakeBody.length > 1 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            {/* Continuous Smooth Green Body Tube */}
            <path
              d={snakeBody.reduce((acc, seg, idx) => {
                return `${acc} ${idx === 0 ? 'M' : 'L'} ${seg.xPercent} ${seg.yPercent}`;
              }, '')}
              stroke={activeCharacter.skinColor || '#52A37F'}
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}

        {/* SNAKE HEAD WITH SMALL SIMPLE EYE (NO EMOJIS, NO SEPARATE CIRCLES ON BODY!) */}
        {snakeBody.length > 0 && (() => {
          const head = snakeBody[0];

          // Calculate eye position offset based on movement direction
          const getEyeOffset = (dir: Direction) => {
            switch (dir) {
              case 'RIGHT':
                return 'translate-x-1.5 -translate-y-1';
              case 'LEFT':
                return '-translate-x-1.5 -translate-y-1';
              case 'UP':
                return 'translate-x-1 -translate-y-1.5';
              case 'DOWN':
                return 'translate-x-1 translate-y-1.5';
              default:
                return 'translate-x-1 -translate-y-1';
            }
          };

          return (
            <div
              style={{
                left: `${head.xPercent}%`,
                top: `${head.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 pointer-events-none flex items-center justify-center"
            >
              {/* Slightly rounded head cap overlay matching body color */}
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative shadow-xs"
                style={{ backgroundColor: activeCharacter.skinColor || '#52A37F' }}
              >
                {/* Small Simple Eye (White circle + dark pupil) */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center shadow-2xs transition-transform duration-100 ${getEyeOffset(
                    snakeDirection
                  )}`}
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B3A2D] rounded-full" />
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      {/* CONTINUOUS DIRECTIONAL CONTROLS (UP, DOWN, LEFT, RIGHT) */}
      <div className="flex flex-col items-center justify-center space-y-1 pt-1 z-20">
        <button
          onClick={() => onSetDirection('UP')}
          className={`w-14 h-12 border-2 rounded-2xl flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer ${
            snakeDirection === 'UP' ? 'bg-[#2C5545] border-[#2C5545] text-white' : 'bg-white border-[#DCE5E0] text-[#2C5545]'
          }`}
          aria-label="Move Up"
        >
          <ChevronUp className="w-8 h-8" />
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onSetDirection('LEFT')}
            className={`w-14 h-12 border-2 rounded-2xl flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer ${
              snakeDirection === 'LEFT' ? 'bg-[#2C5545] border-[#2C5545] text-white' : 'bg-white border-[#DCE5E0] text-[#2C5545]'
            }`}
            aria-label="Move Left"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <span className="text-xs font-bold text-[#5C7065]">Swipe or Keys</span>

          <button
            onClick={() => onSetDirection('RIGHT')}
            className={`w-14 h-12 border-2 rounded-2xl flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer ${
              snakeDirection === 'RIGHT' ? 'bg-[#2C5545] border-[#2C5545] text-white' : 'bg-white border-[#DCE5E0] text-[#2C5545]'
            }`}
            aria-label="Move Right"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        <button
          onClick={() => onSetDirection('DOWN')}
          className={`w-14 h-12 border-2 rounded-2xl flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer ${
            snakeDirection === 'DOWN' ? 'bg-[#2C5545] border-[#2C5545] text-white' : 'bg-white border-[#DCE5E0] text-[#2C5545]'
          }`}
          aria-label="Move Down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

    </div>
  );
}

