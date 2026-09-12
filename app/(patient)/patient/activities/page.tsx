'use client';

import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Heart,
  Eye,
  CheckCircle2,
  Gamepad2,
  ListOrdered
} from 'lucide-react';
import { cognitiveService } from '@/features/cognition/services';
import { usePatientTranslation } from '@/features/patient-i18n';

interface ActivityItemConfig {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  emoji: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  iconBg: string;
  iconText: string;
  estimatedMinutes: string;
}

const ALL_GAMES: ActivityItemConfig[] = [
  {
    id: 'find-the-object',
    number: 1,
    title: 'Find The Object',
    subtitle: 'Spot comforting items in cozy rooms',
    description: 'Look around the kitchen, veranda, and living room to find everyday favorites with gentle companion hints.',
    href: '/patient/activities/find-the-object',
    emoji: '🔍',
    badge: 'Featured Game #1',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    accentBorder: 'hover:border-blue-400',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-800',
    estimatedMinutes: '5 mins',
  },
  {
    id: 'quick-pick-trail',
    number: 2,
    title: 'Quick Pick Trail',
    subtitle: 'Little questions. Big confidence.',
    description: 'Guide your cute friend along a calm garden trail to collect delicious apples with reassuring questions.',
    href: '/patient/activities/quick-pick-trail',
    emoji: '🍎',
    badge: 'Game #2',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    accentBorder: 'hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-800',
    estimatedMinutes: '4-6 mins',
  },
  {
    id: 'memory-trail',
    number: 3,
    title: 'My Memory Trail',
    subtitle: 'A gentle walk through your life memories',
    description: 'Revisit childhood home, songs, and cherished family stories through photos, voice, and comforting reflections.',
    href: '/patient/activities/memory-trail',
    emoji: '🌱',
    badge: 'Game #3',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    accentBorder: 'hover:border-amber-400',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-800',
    estimatedMinutes: '5-8 mins',
  },
  {
    id: 'memory-match',
    number: 4,
    title: 'Memory Match',
    subtitle: 'Gentle pair matching with familiar treasures',
    description: 'Turn over cards to pair up fragrant marigolds, steaming chai, sweet mangoes, and brass bells. No rush.',
    href: '/patient/activities/memory-match',
    emoji: '🌸',
    badge: 'Game #4',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    accentBorder: 'hover:border-rose-400',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-800',
    estimatedMinutes: '3-5 mins',
  },
  {
    id: 'what-comes-next',
    number: 5,
    title: 'What Comes Next?',
    subtitle: 'Follow soothing daily life rhythms',
    description: 'From brewing morning chai to relaxing at sunset, pick the next natural step in a peaceful day.',
    href: '/patient/activities/what-comes-next',
    emoji: '☀️',
    badge: 'Game #5',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-900',
    accentBorder: 'hover:border-indigo-400',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-800',
    estimatedMinutes: '4-6 mins',
  },
];

export default function PatientActivitiesHubPage() {
  const { t } = usePatientTranslation();
  const recommended = ALL_GAMES[0]; // "Find The Object" is prioritized as #1

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Back to Patient Home */}
      <header className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <Link 
            href="/patient" 
            className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-14 h-14 rounded-full bg-white shadow-xs border border-brand-border hover:bg-brand-light-alt cursor-pointer"
            >
              <ArrowLeft className="w-7 h-7 text-brand-dark" />
            </Button>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>All 5 Mindful Activities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Mindful Games & Activities
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-xs">
          <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          <span>Zero Timers • 100% Calm</span>
        </div>
      </header>

      {/* 2. Companion Anchor */}
      <section
        aria-label="Companion Activity Guide"
        className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs border border-brand-border/60"
      >
        <Mascot
          size="lg"
          state="encouraging"
          showSpeechBubble={true}
          speechPosition="top-right"
          speechText={
            <>
              Let&apos;s explore together! Our featured game today is <strong>Find The Object</strong>{' '}
              <Sparkles className="inline w-3.5 h-3.5 text-brand-primary" />
            </>
          }
        />
        <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark mt-2">
          {t('activities.title')}
        </h2>
        <p className="text-base text-brand-muted font-medium max-w-md mt-1">
          Enjoy any of the 5 gentle games below at your own pace. Every game is peaceful with zero timers.
        </p>
      </section>

      {/* 3. Hero Recommended Focus Activity: Find The Object (Prioritized #1) */}
      <section aria-label="Featured Activity: Find The Object" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl font-black text-brand-dark">
              Featured Activity: Find The Object
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Top Recommendation
          </span>
        </div>

        <Card className="bg-gradient-to-r from-[#EBF4EC] via-[#F3F8F5] to-[#E3EFF7] border-2 border-blue-300 shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-300 text-blue-800 flex items-center justify-center text-4xl shadow-xs shrink-0">
                🔍
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#2563EB] text-white rounded-full text-xs font-black uppercase tracking-wide">
                  <Eye className="w-3.5 h-3.5 fill-white" />
                  <span>Visual Recognition & Living Room Exploration</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-dark">
                  {recommended.title}
                </h3>
                <p className="text-base text-brand-muted font-medium max-w-lg leading-relaxed">
                  {recommended.description}
                </p>
              </div>
            </div>

            <Link
              href={recommended.href}
              className="block focus:outline-none focus:ring-4 focus:ring-blue-600/30 rounded-full"
            >
              <Button
                size="lg"
                className="w-full h-18 text-xl font-extrabold bg-[#2C5545] hover:bg-[#1E3B30] text-white rounded-full shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                <span>Play &quot;Find The Object&quot; Now</span>
                <ArrowRight className="w-6 h-6 stroke-[2.5]" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* 4. Complete List of All 5 Available Games in Prioritized Order */}
      <section aria-label="All 5 Available Games" className="space-y-4 pt-2 border-t border-brand-border/60">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-black text-brand-dark">
            All 5 Mindful Games
          </h2>
          <span className="text-xs font-bold text-slate-500">
            5 of 5 Available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ALL_GAMES.map((game) => (
            <Link
              key={game.id}
              href={game.href}
              className="block group focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-3xl"
            >
              <div className={`bg-white border-2 border-brand-border ${game.accentBorder} p-5 sm:p-6 rounded-3xl shadow-xs group-hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className={`w-16 h-16 rounded-2xl ${game.iconBg} ${game.iconText} flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform shadow-xs`}>
                    {game.emoji}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-extrabold ${game.badgeBg} ${game.badgeText} px-2.5 py-0.5 rounded-full`}>
                        {game.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        • {game.estimatedMinutes}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-dark group-hover:text-brand-primary transition-colors">
                      {game.number}. {game.title}
                    </h3>
                    <p className="text-sm text-brand-muted font-medium leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <Button
                    size="default"
                    className="h-12 px-6 rounded-full font-bold bg-brand-light text-brand-dark group-hover:bg-brand-primary group-hover:text-white transition-all flex items-center gap-2"
                  >
                    <span>Play</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Return to Daily Journey Footer */}
      <div className="pt-4 text-center">
        <Link href="/patient" className="inline-block w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto h-16 px-10 text-lg rounded-full font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Daily Journey</span>
          </Button>
        </Link>
      </div>

    </div>
  );
}
