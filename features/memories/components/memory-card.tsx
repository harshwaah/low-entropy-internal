'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MemoryItem } from '../types';
import { Volume2, MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePatientTranslation } from '@/features/patient-i18n';

interface MemoryCardProps {
  memory: MemoryItem;
  className?: string;
  featured?: boolean;
}

export function MemoryCard({ memory, className, featured = false }: MemoryCardProps) {
  const { t } = usePatientTranslation();

  return (
    <Link 
      href={`/patient/memories/${memory.id}`}
      className={cn(
        "group block focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-[2rem] transition-all",
        className
      )}
    >
      <article className="relative bg-[#FFFDF9] border-2 border-[#F0E6D8] group-hover:border-brand-primary/50 shadow-sm group-hover:shadow-md rounded-[2rem] overflow-hidden transition-all duration-300 flex flex-col h-full">
        
        {/* Subtle Scrapbook Paper Tape Accent at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-amber-100/80 rounded-b-md border-b border-amber-200/60 z-20 pointer-events-none" />

        {/* Photo Container */}
        <div className="relative w-full aspect-[4/3] bg-amber-50/50 overflow-hidden">
          <Image
            src={memory.coverImage}
            alt={memory.imageAlt || memory.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Emotional Tag Pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-brand-dark shadow-sm border border-amber-100">
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              {memory.emotionalTag}
            </span>
          </div>

          {/* Voice Note Indicator (if available) */}
          {memory.audioNarration && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/95 text-white text-xs font-bold shadow-sm backdrop-blur-sm">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t('common.listen')}</span>
              </span>
            </div>
          )}

          {/* Era / Location on Image Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-10 text-white flex items-center justify-between text-xs font-medium">
            <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {memory.dateEra}
            </span>
            {memory.location && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full truncate max-w-[150px]">
                <MapPin className="w-3.5 h-3.5" />
                {memory.location}
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug mb-2">
              {memory.title}
            </h3>
            
            <p className="text-base text-brand-muted font-medium line-clamp-2 leading-relaxed mb-4">
              {memory.shortDescription}
            </p>
          </div>

          {/* Footer Metadata & Action */}
          <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
            <div className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              {memory.familyNotes?.length ? `${memory.familyNotes.length} Family ${memory.familyNotes.length === 1 ? 'Note' : 'Notes'}` : 'Family Story'}
            </div>
            
            <div className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
              <span>{t('home.viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </article>
    </Link>
  );
}
