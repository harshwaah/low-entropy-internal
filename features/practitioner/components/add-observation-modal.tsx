'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Stethoscope, Plus } from 'lucide-react';
import { ClinicalObservation, ObservationType } from '../types';

interface AddObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (obs: Omit<ClinicalObservation, 'id' | 'timestamp'>) => void;
  patients: { id: string; name: string }[];
  defaultPatientId?: string;
}

export function AddObservationModal({
  isOpen,
  onClose,
  onAdd,
  patients,
  defaultPatientId,
}: AddObservationModalProps) {
  const [patientId, setPatientId] = useState(defaultPatientId || (patients[0]?.id || 'p-101'));
  const [type, setType] = useState<ObservationType>('care_note');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [detail, setDetail] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const selectedPatient = patients.find((p) => p.id === patientId);

    onAdd({
      patientId,
      patientName: selectedPatient ? selectedPatient.name : 'Kamal Sharma',
      type,
      title: title.trim(),
      summary: summary.trim(),
      detail: detail.trim() || summary.trim(),
      author: {
        name: 'Dr. Arvind Sen, MD',
        role: 'Attending Neurologist',
        type: 'physician',
      },
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      sentiment: 'positive',
      actionTaken: actionTaken.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        id="add-observation-modal-card"
        className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 shadow-xl space-y-4"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Clinical Note</h3>
              <p className="text-xs text-slate-500">Document physician observation or care plan adjustment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Patient Selector & Note Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Patient Roster
              </label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 focus:outline-hidden"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Entry Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ObservationType)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 focus:outline-hidden"
              >
                <option value="care_note">Care Note</option>
                <option value="observation">Clinical Observation</option>
                <option value="family_update">Family Conference</option>
                <option value="significant_event">Significant Event</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Headline Summary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Preserved episodic recall during morning raga session"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Quick Summary */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Clinical Synopsis <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="Concise 1-2 sentence overview for rapid scanning..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Detailed Narrative */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Detailed Narrative & Behavioral Context
            </label>
            <textarea
              rows={3}
              placeholder="Full observation narrative, affect indicators, or cognitive milestone correlation..."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Tags & Action Taken */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="Reminiscence, Sitar, Donepezil"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Action Taken / Care Modification
              </label>
              <input
                type="text"
                placeholder="Preserved dosage, scheduled tele-check"
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2 text-xs text-slate-900 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Save Clinical Note</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
