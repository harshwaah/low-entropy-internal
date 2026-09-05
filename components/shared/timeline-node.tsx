import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineNodeProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function TimelineNode({ icon, label, className }: TimelineNodeProps) {
  return (
    <div className={cn("flex flex-col items-center relative z-10 gap-3", className)}>
      <div className="bg-white p-2 rounded-full shadow-md">
        {icon}
      </div>
      <p className="font-bold text-brand-dark text-sm whitespace-pre-line text-center leading-tight">
        {label.replace('\\n', '\n')}
      </p>
    </div>
  );
}
