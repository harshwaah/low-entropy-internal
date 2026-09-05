import React from 'react';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function BrandLogo({
  className,
  size = 'md',
  showTagline = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-3 transition-opacity hover:opacity-90', className)}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm',
          size === 'sm' && 'h-8 w-8',
          size === 'md' && 'h-10 w-10',
          size === 'lg' && 'h-12 w-12'
        )}
      >
        <HeartHandshake
          className={cn(
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-5 w-5',
            size === 'lg' && 'h-6 w-6'
          )}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'font-semibold tracking-tight text-slate-900',
            size === 'sm' && 'text-base',
            size === 'md' && 'text-lg',
            size === 'lg' && 'text-2xl'
          )}
        >
          SmritiSaathi
        </span>
        {showTagline && (
          <span className="text-xs text-slate-500 font-normal">
            Dementia Care & Memory Companion
          </span>
        )}
      </div>
    </Link>
  );
}
