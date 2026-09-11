'use client';

import React from 'react';
import { MemoryLocation } from '../types';
import { Mascot } from '@/components/shared/mascot';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContinueExploreProps {
  locations: MemoryLocation[];
  visitedLocationIds: string[];
  onSelectLocation: (location: MemoryLocation) => void;
  onViewMemoryBook: () => void;
}

export function ContinueExplore({
  locations,
  visitedLocationIds,
  onSelectLocation,
  onViewMemoryBook,
}: ContinueExploreProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      <div className="space-y-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545] tracking-tight">
            Where would you like to go next?
          </h2>
        </div>

        {/* Mascot with Wooden Signpost Illustration */}
        <div className="flex items-center justify-center py-2 relative">
          <div className="w-56 h-32 bg-[#E8F3EB] border border-[#DCE5E0] rounded-3xl p-3 flex items-center justify-between shadow-xs relative overflow-hidden">
            {/* Wooden signpost SVG */}
            <div className="w-16 h-full flex flex-col items-center justify-end">
              <div className="w-14 h-6 bg-[#B8860B] rounded-md text-[10px] font-bold text-white flex items-center justify-center shadow-xs">
                Trail ➔
              </div>
              <div className="w-3 h-16 bg-[#8B5A2B] rounded-t-sm" />
            </div>

            <Mascot size="sm" state="greeting" />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {locations.map((loc) => {
            const isVisited = visitedLocationIds.includes(loc.id);

            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className={`group relative rounded-3xl p-4 sm:p-5 text-center border-2 transition-all flex flex-col items-center justify-between min-h-[130px] sm:min-h-[150px] cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98] ${loc.colorTheme.cardBg} ${loc.colorTheme.border}`}
              >
                {/* Visited Badge */}
                {isVisited && (
                  <div className="absolute top-2 right-2 bg-[#2C5545] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    ✓ Shared
                  </div>
                )}

                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform group-hover:scale-110 ${loc.colorTheme.iconBg}`}
                >
                  {loc.emoji}
                </div>

                <span className="text-base sm:text-lg font-extrabold text-[#2C5545] mt-1 group-hover:text-[#4A8B71] transition-colors leading-tight">
                  {loc.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Memory Book button */}
      <div className="pt-2">
        <Button
          variant="outline"
          onClick={onViewMemoryBook}
          className="w-full h-14 rounded-full text-lg font-bold border-2 border-[#4A8B71] text-[#2C5545] hover:bg-[#E8F3EB] flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-[#4A8B71]" />
          <span>View My Memory Book</span>
        </Button>
      </div>

    </div>
  );
}
