'use client';

import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#DCE5E0] rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCE5E0] pb-4">
          <h3 className="text-2xl font-extrabold text-[#2C5545]">
            How to Play
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-stone-200"
          >
            <X className="w-6 h-6 text-[#2C5545]" />
          </Button>
        </div>

        {/* 4 Steps */}
        <div className="space-y-4">
          
          <div className="flex items-start gap-4 bg-white border border-[#DCE5E0] rounded-2xl p-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#E8F3EB] text-[#2C5545] font-black text-lg flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#2C5545]">Look at the Question</h4>
              <p className="text-xs text-[#5C7065] font-medium mt-0.5">
                Check the top wooden card (e.g., 5 + 3 = ?).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-[#DCE5E0] rounded-2xl p-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF3EB] text-[#8D4935] font-black text-lg flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#2C5545]">Find the Correct Apple</h4>
              <p className="text-xs text-[#5C7065] font-medium mt-0.5">
                Look around the grassy field for the matching answer (🍎 8).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-[#DCE5E0] rounded-2xl p-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FA] text-[#1E40AF] font-black text-lg flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#2C5545]">Guide Your Friend</h4>
              <p className="text-xs text-[#5C7065] font-medium mt-0.5">
                Swipe or tap direction arrows to guide Sprout to the apple.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-[#DCE5E0] rounded-2xl p-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-amber-900 font-black text-lg flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#2C5545]">Keep Going & Have Fun</h4>
              <p className="text-xs text-[#5C7065] font-medium mt-0.5">
                No timers or wrong answers! Take all the time you need.
              </p>
            </div>
          </div>

        </div>

        {/* Start Button */}
        <Button
          onClick={onClose}
          className="w-full h-14 rounded-full text-lg font-bold bg-[#2C5545] text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Let&apos;s Play!</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </Button>

      </div>
    </div>
  );
}
