'use client';

import React, { useState } from 'react';
import { FamilyContribution } from '../types';
import { ArrowLeft, Play, Pause, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface FamilyContributionsProps {
  contributions: FamilyContribution[];
  onBack: () => void;
}

export function FamilyContributions({ contributions, onBack }: FamilyContributionsProps) {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const toggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      <div className="space-y-4">
        {/* Header */}
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

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545] flex items-center gap-2">
            <Heart className="w-7 h-7 fill-red-500 text-red-500" />
            <span>From Your Family</span>
          </h2>

          <div className="w-12" />
        </div>

        {/* List of Contributions */}
        <div className="space-y-5 pt-2">
          
          {/* Card 1: Photo Contribution */}
          <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-4">
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#FAF3EB] border border-[#F2DFCD] flex items-center justify-center text-xl shrink-0">
                👩
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#2C5545]">
                  A photo shared by your daughter
                </h3>
                <span className="text-xs font-bold text-[#5C7065]">2 days ago</span>
              </div>
            </div>

            {/* Photo */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#DCE5E0] bg-stone-100 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
                alt="Family Photo"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Caption */}
            <p className="text-center text-base sm:text-lg font-extrabold text-[#2C5545] italic">
              &ldquo;This is one of our favourite days together.&rdquo;
            </p>
          </div>

          {/* Card 2: Voice Contribution */}
          <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-4">
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#EBF3FA] border border-[#D2E4F5] flex items-center justify-center text-xl shrink-0">
                👨
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#2C5545]">
                  A voice message from your son
                </h3>
                <span className="text-xs font-bold text-[#5C7065]">5 days ago</span>
              </div>
            </div>

            {/* Voice Waveform Player */}
            <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-2xl p-4 flex items-center gap-4">
              <button
                onClick={() => toggleAudio('son-voice')}
                className="w-12 h-12 rounded-full bg-[#4A8B71] hover:bg-[#2C5545] text-white flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
                aria-label={playingAudioId === 'son-voice' ? 'Pause voice message' : 'Play voice message'}
              >
                {playingAudioId === 'son-voice' ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1 h-7">
                  {[40, 80, 60, 95, 70, 40, 85, 90, 50, 75, 60, 80, 45, 90, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-colors ${
                        playingAudioId === 'son-voice' ? 'bg-[#4A8B71]' : 'bg-[#DCE5E0]'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-base sm:text-lg font-extrabold text-[#2C5545] italic">
              &ldquo;Thinking of you always.&rdquo;
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="bg-[#E8F3EB] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 flex items-center gap-3 shadow-xs max-w-md mx-auto w-full my-2">
        <div className="p-2.5 bg-white rounded-full text-[#4A8B71] shrink-0 shadow-xs">
          <MessageCircle className="w-6 h-6" />
        </div>
        <p className="text-sm sm:text-base font-bold text-[#2C5545] leading-snug">
          Your family can add more memories to your trail 💚
        </p>
      </div>

    </div>
  );
}
