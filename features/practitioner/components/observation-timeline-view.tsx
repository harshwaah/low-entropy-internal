'use client';

import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  Plus,
  Stethoscope,
  Cpu,
  Heart,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { ClinicalObservation, ObservationType } from '../types';
import { ObservationCard } from './observation-card';
import { AddObservationModal } from './add-observation-modal';

interface ObservationTimelineViewProps {
  initialObservations: ClinicalObservation[];
  patients: { id: string; name: string }[];
  currentPatientId?: string;
  showAddButton?: boolean;
}

export function ObservationTimelineView({
  initialObservations,
  patients,
  currentPatientId,
  showAddButton = true,
}: ObservationTimelineViewProps) {
  const [observations, setObservations] = useState<ClinicalObservation[]>(initialObservations);
  const [selectedType, setSelectedType] = useState<ObservationType | 'all'>('all');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(currentPatientId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddObservation = (newObsData: Omit<ClinicalObservation, 'id' | 'timestamp'>) => {
    const newObs: ClinicalObservation = {
      ...newObsData,
      id: `obs-${Date.now()}`,
      timestamp: 'Just now',
    };
    setObservations([newObs, ...observations]);
  };

  const filtered = observations.filter((obs) => {
    if (selectedPatientId !== 'all' && obs.patientId !== selectedPatientId) {
      return false;
    }
    if (selectedType !== 'all' && obs.type !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = obs.title.toLowerCase().includes(q);
      const inSummary = obs.summary.toLowerCase().includes(q);
      const inTags = obs.tags.some((t) => t.toLowerCase().includes(q));
      const inPatient = obs.patientName.toLowerCase().includes(q);
      if (!inTitle && !inSummary && !inTags && !inPatient) return false;
    }
    return true;
  });

  return (
    <div id="observation-timeline-container" className="space-y-4">
      {/* Controls: Search, Filters, and New Note Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes, clinical tags, or symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-50 border border-slate-200/90 pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Center: Type & Patient Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Patient Selector (if not locked to one) */}
          {!currentPatientId && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Patient:</span>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden"
              >
                <option value="all">All Cohort Patients</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Type Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Note Types</option>
              <option value="care_note">Care Notes</option>
              <option value="observation">Telemetry Observations</option>
              <option value="family_update">Family Updates</option>
              <option value="significant_event">Significant Events</option>
            </select>
          </div>

          {/* Action: Add Note */}
          {showAddButton && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition-colors ml-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Record Clinical Note</span>
            </button>
          )}
        </div>
      </div>

      {/* Observation Count & Active Filter Pills */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span>
          Showing <strong>{filtered.length}</strong> chronological clinical observations
        </span>
        {(selectedType !== 'all' || selectedPatientId !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedPatientId(currentPatientId || 'all');
              setSearchQuery('');
            }}
            className="text-blue-700 hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Observation Cards Stream */}
      <div className="space-y-3">
        {filtered.map((obs) => (
          <ObservationCard key={obs.id} observation={obs} />
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center text-slate-500">
            <ClipboardList className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No clinical observations found</p>
            <p className="text-xs mt-1">Try selecting a different filter category or search phrase.</p>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <AddObservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddObservation}
        patients={patients}
        defaultPatientId={currentPatientId}
      />
    </div>
  );
}
