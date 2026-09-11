import React from 'react';

interface ClinicalMetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string | React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

export function ClinicalMetricCard({ title, value, icon, subtitle, alert }: ClinicalMetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#dcebdd] shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className={`p-1.5 rounded-lg ${alert ? 'bg-red-50 text-red-500' : 'bg-[#eef5f1] text-[#134e36]'}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className={`text-3xl font-bold mb-3 ${alert ? 'text-red-500' : 'text-[#134e36]'}`}>
          {value}
        </div>
        <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          {alert ? (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
          )}
          {subtitle}
        </div>
      </div>
    </div>
  );
}
