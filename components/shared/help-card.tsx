import React from 'react';
import { cn } from '@/lib/utils';

export interface HelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function HelpCard({ icon, title, description, className }: HelpCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-4", className)}>
      {icon}
      <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
      <p className="text-brand-muted font-medium">{description}</p>
    </div>
  );
}
