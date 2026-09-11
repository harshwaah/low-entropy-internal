'use client';

import React, { useState, useEffect } from 'react';
import { ProgressReport } from '../types';
import { progressReportService } from '../services/progressReportService';
import { X, Activity, CheckCircle2, Clock, MapPin, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemoryTrailProgressReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

export function MemoryTrailProgressReportModal({
  isOpen,
  onClose,
  patientId = 'patient-1',
}: MemoryTrailProgressReportModalProps) {
  const [report, setReport] = useState<ProgressReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;
    if (isOpen) {
      progressReportService.generateProgressReport(patientId).then((rep) => {
        if (!isCancelled) {
          setReport(rep);
          setLoading(false);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [isOpen, patientId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#DCE5E0] rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#DCE5E0] pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#E8F3EB] rounded-2xl text-[#4A8B71]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#2C5545]">
                My Memory Trail Report
              </h3>
              <p className="text-xs text-[#5C7065] font-semibold">
                Observable Cognitive Activity Summary
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-stone-100"
          >
            <X className="w-6 h-6 text-[#2C5545]" />
          </Button>
        </div>

        {loading || !report ? (
          <div className="py-12 text-center text-[#5C7065] font-bold">
            Generating activity progress report...
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Overview Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-2xl p-4 text-center space-y-1">
                <span className="text-3xl font-black text-[#2C5545]">{report.sessionsCompleted}</span>
                <p className="text-xs font-bold text-[#5C7065]">Sessions Completed</p>
              </div>

              <div className="bg-[#FAF3EB] border border-[#F2DFCD] rounded-2xl p-4 text-center space-y-1">
                <span className="text-3xl font-black text-[#8D4935]">{report.locationsVisited}</span>
                <p className="text-xs font-bold text-[#5C7065]">Locations Explored</p>
              </div>

              <div className="bg-[#EBF3FA] border border-[#D2E4F5] rounded-2xl p-4 text-center space-y-1">
                <span className="text-3xl font-black text-[#1E40AF]">{report.memoriesShared}</span>
                <p className="text-xs font-bold text-[#5C7065]">Memories Shared</p>
              </div>

              <div className="bg-[#FAFAEB] border border-[#F5F5D3] rounded-2xl p-4 text-center space-y-1">
                <span className="text-3xl font-black text-[#854D0E]">{report.voiceResponses}</span>
                <p className="text-xs font-bold text-[#5C7065]">Voice Recordings</p>
              </div>
            </div>

            {/* Engagement Level Banner */}
            <div className="bg-[#E8F3EB] border border-[#DCE5E0] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#4A8B71]">Recent Activity Engagement</span>
                <h4 className="text-xl font-extrabold text-[#2C5545] capitalize">
                  {report.recentEngagementLevel} Participation
                </h4>
              </div>
              <div className="px-3 py-1 bg-white rounded-full text-xs font-extrabold text-[#2C5545] shadow-2xs capitalize">
                Trend: {report.engagementTrend}
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 border-t border-[#DCE5E0] pt-4">
              <h4 className="text-sm font-bold text-[#2C5545]">Participation Breakdown</h4>
              <div className="space-y-1.5 text-sm text-[#5C7065] font-medium">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Text responses:</span>
                  <span className="font-bold text-[#2C5545]">{report.textResponses}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Skipped prompts:</span>
                  <span className="font-bold text-[#2C5545]">{report.skippedResponses}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Avg session duration:</span>
                  <span className="font-bold text-[#2C5545]">{Math.round(report.averageSessionDuration / 60)} mins</span>
                </div>
              </div>
            </div>

            {/* Observational Note */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-extrabold text-[#2C5545] uppercase">Observational Note</span>
              <p className="text-sm text-[#5C7065] font-medium leading-relaxed">
                {report.summaryNotes}
              </p>
            </div>

            <Button
              onClick={onClose}
              className="w-full h-12 rounded-full bg-[#2C5545] text-white font-bold"
            >
              Close Report
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
