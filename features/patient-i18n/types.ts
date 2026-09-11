export type PatientLanguage = 'en' | 'hi' | 'as' | 'mni';

export interface LanguageOption {
  code: PatientLanguage;
  nativeName: string;
  englishName: string;
  speechLocale: string;
  flagEmoji: string;
}

export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};
