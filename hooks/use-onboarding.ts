'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';
import { OnboardingRole, OnboardingData } from '@/types/onboarding';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('smriti_onboarding_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('smriti_onboarding_change', callback);
  };
}

export function useOnboarding(role: OnboardingRole) {
  const keyComplete = `smriti_onboarding_${role}_completed`;
  const keyData = `smriti_onboarding_${role}_data`;

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const getCompleteSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(keyComplete) === 'true';
    } catch {
      return false;
    }
  }, [keyComplete]);

  const getServerCompleteSnapshot = useCallback(() => true, []);

  const isCompleted = useSyncExternalStore(
    subscribe,
    getCompleteSnapshot,
    getServerCompleteSnapshot
  );

  const getDataSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(keyData) || '';
    } catch {
      return '';
    }
  }, [keyData]);

  const getServerDataSnapshot = useCallback(() => '', []);

  const rawData = useSyncExternalStore(
    subscribe,
    getDataSnapshot,
    getServerDataSnapshot
  );

  const data = useMemo<OnboardingData | null>(() => {
    if (!rawData) return null;
    try {
      return JSON.parse(rawData);
    } catch {
      return null;
    }
  }, [rawData]);

  const completeOnboarding = useCallback(
    (onboardingData?: OnboardingData) => {
      try {
        localStorage.setItem(keyComplete, 'true');
        if (onboardingData) {
          localStorage.setItem(keyData, JSON.stringify(onboardingData));
        }
        window.dispatchEvent(new Event('smriti_onboarding_change'));
      } catch {
        // Fallback silently if storage unavailable
      }
    },
    [keyComplete, keyData]
  );

  const resetOnboarding = useCallback(() => {
    try {
      localStorage.removeItem(keyComplete);
      localStorage.removeItem(keyData);
      window.dispatchEvent(new Event('smriti_onboarding_change'));
    } catch {
      // Fallback silently if storage unavailable
    }
  }, [keyComplete, keyData]);

  return {
    isCompleted,
    isLoading: !isClient,
    data,
    completeOnboarding,
    resetOnboarding,
  };
}
