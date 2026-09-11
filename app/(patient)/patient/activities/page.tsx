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
import { usePatientTranslation } from '@/features/patient-i18n';

export default function PatientActivitiesHubPage() {
  const { t } = usePatientTranslation();
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
            speechText={t('activities.speechBubble')}
            className="mb-2"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-2">
          {t('activities.title')}
        </h1>

        <p className="text-lg sm:text-xl text-brand-muted font-medium max-w-md mx-auto leading-relaxed mb-6">
          {t('activities.subtitle')}
        </p>

        {/* Reassuring Calm Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-brand-border rounded-full text-sm font-bold text-brand-dark shadow-xs">
          <Heart className="w-4 h-4 text-brand-primary fill-brand-primary" />
          <span>{t('activities.tag')}</span>
        </div>
      </section>

      {/* 2. Today's Gentle Progress Overview */}
      <section aria-label="Daily Progress Overview">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-brand-light shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-primary font-bold text-sm">
              <Calendar className="w-4 h-4" />
              <span>{t('activities.progressTitle')}</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              {t('activities.peacefulPace')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-dark">
                {t('activities.progressCount', { completed: progress.activitiesCompletedToday, total: progress.totalAvailable })}
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

      {/* Featured Quick Pick Trail Game Banner */}
      <section aria-label="Quick Pick Trail Feature">
        <Link
          href="/patient/activities/quick-pick-trail"
          className="block group focus:outline-none focus:ring-4 focus:ring-[#2C5545]/30 rounded-[2.5rem]"
        >
          <div className="bg-gradient-to-r from-[#FAF3EB] via-[#FFF9F2] to-[#FCE7F3] border-2 border-[#F2DFCD] group-hover:border-[#2C5545] transition-all p-6 sm:p-7 rounded-[2.5rem] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#2C5545] border border-[#E8D7C3] flex items-center justify-center text-3xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                🐍
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#8D4935] text-white rounded-full text-xs font-black uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>{t('activities.quickPickTag')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C5545] group-hover:text-[#4A8B71] transition-colors">
                  {t('activities.quickPickTitle')}
                </h3>
                <p className="text-sm sm:text-base text-[#5C7065] font-medium max-w-md">
                  {t('activities.quickPickDesc')}
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-7 rounded-full text-base sm:text-lg font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md group-hover:scale-105 transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('activities.quickPickPlay')}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </div>
        </Link>
      </section>

      {/* Featured My Memory Trail Feature Banner */}
      <section aria-label="My Memory Trail Feature">
        <Link
          href="/patient/activities/memory-trail"
          className="block group focus:outline-none focus:ring-4 focus:ring-[#2C5545]/30 rounded-[2.5rem]"
        >
          <div className="bg-gradient-to-r from-[#E8F3EB] via-[#F3F8F5] to-[#E2EFE6] border-2 border-[#4A8B71]/40 group-hover:border-[#2C5545] transition-all p-6 sm:p-7 rounded-[2.5rem] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#2C5545] border border-[#DCE5E0] flex items-center justify-center text-3xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                🌱
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#4A8B71] text-white rounded-full text-xs font-black uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>{t('activities.memoryTrailTag')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C5545] group-hover:text-[#4A8B71] transition-colors">
                  {t('activities.memoryTrailTitle')}
                </h3>
                <p className="text-sm sm:text-base text-[#5C7065] font-medium max-w-md">
                  {t('activities.memoryTrailDesc')}
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-7 rounded-full text-base sm:text-lg font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md group-hover:scale-105 transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('activities.memoryTrailStart')}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Button>
          </div>
        </Link>
      </section>

      {/* 4. Activity Categories & All Games */}
      <section aria-label="All Gentle Activities" className="space-y-4">
        <h2 className="text-2xl font-extrabold text-brand-dark px-1">
          {t('activities.exploreAll')}
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
          {t('activities.whyFeelGood')}
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
