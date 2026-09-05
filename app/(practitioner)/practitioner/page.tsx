import React from 'react';
import {
  practitionerService,
  ClinicalOverviewCards,
  PatientRoster,
  CohortAnalyticsView,
  RecommendationsPanel,
  RecentObservationsFeed,
} from '@/features/practitioner';
import { Stethoscope, ShieldCheck, Download, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function PractitionerDashboardPage() {
  const [patients, analytics, observations, recommendations] = await Promise.all([
    practitionerService.getPatients(),
    practitionerService.getCohortAnalytics(),
    practitionerService.getObservations(),
    practitionerService.getRecommendations(),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Clinical Command Center Header */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Practitioner Command Center
              </h1>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-semibold text-blue-800">
                Neurology & Memory Care
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Live Telemetry</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
              Longitudinal cognitive preservation indices, autonomous circadian routine compliance, and collaborative caregiver notes across your active memory clinic cohort.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <Link
              href="/practitioner/observations"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3.5 py-2 text-xs font-semibold shadow-xs transition-colors"
            >
              <span>View All Observations</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. Clinical Overview Cards */}
      <section id="clinical-overview-metrics">
        <ClinicalOverviewCards analytics={analytics} patientCount={patients.length} />
      </section>

      {/* 2. Analytics & Insights Visual Dashboards */}
      <section id="cohort-analytics-insights">
        <CohortAnalyticsView analytics={analytics} />
      </section>

      {/* 3. Patient Roster & Risk Stratification */}
      <section id="patient-roster">
        <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Patient Roster & Risk Stratification
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Individual patient clinical summaries with engagement scoring and calm risk indicators.
            </p>
          </div>
        </div>
        <PatientRoster patients={patients} />
      </section>

      {/* 4. Two-Column Layout: Recent Observations & Recommendations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Recent Observations Feed */}
        <div>
          <RecentObservationsFeed observations={observations} maxItems={4} />
        </div>

        {/* Right Column: AI-Augmented Recommendations */}
        <div>
          <RecommendationsPanel initialRecommendations={recommendations} />
        </div>
      </section>
    </div>
  );
}
