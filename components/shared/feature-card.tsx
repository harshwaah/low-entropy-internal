import React from 'react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function FeatureCard({ icon, label, className }: FeatureCardProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="bg-white rounded-full p-4 shadow-sm">
        {icon}
      </div>
      <p className="font-bold text-brand-dark text-sm whitespace-pre-line leading-tight text-center">
        {label.replace('\\n', '\n')}
      </p>
    </div>
  );
}
