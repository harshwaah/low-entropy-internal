'use client';

import React from 'react';
import { AudioSettings, GameCharacter } from '../types';
import { ArrowLeft, Music, Volume2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsScreenProps {
  settings: AudioSettings;
  characters: GameCharacter[];
  activeCharacter: GameCharacter;
  onUpdateSettings: (newSettings: Partial<AudioSettings>) => void;
  onSelectCharacter: (charId: string) => void;
  onBack: () => void;
}

export function SettingsScreen({
  settings,
  characters,
  activeCharacter,
  onUpdateSettings,
  onSelectCharacter,
  onBack,
}: SettingsScreenProps) {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DCE5E0] hover:bg-[#F3F8F5]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#2C5545]" />
          </Button>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545]">
            Settings
          </h2>

          <div className="w-12" />
        </div>

        {/* TOGGLES SECTION */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-4">
          
          {/* Music Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-[#4A8B71]" />
              <span className="text-base font-extrabold text-[#2C5545]">Music</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ musicOn: !settings.musicOn })}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                settings.musicOn ? 'bg-[#4A8B71]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                  settings.musicOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SFX Toggle */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-[#4A8B71]" />
              <span className="text-base font-extrabold text-[#2C5545]">Sound Effects</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ sfxOn: !settings.sfxOn })}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                settings.sfxOn ? 'bg-[#4A8B71]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                  settings.sfxOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Character Voice Toggle */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#4A8B71]" />
              <span className="text-base font-extrabold text-[#2C5545]">Character Voice</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ characterVoiceOn: !settings.characterVoiceOn })}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                settings.characterVoiceOn ? 'bg-[#4A8B71]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                  settings.characterVoiceOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* MUSIC STYLE PILLS */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-3">
          <span className="text-xs font-black uppercase text-[#4A8B71]">Music Style</span>
          <div className="flex items-center gap-2">
            {(['calm', 'happy', 'nature'] as const).map(style => (
              <button
                key={style}
                onClick={() => onUpdateSettings({ musicStyle: style })}
                className={`flex-1 py-2.5 rounded-full text-xs font-extrabold capitalize transition-all cursor-pointer ${
                  settings.musicStyle === style
                    ? 'bg-[#2C5545] text-white shadow-xs'
                    : 'bg-[#F3F8F5] text-[#5C7065] hover:bg-[#E8F3EB]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* SNAKE APPEARANCE SELECTOR */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-3">
          <span className="text-xs font-black uppercase text-[#4A8B71]">Snake Appearance</span>
          <div className="grid grid-cols-4 gap-2">
            {characters.map(char => (
              <button
                key={char.id}
                disabled={!char.unlocked}
                onClick={() => char.unlocked && onSelectCharacter(char.id)}
                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                  char.selected
                    ? 'bg-[#E8F3EB] border-[#2C5545] ring-2 ring-[#2C5545]/20 scale-105'
                    : char.unlocked
                    ? 'bg-white border-[#DCE5E0] hover:bg-[#F3F8F5]'
                    : 'bg-stone-100 border-stone-200 opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl mb-1">{char.avatarEmoji}</span>
                <span className="text-[10px] font-bold text-[#2C5545] truncate w-full text-center">
                  {char.name}
                </span>
                {!char.unlocked && (
                  <span className="text-[9px] font-bold text-stone-500">Lvl {char.unlockLevel}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* MOVEMENT SPEED SLIDER */}
        <div className="bg-white border-2 border-[#E8F3EB] rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#5C7065]">
            <span>Movement Speed</span>
            <span className="text-[#2C5545] font-extrabold">
              {settings.movementSpeed === 1 ? 'Slower' : settings.movementSpeed === 5 ? 'Faster' : 'Balanced'}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={settings.movementSpeed}
            onChange={(e) => onUpdateSettings({ movementSpeed: Number(e.target.value) })}
            className="w-full accent-[#4A8B71] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-bold text-[#5C7065]">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="pt-2 max-w-md mx-auto w-full">
        <Button
          size="lg"
          onClick={onBack}
          className="w-full h-14 rounded-full text-lg font-bold bg-[#2C5545] text-white shadow-md"
        >
          Save & Return
        </Button>
      </div>

    </div>
  );
}
