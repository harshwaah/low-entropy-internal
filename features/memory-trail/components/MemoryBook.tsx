'use client';

import React, { useState } from 'react';
import { MemoryEntry, MemoryLocation } from '../types';
import { ArrowLeft, ChevronRight, Play, Pause, Calendar, MapPin, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MemoryBookProps {
  memories: MemoryEntry[];
  locations: MemoryLocation[];
  onBack: () => void;
  onSelectLocation?: (location: MemoryLocation) => void;
}

export function MemoryBook({ memories, locations, onBack, onSelectLocation }: MemoryBookProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'map'>('timeline');
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const toggleAudioPlayback = (memoryId: string) => {
    if (playingAudioId === memoryId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(memoryId);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300 relative">
      
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DCE5E0] hover:bg-[#F3F8F5]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#2C5545]" />
          </Button>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545]">
            My Memory Book
          </h2>

          <div className="w-12" />
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#E8F3EB] p-1.5 rounded-full flex items-center max-w-xs mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2 rounded-full text-base font-extrabold transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-white text-[#2C5545] shadow-xs'
                : 'text-[#5C7065] hover:text-[#2C5545]'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-2 rounded-full text-base font-extrabold transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-white text-[#2C5545] shadow-xs'
                : 'text-[#5C7065] hover:text-[#2C5545]'
            }`}
          >
            Map
          </button>
        </div>

        {/* TIMELINE VIEW */}
        {activeTab === 'timeline' && (
          <div className="pt-2 relative space-y-4">
            {memories.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-[#DCE5E0] p-6 space-y-2">
                <p className="text-xl font-bold text-[#2C5545]">No memories saved yet</p>
                <p className="text-[#5C7065] font-medium">Start your journey to add your first memory entry.</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-4 border-l-2 border-[#4A8B71]/40 ml-4">
                {memories.map((entry) => {
                  const locInfo = locations.find(l => l.id === entry.locationId);
                  const displayDate = new Date(entry.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <div key={entry.id} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-[#4A8B71] ring-4 ring-[#FDFBF7]" />

                      {/* Memory Card */}
                      <div
                        onClick={() => setSelectedMemory(entry)}
                        className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xs hover:border-[#4A8B71] hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative shrink-0 bg-stone-100 border border-[#DCE5E0]">
                          <Image
                            src={locInfo?.samplePhotoUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'}
                            alt={entry.locationTitle}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Story Summary */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-bold text-[#2C5545] truncate">
                              {entry.locationEmoji} {entry.locationTitle}
                            </h3>
                          </div>
                          <p className="text-xs font-bold text-[#5C7065]">
                            {displayDate}
                          </p>
                          <p className="text-sm text-[#2C5545] font-medium line-clamp-2 leading-snug">
                            &ldquo;{entry.formattedStory || entry.patientResponseText || 'A cherished memory shared.'}&rdquo;
                          </p>
                        </div>

                        {/* Chevron */}
                        <ChevronRight className="w-6 h-6 text-[#5C7065] shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MAP VIEW */}
        {activeTab === 'map' && (
          <div className="pt-2 space-y-4">
            <div className="bg-[#E8F3EB] border-2 border-[#DCE5E0] rounded-3xl p-6 relative overflow-hidden min-h-[320px] flex flex-col justify-between shadow-xs">
              <div className="text-center space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#4A8B71]">
                  Visual Trail Map
                </span>
                <p className="text-base font-bold text-[#2C5545]">
                  Your Journey Through Life Places
                </p>
              </div>

              {/* Connected Visual Trail */}
              <div className="relative py-8 my-auto flex flex-col items-center">
                {/* Curved Trail SVG Path */}
                <svg className="absolute inset-0 w-full h-full text-[#4A8B71]/30 stroke-current" fill="none" strokeWidth="4" strokeDasharray="6 6">
                  <path d="M 50,40 Q 180,80 150,150 T 250,220" />
                </svg>

                <div className="grid grid-cols-3 gap-6 relative z-10 w-full px-2">
                  {locations.map((loc) => {
                    const isVisited = memories.some(m => m.locationId === loc.id);

                    return (
                      <button
                        key={loc.id}
                        onClick={() => onSelectLocation && onSelectLocation(loc)}
                        className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-xs hover:scale-105 ${
                          isVisited
                            ? 'bg-white border-[#4A8B71] text-[#2C5545]'
                            : 'bg-white/60 border-[#DCE5E0] text-[#5C7065]'
                        }`}
                      >
                        <span className="text-3xl mb-1">{loc.emoji}</span>
                        <span className="text-xs font-bold text-center leading-tight">{loc.title}</span>
                        {isVisited && (
                          <span className="mt-1 text-[9px] bg-[#4A8B71] text-white px-1.5 py-0.5 rounded-full font-extrabold">
                            ✓ Trail
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-center text-xs text-[#5C7065] font-semibold">
                Tap any location on your trail to revisit memories
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MEMORY DETAIL MODAL */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] border-2 border-[#DCE5E0] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-[#2C5545] flex items-center gap-2">
                <span>{selectedMemory.locationEmoji}</span>
                <span>{selectedMemory.locationTitle}</span>
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMemory(null)}
                className="rounded-full hover:bg-stone-200"
              >
                <X className="w-6 h-6 text-[#2C5545]" />
              </Button>
            </div>

            <div className="text-xs font-bold text-[#5C7065] flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(selectedMemory.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Question Asked */}
            <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-2xl p-4 space-y-1">
              <span className="text-xs font-bold text-[#4A8B71] uppercase">Question</span>
              <p className="text-base font-extrabold text-[#2C5545]">
                {selectedMemory.questionAsked}
              </p>
            </div>

            {/* Formatted Story */}
            <div className="bg-white border border-[#DCE5E0] rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-[#4A8B71] uppercase">Patient Memory</span>
              <p className="text-base font-medium text-[#2C5545] leading-relaxed">
                &ldquo;{selectedMemory.formattedStory || selectedMemory.patientResponseText || 'Memory saved.'}&rdquo;
              </p>

              {/* Audio playback button if available */}
              {selectedMemory.voiceRecordingUrl && (
                <div className="pt-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleAudioPlayback(selectedMemory.id)}
                    className="rounded-full border-[#4A8B71] text-[#2C5545]"
                  >
                    {playingAudioId === selectedMemory.id ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" /> Pause Voice Recording
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2 fill-[#2C5545]" /> Play Voice Recording
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Family Contribution if attached */}
            {selectedMemory.familyContribution && (
              <div className="bg-[#FAF3EB] border border-[#F2DFCD] rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-1 text-xs font-bold text-[#8D4935]">
                  <Heart className="w-3.5 h-3.5 fill-[#8D4935]" />
                  <span>Shared by {selectedMemory.familyContribution.contributedBy}</span>
                </div>
                <p className="text-sm font-medium text-[#2C5545] italic">
                  &ldquo;{selectedMemory.familyContribution.contentText}&rdquo;
                </p>
              </div>
            )}

            <Button
              onClick={() => setSelectedMemory(null)}
              className="w-full h-12 rounded-full bg-[#2C5545] text-white font-bold"
            >
              Close Memory
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
