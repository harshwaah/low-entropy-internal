'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MemoryStory } from '../types';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  Share2, 
  Check, 
  BookHeart,
  Quote
} from 'lucide-react';

interface StoryMemoirViewProps {
  story: MemoryStory;
  fromNarration?: boolean;
}

export function StoryMemoirView({ story, fromNarration = false }: StoryMemoirViewProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const togglePlayAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };

  return (
    <div 
      id="story-memoir-view-container"
      className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20"
    >
      
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link 
          href={`/patient/memories/${story.memoryId}`}
          className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
        >
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full bg-white hover:bg-amber-50 border-2 border-[#EFE5D5] text-brand-dark font-bold h-13 px-5 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Memory</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/patient/memories">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white hover:bg-amber-50 border border-amber-200 text-xs font-bold text-brand-dark h-10 px-4"
            >
              <BookHeart className="w-4 h-4 text-brand-primary mr-1.5" />
              <span>All Stories</span>
            </Button>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/80 hover:bg-amber-200 border border-amber-300 text-xs font-bold text-amber-900 shadow-xs transition-all"
          >
            {isShared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800">Shared with Family!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Share with Family</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Success Celebration Ribbon (if newly narrated) */}
      {fromNarration && (
        <div className="bg-emerald-50 border-2 border-emerald-200/90 rounded-3xl p-5 flex items-center gap-4 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-emerald-950">
              Your memory has been woven into a treasured story!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 font-medium">
              Saved forever in your Memory Book and shared with your loving family.
            </p>
          </div>
        </div>
      )}

      {/* 3. The Treasured Memoir Scrapbook Paper */}
      <article className="relative bg-[#FFFDF9] rounded-[3rem] p-6 sm:p-12 border-2 border-[#EFE5D5] shadow-xl overflow-hidden space-y-10">
        
        {/* Top Washi Tape Scrapbook Accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-7 bg-amber-100/90 border border-amber-200/80 shadow-xs rounded-sm rotate-[-1deg] pointer-events-none" />
        
        {/* Golden Keepsake Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0E6D8] pb-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Treasured Memoir</span>
            </span>
            <span className="text-xs font-bold text-brand-muted">
              {story.formattedDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted">
            {story.location && (
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#EFE5D5]">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                {story.location}
              </span>
            )}
            {story.yearEra && (
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#EFE5D5]">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                {story.yearEra}
              </span>
            )}
          </div>
        </div>

        {/* Story Title & Narrator Byline */}
        <div className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-black uppercase tracking-widest text-brand-primary">
            Narrated By {story.narratedBy}
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] font-serif">
            {story.storyTitle}
          </h1>
          <p className="text-base sm:text-lg text-brand-muted font-medium italic">
            Connected to memory: &ldquo;{story.memoryTitle}&rdquo;
          </p>
        </div>

        {/* Polaroid Memory Photo & Audio Player Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Polaroid Photo Frame */}
          <div className="md:col-span-6 relative">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#EAE0CE] shadow-md rotate-[-1deg] hover:rotate-0 transition-transform">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50">
                <Image
                  src={story.coverImage}
                  alt={story.storyTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-brand-muted italic">
                  A cherished snapshot of that unforgettable day.
                </p>
              </div>
            </div>
          </div>

          {/* Voice Reflection Audio Player & Emotional Quote */}
          <div className="md:col-span-6 space-y-5">
            
            {/* Audio Reflection Card */}
            <div className="bg-[#FFF9EE] rounded-3xl p-5 sm:p-6 border-2 border-amber-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xs">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-dark">
                      Meera&apos;s Spoken Reflection
                    </h4>
                    <p className="text-xs text-brand-muted font-medium">
                      Duration: {story.audioDuration || '1:45'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={togglePlayAudio}
                  aria-label={isPlayingAudio ? 'Pause Spoken Reflection' : 'Play Spoken Reflection'}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-white hover:bg-amber-100 text-brand-dark border border-amber-300'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Pause Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Listen to Voice</span>
                    </>
                  )}
                </button>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="h-10 bg-white rounded-2xl border border-amber-200 flex items-center justify-center gap-1 px-4 overflow-hidden">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? 'bg-brand-primary animate-pulse'
                        : 'bg-amber-300/80'
                    }`}
                    style={{
                      height: isPlayingAudio
                        ? `${Math.max(20, (Math.sin(i * 0.5) * 0.5 + 0.5) * 85)}%`
                        : `${((i * 7) % 50) + 20}%`,
                      animationDelay: `${i * 45}ms`,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs font-medium text-brand-muted text-center">
                {isPlayingAudio ? 'Playing back your recorded reflection...' : 'Recorded with Saathi during memory narration.'}
              </p>
            </div>

            {/* People Mentioned Tag */}
            {story.peopleMentioned && story.peopleMentioned.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-muted flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Treasured People:
                </span>
                {story.peopleMentioned.map((person) => (
                  <span
                    key={person}
                    className="px-3 py-1 rounded-full bg-white border border-[#EFE5D5] text-xs font-bold text-brand-dark shadow-xs"
                  >
                    {person}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 4. Spoken Words Pull-Quote (What Meera Spoke) */}
        <div className="relative rounded-3xl bg-[#FFF6E9] p-6 sm:p-8 border-2 border-amber-200/80 shadow-xs">
          <Quote className="absolute top-4 right-4 w-10 h-10 text-amber-300/60 pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <span className="text-xs font-black uppercase tracking-wider text-brand-primary">
              Words Spoken From The Heart
            </span>
            <blockquote className="text-lg sm:text-xl font-medium text-brand-dark italic leading-relaxed">
              &ldquo;{story.transcriptExcerpt}&rdquo;
            </blockquote>
            <p className="text-xs font-bold text-brand-muted pt-1">
              — Transcribed naturally during memory storytelling
            </p>
          </div>
        </div>

        {/* 5. The Structured Memoir Story (Chapters) */}
        <div className="space-y-6 pt-4 border-t-2 border-[#F0E6D8]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark font-serif">
              The Storybook Memoir
            </h2>
          </div>

          <div className="space-y-6 text-xl sm:text-2xl text-brand-dark font-normal leading-relaxed sm:leading-loose font-serif">
            {story.narrativeParagraphs.map((paragraph, idx) => (
              <p 
                key={idx} 
                className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-brand-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 6. Emotional Heart & Key Phrases Keepsake Box */}
        <div className="rounded-3xl bg-[#FFF9F2] p-6 sm:p-8 border-2 border-orange-200/70 space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h3 className="text-lg font-extrabold text-brand-dark">
              Emotional Takeaway
            </h3>
          </div>
          <p className="text-base sm:text-lg text-brand-dark font-semibold leading-relaxed">
            &ldquo;{story.emotionalTakeaway}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {story.keyPhrases.map((phrase) => (
              <span
                key={phrase}
                className="px-3.5 py-1 rounded-full bg-white text-xs font-bold text-amber-900 border border-amber-300/80 shadow-xs"
              >
                ✦ {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* 7. Companion Closing Warm Note */}
        <div className="bg-brand-light-alt rounded-3xl p-6 flex items-center gap-5 border border-brand-border/60">
          <Mascot
            size="sm"
            state="happy"
            showSpeechBubble={false}
            className="shrink-0"
          />
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-bold text-brand-dark">
              &ldquo;Thank you for sharing this beautiful day with me, Meera ji.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-brand-muted font-medium">
              This story now permanently graces your family keepsake collection.
            </p>
          </div>
        </div>

        {/* 8. Scrapbook Authenticity Stamp */}
        <div className="pt-6 border-t border-[#F0E6D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-brand-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Preserved in SmritiSaathi Memory Scrapbook</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/patient/memories">
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#EFE5D5] font-bold text-sm h-12 px-6 hover:bg-amber-50"
              >
                <BookHeart className="w-4 h-4 mr-2 text-brand-primary" />
                <span>Explore Memory Book</span>
              </Button>
            </Link>

            <Link href={`/patient/memories/${story.memoryId}`}>
              <Button
                className="rounded-full bg-brand-primary hover:bg-brand-primary/90 font-bold text-sm h-12 px-6 text-white shadow-sm"
              >
                <span>Revisit Photo</span>
              </Button>
            </Link>
          </div>
        </div>

      </article>

    </div>
  );
}
