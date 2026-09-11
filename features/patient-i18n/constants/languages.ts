import { LanguageOption, PatientLanguage } from '../types';

export const PATIENT_LANGUAGES: Record<PatientLanguage, LanguageOption> = {
  en: {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    speechLocale: 'en-IN',
    flagEmoji: '🇬🇧',
  },
  hi: {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    speechLocale: 'hi-IN',
    flagEmoji: '🇮🇳',
  },
  as: {
    code: 'as',
    nativeName: 'অসমীয়া',
    englishName: 'Assamese',
    speechLocale: 'as-IN',
    flagEmoji: '🌾',
  },
  mni: {
    code: 'mni',
    nativeName: 'মৈতেইলোন্',
    englishName: 'Manipuri',
    speechLocale: 'mni-IN',
    flagEmoji: '🌺',
  },
};

export const DEFAULT_PATIENT_LANGUAGE: PatientLanguage = 'en';
export const STORAGE_KEY_PATIENT_LANG = 'smritisaathi:patient-lang';
