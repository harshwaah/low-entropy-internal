'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Heart } from 'lucide-react';

interface ActivityProgressCardProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  stepName?: string;
  showHearts?: boolean;
}

export function ActivityProgressCard({
  currentStep,
  totalSteps,
  label = 'Gentle Progress',
  stepName,
  showHearts = true,
}: ActivityProgressCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-brand-border/80 shadow-sm flex items-center justify-between gap-4">
      <div>
        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
          {label}
        </span>
        <p className="text-base sm:text-lg font-bold text-brand-dark">
          {stepName || `${currentStep} of ${totalSteps} discovered`}
        </p>
      </div>

      {/* Gentle Dots or Hearts Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isFilled = index < currentStep;
          return (
            <div
              key={index}
              className={cn(
                "transition-all duration-300 rounded-full flex items-center justify-center",
                isFilled
                  ? "w-8 h-8 sm:w-9 sm:h-9 bg-brand-primary text-white shadow-sm scale-105"
                  : "w-7 h-7 sm:w-8 sm:h-8 bg-brand-light-alt border-2 border-brand-border text-brand-muted/50"
              )}
            >
              {showHearts ? (
                <Heart
                  className={cn(
                    "w-4 h-4",
                    isFilled ? "fill-white text-white" : "text-brand-muted/40"
                  )}
                />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
