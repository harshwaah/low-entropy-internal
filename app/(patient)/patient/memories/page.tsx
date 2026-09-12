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
import { ArrowLeft, BookOpen, Heart, Sparkles, Compass } from 'lucide-react';
import { usePatientTranslation } from '@/features/patient-i18n';

export default function PatientMemoriesHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllVault, setShowAllVault] = useState<boolean>(false);
  const { t } = usePatientTranslation();
  
  const allMemories = getAllMemories();
  const memoryOfTheDay = getMemoryOfTheDay();
  const filteredMemories = getMemoriesByCategory(selectedCategory);

  const activeCategoryInfo = MEMORY_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Back to Patient Home Journey */}
      <header className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <Link 
            href="/patient" 
            className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-14 h-14 rounded-full bg-white shadow-xs border border-brand-border hover:bg-brand-light-alt"
            >
              <ArrowLeft className="w-7 h-7 text-brand-dark" />
            </Button>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('memories.scrapbookTag')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              {t('memories.scrapbookTitle')}
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF8F0] border border-amber-200 text-xs font-bold text-amber-900 shadow-xs">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <span>{allMemories.length} Precious Moments</span>
        </div>
      </header>

      {/* 2. Companion Anchor: Focus-First Prompt */}
      <section aria-label="Companion Encouragement" className="bg-brand-light-alt rounded-[3rem] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs border border-brand-border/60">
        <Mascot 
          size="lg" 
          state="holding-book"
          showSpeechBubble={true}
          speechPosition="top-right"
          speechText={
            <>
              {t('memories.revisitPrompt')}{' '}
              <Heart className="inline w-3.5 h-3.5 fill-red-500 text-red-500" />
            </>
          }
        />
        <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark mt-2">
          {t('memories.reminiscenceTitle')}
        </h2>
        <p className="text-base text-brand-muted font-medium max-w-md mt-1">
          {t('memories.reminiscenceDesc')}
        </p>
      </section>

      {/* 3. Primary Focus: Memory of the Day */}
      <section aria-label="Featured Daily Memory" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl font-black text-brand-dark">
              {t('memories.featuredToday')}
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-bold text-brand-muted">
            {t('memories.chosenWithFamily')}
          </span>
        </div>

        <MemoryOfTheDay memory={memoryOfTheDay} variant="hub" />
      </section>

      {/* 4. My Recorded Stories (Spoken Memoirs) */}
      <MyStoriesSection />

      {/* 5. Guided Scrapbook Categories & Keepsakes Explorer */}
      <section className="space-y-6 pt-2 border-t border-brand-border/60">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-2xl font-black text-brand-dark flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-primary" />
              <span>Explore Family Keepsakes</span>
            </h2>
            <p className="text-sm font-medium text-brand-muted mt-0.5">
              Choose a topic to look back at cherished moments with loved ones.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowAllVault(!showAllVault)}
            className="rounded-full text-xs font-bold border-2 border-brand-border px-4 py-2"
          >
            {showAllVault ? 'Show Less' : `Show All (${allMemories.length})`}
          </Button>
        </div>

        <CategorySelector 
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            setShowAllVault(true);
          }}
        />

        {/* Filtered / All Memories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(showAllVault ? filteredMemories : filteredMemories.slice(0, 2)).map((memory) => (
            <MemoryCard 
              key={memory.id} 
              memory={memory} 
            />
          ))}
        </div>

        {!showAllVault && filteredMemories.length > 2 && (
          <div className="text-center pt-2">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAllVault(true)}
              className="h-14 px-8 rounded-full font-bold border-2 border-brand-border text-brand-dark hover:bg-white"
            >
              <span>See {filteredMemories.length - 2} More Keepsakes</span>
            </Button>
          </div>
        )}
      </section>

      {/* 6. Return to Guided Journey Footer */}
      <div className="pt-4 text-center">
        <Link href="/patient" className="inline-block w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto h-16 px-10 text-lg rounded-full font-extrabold bg-brand-dark hover:bg-brand-dark/90 text-white shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Daily Journey</span>
          </Button>
        </Link>
      </div>

    </div>
  );
}
