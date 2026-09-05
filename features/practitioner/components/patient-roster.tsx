'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
} from 'lucide-react';
import { ClinicalPatient, ClinicalStage, ClinicalRiskLevel } from '../types';
import { PatientSummaryCard } from './patient-summary-card';

interface PatientRosterProps {
  patients: ClinicalPatient[];
}

export function PatientRoster({ patients }: PatientRosterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<ClinicalStage | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<ClinicalRiskLevel | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'engagement' | 'adherence'>('engagement');

  const filteredPatients = useMemo(() => {
    let list = [...patients];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          p.primaryCaregiver.name.toLowerCase().includes(q)
      );
    }

    if (stageFilter !== 'all') {
      list = list.filter((p) => p.stage === stageFilter);
    }

    if (riskFilter !== 'all') {
      list = list.filter((p) => p.riskIndicator === riskFilter);
    }

    list.sort((a, b) => {
      if (sortBy === 'engagement') return b.engagementScore - a.engagementScore;
      if (sortBy === 'adherence') return b.routineAdherenceScore - a.routineAdherenceScore;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [patients, searchQuery, stageFilter, riskFilter, sortBy]);

  return (
    <div id="patient-roster-section" className="space-y-4">
      {/* Controls Bar: Search, Filters, and View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, diagnosis, or caregiver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-50 border border-slate-200/90 pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
          />
        </div>

        {/* Center/Right: Filters & View Mode */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Stage Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as any)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Stages</option>
              <option value="early">Early Stage</option>
              <option value="moderate">Moderate Stage</option>
              <option value="advanced">Advanced Stage</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="optimal">Optimal</option>
              <option value="mild_variance">Mild Variance</option>
              <option value="review_recommended">Review Needed</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="engagement">Engagement</option>
              <option value="adherence">Routine Adherence</option>
              <option value="name">Patient Name</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-100 ml-auto lg:ml-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Clinical Table View"
            >
              <TableIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Roster Counter */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span>
          Showing <strong>{filteredPatients.length}</strong> of {patients.length} cohort patients
        </span>
        {(stageFilter !== 'all' || riskFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setStageFilter('all');
              setRiskFilter('all');
            }}
            className="text-blue-700 hover:underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <PatientSummaryCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

      {/* Clinical Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl bg-white border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5 pl-5">Patient Name</th>
                <th className="p-3.5">Stage & Condition</th>
                <th className="p-3.5">Primary Caregiver</th>
                <th className="p-3.5 text-center">Engagement</th>
                <th className="p-3.5 text-center">Memory</th>
                <th className="p-3.5 text-center">Routine Adherence</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  <td className="p-3.5 pl-5">
                    <Link
                      href={`/practitioner/patient/${patient.id}`}
                      className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors block"
                    >
                      {patient.name}
                    </Link>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {patient.age}y • {patient.gender[0]}
                    </span>
                  </td>
                  <td className="p-3.5 max-w-[200px]">
                    <span className="capitalize font-semibold text-slate-700">
                      {patient.stage} Stage
                    </span>
                    <p className="text-[11px] text-slate-500 truncate">
                      {patient.condition}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-800">
                      {patient.primaryCaregiver.name}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {patient.primaryCaregiver.relation}
                    </p>
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-slate-900">
                    {patient.engagementScore}%
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-amber-700">
                    {patient.memoryActivityScore}%
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-teal-700">
                    {patient.routineAdherenceScore}%
                  </td>
                  <td className="p-3.5">
                    {patient.riskIndicator === 'optimal' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        <span>Optimal</span>
                      </span>
                    )}
                    {patient.riskIndicator === 'mild_variance' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>Variance</span>
                      </span>
                    )}
                    {patient.riskIndicator === 'review_recommended' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-800 border border-indigo-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>Review</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <Link
                      href={`/practitioner/patient/${patient.id}`}
                      className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-800 hover:underline"
                    >
                      <span>Review</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPatients.length === 0 && (
        <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center text-slate-500">
          <p className="font-semibold text-slate-800">No matching cohort patients found</p>
          <p className="text-xs mt-1">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}
