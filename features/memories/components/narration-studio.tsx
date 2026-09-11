'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MemoryItem, MemoryStory, NarrationStep } from '../types';
import { getNarrationTemplateForMemory } from '../data/sample-stories';
import { storyService } from '../services/story-service';
import { StoryMemoirView } from './story-memoir-view';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  Square, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Heart, 
  Check, 
  BookOpen, 
  Volume2, 
  Clock, 
  Smile, 
  Sparkle
} from 'lucide-react';

interface NarrationStudioProps {
  memory: MemoryItem;
}

export function NarrationStudio({ memory }: NarrationStudioProps) {
  const router = useRouter();
  const template = getNarrationTemplateForMemory(memory.id, memory.title);

  // States
  const [step, setStep] = useState<NarrationStep>('ready');
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [completedStory, setCompletedStory] = useState<MemoryStory | null>(null);
  
  // AI structuring sub-steps for calming transition
  const [structuringPhase, setStructuringPhase] = useState<'listening' | 'understanding' | 'creating'>('listening');

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Recording Simulation Timer
  useEffect(() => {
    if (step === 'listening') {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  // Format recording timer: mm:ss
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Speaking / Recording
  const handleStartRecording = () => {
    setStep('listening');
    setRecordingSeconds(0);
    
    // If transcript is empty, simulate natural speech arrival
    if (!spokenTranscript) {
      // Simulate real-time words appearing gradually
      const fullWords = template.mockSpokenTranscript.split(' ');
      let currentWordIdx = 0;
      
      const speechInterval = setInterval(() => {
        currentWordIdx += 3;
        if (currentWordIdx <= fullWords.length) {
          setSpokenTranscript(fullWords.slice(0, currentWordIdx).join(' '));
        } else {
          setSpokenTranscript(template.mockSpokenTranscript);
          clearInterval(speechInterval);
        }
      }, 350);
    }
  };

  // Stop Recording / Finish Speaking
  const handleStopRecording = () => {
    setStep('review');
    if (!spokenTranscript) {
      setSpokenTranscript(template.mockSpokenTranscript);
    }
  };

  // Select a preset prompt phrase
  const handleSelectStarterPhrase = (phrase: string) => {
    if (step === 'ready') {
      setSpokenTranscript(phrase + ' ' + template.mockSpokenTranscript.slice(phrase.length));
      setStep('listening');
    } else {
      setSpokenTranscript((prev) => (prev ? prev + ' ' + phrase : phrase));
    }
  };

  // Reset and try again
  const handleReset = () => {
    setStep('ready');
    setSpokenTranscript('');
    setRecordingSeconds(0);
  };

  // Trigger AI Story Creation
  const handleCreateStory = () => {
    setStep('structuring');
    setStructuringPhase('listening');

    // Calming progressive transitions
    setTimeout(() => {
      setStructuringPhase('understanding');
    }, 1200);

    setTimeout(() => {
      setStructuringPhase('creating');
    }, 2400);

    setTimeout(() => {
      // Generate the finished MemoryStory
      const newStory: MemoryStory = {
        id: `story-${memory.id}-${Date.now()}`,
        memoryId: memory.id,
        memoryTitle: memory.title,
        storyTitle: template.generatedStoryTitle,
        narratedBy: 'Meera Sharma',
        narratedRole: 'Narrated with Saathi',
        recordedAt: new Date().toISOString(),
        formattedDate: 'Just now',
        category: memory.category,
        coverImage: memory.coverImage,
        location: memory.location || 'Home',
        yearEra: memory.dateEra || 'Treasured Years',
        transcriptExcerpt: spokenTranscript || template.mockSpokenTranscript,
        narrativeParagraphs: template.generatedStoryChapters,
        emotionalTakeaway: template.emotionalTakeaway,
        keyPhrases: template.keyPhrases,
        peopleMentioned: memory.familiarPeople?.length ? memory.familiarPeople : template.peopleMentioned,
        audioDuration: recordingSeconds > 0 ? formatTimer(recordingSeconds) : '1:45',
        caregiverNote: `Meera narrated a heartfelt story about "${memory.title}". She spoke with a glowing smile and warm enthusiasm.`,
        practitionerEngagement: {
          verbalParticipation: 'High',
          emotionalResonance: 'Deeply Joyful',
          sessionDurationSeconds: Math.max(recordingSeconds, 120),
          promptResponseLatency: 'Natural',
        },
      };

      // Save into service and localStorage
      storyService.saveStory(newStory);
      setCompletedStory(newStory);
      setStep('complete');
    }, 3600);
  };

  // If completed, show the beautiful finished memoir directly!
  if (step === 'complete' && completedStory) {
    return <StoryMemoirView story={completedStory} fromNarration={true} />;
  }

  return (
    <div id="narration-studio-container" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-20">
      
      {/* 1. Header with Back Button and Quick Memory Context */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link 
          href={`/patient/memories/${memory.id}`}
          className="focus:outline-none focus:ring-4 focus:ring-brand-primary/30 rounded-full"
        >
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full bg-white hover:bg-amber-50 border-2 border-[#EFE5D5] text-brand-dark font-bold h-13 px-5 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Memory</span>
          </Button>
        </Link>

        {/* Small Memory Pill Context */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-200/90 shadow-xs">
          <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
            <Image
              src={memory.coverImage}
              alt={memory.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-bold text-brand-dark truncate max-w-[180px] sm:max-w-[280px]">
            {memory.title}
          </span>
        </div>
      </div>

      {/* 2. Progress Stepper Bar */}
      <div className="bg-white rounded-full p-2 border-2 border-[#EFE5D5] shadow-xs flex items-center justify-between max-w-xl mx-auto">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
          step === 'ready' || step === 'listening'
            ? 'bg-brand-primary text-white shadow-xs'
            : 'text-brand-muted'
        }`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
          <span>Speak Memory</span>
        </div>

        <div className="h-0.5 w-6 bg-amber-200" />

        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
          step === 'review'
            ? 'bg-brand-primary text-white shadow-xs'
            : 'text-brand-muted'
        }`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
          <span>Review Words</span>
        </div>

        <div className="h-0.5 w-6 bg-amber-200" />

        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
          step === 'structuring'
            ? 'bg-brand-primary text-white shadow-xs'
            : 'text-brand-muted'
        }`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">3</span>
          <span>Weave Memoir</span>
        </div>
      </div>

      {/* 3. AI Story Generation Experience (Listening -> Understanding -> Creating Story) */}
      {step === 'structuring' && (
        <div 
          id="ai-story-structuring-screen"
          className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EF] to-[#FFF3E0] rounded-[3rem] p-8 sm:p-14 border-2 border-amber-300 shadow-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-500"
        >
          {/* Calming Companion Mascot */}
          <div className="relative inline-block mx-auto">
            <Mascot
              size="lg"
              state="holding-book"
              showSpeechBubble={false}
              className="drop-shadow-md"
            />
            <div className="absolute -inset-4 rounded-full bg-amber-200/30 blur-xl animate-pulse pointer-events-none" />
          </div>

          <div className="space-y-3 max-w-md mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-200 text-xs font-black uppercase tracking-wider text-brand-primary shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smriti Story Weaver</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-snug">
              {structuringPhase === 'listening' && 'Listening with warm attention...'}
              {structuringPhase === 'understanding' && 'Cherishing the people and feelings...'}
              {structuringPhase === 'creating' && 'Weaving your words into a treasured storybook page...'}
            </h2>

            <p className="text-sm sm:text-base text-brand-muted font-medium leading-relaxed">
              {structuringPhase === 'listening' && 'Connecting your spoken reflections to the memories of this day.'}
              {structuringPhase === 'understanding' && 'Safeguarding the gentle love, laughter, and names you shared.'}
              {structuringPhase === 'creating' && 'Your personal memoir is almost ready to grace your Memory Scrapbook.'}
            </p>
          </div>

          {/* Calming Visual Step Progression */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
            <div className={`w-full sm:w-1/3 p-4 rounded-2xl border transition-all ${
              structuringPhase === 'listening'
                ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-extrabold scale-105 shadow-sm'
                : 'bg-white/70 border-[#EFE5D5] text-brand-muted font-medium'
            }`}>
              <div className="text-xl mb-1">🎧</div>
              <div className="text-xs">Listening</div>
            </div>

            <div className={`w-full sm:w-1/3 p-4 rounded-2xl border transition-all ${
              structuringPhase === 'understanding'
                ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-extrabold scale-105 shadow-sm'
                : 'bg-white/70 border-[#EFE5D5] text-brand-muted font-medium'
            }`}>
              <div className="text-xl mb-1">🌿</div>
              <div className="text-xs">Understanding</div>
            </div>

            <div className={`w-full sm:w-1/3 p-4 rounded-2xl border transition-all ${
              structuringPhase === 'creating'
                ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-extrabold scale-105 shadow-sm'
                : 'bg-white/70 border-[#EFE5D5] text-brand-muted font-medium'
            }`}>
              <div className="text-xl mb-1">✨</div>
              <div className="text-xs">Creating Story</div>
            </div>
          </div>

          <div className="w-48 h-2 bg-amber-200/60 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-brand-primary rounded-full animate-pulse w-full" />
          </div>
        </div>
      )}

      {/* 4. Active Narration / Review Experience */}
      {step !== 'structuring' && (
        <div className="space-y-8">
          
          {/* Companion Guidance Banner */}
          <section className="bg-[#FFFDF9] rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#EFE5D5] shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <Mascot
              size="md"
              state={step === 'listening' ? 'thinking' : step === 'review' ? 'happy' : 'encouraging'}
              showSpeechBubble={false}
              className="shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand-primary">
                <Smile className="w-3.5 h-3.5" /> Companion Saathi
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
                {step === 'listening'
                  ? '&ldquo;I am listening, Meera ji. Take all the time you need.&rdquo;'
                  : step === 'review'
                  ? '&ldquo;What lovely words! Would you like me to craft this into a story?&rdquo;'
                  : `&ldquo;${template.suggestedPrompt}&rdquo;`}
              </h2>
              <p className="text-sm sm:text-base text-brand-muted font-medium">
                {step === 'listening'
                  ? 'Speak freely about whatever comes to mind. There are no right or wrong words.'
                  : 'Tap the large button below to speak, or pick any phrase that touches your heart.'}
              </p>
            </div>
          </section>

          {/* Spoken Transcript Area (Styled like warm handwritten journal paper) */}
          <section className="relative bg-[#FFFDF9] rounded-[2.5rem] p-6 sm:p-10 border-2 border-[#EFE5D5] shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0E6D8] pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-brand-primary" />
                <span>Your Spoken Reflection</span>
              </span>

              {recordingSeconds > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>{formatTimer(recordingSeconds)}</span>
                </span>
              )}
            </div>

            {/* Transcript Text Box */}
            <div className="min-h-[140px] flex items-center">
              {spokenTranscript ? (
                <p className="text-lg sm:text-2xl text-brand-dark font-medium leading-relaxed font-serif italic">
                  &ldquo;{spokenTranscript}&rdquo;
                </p>
              ) : (
                <p className="text-base sm:text-lg text-brand-muted italic leading-relaxed">
                  When you tap the record button, your spoken words will appear here softly in real time...
                </p>
              )}
            </div>

            {/* If in listening mode, soundwave animation */}
            {step === 'listening' && (
              <div className="pt-2 flex items-center justify-center gap-1.5 h-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-brand-primary animate-pulse"
                    style={{
                      height: `${Math.max(25, (Math.sin(i * 0.6) * 0.5 + 0.5) * 90)}%`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Quick Memory Starter Phrases (Accessible 1-tap demonstration) */}
          <section className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-brand-muted px-2 flex items-center gap-1">
              <Sparkle className="w-3.5 h-3.5 text-amber-500" />
              <span>Memories You Can Say (Tap to speak instantly):</span>
            </span>

            <div className="flex flex-wrap gap-2.5">
              {template.starterPhrases.map((phrase, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectStarterPhrase(phrase)}
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-amber-50 border-2 border-[#EFE5D5] hover:border-amber-300 text-xs sm:text-sm font-bold text-brand-dark shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span className="text-amber-600">💬</span>
                  <span>&ldquo;{phrase}&rdquo;</span>
                </button>
              ))}
            </div>
          </section>

          {/* Large Tactile Record & Action Control Hub */}
          <section className="bg-gradient-to-br from-[#FFF9F0] via-[#FFF5E6] to-[#FFF0D4] rounded-[3rem] p-8 sm:p-12 border-2 border-amber-200/90 shadow-lg flex flex-col items-center justify-center gap-6 text-center">
            
            {/* The Record Button */}
            {step === 'ready' && (
              <button
                type="button"
                id="start-narration-record-btn"
                onClick={handleStartRecording}
                className="group relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white flex flex-col items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white/60 cursor-pointer"
                aria-label="Start recording your memory"
              >
                <div className="absolute -inset-2 rounded-full bg-brand-primary/20 blur-md group-hover:bg-brand-primary/30 transition-all pointer-events-none" />
                <Mic className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-sm" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  Tap to Speak
                </span>
              </button>
            )}

            {step === 'listening' && (
              <button
                type="button"
                id="stop-narration-record-btn"
                onClick={handleStopRecording}
                className="group relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex flex-col items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white/60 cursor-pointer animate-pulse"
                aria-label="Pause or finish recording"
              >
                <Square className="w-9 h-9 sm:w-12 sm:h-12 fill-white drop-shadow-sm" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  I Am Done
                </span>
              </button>
            )}

            {step === 'review' && (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button
                  onClick={handleCreateStory}
                  size="lg"
                  className="min-h-16 px-10 rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-white/40 flex items-center justify-center gap-3 cursor-pointer"
                  id="create-treasured-story-btn"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Create My Story</span>
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="min-h-14 px-6 rounded-full bg-white hover:bg-amber-50 text-brand-dark font-bold text-sm border-2 border-[#EFE5D5] shadow-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-brand-muted" />
                  <span>Speak Again</span>
                </Button>
              </div>
            )}

            {/* Friendly guidance under the button */}
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-brand-dark">
                {step === 'ready' && 'Press the microphone and tell your story'}
                {step === 'listening' && 'Listening to your voice... Tap the red button when finished'}
                {step === 'review' && 'Your words are ready! Tap Create My Story to make your memoir'}
              </p>
              <p className="text-xs sm:text-sm text-brand-muted font-medium">
                No hurry at all. You can speak in any language or dialect you prefer.
              </p>
            </div>

          </section>

        </div>
      )}

    </div>
  );
}
