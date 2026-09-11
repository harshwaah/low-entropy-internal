'use client';

import React, { useState, useRef } from 'react';
import { MemoryLocation } from '../types';
import { ArrowLeft, Play, Pause, Music, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MemoryExperienceProps {
  location: MemoryLocation;
  onBack: () => void;
  onNext: () => void;
}

export function MemoryExperience({ location, onBack, onNext }: MemoryExperienceProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleAudio = () => {
    if (isPlayingSong) {
      setIsPlayingSong(false);
    }
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlayingAudio(true);
      setAudioProgress(0);
      timerRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
  };

  const toggleSong = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    setIsPlayingSong(!isPlayingSong);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Top Bar with Step Dots */}
      <div className="space-y-4">
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

          {/* 4 Step Dots — Step 1 Active */}
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#4A8B71] ring-4 ring-[#4A8B71]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
          </div>
          <div className="w-12" />
        </div>

        {/* Location Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545] flex items-center justify-center gap-2">
            <span>{location.emoji}</span>
            <span>{location.title}</span>
          </h2>
        </div>

        {/* Large Memory Photo */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border-2 border-[#DCE5E0] bg-stone-100">
          <Image
            src={location.samplePhotoUrl}
            alt={location.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Audio Waveform Section */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-4 shadow-xs flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className="w-14 h-14 rounded-full bg-[#4A8B71] hover:bg-[#2C5545] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label={isPlayingAudio ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlayingAudio ? (
              <Pause className="w-7 h-7 fill-white" />
            ) : (
              <Play className="w-7 h-7 fill-white ml-1" />
            )}
          </button>

          {/* Visual Waveform Bar */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1 h-8 px-1">
              {[40, 75, 50, 90, 60, 30, 85, 95, 40, 70, 80, 45, 60, 90, 50, 30, 70, 85, 40].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    isPlayingAudio && i * 5 <= audioProgress
                      ? 'bg-[#4A8B71]'
                      : 'bg-[#DCE5E0]'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="text-right text-xs font-bold text-[#5C7065] pr-1">
              {isPlayingAudio ? `0:${Math.floor((audioProgress / 100) * 30).toString().padStart(2, '0')}` : '0:00'} / 0:30
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-base sm:text-lg text-[#2C5545] font-medium text-center leading-relaxed px-2">
          &ldquo;{location.description}&rdquo;
        </p>

        {/* Play a Song Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleSong}
            className={`px-6 py-3 rounded-full border-2 font-bold text-base flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPlayingSong
                ? 'bg-[#FFB89E] border-[#FF9F7D] text-[#8D4935] scale-105'
                : 'bg-[#FAF0ED] border-[#F7DCD5] text-[#8D4935] hover:bg-[#FFB89E]/40'
            }`}
          >
            <Music className="w-5 h-5 text-[#8D4935]" />
            <span>{isPlayingSong ? '♫ Playing Nostalgic Melody...' : '♫ Play a Song'}</span>
          </button>
        </div>

        {/* Family Memory Contribution Banner */}
        {location.familyContribution && (
          <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 space-y-1 shadow-xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#4A8B71]">
              <Heart className="w-4 h-4 fill-[#4A8B71]" />
              <span>A memory shared by your family 💚</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#2C5545] italic pl-6">
              &ldquo;{location.familyContribution.contentText}&rdquo; — {location.familyContribution.contributedBy}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-2">
        <Button
          size="lg"
          onClick={onNext}
          className="w-full h-16 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Share a Memory</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
