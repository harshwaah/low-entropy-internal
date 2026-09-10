'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, Heart } from 'lucide-react';
import { AudioNarration } from '../types';
import { Button } from '@/components/ui/button';

interface MemoryAudioPlayerProps {
  narration: AudioNarration;
  title: string;
}

export function MemoryAudioPlayer({ narration, title }: MemoryAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Gentle simulated audio progress for peaceful playback demonstration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    if (isPlaying && progress >= 98) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#F0E6D8] p-5 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-brand-primary font-bold text-sm tracking-wide uppercase">
          <Volume2 className="w-5 h-5 text-brand-primary" />
          <span>Hear This Memory</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Family Voice Note</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Play/Pause Button (extra large for accessibility) */}
        <Button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause narration' : 'Play family narration'}
          className="w-16 h-16 rounded-full bg-brand-primary hover:bg-brand-dark text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all focus:ring-4 focus:ring-brand-primary/30"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-white" />
          ) : (
            <Play className="w-8 h-8 fill-white translate-x-0.5" />
          )}
        </Button>

        {/* Narrator Info & Waveform */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
            <h4 className="text-xl font-bold text-brand-dark">
              {narration.title || title}
            </h4>
            <span className="text-sm font-semibold text-brand-muted">
              {narration.duration}
            </span>
          </div>

          <p className="text-sm font-medium text-brand-muted mb-3 flex items-center justify-center sm:justify-start gap-1.5">
            <span>Spoken by</span>
            <span className="font-bold text-brand-dark">{narration.narrator}</span>
            {narration.relation && (
              <span className="text-xs px-2 py-0.5 bg-brand-light rounded-full text-brand-dark">
                {narration.relation}
              </span>
            )}
          </p>

          {/* Calming Soundwave Visualizer */}
          <div className="w-full bg-[#F4EDE2] h-2.5 rounded-full overflow-hidden mb-2 relative">
            <div
              className="bg-brand-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-brand-muted font-medium">
            <span>{isPlaying ? 'Playing peaceful memory voice...' : 'Press play to listen'}</span>
            <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
              <Heart className="w-3 h-3 fill-red-500" /> Recorded with love
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
