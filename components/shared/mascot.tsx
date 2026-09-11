import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Heart, Sparkles } from 'lucide-react';

export type MascotState =
  | 'default'
  | 'happy'
  | 'holding-heart'
  | 'holding-book'
  | 'greeting'
  | 'encouraging'
  | 'celebrating'
  | 'thinking';

export type SpeechBubblePosition = 'top-right' | 'top-left' | 'top' | 'right';

export interface MascotProps {
  state?: MascotState;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  speechText?: React.ReactNode;
  speechPosition?: SpeechBubblePosition;
}

export function Mascot({
  state = 'default',
  className,
  size = 'md',
  showSpeechBubble = false,
  speechText,
  speechPosition = 'top-right'
}: MascotProps) {

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44 sm:w-48 sm:h-48',
    lg: 'w-56 h-56 sm:w-64 sm:h-64',
    xl: 'w-full max-w-lg aspect-square',
  };

  // Select motion class according to calm animation guidelines
  const getMotionClass = () => {
    switch (state) {
      case 'encouraging':
      case 'holding-heart':
        return 'animate-mascot-encouraging';
      case 'celebrating':
        return 'animate-mascot-celebrating';
      case 'thinking':
        return 'animate-mascot-thinking';
      case 'default':
      case 'happy':
      case 'greeting':
      case 'holding-book':
      default:
        return 'animate-mascot-idle';
    }
  };

  return (
    <div className={cn("relative mx-auto flex items-center justify-center", sizeClasses[size], className)}>

      {/* If it's XL (Hero on Landing Page), we render the full mascot illustration */}
      {size === 'xl' ? (
        <div className={cn("w-full h-full relative flex items-center justify-center", getMotionClass())}>
          <Image
            src="/assets/images/mascot_hero_1788622498847.jpg"
            alt="SmritiSaathi Companion"
            width={500}
            height={500}
            priority
            className="object-contain drop-shadow-sm rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        /* Vector SVG Companion for UI components */
        <div className={cn("w-full h-full relative flex items-center justify-center", getMotionClass())}>
          <Image
            src="/icon.svg"
            alt={`SmritiSaathi Companion - ${state}`}
            fill
            className="object-contain drop-shadow-sm"
            unoptimized
            priority={size === 'lg'}
          />

          {/* Gentle Contextual Accents (Non-intrusive) */}
          {state === 'holding-heart' && (
            <div className="absolute bottom-[8%] right-[8%] p-1.5 bg-white/90 rounded-full shadow-sm z-10 animate-mascot-encouraging">
              <Heart className="w-6 h-6 fill-red-500 text-red-500" />
            </div>
          )}
          {state === 'encouraging' && (
            <div className="absolute top-[8%] right-[8%] p-1.5 bg-white/90 rounded-full shadow-sm z-10 animate-sparkle-gentle">
              <Sparkles className="w-5 h-5 text-brand-primary" />
            </div>
          )}
          {state === 'celebrating' && (
            <div className="absolute -top-2 right-4 px-2 py-0.5 bg-brand-accent-yellow text-brand-dark rounded-full text-xs font-bold shadow-sm z-10 animate-sparkle-gentle">
              🎉 Joy
            </div>
          )}
          {state === 'thinking' && (
            <div className="absolute -top-2 right-6 w-7 h-7 bg-brand-light-alt border border-brand-border rounded-full flex items-center justify-center text-sm font-bold text-brand-dark shadow-sm z-10">
              💭
            </div>
          )}
        </div>
      )}

      {/* Speech Bubble: Positioned securely so it NEVER obscures the mascot's eyes or smile and never overflows viewport */}
      {showSpeechBubble && speechText && (
        <div
          className={cn(
            "absolute z-30 transition-all duration-300 pointer-events-none",
            // Position mapping relative to container
            speechPosition === 'top-right' && (
              size === 'sm' ? "-top-8 -right-14 sm:-right-20" :
                size === 'md' ? "-top-12 -right-4 sm:-right-16" :
                  size === 'lg' ? "-top-14 -right-2 sm:-right-10" :
                    "-top-8 right-2 sm:right-6"
            ),
            speechPosition === 'top-left' && (
              size === 'sm' ? "-top-8 -left-14 sm:-left-20" :
                size === 'md' ? "-top-12 -left-4 sm:-left-16" :
                  size === 'lg' ? "-top-14 -left-2 sm:-left-10" :
                    "-top-8 left-2 sm:left-6"
            ),
            speechPosition === 'top' && (
              "-top-14 sm:-top-16 left-1/2 -translate-x-1/2"
            ),
            speechPosition === 'right' && (
              "top-1/2 -translate-y-1/2 -right-24 sm:-right-32"
            )
          )}
        >
          <div className="relative bg-white border border-brand-border/90 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl sm:rounded-3xl shadow-md text-brand-dark text-xs sm:text-sm font-bold whitespace-normal max-w-[180px] sm:max-w-[220px] leading-snug text-center">
            {speechText}

            {/* Speech Bubble Pointer / Tail connecting to the mascot */}
            <div
              className={cn(
                "absolute w-3 h-3 bg-white border-b border-l border-brand-border/90 transform rotate-45",
                speechPosition === 'top-right' && "bottom-[-6px] left-4 sm:left-6",
                speechPosition === 'top-left' && "bottom-[-6px] right-4 sm:right-6",
                speechPosition === 'top' && "bottom-[-6px] left-1/2 -translate-x-1/2",
                speechPosition === 'right' && "left-[-6px] top-1/2 -translate-y-1/2 rotate-45"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

