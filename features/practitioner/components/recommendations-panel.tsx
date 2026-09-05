'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Send,
  X,
  Lightbulb,
  Clock,
  HeartHandshake,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import {
  ClinicalRecommendation,
  RecommendationCategory,
  RecommendationStatus,
} from '../types';

interface RecommendationsPanelProps {
  initialRecommendations: ClinicalRecommendation[];
  patientId?: string; // Optional: if provided, filters for that patient
}

export function RecommendationsPanel({
  initialRecommendations,
  patientId,
}: RecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<ClinicalRecommendation[]>(
    initialRecommendations
  );
  const [selectedCategory, setSelectedCategory] = useState<RecommendationCategory | 'all'>('all');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: RecommendationStatus, actionTitle: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );

    if (newStatus === 'applied') {
      setActionFeedback(`Care plan updated: "${actionTitle}" applied successfully.`);
    } else if (newStatus === 'dismissed') {
      setActionFeedback(`Recommendation archived.`);
    }

    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  const filtered = recommendations.filter((rec) => {
    if (patientId && rec.patientId !== patientId) return false;
    if (selectedCategory !== 'all' && rec.category !== selectedCategory) return false;
    return true;
  });

  const getCategoryBadge = (category: RecommendationCategory) => {
    switch (category) {
      case 'memory_activity':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
            <Sparkles className="h-3 w-3 text-amber-600" />
            <span>Memory Activity</span>
          </span>
        );
      case 'engagement_improvement':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800 border border-blue-200">
            <Lightbulb className="h-3 w-3 text-blue-600" />
            <span>Engagement Idea</span>
          </span>
        );
      case 'routine_reinforcement':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
            <Clock className="h-3 w-3 text-teal-600" />
            <span>Routine Reinforcement</span>
          </span>
        );
      case 'follow_up_prompt':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-800 border border-indigo-200">
            <Calendar className="h-3 w-3 text-indigo-600" />
            <span>Follow-up Prompt</span>
          </span>
        );
    }
  };

  return (
    <div id="recommendations-panel" className="space-y-4">
      {/* Header & Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Clinical Recommendation Engine</span>
            </h2>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600 uppercase border border-slate-200">
              AI-Augmented
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Therapeutic memory exercises, circadian cue adjustments, and caregiver follow-up prompts.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory('memory_activity')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'memory_activity'
                ? 'bg-amber-100 text-amber-900 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Memory Activities
          </button>
          <button
            onClick={() => setSelectedCategory('routine_reinforcement')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'routine_reinforcement'
                ? 'bg-teal-100 text-teal-900 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Routine Reinforcement
          </button>
          <button
            onClick={() => setSelectedCategory('engagement_improvement')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'engagement_improvement'
                ? 'bg-blue-100 text-blue-900 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Engagement Ideas
          </button>
          <button
            onClick={() => setSelectedCategory('follow_up_prompt')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'follow_up_prompt'
                ? 'bg-indigo-100 text-indigo-900 font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Follow-up Prompts
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionFeedback && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rec) => {
          const isApplied = rec.status === 'applied';
          const isDismissed = rec.status === 'dismissed';

          return (
            <div
              key={rec.id}
              id={`recommendation-card-${rec.id}`}
              className={`rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                isApplied
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : isDismissed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Top: Category, Patient & Priority */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {getCategoryBadge(rec.category)}
                    <span className="text-xs font-bold text-slate-700">
                      For: {rec.patientName}
                    </span>
                  </div>

                  {rec.priority === 'priority' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                      Priority Focus
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">
                  {rec.title}
                </h3>

                {/* Rationale */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  <strong className="text-slate-800 font-medium">Clinical Rationale:</strong> {rec.rationale}
                </p>

                {/* Suggested Action Box */}
                <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                    <FileCheck className="h-3.5 w-3.5 text-blue-600" />
                    <span>Recommended Protocol</span>
                  </div>
                  <p>{rec.suggestedAction}</p>
                </div>
              </div>

              {/* Card Bottom: Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Generated {rec.createdAt}
                </span>

                <div className="flex items-center gap-2">
                  {isApplied ? (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold text-xs bg-emerald-100 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Applied to Care Plan
                    </span>
                  ) : isDismissed ? (
                    <button
                      onClick={() => handleUpdateStatus(rec.id, 'pending', rec.title)}
                      className="text-slate-600 hover:text-slate-900 font-medium text-xs underline"
                    >
                      Undo Dismiss
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(rec.id, 'dismissed', rec.title)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(rec.id, 'applied', rec.title)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Apply to Plan</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-2 rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500">
            <p className="font-semibold text-slate-700">No recommendations for this category</p>
            <p className="text-xs mt-1">All suggested clinical actions have been reviewed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
