'use client';

import React, { useState } from 'react';
import { Music, X, Play, Pause, Volume2, VolumeX, Info, Check, Sparkles, Mountain, Disc } from 'lucide-react';
import { useMusic } from '../hooks/use-music';
import type { MusicPreferenceCategory } from '../types';

export function MusicMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MusicPreferenceCategory>('calm');

  const {
    status,
    currentTrack,
    volume,
    muted,
    mode,
    play,
    pause,
    toggleMute,
    setVolume,
  } = useMusic();

  const isPlaying = status === 'playing' || status === 'loading';

  const handleTogglePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const getModeDescription = () => {
    if (mode === 'cognitive') {
      return 'Game Music · Light & Encouraging';
    }
    if (mode === 'memory-trail') {
      return 'Memory Music · Warm & Nostalgic';
    }
    return 'Calm Music · Gentle & Focused';
  };

  return (
    <>
      {/* Persistent Top-Right Compact Music Icon Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-lg border-2 border-white/90 flex items-center justify-center transition-all cursor-pointer active:scale-95 relative focus:outline-none focus:ring-4 focus:ring-[#4A8B71]/30"
          aria-label="Open music menu"
        >
          <Music className="w-6 h-6 text-white" />

          {/* Indicator Dot when Music is Active */}
          {isPlaying && (
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute -top-0.5 -right-0.5 animate-pulse" />
          )}
        </button>
      </div>

      {/* Dementia-Friendly Music Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#FDFBF7] border-2 border-[#DCE5E0] rounded-[2.5rem] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-6 text-[#2C5545] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="music-popup-title"
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E8F3EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F3EB] flex items-center justify-center text-[#2C5545]">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="music-popup-title" className="text-xl font-extrabold text-[#2C5545]">
                    Music
                  </h2>
                  <p className="text-xs font-bold text-[#5C7065]">
                    Soothing sounds for a better day
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
                aria-label="Close music menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Song Display Card */}
            <div className="bg-white border-2 border-[#E8F3EB] rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F3EB] flex items-center justify-center text-[#2C5545] text-2xl shrink-0 font-bold">
                  🎵
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A8B71]">
                    Current Music
                  </span>
                  <h3 className="text-base font-extrabold text-[#2C5545] truncate">
                    {currentTrack?.title || 'Raga Yaman - Sitar'}
                  </h3>
                  <p className="text-xs font-bold text-[#5C7065]">
                    {getModeDescription()}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Music On / Off Button */}
            <button
              onClick={handleTogglePlayPause}
              className={`w-full h-14 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                isPlaying
                  ? 'bg-[#4A8B71] text-white hover:bg-[#2C5545]'
                  : 'bg-white border-2 border-[#4A8B71] text-[#4A8B71] hover:bg-[#F3F8F5]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 fill-white" />
                  <span>Music On (Tap to Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-[#4A8B71]" />
                  <span>Music Off (Tap to Play)</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#2C5545]">
                <span>Volume</span>
                <span>{Math.round((muted ? 0 : volume) * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl bg-white border border-[#DCE5E0] text-[#2C5545] hover:bg-[#F3F8F5] cursor-pointer"
                  aria-label={muted ? 'Unmute music' : 'Mute music'}
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-red-500" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-3 accent-[#4A8B71] bg-stone-200 rounded-lg cursor-pointer"
                  aria-label="Music volume slider"
                />
              </div>
            </div>

            {/* Music Preference Categories */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-extrabold text-[#2C5545]">
                My Music Preference
              </h4>

              <div className="space-y-2.5">
                {/* 1. Calm Instrumental */}
                <div
                  onClick={() => setSelectedCategory('calm')}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'calm'
                      ? 'border-[#4A8B71] bg-[#E8F3EB] text-[#2C5545]'
                      : 'border-[#E8F3EB] bg-white text-[#2C5545] hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#4A8B71] shrink-0" />
                    <div>
                      <p className="text-sm font-extrabold">Calm Instrumental</p>
                      <p className="text-xs font-bold text-[#5C7065]">
                        Soothing sitar &amp; flute melodies
                      </p>
                    </div>
                  </div>
                  {selectedCategory === 'calm' && (
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#4A8B71] text-white flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  )}
                </div>

                {/* 2. Classic Hindi Songs / Kishore Kumar */}
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80 text-stone-500 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <Disc className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-sm font-extrabold text-stone-700">
                        Classic Hindi Songs
                      </p>
                      <p className="text-xs font-bold text-stone-500">
                        Kishore Kumar &amp; familiar favourites
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-200 text-stone-600 shrink-0">
                    Coming soon
                  </span>
                </div>

                {/* 3. North-East Music */}
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80 text-stone-500 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <Mountain className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-extrabold text-stone-700">
                        North-East Music
                      </p>
                      <p className="text-xs font-bold text-stone-500">
                        Authentic regional melodies
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-200 text-stone-600 shrink-0">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Explanation Note */}
            <div className="bg-[#E8F3EB] border border-[#DCE5E0] rounded-2xl p-3 flex items-center gap-2.5 text-xs font-bold text-[#2C5545]">
              <Info className="w-4 h-4 text-[#4A8B71] shrink-0" />
              <span>Music changes gently based on what you are doing.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
