'use client';

import { useState, useEffect } from 'react';

export type CircadianStage = 'morning' | 'afternoon' | 'evening';

export interface CircadianInfo {
  stage: CircadianStage;
  label: string;
  tagline: string;
  badgeEmoji: string;
  badgeColor: string;
  themeBg: string;
  greetingPrefix: string;
  currentTimeFormatted: string;
  currentDateFormatted: string;
  dayOfWeek: string;
  setManualStage: (stage: CircadianStage | null) => void;
  manualStage: CircadianStage | null;
}

export function useCircadianStage(): CircadianInfo {
  const [manualStage, setManualStage] = useState<CircadianStage | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    // Update live clock every minute
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Compute stage from current hour
  const hour = now.getHours();
  let computedStage: CircadianStage = 'morning';
  if (hour >= 12 && hour < 17) {
    computedStage = 'afternoon';
  } else if (hour >= 17 || hour < 5) {
    computedStage = 'evening';
  }

  const activeStage = manualStage || computedStage;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = days[now.getDay()];
  const currentDateFormatted = `${dayOfWeek}, ${months[now.getMonth()]} ${now.getDate()}`;
  
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const currentTimeFormatted = `${hours}:${minutes} ${ampm}`;

  const stageConfigs = {
    morning: {
      label: 'Morning Awakening',
      tagline: 'A gentle start to a bright, peaceful day',
      badgeEmoji: '🌅',
      badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-300',
      themeBg: 'bg-amber-50/50',
      greetingPrefix: 'Good Morning',
    },
    afternoon: {
      label: 'Afternoon Engagement',
      tagline: 'Warm moments, cherished memories & mindful fun',
      badgeEmoji: '☀️',
      badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
      themeBg: 'bg-emerald-50/40',
      greetingPrefix: 'Good Afternoon',
    },
    evening: {
      label: 'Evening Wind-Down',
      tagline: 'Reflecting with warmth, comfort & gentle music',
      badgeEmoji: '🌙',
      badgeColor: 'bg-purple-100/90 text-purple-900 border-purple-300',
      themeBg: 'bg-purple-50/40',
      greetingPrefix: 'Good Evening',
    },
  };

  const config = stageConfigs[activeStage];

  return {
    stage: activeStage,
    label: config.label,
    tagline: config.tagline,
    badgeEmoji: config.badgeEmoji,
    badgeColor: config.badgeColor,
    themeBg: config.themeBg,
    greetingPrefix: config.greetingPrefix,
    currentTimeFormatted,
    currentDateFormatted,
    dayOfWeek,
    setManualStage,
    manualStage,
  };
}
