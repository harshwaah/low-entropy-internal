'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserPlus,
  Search,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Minus,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { ClinicalPatient } from '../types';

interface PatientsDirectoryViewProps {
  initialPatients: ClinicalPatient[];
}

export function PatientsDirectoryView({ initialPatients }: PatientsDirectoryViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'attention' | 'stable' | 'improving'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = initialPatients.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.primaryCaregiver.name.toLowerCase().includes(q);

    let matchesFilter = true;
    if (activeFilter === 'attention') {
      matchesFilter = p.riskIndicator === 'review_recommended' || p.engagementTrend === 'declining';
    } else if (activeFilter === 'stable') {
      matchesFilter = p.riskIndicator === 'optimal' || p.engagementTrend === 'stable';
    } else if (activeFilter === 'improving') {
      matchesFilter = p.engagementTrend === 'improving';
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      {/* Page Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Patients</h1>
          <p className="text-sm text-[#414944]">View and monitor your cognitive care patients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Add Patient dialog trigger')}
            className="inline-flex items-center gap-2 bg-[#013625] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#1e4d3a] transition-all active:scale-[0.99]"
            type="button"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 border border-emerald-900/10">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#013625] text-white shadow-xs'
                : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
            }`}
          >
            <span>All Patients</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeFilter === 'all' ? 'bg-[#1e4d3a] text-white' : 'bg-[#e1ebe3] text-[#414944]'}`}>
              42
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('attention')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'attention'
                ? 'bg-[#013625] text-white shadow-xs'
                : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
            }`}
          >
            <span>Requires Attention</span>
            <span className="bg-[#ffdbcf] text-[#802a05] px-2 py-0.5 rounded-full text-[11px]">
              4
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('stable')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'stable'
                ? 'bg-[#013625] text-white shadow-xs'
                : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
            }`}
          >
            <span>Stable</span>
            <span className="bg-[#c4ecd4] text-[#2a4e3c] px-2 py-0.5 rounded-full text-[11px]">
              36
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('improving')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'improving'
                ? 'bg-[#013625] text-white shadow-xs'
                : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8]'
            }`}
          >
            <span>Improving</span>
            <span className="bg-[#bbeed3] text-[#204f3c] px-2 py-0.5 rounded-full text-[11px]">
              2
            </span>
          </button>
        </div>

        {/* Search & Action Controls */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717973] h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name or ID..."
              className="w-full pl-10 pr-4 py-2 bg-[#ecf6ee] rounded-xl text-xs text-[#151d19] placeholder:text-[#717973] focus:outline-none focus:bg-[#e6f0e8] transition-colors"
            />
          </div>
          <button
            onClick={() => alert('Filter options')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#ecf6ee] text-[#151d19] rounded-xl text-xs font-semibold border border-emerald-900/10 transition-colors shadow-2xs"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#717973]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Patient Table Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-emerald-900/10 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="bg-[#ecf6ee]/70 border-b border-emerald-900/10 text-[11px] uppercase tracking-wider text-[#717973] font-semibold">
                <th className="py-4 px-6 w-[32%]">Patient</th>
                <th className="py-4 px-4 w-[10%]">Age</th>
                <th className="py-4 px-4 w-[22%]">Cognitive Score</th>
                <th className="py-4 px-4 w-[12%]">Trend</th>
                <th className="py-4 px-4 w-[14%]">Status</th>
                <th className="py-4 px-6 w-[10%] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/5">
              {filteredPatients.map((patient) => {
                const initials = patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('');
                
                const isDeclining = patient.engagementTrend === 'declining';
                const isImproving = patient.engagementTrend === 'improving';

                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#ecf6ee]/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${isDeclining ? 'bg-[#ffdbcf] text-[#802a05]' : isImproving ? 'bg-[#bbeed3] text-[#204f3c]' : 'bg-[#c4ecd4] text-[#2a4e3c]'} text-xs flex items-center justify-center font-bold shrink-0`}>
                          {initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-[#013625] tracking-tight">
                            {patient.name}
                          </span>
                          <div className="flex items-center gap-2 text-[#414944] text-xs">
                            <span className="text-[#717973] font-medium">ID: {patient.id}</span>
                            <span className="text-[#717973]/40">•</span>
                            <span>Caregiver: {patient.primaryCaregiver.name}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-[#151d19]">
                      {patient.age} yrs
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#151d19] w-10">
                          {patient.engagementScore}%
                        </span>
                        <div className="w-24 h-2 bg-[#dbe5dd] rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${isDeclining ? 'bg-[#7d2803]' : isImproving ? 'bg-[#396753]' : 'bg-[#426653]'}`}
                            style={{ width: `${patient.engagementScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isDeclining ? 'text-[#7d2803]' : isImproving ? 'text-[#1e4d3a]' : 'text-[#414944]'}`}>
                        {isDeclining ? (
                          <TrendingDown className="h-4 w-4 text-[#7d2803]" />
                        ) : isImproving ? (
                          <TrendingUp className="h-4 w-4 text-[#1e4d3a]" />
                        ) : (
                          <Minus className="h-4 w-4 text-[#717973]" />
                        )}
                        <span>
                          {isDeclining ? 'Declining' : isImproving ? 'Improving' : 'Stable'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${
                        isDeclining
                          ? 'bg-[#ffdbcf] text-[#802a05]'
                          : isImproving
                          ? 'bg-[#bbeed3] text-[#204f3c]'
                          : 'bg-[#c4ecd4] text-[#2a4e3c]'
                      }`}>
                        {isDeclining ? 'Requires Attention' : isImproving ? 'Improving' : 'Stable'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/practitioner/patient/${patient.id}`}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-xl border border-emerald-900/15 bg-white hover:bg-[#ecf6ee] text-[#013625] text-xs font-semibold transition-colors shadow-2xs"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 px-6 bg-white border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#414944]">
          <span>
            Showing <strong className="font-semibold text-[#151d19]">1–{filteredPatients.length}</strong> of{' '}
            <strong className="font-semibold text-[#151d19]">42</strong> patients
          </span>
          <div className="flex items-center gap-1.5 font-semibold">
            <button className="px-3 py-1.5 rounded-lg bg-[#ecf6ee] text-[#717973] opacity-60 cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#013625] text-white flex items-center justify-center shadow-2xs">
              1
            </button>
            <button className="w-7 h-7 rounded-lg text-[#151d19] hover:bg-[#ecf6ee] flex items-center justify-center">
              2
            </button>
            <button className="w-7 h-7 rounded-lg text-[#151d19] hover:bg-[#ecf6ee] flex items-center justify-center">
              3
            </button>
            <span className="px-1 text-[#717973]">...</span>
            <button className="w-7 h-7 rounded-lg text-[#151d19] hover:bg-[#ecf6ee] flex items-center justify-center">
              6
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#ecf6ee] hover:bg-[#e6f0e8] text-[#151d19] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
