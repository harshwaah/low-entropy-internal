'use client';

import React, { useState } from 'react';
import { Puzzle, Zap, BookOpen, Clock, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { ClinicalPatient } from '../types';

interface ActivitiesPortalViewProps {
  patients: ClinicalPatient[];
}

export function ActivitiesPortalView({ patients }: ActivitiesPortalViewProps) {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'SS-4102');
  const [activityType, setActivityType] = useState<'quick_pick' | 'memory_trail' | 'routine'>('quick_pick');
  const [difficulty, setDifficulty] = useState<'gentle' | 'comfortable' | 'active'>('comfortable');
  const [quickPickMode, setQuickPickMode] = useState<'math' | 'colors' | 'objects' | 'patterns'>('math');
  const [targetFrequency, setTargetFrequency] = useState('Daily Morning');

  const handleAssign = () => {
    alert(`Activity assigned to patient ${selectedPatientId} successfully!`);
  };

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Cognitive Activity Assignment</h1>
        <p className="text-sm text-[#414944]">Configure adaptive parameters for Quick Pick Trail, Memory Trail, and Routines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-[#013625]">Activity Parameters</h2>

          <div className="space-y-4 text-xs">
            {/* 1. Target Patient */}
            <div>
              <label className="font-semibold text-[#151d19] block mb-1.5">Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-3 bg-[#ecf6ee] rounded-xl border border-emerald-900/10 font-medium text-[#151d19]"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) — {p.condition}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Activity Type */}
            <div>
              <label className="font-semibold text-[#151d19] block mb-1.5">Select Cognitive Activity</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setActivityType('quick_pick')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activityType === 'quick_pick'
                      ? 'bg-[#1e4d3a] text-white border-[#1e4d3a] shadow-xs'
                      : 'bg-[#ecf6ee] text-[#151d19] border-emerald-900/10 hover:bg-[#e6f0e8]'
                  }`}
                >
                  <Zap className="h-5 w-5" />
                  <span className="font-semibold text-xs">Quick Pick Trail</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityType('memory_trail')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activityType === 'memory_trail'
                      ? 'bg-[#1e4d3a] text-white border-[#1e4d3a] shadow-xs'
                      : 'bg-[#ecf6ee] text-[#151d19] border-emerald-900/10 hover:bg-[#e6f0e8]'
                  }`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="font-semibold text-xs">My Memory Trail</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityType('routine')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activityType === 'routine'
                      ? 'bg-[#1e4d3a] text-white border-[#1e4d3a] shadow-xs'
                      : 'bg-[#ecf6ee] text-[#151d19] border-emerald-900/10 hover:bg-[#e6f0e8]'
                  }`}
                >
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold text-xs">Circadian Routine</span>
                </button>
              </div>
            </div>

            {/* Quick Pick Specific Mode */}
            {activityType === 'quick_pick' && (
              <div>
                <label className="font-semibold text-[#151d19] block mb-1.5">Game Category / Mode</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['math', 'colors', 'objects', 'patterns'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setQuickPickMode(m)}
                      className={`p-2.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        quickPickMode === m
                          ? 'bg-[#013625] text-white border-[#013625]'
                          : 'bg-[#ecf6ee] text-[#414944] border-emerald-900/5 hover:bg-[#e6f0e8]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty tuning */}
            <div>
              <label className="font-semibold text-[#151d19] block mb-1.5">Difficulty Profile</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDifficulty('gentle')}
                  className={`p-2.5 rounded-xl border text-center font-semibold text-xs capitalize ${
                    difficulty === 'gentle' ? 'bg-[#c4ecd4] text-[#2a4e3c] border-[#2a4e3c]' : 'bg-[#ecf6ee] text-[#414944] border-emerald-900/5'
                  }`}
                >
                  Gentle (Level 1-2)
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('comfortable')}
                  className={`p-2.5 rounded-xl border text-center font-semibold text-xs capitalize ${
                    difficulty === 'comfortable' ? 'bg-[#c4ecd4] text-[#2a4e3c] border-[#2a4e3c]' : 'bg-[#ecf6ee] text-[#414944] border-emerald-900/5'
                  }`}
                >
                  Comfortable (Level 3-4)
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty('active')}
                  className={`p-2.5 rounded-xl border text-center font-semibold text-xs capitalize ${
                    difficulty === 'active' ? 'bg-[#c4ecd4] text-[#2a4e3c] border-[#2a4e3c]' : 'bg-[#ecf6ee] text-[#414944] border-emerald-900/5'
                  }`}
                >
                  Active (Level 5)
                </button>
              </div>
            </div>

            {/* Target Frequency */}
            <div>
              <label className="font-semibold text-[#151d19] block mb-1.5">Prescribed Frequency</label>
              <input
                type="text"
                value={targetFrequency}
                onChange={(e) => setTargetFrequency(e.target.value)}
                className="w-full p-3 bg-[#ecf6ee] rounded-xl border border-emerald-900/10 font-medium text-[#151d19]"
                placeholder="e.g. Daily Morning (09:00 AM)"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAssign}
            className="w-full py-3 rounded-xl bg-[#013625] hover:bg-[#1e4d3a] text-white font-semibold text-sm transition-all shadow-xs mt-2"
          >
            Assign Protocol to Patient
          </button>
        </div>

        {/* Right Column: Activity Catalog Info (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-emerald-900/10 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#013625]">Activity Catalog</h2>

            <div className="p-4 rounded-xl bg-[#ecf6ee] border border-emerald-900/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#013625]">Quick Pick Trail</span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#c4ecd4] text-[#2a4e3c]">
                  Adaptive Motor-Cognitive
                </span>
              </div>
              <p className="text-xs text-[#414944] leading-relaxed">
                Adaptive speed exercise collecting target elements while testing simple math, color matching, and pattern recognition. Tracks response latency, accuracy, and score.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ecf6ee] border border-emerald-900/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#013625]">My Memory Trail</span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#bbeed3] text-[#204f3c]">
                  Autobiographical Reminiscence
                </span>
              </div>
              <p className="text-xs text-[#414944] leading-relaxed">
                Personalized journey through life chapters (Home, School, Career, Festivities) using family photos, audio recordings, and gentle speech prompts.
              </p>
            </div>
          </div>

          <div className="text-xs text-[#717973] border-t border-emerald-900/5 pt-3">
            SmritiSaathi Cognitive Telemetry System
          </div>
        </div>
      </div>
    </div>
  );
}
