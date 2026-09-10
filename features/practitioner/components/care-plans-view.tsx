'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileCheck, Plus, CheckCircle2, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { ClinicalCarePlan } from '../types';

interface CarePlansViewProps {
  carePlans: ClinicalCarePlan[];
}

export function CarePlansView({ carePlans }: CarePlansViewProps) {
  const [plans] = useState<ClinicalCarePlan[]>(carePlans);

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Care Plans</h1>
          <p className="text-sm text-[#414944]">Manage cognitive exercise protocols and clinical targets for your patients.</p>
        </div>
        <button
          onClick={() => alert('New Care Plan wizard')}
          className="inline-flex items-center gap-2 bg-[#013625] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs hover:bg-[#1e4d3a] transition-all active:scale-[0.99]"
        >
          <Plus className="h-4 w-4" />
          <span>Create Care Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-900/10 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-[#717973]">Patient: {plan.patientName} ({plan.patientId})</span>
                  <h2 className="text-lg font-bold text-[#013625]">{plan.title}</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#c4ecd4] text-[#2a4e3c] uppercase">
                  {plan.status}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#414944] mb-1">Clinical Goals</h4>
                <ul className="space-y-1 text-xs text-[#151d19]">
                  {plan.goals.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1e4d3a] shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#414944] mb-1">Assigned Activities</h4>
                <div className="space-y-1.5">
                  {plan.assignedActivities.map((act, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#ecf6ee] text-xs flex items-center justify-between">
                      <span className="font-semibold text-[#013625]">{act.name}</span>
                      <span className="text-[11px] text-[#414944]">{act.frequency} • {act.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-[#717973] border-t border-emerald-900/5">
                <p><strong className="text-[#151d19]">Medications:</strong> {plan.medicationScheduleSummary}</p>
                <p className="mt-1"><strong className="text-[#151d19]">Caregiver Note:</strong> {plan.caregiverInstructions}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-900/10 text-xs">
              <span className="text-[#717973]">Updated: {plan.updatedAt}</span>
              <Link
                href={`/practitioner/patient/${plan.patientId}`}
                className="inline-flex items-center gap-1 font-semibold text-[#013625] hover:text-[#1e4d3a]"
              >
                <span>View Patient Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
