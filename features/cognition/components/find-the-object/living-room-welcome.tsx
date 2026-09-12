'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface LivingRoomWelcomeProps {
  onStart: () => void;
}

export function LivingRoomWelcome({ onStart }: LivingRoomWelcomeProps) {
  const [companionState, setCompanionState] = useState<'ready' | 'speaking'>('ready');

  const speakIntro = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Hello, friend! Shall we take a gentle stroll today?");
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    
    setCompanionState('speaking');

    utterance.onend = () => setCompanionState('ready');
    utterance.onerror = () => setCompanionState('ready');

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setCompanionState('ready');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        speakIntro();
      } catch (e) {
        // Auto-play might be blocked
      }
    }, 100);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStart = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCompanionState('ready');
    if ('vibrate' in navigator) {
      try { navigator.vibrate(30); } catch (e) {}
    }
    onStart();
  };

  return (
    <div className="w-full max-w-[430px] min-h-[85vh] flex flex-col justify-between relative px-5 py-6 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F1EA] to-[#EFF5F0] rounded-[2.5rem] mx-auto shadow-sm border border-[#E8E0D5]">
      {/* Ambient organic warm backdrop circles */}
      <div aria-hidden="true" className="absolute -top-16 -left-16 w-64 h-64 bg-[#F8E7DF] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/3 -right-20 w-72 h-72 bg-[#DCEEE0] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-10 left-1/4 w-80 h-80 bg-[#FFF3E8] rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* TopBar */}
      <header className="relative z-10 flex items-center justify-between pt-2 pb-1">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8E0D5] shadow-xs">
          <span aria-hidden="true" className="w-6 h-6 rounded-full bg-[#E5F2E7] flex items-center justify-center text-[#5B8C65]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-[#25342B] font-sans">SmritiSaathi</span>
        </div>
      </header>

      {/* MainCompanionHero */}
      <section aria-labelledby="companion-greeting" className="relative z-10 flex flex-col items-center justify-center py-2">
        {/* Pillowy Speech Bubble */}
        <div 
          className={cn(
            "relative mb-3 max-w-[320px] bg-white rounded-2xl px-4 py-3 border border-[#E9E4DB] animate-gentleFloat",
            "shadow-[0_10px_25px_-4px_rgba(70,90,75,0.08),_0_3px_8px_rgba(70,90,75,0.04)]"
          )}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2.5">
              <div aria-hidden="true" className="flex items-center space-x-0.5 h-4 shrink-0">
                <span className={cn("w-1 bg-[#7CA982] rounded-full", companionState === 'speaking' ? "animate-audioWavePulse [animation-delay:0.1s]" : "h-1.5 opacity-60")} />
                <span className={cn("w-1 bg-[#5B8C65] rounded-full", companionState === 'speaking' ? "animate-audioWavePulse [animation-delay:0.35s]" : "h-1.5 opacity-60")} />
                <span className={cn("w-1 bg-[#7CA982] rounded-full", companionState === 'speaking' ? "animate-audioWavePulse [animation-delay:0.2s]" : "h-1.5 opacity-60")} />
              </div>
              <p className="text-base text-[#25342B] font-medium leading-snug" id="companion-greeting">
                “Hello, friend! Shall we take a gentle stroll today?”
              </p>
            </div>
            <button 
              aria-label="Replay greeting voice" 
              className={cn(
                "shrink-0 w-10 h-10 rounded-full bg-[#EBF4EC] hover:bg-[#DCEEE0] text-[#5B8C65] flex items-center justify-center transition duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#7CA982] cursor-pointer shadow-xs active:scale-95 touch-manipulation",
                companionState === 'speaking' && "ring-2 ring-[#7CA982]"
              )}
              onClick={(e) => {
                e.stopPropagation();
                speakIntro();
              }}
              type="button"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </button>
          </div>
          <div aria-hidden="true" className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[10px] border-t-white" />
        </div>

        {/* Companion Portrait Stage with Halo */}
        <div className="relative flex items-center justify-center my-1">
          {/* Soft glowing back-halo aura */}
          <div 
            aria-hidden="true" 
            className={cn(
              "absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#E1F1E5] via-[#FFF0E6] to-[#E2F3E7] filter blur-xl",
              companionState === 'speaking' ? "animate-[softPulseGlow_2.5s_ease-in-out_infinite] opacity-85" : "animate-softPulseGlow"
            )}
          />
          <div aria-hidden="true" className="absolute w-80 h-80 rounded-full border border-white/60 opacity-60 pointer-events-none" />
          
          <div className={cn(
            "relative z-10 w-80 h-80",
            companionState === 'speaking' ? "animate-speakingPulse" : "animate-gentleFloat"
          )}>
            <div className="w-full h-full flex items-center justify-center p-2 filter drop-shadow-lg">
              <img 
                alt="SmritiSaathi Original Sprout Companion" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1UYsjd-TlvK1e9aubadqZCm9W3hsY7VOFYw14sh8P62qYfepPTfe6VpNdlVdroNJtWLbspSIMDn4dbjFXuxJuPEN0K9cQC3Oj-6wNuZTCb5zjFJE00ftxyhPasqxjtHt2Gy5AWRQp1uq7uWDXHtl0HvjUkZ0YlE8JX-o_-Zob-Oh8G1VoqydXVM2GJcgWczFxp4dT5Cs9vObqpMMiY-MnA1ev96ZiIXYjzBgrHvdgdm0YnccMO0e5CzRoLt" 
              />
            </div>
          </div>
        </div>

        {/* Title and Subtitle Block */}
        <div className="text-center mt-2 px-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#25342B] font-sans">
            Memory Walk
          </h1>
          <p className="mt-1 text-lg text-[#52685B] font-medium">
            Let’s explore together
          </p>
          
          <div className="inline-flex items-center space-x-1.5 mt-3 px-3.5 py-1 rounded-full bg-[#EBF4EC] text-[#5B8C65] border border-[#D8EAD9]/80 text-xs font-medium">
            <svg className="w-3.5 h-3.5 text-[#5B8C65]" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
            </svg>
            <span>Simple &amp; relaxed • No timers • Take your time</span>
          </div>
        </div>
      </section>

      {/* InteractionAndCTA */}
      <section className="relative z-10 flex flex-col items-center space-y-3 pt-1 pb-2">
        <button 
          aria-label="Let's Begin the Memory Walk" 
          className="touch-manipulation w-full h-[68px] rounded-full bg-gradient-to-r from-[#5B8C65] via-[#6C9E74] to-[#7CA982] text-white font-semibold text-xl tracking-wide flex items-center justify-center space-x-3 shadow-[0_14px_34px_-8px_rgba(91,140,101,0.32),_0_4px_12px_rgba(91,140,101,0.12)] border-2 border-white/40 focus:outline-hidden focus:ring-4 focus:ring-[#7CA982]/50 transition-all duration-150 active:scale-95 cursor-pointer" 
          onClick={handleStart}
          type="button"
        >
          <span className="font-sans">Let’s Begin</span>
          <span aria-hidden="true" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-white stroke-[2.5]" />
          </span>
        </button>
        <p className="text-xs text-[#52685B]/80 font-medium tracking-wide text-center pt-1">
          A peaceful moment for your mind • SmritiSaathi
        </p>
      </section>
    </div>
  );
}
