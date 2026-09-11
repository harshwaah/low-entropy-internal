'use client';

import React from 'react';

interface OnboardingStepProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  illustration?: React.ReactNode;
  children?: React.ReactNode;
  align?: 'center' | 'left';
}

export function OnboardingStep({
  title,
  subtitle,
  eyebrow,
  illustration,
  children,
  align = 'center',
}: OnboardingStepProps) {
  const isCentered = align === 'center';

  return (
    <div className={`w-full space-y-5 animate-in fade-in zoom-in-95 duration-250 ${isCentered ? 'text-center' : 'text-left'}`}>
      {illustration && (
        <div className="flex justify-center mb-2">
          {illustration}
        </div>
      )}

      <div className="space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-wider text-[#2C5545]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A3B32] tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#5C7065] max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="pt-1">
          {children}
        </div>
      )}
    </div>
  );
}
