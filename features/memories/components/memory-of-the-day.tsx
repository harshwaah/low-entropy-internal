import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MemoryItem } from '../types';
import { Sparkles, Calendar, Heart, Volume2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemoryOfTheDayProps {
  memory: MemoryItem;
  variant?: 'hub' | 'compact';
}

export function MemoryOfTheDay({ memory, variant = 'hub' }: MemoryOfTheDayProps) {
  if (variant === 'compact') {
    return (
      <Link 
        href={`/patient/memories/${memory.id}`}
        className="block group focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-[2.5rem]"
      >
        <article className="bg-[#FFF8F0] border-2 border-[#F6DEC8] group-hover:border-brand-primary/50 rounded-[2.5rem] p-4 sm:p-6 shadow-sm group-hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shrink-0 shadow-inner bg-amber-100">
            <Image
              src={memory.coverImage}
              alt={memory.imageAlt || memory.title}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              referrerPolicy="no-referrer"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
              Today
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary">
                  <Sparkles className="w-3.5 h-3.5" /> Memory of the Day
                </span>
                <span className="text-xs text-brand-muted">• {memory.dateEra}</span>
              </div>
              <h4 className="text-2xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-tight mb-2">
                {memory.title}
              </h4>
              <p className="text-base text-brand-muted font-medium line-clamp-2">
                {memory.shortDescription}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-amber-200/60">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark">
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                {memory.emotionalTag}
              </span>
              <div className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                <span>Revisit Memory</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF3E6] border-2 border-[#F4E0CE] rounded-[2.5rem] p-6 sm:p-8 shadow-sm overflow-hidden">
      {/* Decorative top ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-white text-sm font-extrabold shadow-sm">
          <Sparkles className="w-4 h-4 fill-white" />
          <span>Special Memory of the Day</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-brand-dark bg-white px-3.5 py-1.5 rounded-full border border-amber-200 text-xs font-bold shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>{memory.dateEra}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-center">
        {/* Large Polaroid Style Photo Frame */}
        <div className="md:col-span-6 relative">
          <div className="bg-white p-3.5 sm:p-4 rounded-3xl shadow-md border-2 border-amber-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50">
              <Image
                src={memory.coverImage}
                alt={memory.imageAlt || memory.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                referrerPolicy="no-referrer"
                priority
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-brand-dark shadow-sm">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  {memory.emotionalTag}
                </span>
              </div>
              {memory.audioNarration && (
                <div className="absolute bottom-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold shadow-md">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{memory.audioNarration.duration}</span>
                  </span>
                </div>
              )}
            </div>
            {memory.imageCaption && (
              <p className="mt-3 text-center text-sm font-semibold text-brand-muted italic">
                &ldquo;{memory.imageCaption}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Narrative & Invitation */}
        <div className="md:col-span-6 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            {memory.category}
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
            {memory.title}
          </h3>

          <p className="text-lg sm:text-xl text-brand-muted font-medium leading-relaxed">
            {memory.shortDescription}
          </p>

          <div className="p-4 rounded-2xl bg-white/80 border border-amber-200/60 text-sm font-semibold text-brand-dark">
            <span className="text-brand-primary font-bold mr-1">Family Note:</span>
            {memory.familyNotes[0]?.text || "Cherished family moment recorded with love."}
          </div>

          <div className="pt-2">
            <Link href={`/patient/memories/${memory.id}`} className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-lg h-14 px-8 font-bold shadow-md hover:scale-105 transition-all">
                Revisit This Memory
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
