import React from 'react';
import { MEMORY_CATEGORIES } from '../data/sample-memories';
import { MemoryCategoryKey } from '../types';
import { cn } from '@/lib/utils';
import { usePatientTranslation } from '@/features/patient-i18n';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-brand-dark">{t('memories.scrapbookCategories')}</h2>
        <span className="text-sm font-semibold text-brand-muted">
          {t('memories.browseByChapter')}
        </span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2 scroll-smooth">
        {/* All Memories Option */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-bold whitespace-nowrap transition-all shrink-0 focus:outline-none focus:ring-4 focus:ring-brand-primary/30",
            selectedCategory === 'all'
              ? "bg-brand-dark text-white shadow-md scale-105"
              : "bg-white text-brand-dark border-2 border-[#EFE5D5] hover:bg-[#FFFDF9]"
          )}
        >
          <span>✨</span>
          <span>{t('memories.allMemories')}</span>
        </button>

        {/* Categories from Sample Data */}
        {MEMORY_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-bold whitespace-nowrap transition-all shrink-0 focus:outline-none focus:ring-4 focus:ring-brand-primary/30",
                isActive
                  ? "bg-brand-primary text-white shadow-md scale-105"
                  : "bg-white text-brand-dark border-2 border-[#EFE5D5] hover:bg-[#FFFDF9]"
              )}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
