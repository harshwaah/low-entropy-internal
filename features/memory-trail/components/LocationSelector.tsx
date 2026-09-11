'use client';

import React from 'react';
import { MemoryLocation } from '../types';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePatientTranslation } from '@/features/patient-i18n';

interface LocationSelectorProps {
  locations: MemoryLocation[];
  visitedLocationIds: string[];
  onSelectLocation: (location: MemoryLocation) => void;
  onBack?: () => void;
}

export function LocationSelector({
  locations,
  visitedLocationIds,
  onSelectLocation,
  onBack,
}: LocationSelectorProps) {
  const { t } = usePatientTranslation();

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="space-y-4">
        {onBack && (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DCE5E0] hover:bg-[#F3F8F5]"
              aria-label={t('common.back')}
            >
              <ArrowLeft className="w-6 h-6 text-[#2C5545]" />
            </Button>
          </div>
        )}

        <div className="text-center px-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545] tracking-tight">
            {t('memoryTrail.selectLocationTitle')}
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {locations.map((loc) => {
            const isVisited = visitedLocationIds.includes(loc.id);

            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className={`group relative rounded-3xl p-5 sm:p-6 text-center border-2 transition-all flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98] ${loc.colorTheme.cardBg} ${loc.colorTheme.border}`}
              >
                {/* Visited Badge (Soft indication, NOT locked!) */}
                {isVisited && (
                  <div className="absolute top-3 right-3 bg-[#2C5545] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    {t('memoryTrail.visitedBadge')}
                  </div>
                )}

                {/* Illustration / Emoji */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xs transition-transform group-hover:scale-110 ${loc.colorTheme.iconBg}`}
                >
                  {loc.emoji}
                </div>

                {/* Label */}
                <span className="text-base sm:text-lg font-extrabold text-[#2C5545] mt-2 group-hover:text-[#4A8B71] transition-colors leading-tight">
                  {loc.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom info card */}
      <div className="bg-[#E8F3EB] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 flex items-center gap-3 shadow-xs max-w-md mx-auto w-full my-2">
        <div className="p-2.5 bg-white rounded-full text-[#4A8B71] shrink-0 shadow-xs">
          <Leaf className="w-6 h-6" />
        </div>
        <p className="text-sm sm:text-base font-bold text-[#2C5545] leading-snug">
          {t('memoryTrail.everyPlaceHoldsStory')}<br />
          <span className="text-[#5C7065] font-medium">{t('memoryTrail.takeYourTimeStory')}</span>
        </p>
      </div>

    </div>
  );
}
