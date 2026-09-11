import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MemoryItem } from '../types';
import { MemoryAudioPlayer } from './memory-audio-player';
import { MemoryNarrationCta } from './memory-narration-cta';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  MessageSquareHeart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MemoryDetailViewProps {
  memory: MemoryItem;
  nextMemoryId?: string;
  previousMemoryId?: string;
}

export function MemoryDetailView({ memory, nextMemoryId, previousMemoryId }: MemoryDetailViewProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-500 pb-16">
      
      {/* 1. Header with Back Button */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link 
          href="/patient/memories" 
          className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
        >
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full bg-white hover:bg-amber-50 border-2 border-[#EFE5D5] text-brand-dark font-bold h-13 px-6 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Scrapbook</span>
          </Button>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs sm:text-sm font-bold shadow-xs">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <span>{memory.emotionalTag}</span>
        </span>
      </div>

      {/* 2. Scrapbook Memory Header & Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-muted">
          <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#EFE5D5]">
            <Calendar className="w-4 h-4 text-brand-primary" />
            {memory.dateEra}
          </span>
          {memory.location && (
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#EFE5D5]">
              <MapPin className="w-4 h-4 text-brand-primary" />
              {memory.location}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight">
          {memory.title}
        </h1>
      </div>

      {/* 3. Large Scrapbook Photo with Polaroid Framing */}
      <section className="relative">
        {/* Top center tape accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/90 rounded-sm border border-amber-200/80 shadow-xs z-20 pointer-events-none rotate-1" />

        <div className="bg-[#FFFDF9] p-4 sm:p-6 rounded-[2.5rem] border-2 border-[#EFE5D5] shadow-md">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-amber-50 shadow-inner">
            <Image
              src={memory.coverImage}
              alt={memory.imageAlt || memory.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              referrerPolicy="no-referrer"
              priority
              className="object-cover"
            />
          </div>

          {memory.imageCaption && (
            <p className="mt-4 text-center text-base sm:text-lg font-semibold text-brand-muted italic max-w-xl mx-auto">
              &ldquo;{memory.imageCaption}&rdquo;
            </p>
          )}

          {/* Familiar People Badges */}
          {memory.familiarPeople?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-[#F0E6D8] flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted mr-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> With:
              </span>
              {memory.familiarPeople.map((person) => (
                <span 
                  key={person}
                  className="px-3 py-1 bg-white rounded-full border border-[#EFE5D5] text-xs sm:text-sm font-bold text-brand-dark shadow-xs"
                >
                  {person}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Tell Me About This Memory (AI Memory Layer Entry) */}
      <MemoryNarrationCta memory={memory} />

      {/* 5. Companion Introduction */}
      <section className="bg-brand-light-alt rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-brand-border/60">
        <Mascot
          size="md"
          state="holding-book"
          showSpeechBubble={false}
          className="shrink-0"
        />
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand-primary">
            <Sparkles className="w-3.5 h-3.5" /> Smriti Companion Note
          </div>
          <p className="text-xl sm:text-2xl font-bold text-brand-dark leading-snug">
            &ldquo;{memory.companionIntro}&rdquo;
          </p>
          <p className="text-sm font-medium text-brand-muted">
            Take a deep breath and take your time with this memory.
          </p>
        </div>
      </section>

      {/* 5. Hear Memory (Family Voice Note Player) */}
      {memory.audioNarration && (
        <section>
          <MemoryAudioPlayer 
            narration={memory.audioNarration} 
            title={memory.title} 
          />
        </section>
      )}

      {/* 6. Memory Story (Large comfortable font, warm scrapbook narrative) */}
      <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-[#EFE5D5] shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-brand-dark pb-3 border-b border-[#F0E6D8]">
          The Story
        </h2>

        <div className="space-y-5 text-lg sm:text-xl text-brand-dark font-medium leading-relaxed sm:leading-loose">
          {memory.story.map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-extrabold first-letter:text-brand-primary">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 7. Family Memories & Notes Section */}
      {memory.familyNotes && memory.familyNotes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <MessageSquareHeart className="w-6 h-6 text-brand-accent-orange" />
            <h3 className="text-2xl font-extrabold text-brand-dark">
              Love Notes from Family
            </h3>
          </div>

          <div className="grid gap-4">
            {memory.familyNotes.map((note) => (
              <div 
                key={note.id}
                className="bg-[#FFFDF9] rounded-3xl p-6 border-2 border-[#F6E6D4] shadow-sm flex flex-col sm:flex-row items-start gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl ${note.avatarBg || 'bg-orange-500'} text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm`}>
                  {note.avatarInitials || note.author.charAt(0)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-brand-dark mr-2">{note.author}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-light text-brand-dark font-semibold">
                        {note.relation}
                      </span>
                    </div>
                    {note.date && (
                      <span className="text-xs font-semibold text-brand-muted">{note.date}</span>
                    )}
                  </div>
                  
                  <p className="text-base sm:text-lg text-brand-dark font-medium leading-relaxed pt-1">
                    &ldquo;{note.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Peaceful Bottom Navigation */}
      <div className="pt-6 border-t-2 border-[#F0E6D8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/patient/memories" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-2 border-[#EFE5D5] font-bold hover:bg-amber-50"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Explore More Memories
          </Button>
        </Link>

        {nextMemoryId && (
          <Link href={`/patient/memories/${nextMemoryId}`} className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-full text-base h-14 px-8 font-bold shadow-md hover:scale-105 transition-all"
            >
              <span>Next Memory</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        )}
      </div>

    </div>
  );
}
