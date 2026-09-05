import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

export type MascotState = 'default' | 'happy' | 'holding-heart' | 'holding-book' | 'greeting';

export interface MascotProps {
  state?: MascotState;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  speechText?: React.ReactNode;
}

export function Mascot({ 
  state = 'default', 
  className, 
  size = 'md',
  showSpeechBubble = false,
  speechText
}: MascotProps) {
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-full max-w-lg aspect-square',
  };

  // For the hackathon/design phase, we use the primary hero image or placeholders
  // In a full implementation, different states would load different optimized WebP assets
  
  return (
    <div className={cn("relative mx-auto", sizeClasses[size], className)}>
      {/* If it's XL (Hero), we use the actual image */}
      {size === 'xl' ? (
        <Image 
          src="/assets/images/mascot_hero_1788622498847.jpg" 
          alt="SmritiSaathi Mascot" 
          width={500} 
          height={500} 
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback for other sizes */
        <div className="w-full h-full bg-white/50 rounded-full flex items-center justify-center relative shadow-inner">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2 text-brand-primary opacity-80">
             <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
             <path d="M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
             <path d="M15.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
             <path d="M15.5 14c-1.5 1.5-5.5 1.5-7 0"/>
           </svg>
           {state === 'holding-heart' && (
             <Heart className="absolute bottom-10 right-10 w-1/3 h-1/3 fill-red-500 text-red-500" />
           )}
        </div>
      )}

      {showSpeechBubble && speechText && (
        <div className="absolute top-0 right-0 lg:left-0 lg:right-auto bg-white px-6 py-4 rounded-[2rem] rounded-bl-none shadow-lg transform -rotate-6 z-10">
          <div className="font-bold text-brand-dark">
            {speechText}
          </div>
        </div>
      )}
    </div>
  );
}
