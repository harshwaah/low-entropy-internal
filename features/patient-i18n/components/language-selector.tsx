'use client';

import React, { useState } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { usePatientTranslation } from '../context/patient-language-provider';
import { PatientLanguage } from '../types';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  variant?: 'button' | 'full-card' | 'compact';
  className?: string;
}

export function LanguageSelector({ variant = 'button', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, languages, currentLanguageOption, t } = usePatientTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: PatientLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'full-card') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-xl font-extrabold text-brand-dark flex items-center gap-2">
          <Globe className="w-6 h-6 text-brand-primary" />
          {t('common.selectLanguage')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary/10 shadow-sm font-bold'
                    : 'border-brand-border bg-white hover:border-brand-primary/40 hover:bg-brand-light/30'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={lang.englishName}>
                    {lang.flagEmoji}
                  </span>
                  <div>
                    <p className="text-lg font-bold text-brand-dark leading-tight">
                      {lang.nativeName}
                    </p>
                    <p className="text-xs font-semibold text-brand-muted">
                      {lang.englishName}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={`rounded-full border-2 border-brand-primary/30 hover:border-brand-primary bg-white text-brand-dark font-bold text-sm h-11 px-4 shadow-xs flex items-center gap-2 transition-all ${className}`}
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5 text-brand-primary" />
        <span>{currentLanguageOption.nativeName}</span>
      </Button>

      {/* Dementia-friendly Language Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-brand-border space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-dark">
                    {t('common.selectLanguage')}
                  </h3>
                  <p className="text-xs text-brand-muted font-bold">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-brand-light flex items-center justify-center text-brand-muted hover:text-brand-dark transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all cursor-pointer text-left min-h-[64px] ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary shadow-sm font-bold scale-[1.01]'
                        : 'border-brand-border bg-white hover:border-brand-primary/40 text-brand-dark hover:bg-brand-light/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" role="img" aria-label={lang.englishName}>
                        {lang.flagEmoji}
                      </span>
                      <div>
                        <p className="text-xl font-bold leading-tight">
                          {lang.nativeName}
                        </p>
                        <p className="text-xs font-semibold text-brand-muted">
                          {lang.englishName}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xs">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full h-14 rounded-2xl text-lg font-bold border-2 border-brand-border hover:bg-brand-light"
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
