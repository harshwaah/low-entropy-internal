import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  disableLink?: boolean;
  href?: string;
}

export function BrandLogo({
  className,
  size = 'md',
  showTagline = false,
  disableLink = false,
  href = '/',
}: BrandLogoProps) {
  const content = (
    <>
      <svg
        viewBox="0 0 512 512"
        className={cn(
          'shrink-0 select-none',
          size === 'sm' && 'h-8 w-8',
          size === 'md' && 'h-10 w-10',
          size === 'lg' && 'h-12 w-12'
        )}
      >
        <circle cx="256" cy="256" r="240" fill="#EBF6F0" />
        <ellipse cx="256" cy="400" rx="120" ry="24" fill="#D2E8DC" opacity="0.8" />
        <path d="M190 350 C190 350, 160 370, 150 410 C145 430, 175 440, 185 410 C190 395, 200 370, 200 370 Z" fill="#D35400" />
        <path d="M256 120 C160 120, 130 180, 130 260 C130 340, 160 380, 256 380 C352 380, 382 340, 382 260 C382 180, 352 120, 256 120 Z" fill="#FFFFFF" />
        <ellipse cx="185" cy="285" rx="18" ry="12" fill="#FFA5A5" opacity="0.7" />
        <ellipse cx="327" cy="285" rx="18" ry="12" fill="#FFA5A5" opacity="0.7" />
        <circle cx="205" cy="255" r="14" fill="#2C3E50" />
        <circle cx="201" cy="251" r="5" fill="#FFFFFF" />
        <circle cx="307" cy="255" r="14" fill="#2C3E50" />
        <circle cx="303" cy="251" r="5" fill="#FFFFFF" />
        <path d="M244 280 Q256 292 268 280" stroke="#2C3E50" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M165 345 Q256 385 347 345 C355 335, 360 350, 345 365 Q256 405 167 365 C152 350, 157 335, 165 345 Z" fill="#E74C3C" />
        <circle cx="190" cy="365" r="18" fill="#C0392B" />
        <path d="M256 125 Q256 70 280 60" stroke="#2E7D32" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M276 60 C290 40, 320 35, 330 55 C335 75, 310 90, 280 66 Z" fill="#4CAF50" />
        <path d="M120 150 Q120 150 120 140 Q120 150 130 150 Q120 150 120 160 Q120 150 110 150 Z" fill="#F1C40F" />
        <path d="M380 170 Q380 170 380 163 Q380 170 387 170 Q380 170 380 177 Q380 170 373 170 Z" fill="#F1C40F" />
      </svg>
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
    </>
  );

  if (disableLink) {
    return (
      <div className={cn('inline-flex items-center gap-3 transition-opacity hover:opacity-90', className)}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-3 transition-opacity hover:opacity-90', className)}
    >
      {content}
    </Link>
  );
}
