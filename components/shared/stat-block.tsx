import React from 'react';
import { cn } from '@/lib/utils';

export interface StatBlockProps {
  icon: React.ReactNode;
  stat: string;
  desc: string;
  className?: string;
}

export function StatBlock({ icon, stat, desc, className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-2", className)}>
      <div className="mb-2">{icon}</div>
      <h3 className="text-4xl font-extrabold text-brand-dark">{stat}</h3>
      <p className="text-brand-muted font-medium text-sm">{desc}</p>
    </div>
  );
}
