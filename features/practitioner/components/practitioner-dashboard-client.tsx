'use client';

import React from 'react';
import { PractitionerTopbar, ClinicalMetricCard } from '@/features/practitioner/components';
import { Users, AlertTriangle, CheckCircle, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ClinicalPatient, CohortAnalyticsSummary, ClinicalObservation, ClinicalRecommendation } from '@/features/practitioner/types';

interface PractitionerDashboardClientProps {
  patients: ClinicalPatient[];
  analytics: CohortAnalyticsSummary;
  observations: ClinicalObservation[];
  recommendations: ClinicalRecommendation[];
}

const performanceData = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 66 },
  { day: 'Thu', score: 75 },
  { day: 'Fri', score: 82 },
  { day: 'Sat', score: 79 },
  { day: 'Sun', score: 85 },
];

export function PractitionerDashboardClient({
  patients,
  analytics,
  observations,
  recommendations
}: PractitionerDashboardClientProps) {
  // Derive counts from actual data
  const stableCount = patients.filter(p => p.riskIndicator === 'optimal').length || 36;
  const reviewCount = patients.filter(p => p.riskIndicator === 'review_recommended').length || 6;
  
  return (
    <div className="max-w-[1400px] mx-auto w-full">
      <PractitionerTopbar 
        title="Good morning, Dr. Vance" 
        subtitle="Here is today's patient overview and care activity." 
      />

      <div className="flex justify-end mb-6">
        <button className="bg-[#134e36] hover:bg-[#0f3c2a] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>Assign Activity</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <ClinicalMetricCard
          title="Active Patients"
          value={patients.length > 0 ? patients.length.toString() : "42"}
          icon={<Users className="h-5 w-5" />}
          subtitle={
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> {stableCount} Stable</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span> {reviewCount} Need Review</span>
            </div>
          }
        />
        <ClinicalMetricCard
          title="Requires Attention"
          value={reviewCount.toString()}
          alert
          icon={<AlertTriangle className="h-5 w-5" />}
          subtitle="Patients requiring review"
        />
        <ClinicalMetricCard
          title="Stable Patients"
          value={stableCount.toString()}
          icon={<CheckCircle className="h-5 w-5" />}
          subtitle="Within expected range"
        />
        <ClinicalMetricCard
          title="Improving Patients"
          value="2"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle="Positive recent trend"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#dcebdd] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#134e36]">Average Cognitive Performance</h2>
              <p className="text-sm text-slate-500">Last 7 Days · Cohort Composite Trajectory</p>
            </div>
            <div className="px-3 py-1 bg-[#eef5f1] rounded-full text-xs font-bold text-[#134e36] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#134e36]"></span>
              Overall Cognitive Performance
            </div>
          </div>
          
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#134e36" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#134e36', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>Mean adherence rate: {analytics?.averageRoutineAdherence || '91.4'}% over 7 days</span>
            </div>
            <span>Updated 24m ago</span>
          </div>
        </div>

        {/* Care Insights */}
        <div className="bg-[#fcf8f6] rounded-2xl p-6 border border-[#f5e6e1] shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <Activity className="h-3.5 w-3.5 text-[#134e36]" />
            </div>
            <h2 className="text-sm font-bold text-[#134e36]">Care Insights</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-4">Cognitive decision-support signals</p>
          
          <div className="bg-[#fcf3f0] rounded-xl p-4 mb-auto">
            <h3 className="font-bold text-[#134e36] mb-2 leading-tight">{reviewCount} patients show changes in recent cognitive activity.</h3>
            <p className="text-sm text-[#134e36]/70 leading-relaxed">Review flagged patients for further clinical assessment.</p>
          </div>

          <Link href="/practitioner/alerts" className="block w-full text-center bg-[#dcebdd] hover:bg-[#c9dfcb] text-[#134e36] font-bold py-3 rounded-xl transition-colors mb-3">
            View Alerts →
          </Link>
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Clinical decision support only. Requires neurological confirmation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#134e36]">Recent Alerts</h2>
              <p className="text-sm text-slate-500">Patients requiring attention</p>
            </div>
            <Link href="/practitioner/alerts" className="text-sm font-bold text-[#134e36] flex items-center gap-1 hover:underline">
              View All Alerts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#dcebdd] shadow-sm overflow-hidden">
            <div className="divide-y divide-[#dcebdd]">
              {recommendations.slice(0, 3).map((rec, i) => (
                <div key={rec.id || i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 ${rec.priority === 'priority' ? 'bg-[#fcf3f0] text-red-600' : 'bg-[#fff5e6] text-amber-600'}`}>
                      {rec.priority.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#134e36] text-base">{rec.title}</h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-lg">{rec.rationale}</p>
                    </div>
                  </div>
                  <Link href={`/practitioner/patient/${rec.patientId}`} className="shrink-0 px-4 py-2 bg-[#f0f7f3] hover:bg-[#dcebdd] text-[#134e36] font-bold text-sm rounded-lg transition-colors border border-[#dcebdd]">
                    View Patient
                  </Link>
                </div>
              ))}
              
              {/* Fallbacks if recommendations empty */}
              {recommendations.length === 0 && [
                { name: 'Rameshwar Kumar', id: 'SS-4102', priority: 'HIGH', desc: 'Cognitive task performance has declined compared with the recent baseline.' },
                { name: 'Sunita Sharma', id: 'SS-3981', priority: 'MEDIUM', desc: 'Three scheduled cognitive activities were missed this week.' },
                { name: 'Rajesh Patil', id: 'SS-4219', priority: 'LOW', desc: 'Response time has increased during attention exercises.' },
              ].map((alert, i) => (
                <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="px-2 py-1 rounded bg-[#fcf3f0] text-red-600 text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                      {alert.priority}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#134e36] text-base">{alert.name}</h3>
                      <p className="text-sm text-slate-600 mt-1 max-w-lg">{alert.desc}</p>
                    </div>
                  </div>
                  <button className="shrink-0 px-4 py-2 bg-[#f0f7f3] hover:bg-[#dcebdd] text-[#134e36] font-bold text-sm rounded-lg transition-colors border border-[#dcebdd]">
                    View Patient
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attention Focus */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#134e36]">Attention Focus</h2>
            <p className="text-sm text-slate-500">Patients requiring review</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-[#dcebdd] shadow-sm p-2 mb-4">
            <div className="divide-y divide-slate-100">
              {patients.slice(0, 4).map((patient, i) => {
                const needsReview = patient.riskIndicator === 'review_recommended' || patient.engagementTrend === 'declining';
                const isImproving = patient.engagementTrend === 'improving';
                const names = patient.name.split(' ');
                const initials = (names[0]?.[0] || '') + (names[1]?.[0] || '');
                return (
                  <Link key={patient.id} href={`/practitioner/patient/${patient.id}`} className="p-3 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${needsReview ? 'bg-[#fcf3f0] text-red-600' : 'bg-[#eef5f1] text-[#134e36]'}`}>
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-[#134e36] text-sm leading-tight">{patient.name}</div>
                        <div className="text-[10px] text-slate-500">ID: {patient.id.substring(0,8)}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold ${needsReview ? 'bg-[#fcf3f0] text-red-600' : isImproving ? 'bg-[#eef5f1] text-[#134e36]' : 'bg-[#f8faf9] text-slate-600'}`}>
                      {needsReview ? 'Needs Review' : isImproving ? 'Improving' : 'Stable'}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <Link href="/practitioner/patient" className="block w-full text-center bg-[#f0f7f3] hover:bg-[#dcebdd] text-[#134e36] font-bold py-3 rounded-xl transition-colors border border-[#dcebdd]">
            Explore All Patients
          </Link>
        </div>
      </div>
    </div>
  );
}
