'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface OnboardingChoiceCardProps {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onToggle: (id: string) => void;
  variant?: 'checkbox' | 'radio';
}

export function OnboardingChoiceCard({
  id,
  label,
  description,
  emoji,
  icon,
  selected,
  onToggle,
  variant = 'checkbox',
}: OnboardingChoiceCardProps) {
  return (
    <button
      type="button"
      id={id}
      role={variant}
      aria-checked={selected}
      onClick={() => onToggle(id)}
      className={`w-full min-h-[64px] p-4 rounded-2xl sm:rounded-3xl border-2 text-left transition-all duration-200 flex items-center justify-between gap-3.5 cursor-pointer active:scale-[0.98] ${
        selected
          ? 'bg-white border-[#2C5545] shadow-md ring-2 ring-[#2C5545]/15'
          : 'bg-white/85 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {emoji && (
          <span className="text-2xl sm:text-3xl shrink-0 select-none" aria-hidden="true">
            {emoji}
          </span>
        )}
        {icon && (
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
              selected ? 'bg-[#E8F3EB] text-[#2C5545]' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p
            className={`text-base sm:text-lg font-bold truncate leading-tight ${
              selected ? 'text-[#2C5545]' : 'text-slate-800'
            }`}
          >
            {label}
          </p>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>

      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
          selected
            ? 'bg-[#2C5545] border-[#2C5545] text-white shadow-xs'
            : 'border-slate-300 bg-white'
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </button>
  );
}
