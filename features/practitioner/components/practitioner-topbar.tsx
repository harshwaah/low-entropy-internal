import React from 'react';
import { Search, Bell, Brain } from 'lucide-react';
import Image from 'next/image';

interface PractitionerTopbarProps {
  title: string;
  subtitle: string;
}

export function PractitionerTopbar({ title, subtitle }: PractitionerTopbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#dcebdd] flex items-center justify-center text-[#134e36] shrink-0">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#134e36] tracking-tight">{title}</h1>
          <p className="text-xs text-[#2C5545]/70">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patients..."
            className="pl-9 pr-4 py-2 bg-white border border-[#dcebdd] rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#134e36]/20 transition-shadow"
          />
        </div>
        <button className="relative p-2 text-[#2C5545] hover:bg-[#dcebdd] rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-2 bg-white pl-2 pr-3 py-1.5 rounded-full border border-[#dcebdd]">
          <div className="relative h-7 w-7 overflow-hidden rounded-full shrink-0">
            <Image 
              src="https://picsum.photos/seed/doctor1/100/100" 
              alt="Dr. Elena Vance" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#134e36]">Dr. Elena Vance</div>
            <div className="text-slate-500 text-[10px]">Neurology</div>
          </div>
        </div>
      </div>
    </div>
  );
}
