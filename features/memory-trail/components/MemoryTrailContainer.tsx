'use client';

import React from 'react';
import { useMemoryTrail } from '../hooks/useMemoryTrail';
import { MemoryTrailWelcome } from './MemoryTrailWelcome';
import { LocationSelector } from './LocationSelector';
import { MemoryExperience } from './MemoryExperience';
import { GentleQuestion } from './GentleQuestion';
import { PatientResponse } from './PatientResponse';
import { PositiveFeedback } from './PositiveFeedback';
import { MemorySaved } from './MemorySaved';
import { ContinueExplore } from './ContinueExplore';
import { MemoryBook } from './MemoryBook';
import { FamilyContributions } from './FamilyContributions';
import { Heart, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MemoryTrailContainer() {
  const trail = useMemoryTrail();

  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen bg-[#FDFBF7] text-[#2C5545] flex flex-col font-sans pb-20">
      
      {/* Top Utility Bar (Shows quick links to Memory Book and Family Contributions when appropriate) */}
      {trail.currentScreen !== 'welcome' && (
        <div className="bg-white/80 backdrop-blur-xs border-b border-[#DCE5E0] px-4 py-2 flex items-center justify-between shadow-2xs sticky top-0 z-30">
          <button
            onClick={() => trail.setCurrentScreen('welcome')}
            className="text-xs font-black uppercase tracking-wider text-[#4A8B71] hover:underline cursor-pointer"
          >
            🌱 Memory Trail
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => trail.setCurrentScreen('family-contributions')}
              className={`rounded-full px-3 text-xs font-bold gap-1 ${
                trail.currentScreen === 'family-contributions'
                  ? 'bg-red-50 text-red-600'
                  : 'text-[#5C7065] hover:bg-[#F3F8F5]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Family</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => trail.setCurrentScreen('memory-book')}
              className={`rounded-full px-3 text-xs font-bold gap-1 ${
                trail.currentScreen === 'memory-book'
                  ? 'bg-[#E8F3EB] text-[#2C5545]'
                  : 'text-[#5C7065] hover:bg-[#F3F8F5]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#4A8B71]" />
              <span>Memory Book</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Screen Body */}
      <main className="flex-1 w-full">
        {trail.currentScreen === 'welcome' && (
          <MemoryTrailWelcome
            onStart={() => trail.setCurrentScreen('choose-location')}
          />
        )}

        {trail.currentScreen === 'choose-location' && (
          <LocationSelector
            locations={trail.locations}
            visitedLocationIds={trail.visitedLocationIds}
            onSelectLocation={trail.selectLocation}
            onBack={() => trail.setCurrentScreen('welcome')}
          />
        )}

        {trail.currentScreen === 'memory-experience' && trail.selectedLocation && (
          <MemoryExperience
            location={trail.selectedLocation}
            onBack={() => trail.setCurrentScreen('choose-location')}
            onNext={() => trail.setCurrentScreen('gentle-question')}
          />
        )}

        {trail.currentScreen === 'gentle-question' && (
          <GentleQuestion
            question={trail.currentQuestion}
            selectedPrompt={trail.promptSelected}
            onSelectPrompt={trail.setPromptSelected}
            onRotateQuestion={trail.rotateQuestion}
            onBack={() => trail.setCurrentScreen('memory-experience')}
            onNext={() => trail.setCurrentScreen('patient-response')}
          />
        )}

        {trail.currentScreen === 'patient-response' && (
          <PatientResponse
            textResponse={trail.textResponse}
            onChangeText={trail.setTextResponse}
            onSave={(params) => trail.saveCurrentMemory(params)}
            onBack={() => trail.setCurrentScreen('gentle-question')}
          />
        )}

        {trail.currentScreen === 'positive-feedback' && (
          <PositiveFeedback
            onContinue={() => trail.setCurrentScreen('memory-saved')}
          />
        )}

        {trail.currentScreen === 'memory-saved' && (
          <MemorySaved
            onContinueJourney={() => trail.setCurrentScreen('continue-explore')}
            onViewMemoryBook={() => trail.setCurrentScreen('memory-book')}
          />
        )}

        {trail.currentScreen === 'continue-explore' && (
          <ContinueExplore
            locations={trail.locations}
            visitedLocationIds={trail.visitedLocationIds}
            onSelectLocation={trail.selectLocation}
            onViewMemoryBook={() => trail.setCurrentScreen('memory-book')}
          />
        )}

        {trail.currentScreen === 'memory-book' && (
          <MemoryBook
            memories={trail.savedMemories}
            locations={trail.locations}
            onBack={() => trail.setCurrentScreen('choose-location')}
            onSelectLocation={(loc) => trail.selectLocation(loc)}
          />
        )}

        {trail.currentScreen === 'family-contributions' && (
          <FamilyContributions
            contributions={trail.familyContributions}
            onBack={() => trail.setCurrentScreen('choose-location')}
          />
        )}
      </main>

    </div>
  );
}
