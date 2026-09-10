'use client';

import React, { useState } from 'react';
import { QuickPickProgressRecord } from '../types';
import { ArrowLeft, Heart, Sparkles, Trophy, Clock, CheckCircle2, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgressScreenProps {
  history: QuickPickProgressRecord[];
  onBack: () => void;
}

export function ProgressScreen({ history, onBack }: ProgressScreenProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'all'>('today');

  const totalGames = history.length;
  const totalQuestions = history.reduce((acc, curr) => acc + curr.questionsAttempted, 0);
  const avgTimeSum = history.reduce((acc, curr) => acc + curr.averageResponseTime, 0);
  const avgResponseTime = history.length > 0 ? (avgTimeSum / history.length).toFixed(1) : '4.2';
  const highestLevel = history.reduce((max, curr) => Math.max(max, curr.levelReached), 1);

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

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545]">
            Your Progress
          </h2>

          <div className="w-12" />
        </div>

        {/* Tabs: Today | This Week | All Time */}
        <div className="bg-[#E8F3EB] p-1.5 rounded-full flex items-center max-w-xs mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-white text-[#2C5545] shadow-xs'
                : 'text-[#5C7065] hover:text-[#2C5545]'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'week'
                ? 'bg-white text-[#2C5545] shadow-xs'
                : 'text-[#5C7065] hover:text-[#2C5545]'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#2C5545] shadow-xs'
                : 'text-[#5C7065] hover:text-[#2C5545]'
            }`}
          >
            All Time
          </button>
        </div>

        {/* Visual Bar Chart */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#5C7065]">
            <span>Activity Rhythms</span>
            <span className="text-[#4A8B71]">100% Gentle Pace</span>
          </div>

          <div className="flex items-end justify-between h-24 pt-4 px-2 border-b border-stone-100">
            {[40, 60, 85, 100, 75, 90, 80].map((h, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-6 rounded-t-lg bg-[#4A8B71]/80 hover:bg-[#2C5545] transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] font-bold text-[#5C7065]">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Table List */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065]">Games Played</span>
            <span className="text-base font-extrabold text-[#2C5545]">{totalGames || 3}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065]">Questions Solved</span>
            <span className="text-base font-extrabold text-[#2C5545]">{totalQuestions || 18}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065]">Average Response Time</span>
            <span className="text-base font-extrabold text-[#2C5545]">{avgResponseTime} sec</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-sm font-bold text-[#5C7065]">Preferred Mode</span>
            <span className="text-base font-extrabold text-[#2C5545]">Math</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-bold text-[#5C7065]">Current Level</span>
            <span className="text-base font-extrabold text-[#2C5545]">{highestLevel || 2}</span>
          </div>
        </div>
      </div>

      {/* Encouragement Banner */}
      <div className="bg-[#E8F3EB] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 flex items-center justify-center gap-2 shadow-xs text-center max-w-md mx-auto w-full my-2">
        <Heart className="w-5 h-5 fill-[#4A8B71] text-[#4A8B71]" />
        <p className="text-sm sm:text-base font-bold text-[#2C5545]">
          You&apos;re doing great! Keep playing! 💚
        </p>
      </div>

    </div>
  );
}
