import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  badgeClassName?: string;
}

export function SectionHeader({ badge, title, description, className, badgeClassName }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {badge && (
        <span className={cn("bg-brand-light text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase", badgeClassName)}>
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-brand-muted font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
