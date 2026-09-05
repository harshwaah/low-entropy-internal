'use client';

import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  ListOrdered,
  Eye,
  ArrowRight,
  Heart,
  ChevronRight,
  Smile,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { cognitiveService } from '@/features/cognition/services';

export default function PatientActivitiesHubPage() {
  const categories = cognitiveService.getCategories();
  const activities = cognitiveService.getAllActivities();
  const recommended = cognitiveService.getRecommendedActivity();
  const progress = cognitiveService.getProgressSummary();

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-28 sm:pb-32 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Companion Greeting Section */}
      <section
        aria-label="Companion Greeting"
        className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden"
      >
        <div className="pt-2 mb-3">
          <Mascot
            size="lg"
            state="encouraging"
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={<>Would you like to play a<br/>quick memory game today? 🧩✨</>}
            className="mb-2"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-2">
          Gentle Mind Activities
        </h1>

        <p className="text-lg sm:text-xl text-brand-muted font-medium max-w-md mx-auto leading-relaxed mb-6">
          Fun, comforting, and frustration-free games designed to keep your thoughts bright and relaxed.
        </p>

        {/* Reassuring Calm Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-brand-border rounded-full text-sm font-bold text-brand-dark shadow-xs">
          <Heart className="w-4 h-4 text-brand-primary fill-brand-primary" />
          <span>Zero Timers • Zero Wrong Answers • Pure Comfort</span>
        </div>
      </section>

      {/* 2. Today's Gentle Progress Overview */}
      <section aria-label="Daily Progress Overview">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-brand-light shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-primary font-bold text-sm">
              <Calendar className="w-4 h-4" />
              <span>Today&apos;s Mindful Moments</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              Peaceful Pace
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-dark">
                {progress.activitiesCompletedToday} of {progress.totalAvailable} Gentle Activities Explored
              </h2>
              <p className="text-sm sm:text-base text-brand-muted font-medium mt-1">
                {progress.positiveAffirmation}
              </p>
            </div>

            {/* Gentle Petal/Star Tokens */}
            <div className="flex items-center gap-2 shrink-0">
              {Array.from({ length: progress.totalAvailable }).map((_, idx) => {
                const isCompleted = idx < progress.activitiesCompletedToday;
                return (
                  <div
                    key={idx}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 scale-105 shadow-xs'
                        : 'bg-brand-light-alt text-brand-muted/40 border-2 border-dashed border-brand-border'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recommended Activity Section */}
      <section aria-label="Recommended Activity">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-brand-primary">
            Recommended For You
          </span>
          <span className="text-xs font-bold text-brand-muted">
            {recommended.estimatedMinutes}
          </span>
        </div>

        <Link
          href={recommended.href}
          className="block group focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-[2.5rem]"
        >
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-brand-light-alt border-2 border-emerald-200 group-hover:border-brand-primary transition-all p-6 sm:p-7 rounded-[2.5rem] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-700 border border-emerald-200 flex items-center justify-center text-3xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                ☕
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-200/60 text-emerald-900 rounded-full text-xs font-black uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Favorite</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-dark group-hover:text-brand-primary transition-colors">
                  {recommended.title}
                </h3>
                <p className="text-sm sm:text-base text-brand-muted font-medium max-w-md">
                  {recommended.description}
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-7 rounded-full text-base sm:text-lg font-bold bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md group-hover:scale-105 transition-all shrink-0 flex items-center justify-center gap-2"
            >
              <span>Play Now</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </div>
        </Link>
      </section>

      {/* 4. Activity Categories & All Games */}
      <section aria-label="All Gentle Activities" className="space-y-4">
        <h2 className="text-2xl font-extrabold text-brand-dark px-1">
          Explore All Activities
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {activities.map((activity) => {
            const isMatch = activity.id === 'memory-match';
            const isSequence = activity.id === 'what-comes-next';
            const isFind = activity.id === 'find-the-object';

            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="block group focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-3xl"
              >
                <Card
                  className={`border-2 transition-all group-hover:shadow-md active:scale-[0.99] rounded-3xl overflow-hidden ${
                    isMatch
                      ? 'bg-emerald-50/40 border-emerald-200/80 group-hover:border-emerald-400'
                      : isSequence
                      ? 'bg-amber-50/40 border-amber-200/80 group-hover:border-amber-400'
                      : 'bg-blue-50/40 border-blue-200/80 group-hover:border-blue-400'
                  }`}
                >
                  <CardContent className="p-5 sm:p-7 flex items-center gap-4 sm:gap-6">
                    {/* Activity Big Icon */}
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xs shrink-0 transition-transform group-hover:scale-105 ${
                        isMatch
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSequence
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {isMatch ? '🌸' : isSequence ? '☀️' : '🔍'}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isMatch
                              ? 'bg-emerald-200/60 text-emerald-900'
                              : isSequence
                              ? 'bg-amber-200/60 text-amber-900'
                              : 'bg-blue-200/60 text-blue-900'
                          }`}
                        >
                          {activity.badgeLabel}
                        </span>
                        <span className="text-xs font-semibold text-brand-muted">
                          {activity.estimatedMinutes}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-brand-dark leading-tight group-hover:text-brand-primary transition-colors">
                        {activity.title}
                      </h3>

                      <p className="text-sm sm:text-base text-brand-muted font-medium mt-1 line-clamp-2 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>

                    {/* Arrow CTA */}
                    <div className="w-12 h-12 rounded-full bg-white border border-brand-border/80 flex items-center justify-center text-brand-dark group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all shrink-0 shadow-xs">
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Gentle Category Explanations */}
      <section aria-label="Activity Categories Guide" className="pt-2">
        <h3 className="text-lg font-bold text-brand-dark mb-3 px-1">
          Why These Activities Feel Good
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`${cat.colorTheme.bg} rounded-2xl p-4 border ${cat.colorTheme.border} space-y-1`}
            >
              <h4 className={`text-base font-bold ${cat.colorTheme.text}`}>
                {cat.title}
              </h4>
              <p className="text-xs text-brand-muted font-medium leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
