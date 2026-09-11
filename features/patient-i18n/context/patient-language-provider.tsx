'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { PatientLanguage, LanguageOption } from '../types';
import {
  PATIENT_LANGUAGES,
  DEFAULT_PATIENT_LANGUAGE,
  STORAGE_KEY_PATIENT_LANG,
} from '../constants/languages';
import { en } from '../locales/en';
import { hi } from '../locales/hi';
import { as } from '../locales/as';
import { mni } from '../locales/mni';
import { useMusic } from '@/features/music';

const DUCK_SOURCE_ID = 'patient-tts';

const dictionaries: Record<PatientLanguage, Record<string, any>> = {
  en,
  hi,
  as,
  mni,
};

interface PatientLanguageContextType {
  language: PatientLanguage;
  setLanguage: (lang: PatientLanguage) => void;
  speechLocale: string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
  t: (key: string, params?: Record<string, string | number>) => string;
  speakPrompt: (text: string, onEnd?: () => void) => void;
  isSpeaking: boolean;
  isVoiceSupported: boolean;
  voiceNotice: string | null;
  clearVoiceNotice: () => void;
}

const PatientLanguageContext = createContext<PatientLanguageContextType | undefined>(undefined);

export function PatientLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<PatientLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem(STORAGE_KEY_PATIENT_LANG) as PatientLanguage;
        if (savedLang && PATIENT_LANGUAGES[savedLang]) {
          return savedLang;
        }
      } catch (e) {
        // Ignore storage errors
      }
    }
    return DEFAULT_PATIENT_LANGUAGE;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const { duck, releaseDuck } = useMusic();



  const setLanguage = useCallback((newLang: PatientLanguage) => {
    if (!PATIENT_LANGUAGES[newLang]) return;
    setLanguageState(newLang);
    setVoiceNotice(null);
    try {
      localStorage.setItem(STORAGE_KEY_PATIENT_LANG, newLang);
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const clearVoiceNotice = useCallback(() => {
    setVoiceNotice(null);
  }, []);

  // Hierarchical key lookup with fallback to English and console.warn in dev
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = dictionaries[language] || dictionaries[DEFAULT_PATIENT_LANGUAGE];
      const englishDict = dictionaries[DEFAULT_PATIENT_LANGUAGE];

      const getValue = (dict: any, k: string): string | null => {
        if (!dict) return null;
        const parts = k.split('.');
        let curr = dict;
        for (const part of parts) {
          if (curr && typeof curr === 'object' && part in curr) {
            curr = curr[part];
          } else {
            return null;
          }
        }
        return typeof curr === 'string' ? curr : null;
      };

      let result = getValue(activeDict, key);

      // Fall back to English if missing in active dictionary
      if (result === null) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[patient-i18n] Missing translation key "${key}" for language "${language}". Falling back to English.`);
        }
        result = getValue(englishDict, key);
      }

      // If still missing, return the key itself
      if (result === null) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[patient-i18n] Translation key "${key}" not found in English fallback.`);
        }
        result = key;
      }

      // Interpolate parameters like {name}
      if (params && typeof result === 'string') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          result = (result as string).replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        });
      }

      return result;
    },
    [language]
  );

  const currentOption = PATIENT_LANGUAGES[language] || PATIENT_LANGUAGES[DEFAULT_PATIENT_LANGUAGE];
  const speechLocale = currentOption.speechLocale;

  // TTS implementation with audio ducking and device safety check
  const speakPrompt = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setVoiceNotice(t('speech.unsupported'));
        if (onEnd) onEnd();
        return;
      }

      // Check if browser has voices loaded or available
      const voices = window.speechSynthesis.getVoices();
      
      // Stop any existing speech
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      setVoiceNotice(null);

      // Duck background music during speech
      if (duck) {
        duck(DUCK_SOURCE_ID);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLocale;
      utterance.rate = 0.85; // Dementia-friendly slower pace
      utterance.pitch = 1.05;

      // Try to find a matching voice locale if available
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(
          (v) => v.lang.toLowerCase() === speechLocale.toLowerCase() || v.lang.startsWith(language)
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      const finishSpeech = () => {
        setIsSpeaking(false);
        if (releaseDuck) {
          releaseDuck(DUCK_SOURCE_ID);
        }
        if (onEnd) onEnd();
      };


      utterance.onend = finishSpeech;
      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice/error:', e);
        // If the specific language fails, inform patient without crashing
        if (language !== 'en') {
          setVoiceNotice(t('speech.unsupported'));
        }
        finishSpeech();
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Failed to speak prompt:', err);
        setVoiceNotice(t('speech.unsupported'));
        finishSpeech();
      }
    },
    [speechLocale, language, duck, releaseDuck, t]
  );


  const isVoiceSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }, []);

  const languagesList = useMemo(() => Object.values(PATIENT_LANGUAGES), []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      speechLocale,
      languages: languagesList,
      currentLanguageOption: currentOption,
      t,
      speakPrompt,
      isSpeaking,
      isVoiceSupported,
      voiceNotice,
      clearVoiceNotice,
    }),
    [
      language,
      setLanguage,
      speechLocale,
      languagesList,
      currentOption,
      t,
      speakPrompt,
      isSpeaking,
      isVoiceSupported,
      voiceNotice,
      clearVoiceNotice,
    ]
  );

  return (
    <PatientLanguageContext.Provider value={value}>
      {children}
    </PatientLanguageContext.Provider>
  );
}

export function usePatientTranslation() {
  const context = useContext(PatientLanguageContext);
  if (!context) {
    throw new Error('usePatientTranslation must be used within a PatientLanguageProvider');
  }
  return context;
}
