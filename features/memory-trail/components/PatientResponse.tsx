'use client';

import React from 'react';
import { ArrowLeft, Mic, Square, Play, Pause, Trash2, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceRecording } from '../hooks/useVoiceRecording';

interface PatientResponseProps {
  textResponse: string;
  onChangeText: (text: string) => void;
  onSave: (params: { voiceUrl?: string | null; voiceTranscript?: string; skipped?: boolean }) => void;
  onBack: () => void;
}

export function PatientResponse({
  textResponse,
  onChangeText,
  onSave,
  onBack,
}: PatientResponseProps) {
  const voice = useVoiceRecording();

  // If transcript is received from speech recognition, update textResponse
  React.useEffect(() => {
    if (voice.transcript && !textResponse) {
      onChangeText(voice.transcript);
    }
  }, [voice.transcript, textResponse, onChangeText]);

  const handleSave = () => {
    onSave({
      voiceUrl: voice.audioUrl,
      voiceTranscript: voice.transcript,
      skipped: false,
    });
  };

  const handleSkip = () => {
    onSave({ skipped: true });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FDFBF7] min-h-[85vh] flex flex-col justify-between animate-in fade-in duration-300">
      
      {/* Top Header with Step Dots */}
      <div className="space-y-6">
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

          {/* 4 Step Dots — Step 3 Active */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4A8B71]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#4A8B71]/40" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#4A8B71] ring-4 ring-[#4A8B71]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCE5E0]" />
          </div>
          <div className="w-12" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C5545]">
            Share Your Memory
          </h2>
          <p className="text-base sm:text-lg text-[#5C7065] font-medium">
            You can speak or write your memory. Take your time.
          </p>
        </div>

        {/* VOICE RECORDING SECTION */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          {voice.recordingState === 'idle' && (
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={voice.startRecording}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#4A8B71] hover:bg-[#2C5545] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer ring-8 ring-[#4A8B71]/20"
                aria-label="Tap to speak"
              >
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2]" />
              </button>
              <span className="text-lg font-bold text-[#2C5545] pt-1">
                Tap to speak
              </span>
            </div>
          )}

          {voice.recordingState === 'recording' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                {/* Gentle Pulsing Ring */}
                <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
                <button
                  onClick={voice.stopRecording}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
                  aria-label="Stop recording"
                >
                  <Square className="w-10 h-10 fill-white" />
                </button>
              </div>
              <p className="text-lg font-bold text-red-600 animate-pulse">
                I&apos;m listening... (0:{voice.recordingTimeSeconds.toString().padStart(2, '0')})
              </p>
              <span className="text-xs text-[#5C7065] font-medium">Tap square to finish speaking</span>
            </div>
          )}

          {(voice.recordingState === 'recorded' || voice.recordingState === 'playing') && (
            <div className="bg-[#F3F8F5] border border-[#DCE5E0] rounded-3xl p-4 sm:p-5 w-full max-w-sm flex flex-col items-center space-y-3 shadow-xs">
              <p className="text-base font-bold text-[#2C5545]">
                ✓ Your memory has been recorded.
              </p>

              <div className="flex items-center gap-3">
                {voice.recordingState === 'playing' ? (
                  <Button
                    variant="outline"
                    onClick={voice.pauseAudio}
                    className="rounded-full px-4 border-[#4A8B71] text-[#2C5545]"
                  >
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={voice.playAudio}
                    className="rounded-full px-4 border-[#4A8B71] text-[#2C5545]"
                  >
                    <Play className="w-4 h-4 mr-2 fill-[#2C5545]" /> Play Recording
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={voice.deleteAudio}
                  className="rounded-full text-red-600 hover:bg-red-50"
                  aria-label="Delete recording"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* OR DIVIDER */}
        <div className="flex items-center gap-4 text-[#5C7065]">
          <div className="flex-1 h-px bg-[#DCE5E0]" />
          <span className="text-sm font-bold uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[#DCE5E0]" />
        </div>

        {/* TEXT AREA */}
        <div className="space-y-2">
          <textarea
            value={textResponse}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Type your memory here..."
            rows={4}
            className="w-full p-4 rounded-3xl border-2 border-[#DCE5E0] focus:border-[#4A8B71] focus:ring-4 focus:ring-[#4A8B71]/20 bg-white text-lg font-medium text-[#2C5545] placeholder-[#5C7065]/50 shadow-xs resize-none outline-none transition-all"
          />
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          onClick={handleSkip}
          className="text-base font-bold text-[#5C7065] hover:text-[#2C5545] underline px-2 cursor-pointer"
        >
          Skip for now
        </button>

        <Button
          size="lg"
          onClick={handleSave}
          className="h-16 px-8 rounded-full text-xl font-bold bg-[#2C5545] hover:bg-[#1E3B30] text-white shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Save My Memory</span>
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </Button>
      </div>

    </div>
  );
}
