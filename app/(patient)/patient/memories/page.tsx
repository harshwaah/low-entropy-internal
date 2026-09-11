'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MemoryCard, 
  MemoryOfTheDay, 
  CategorySelector,
  MyStoriesSection
} from '@/features/memories';
import { 
  getAllMemories, 
  getMemoryOfTheDay, 
  getMemoriesByCategory,
  MEMORY_CATEGORIES 
} from '@/features/memories/data/sample-memories';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Heart, Sparkles } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

export default function PatientMemoriesHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { t } = usePatientTranslation();
  
  const allMemories = getAllMemories();
  const memoryOfTheDay = getMemoryOfTheDay();
  const filteredMemories = getMemoriesByCategory(selectedCategory);

  const activeCategoryInfo = MEMORY_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 animate-in fade-in duration-300">
      
      {/* 1. Header with Back to Patient Home */}
      <header className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <Link 
            href="/patient" 
            className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#EFE5D5] hover:bg-amber-50"
            >
              <ArrowLeft className="w-6 h-6 text-brand-dark" />
            </Button>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('memories.scrapbookTag')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              {t('memories.scrapbookTitle')}
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF8F0] border border-amber-200 text-xs font-bold text-amber-900">
          <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
          <span>{t('memories.cherishedMoments', { count: allMemories.length })}</span>
        </div>
      </header>

      {/* 2. Companion Greeting & Warm Introduction */}
      <section className="bg-gradient-to-r from-brand-light-alt via-[#FFFBF6] to-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-[#F0E6D8] relative overflow-hidden">
        <div className="relative z-10 text-center sm:text-left space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary bg-white px-3 py-1 rounded-full border border-amber-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('memories.reminiscenceTag')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
            {t('memories.reminiscenceTitle')}
          </h2>
          <p className="text-base sm:text-lg text-brand-muted font-medium leading-relaxed">
            {t('memories.reminiscenceDesc')}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Mascot 
            size="lg" 
            state="holding-book"
            showSpeechBubble={true}
            speechPosition="top-right"
            speechText={
              <>{t('memories.revisitPrompt')} <Heart className="inline w-3.5 h-3.5 fill-red-500 text-red-500" /></>
            }
          />
        </div>
      </section>

      {/* 3. Memory of the Day Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl font-extrabold text-brand-dark">
              {t('memories.featuredToday')}
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-brand-muted">
            {t('memories.chosenWithFamily')}
          </span>
        </div>

        <MemoryOfTheDay memory={memoryOfTheDay} variant="hub" />
      </section>

      {/* 4. My Stories (AI Memory Layer Keepsakes) */}
      <MyStoriesSection />

      {/* 5. Scrapbook Categories Filter */}
      <section>
        <CategorySelector 
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => setSelectedCategory(id)}
        />
      </section>

      {/* 6. Filtered / All Memories Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-dark">
              {activeCategoryInfo ? (
                <span className="flex items-center gap-2">
                  <span>{activeCategoryInfo.emoji}</span>
                  <span>{t('memories.momentsCategory', { category: activeCategoryInfo.label })}</span>
                </span>
              ) : (
                t('memories.allMoments')
              )}
            </h2>
            <p className="text-sm font-medium text-brand-muted mt-0.5">
              {activeCategoryInfo 
                ? activeCategoryInfo.description 
                : t('memories.reminiscenceDesc')}
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm font-bold text-brand-primary hover:underline"
            >
              {t('common.showAll', { count: allMemories.length })}
            </button>
          )}
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredMemories.map((memory) => (
            <MemoryCard 
              key={memory.id} 
              memory={memory} 
            />
          ))}
        </div>

        {filteredMemories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#EFE5D5] p-8">
            <p className="text-xl font-bold text-brand-dark mb-2">{t('memories.noMemoriesTitle')}</p>
            <p className="text-brand-muted font-medium mb-4">{t('memories.noMemoriesDesc')}</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              {t('memories.viewAllMemories')}
            </Button>
          </div>
        )}
      </section>

    </div>
  );
}
