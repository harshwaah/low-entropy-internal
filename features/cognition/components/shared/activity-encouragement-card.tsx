'use client';

import React from 'react';
import { Mascot, MascotState } from '@/components/shared/mascot';
import { cn } from '@/lib/utils';

interface ActivityEncouragementCardProps {
  message: React.ReactNode;
  state?: MascotState;
  className?: string;
}

export function ActivityEncouragementCard({
  message,
  state = 'encouraging',
  className,
}: ActivityEncouragementCardProps) {
  return (
    <div
      className={cn(
        "bg-brand-light-alt rounded-3xl p-4 sm:p-5 border border-brand-border/60 flex items-center gap-4 shadow-sm",
        className
      )}
    >
      <div className="shrink-0">
        <Mascot size="sm" state={state} />
      </div>
      <div className="flex-1 text-sm sm:text-base font-bold text-brand-dark leading-relaxed">
        {message}
      </div>
    </div>
  );
}
