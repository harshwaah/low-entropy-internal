'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Volume2, Heart, ChevronLeft, CheckCircle, RotateCcw, Home } from 'lucide-react';

type Step = 
  | 'welcome' 
  | 'find_jar' 
  | 'find_clock' 
  | 'find_cushion' 
  | 'intro_memory'
  | 'memory_jar' 
  | 'memory_clock' 
  | 'memory_cushion' 
  | 'completed';

export function FindTheObjectGame() {
  const router = useRouter();
  
  const [step, setStep] = useState<Step>('welcome');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const rippleIdRef = useRef(0);
  const resetPromptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Phase 1 Found objects
  const [isJarFound, setIsJarFound] = useState(false);
  const [isClockFound, setIsClockFound] = useState(false);
  const [isCushionFound, setIsCushionFound] = useState(false);

  // Phase 2 Memory Revealed objects
  const [isJarMemoryRevealed, setIsJarMemoryRevealed] = useState(false);
  const [isClockMemoryRevealed, setIsClockMemoryRevealed] = useState(false);
  const [isCushionMemoryRevealed, setIsCushionMemoryRevealed] = useState(false);

  const [speechMain, setSpeechMain] = useState('');
  const [speechSub, setSpeechSub] = useState('');
  const [companionEmotion, setCompanionEmotion] = useState('Friendly companion');
  const [showBadge, setShowBadge] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [continueText, setContinueText] = useState('Continue Stroll');
  
  const [companionAnim, setCompanionAnim] = useState('animate-float');
  const [haloAnim, setHaloAnim] = useState('absolute inset-0 rounded-full bg-[#e0f7e6]/60 blur-md transform scale-110 transition-all duration-500');
  const [heartOpacity, setHeartOpacity] = useState(0);

  // Target animations
  const [animateCushionPop, setAnimateCushionPop] = useState(false);
  const [animateClockPop, setAnimateClockPop] = useState(false);
  
  // Replay button animation
  const [replayScale, setReplayScale] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (resetPromptTimeoutRef.current) {
        clearTimeout(resetPromptTimeoutRef.current);
      }
    };
  }, []);

  const playGentleChime = (isSuccess: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isSuccess) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(329.63, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(392.00, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      }
    } catch (e) {
      // AudioContext disabled or unsupported
    }
  };

  const createRipple = (e: React.MouseEvent) => {
    const container = e.currentTarget.closest('section');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, {id, x, y}]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 850);
  };

  const handleBackgroundTap = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    createRipple(e);
    handleWrongTap();
  };

  const speakSequentialMessages = (messages: string[], onComplete?: () => void) => {
    if (!('speechSynthesis' in window) || !messages.length) {
      if (onComplete) onComplete();
      return;
    }
    window.speechSynthesis.cancel();

    let index = 0;
    const speakNext = () => {
      if (index >= messages.length) {
        if (onComplete) onComplete();
        return;
      }
      const msg = messages[index];
      index++;

      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        if (index < messages.length) {
          setTimeout(speakNext, 380);
        } else {
          setIsSpeaking(false);
          if (onComplete) onComplete();
        }
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (index < messages.length) {
          speakNext();
        } else {
          if (onComplete) onComplete();
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const speakMessage = (text: string, onComplete?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.86;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onComplete) onComplete();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (onComplete) onComplete();
    }
  };

  const replaySpokenVoice = () => {
    setReplayScale(true);
    setTimeout(() => setReplayScale(false), 180);
    const mainText = speechMain.replace(/["“”]/g, '');
    speakMessage(mainText + '. ' + speechSub);
  };

  const triggerCelebration = () => {
    setCompanionAnim('');
    setTimeout(() => setCompanionAnim('animate-bounce-gentle'), 10);
    setHaloAnim('absolute inset-0 rounded-full bg-[#c2edd0]/90 blur-lg transform scale-125 transition-all duration-700');
    setHeartOpacity(1);
    setCompanionEmotion('Delighted with you!');
    setShowBadge(true);
  };

  const handleWrongTap = () => {
    playGentleChime(false);
    
    // Gentle bob
    setCompanionAnim('-translate-y-1 rotate-[1.5deg]');
    setTimeout(() => {
      setCompanionAnim('translate-y-0 rotate-0');
    }, 350);

    setCompanionEmotion('Patiently with you');
    
    if (step.startsWith('find_')) {
      setSpeechMain("“That’s okay. Take your time.”");
      setSpeechSub("Let’s look around again.");
      speakMessage("That's okay. Take your time. Let's look around again.");
      
      if (resetPromptTimeoutRef.current) clearTimeout(resetPromptTimeoutRef.current);
      resetPromptTimeoutRef.current = setTimeout(() => {
        if (step === 'find_jar' && !isJarFound) {
          setSpeechMain('“Can you find the blue jar?”');
          setSpeechSub('Take your time. Look around.');
        } else if (step === 'find_clock' && !isClockFound) {
          setSpeechMain('“Can you find the object that shows the time?”');
          setSpeechSub('Take your time. Look around.');
        } else if (step === 'find_cushion' && !isCushionFound) {
          setSpeechMain('“Can you find the cushion resting on the sofa?”');
          setSpeechSub('Take your time. Look around.');
        }
      }, 3500);
    } else if (step.startsWith('memory_')) {
      setSpeechMain("“That’s okay. Let’s think about it together.”");
      setSpeechSub("Take your time. Look around the room.");
      speakMessage("That's okay. Let's think about it together.");
      
      if (resetPromptTimeoutRef.current) clearTimeout(resetPromptTimeoutRef.current);
      resetPromptTimeoutRef.current = setTimeout(() => {
        if (step === 'memory_jar') {
          setSpeechMain("“Can you remember where the blue jar was kept?”");
          setSpeechSub("Take your time. Look around.");
        } else if (step === 'memory_clock') {
          setSpeechMain("“Can you remember where the clock was?”");
          setSpeechSub("Take your time. Look around.");
        } else if (step === 'memory_cushion') {
          setSpeechMain("“Can you remember where the cushion was resting?”");
          setSpeechSub("Take your time. Look around.");
        }
      }, 3000);
    }
  };

  const handleCorrectTap = (target: string, e: React.MouseEvent) => {
    e.stopPropagation();
    createRipple(e);
    
    if (isTransitioning) return;
    if (resetPromptTimeoutRef.current) clearTimeout(resetPromptTimeoutRef.current);
    
    // STEP 2: Find the Blue Jar
    if (target === 'blue_jar' && step === 'find_jar') {
      if (isJarFound) return;
      setIsJarFound(true);
      playGentleChime(true);
      triggerCelebration();
      
      setSpeechMain('“Wonderful! You found the blue jar.”');
      setSpeechSub('It is sitting on the table.');
      
      speakSequentialMessages(["Wonderful! You found the blue jar.", "It is sitting on the table."], () => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      });
      setTimeout(() => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      }, 3800);
    }
    
    // STEP 3: Find the Clock
    else if (target === 'clock' && step === 'find_clock') {
      if (isClockFound) return;
      setIsClockFound(true);
      playGentleChime(true);
      
      setAnimateClockPop(true);
      setTimeout(() => setAnimateClockPop(false), 1000);
      
      triggerCelebration();
      setSpeechMain("“Wonderful! You found the clock.”");
      setSpeechSub("We use it to tell the time.");
      
      speakSequentialMessages(["Wonderful! You found the clock.", "We use it to tell the time."], () => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      });
      setTimeout(() => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      }, 3800);
    }
    
    // STEP 4: Find the Cushion
    else if (target === 'cushion' && step === 'find_cushion') {
      if (isCushionFound) return;
      setIsCushionFound(true);
      playGentleChime(true);
      
      setAnimateCushionPop(true);
      setTimeout(() => setAnimateCushionPop(false), 1100);
      
      triggerCelebration();
      setSpeechMain("“Wonderful! You found the cushion.”");
      setSpeechSub("It’s resting on the sofa.");
      
      speakSequentialMessages(["Wonderful! You found the cushion.", "It's resting on the sofa."], () => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      });
      setTimeout(() => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      }, 3800);
    }
    
    // STEP 6: Remember the Blue Jar
    else if ((target === 'table' || target === 'blue_jar' || target === 'jar') && step === 'memory_jar') {
      if (isJarMemoryRevealed) return;
      setIsJarMemoryRevealed(true);
      playGentleChime(true);
      triggerCelebration();
      setSpeechMain("“Wonderful! You remembered.”");
      setSpeechSub("The blue jar was on the table.");
      speakSequentialMessages(["Wonderful! You remembered.", "The blue jar was on the table."], () => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      });
      setTimeout(() => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      }, 3800);
    }
    
    // STEP 7: Remember the Clock
    else if ((target === 'wall' || target === 'clock') && step === 'memory_clock') {
      if (isClockMemoryRevealed) return;
      setIsClockMemoryRevealed(true);
      playGentleChime(true);
      triggerCelebration();
      setSpeechMain("“Wonderful! You remembered where the clock was.”");
      setSpeechSub("High on the wall above the sofa.");
      speakSequentialMessages(["Wonderful! You remembered where the clock was."], () => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      });
      setTimeout(() => {
        setContinueText('Continue Stroll');
        setShowContinue(true);
      }, 3500);
    }
    
    // STEP 8: Remember the Cushion
    else if ((target === 'sofa' || target === 'cushion' || target === 'pillow') && step === 'memory_cushion') {
      if (isCushionMemoryRevealed) return;
      setIsCushionMemoryRevealed(true);
      playGentleChime(true);
      triggerCelebration();
      setSpeechMain("“Yes! The cushion was resting on the sofa.”");
      setSpeechSub("So cozy and soft.");
      speakSequentialMessages(["Yes! The cushion was resting on the sofa."], () => {
        finishAllMemoryQuestions();
      });
      setTimeout(() => { 
        if (step === 'memory_cushion') finishAllMemoryQuestions(); 
      }, 3800);
    }
    else {
      handleWrongTap();
    }
  };

  const finishAllMemoryQuestions = () => {
    setStep('completed');
    setIsTransitioning(true);
    setShowBadge(false);
    setIsJarMemoryRevealed(true);
    setIsClockMemoryRevealed(true);
    setIsCushionMemoryRevealed(true);
    setCompanionEmotion('Delighted companion');
    setSpeechMain("“You remembered so many things!”");
    setSpeechSub("That was a lovely memory stroll in the living room.");
    
    speakSequentialMessages(["You remembered so many things!", "That was a lovely memory stroll in the living room."], () => {
      setShowContinue(true);
      setIsTransitioning(false);
    });
    setTimeout(() => {
      setShowContinue(true);
      setIsTransitioning(false);
    }, 3800);
  };

  const handleStart = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if ('vibrate' in navigator) { try { navigator.vibrate(30); } catch (e) {} }
    
    setIsJarFound(false);
    setIsClockFound(false);
    setIsCushionFound(false);
    setIsJarMemoryRevealed(false);
    setIsClockMemoryRevealed(false);
    setIsCushionMemoryRevealed(false);
    setShowBadge(false);
    setShowContinue(false);
    setIsTransitioning(false);
    setCompanionAnim('animate-float');
    setCompanionEmotion('Friendly companion');
    setHaloAnim('absolute inset-0 rounded-full bg-[#e0f7e6]/60 blur-md transform scale-110 transition-all duration-500');
    setHeartOpacity(0);

    setStep('find_jar');
    setSpeechMain('“Can you find the blue jar?”');
    setSpeechSub('Take your time. Look around.');
    setTimeout(() => {
      speakMessage("Can you find the blue jar? Take your time. Look around.");
    }, 700);
  };

  const handleContinueStroll = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowContinue(false);
    setShowBadge(false);
    setHeartOpacity(0);
    setCompanionAnim('animate-float');
    setCompanionEmotion('Attentive & warm');
    setHaloAnim('absolute inset-0 rounded-full bg-[#e0f7e6]/80 blur-md transform scale-110 transition-all duration-500');

    // 1. From finding Jar -> Find Clock
    if (step === 'find_jar') {
      setSpeechMain('“The blue jar was sitting on the table.”');
      setSpeechSub('You have a good eye!');
      speakMessage("The blue jar was sitting on the table. You have a good eye!");
      
      setTimeout(() => {
        setSpeechMain('“Let’s look around a little more.”');
        setSpeechSub('Enjoying the room together.');
        speakMessage("Let's look around a little more.");
        
        setTimeout(() => {
          setStep('find_clock');
          setIsTransitioning(false);
          setSpeechMain('“Can you find the object that shows the time?”');
          setSpeechSub('Take your time. Look around.');
          speakMessage("Can you find the object that shows the time? Take your time. Look around.");
        }, 2200);
      }, 3200);
    }
    
    // 2. From finding Clock -> Find Cushion
    else if (step === 'find_clock') {
      setSpeechMain("“You’re doing wonderfully.”");
      setSpeechSub("Let’s look around one more time.");
      speakMessage("You're doing wonderfully. Let's look around one more time.");
      
      setTimeout(() => {
        setStep('find_cushion');
        setIsTransitioning(false);
        setSpeechMain('“Can you find the cushion resting on the sofa?”');
        setSpeechSub('Take your time. Look around.');
        speakMessage("Can you find the cushion resting on the sofa? Take your time. Look around.");
      }, 2600);
    }
    
    // 3. From finding Cushion -> Intro to Memory Game
    else if (step === 'find_cushion') {
      setStep('intro_memory');
      setSpeechMain('“That was a lovely memory stroll in the living room.”');
      setSpeechSub('Now, let’s see what you remember!');
      speakSequentialMessages([
        "That was a lovely memory stroll in the living room.", 
        "Now the objects have disappeared. Whenever you're ready, let's play a gentle memory game!"
      ], () => {
        setContinueText('Play Memory Game');
        setShowContinue(true);
        setIsTransitioning(false);
      });
      setTimeout(() => {
        setContinueText('Play Memory Game');
        setShowContinue(true);
        setIsTransitioning(false);
      }, 4200);
    }
    
    // 4. From Intro Memory -> Memory Jar Question
    else if (step === 'intro_memory') {
      setStep('memory_jar');
      setIsTransitioning(false);
      setSpeechMain("“Can you remember where the blue jar was kept?”");
      setSpeechSub("Take your time. Look around.");
      speakMessage("Can you remember where the blue jar was kept? Take your time. Look around.");
    }
    
    // 5. From Memory Jar -> Memory Clock Question
    else if (step === 'memory_jar') {
      setStep('memory_clock');
      setIsTransitioning(false);
      setSpeechMain("“Can you remember where the clock was?”");
      setSpeechSub("Take your time. Look around.");
      speakMessage("Can you remember where the clock was? Take your time. Look around.");
    }
    
    // 6. From Memory Clock -> Memory Cushion Question
    else if (step === 'memory_clock') {
      setStep('memory_cushion');
      setIsTransitioning(false);
      setSpeechMain("“Can you remember where the cushion was resting?”");
      setSpeechSub("Take your time. Look around.");
      speakMessage("Can you remember where the cushion was resting? Take your time. Look around.");
    }
    
    // 7. Completed fallback
    else if (step === 'completed') {
      setSpeechMain("“Off we go to the sunny garden!”");
      setSpeechSub("Stepping outside into the fresh breeze...");
      speakMessage("Off we go to the sunny garden! Enjoy the flowers.");
      setTimeout(() => {
        router.push('/patient/activities');
      }, 2000);
    }
  };

  const isMemoryMode = step === 'intro_memory' || step.startsWith('memory_') || step === 'completed';

  // 1. WELCOME SCREEN
  if (step === 'welcome') {
    return (
      <div className="bg-[#FAF7F2] text-[#25342B] antialiased flex justify-center items-center min-h-screen selection:bg-[#D8EAD9]">
        <style>{`
          .companion-float { animation: gentleFloat 4.8s ease-in-out infinite; }
          .companion-speaking { animation: speakingPulse 1.8s ease-in-out infinite; }
          .ambient-halo { animation: softPulseGlow 6s ease-in-out infinite; }
          .ambient-halo-active { animation: softPulseGlow 2.5s ease-in-out infinite; opacity: 0.85; }
          .wave-bar-1 { animation: audioWavePulse 1.2s ease-in-out infinite 0.1s; }
          .wave-bar-2 { animation: audioWavePulse 1.2s ease-in-out infinite 0.35s; }
          .wave-bar-3 { animation: audioWavePulse 1.2s ease-in-out infinite 0.2s; }
          .waves-inactive .wave-bar-1, .waves-inactive .wave-bar-2, .waves-inactive .wave-bar-3 { animation: none; height: 6px; opacity: 0.6; }
          .shadow-pillowy { box-shadow: 0 14px 34px -8px rgba(91, 140, 101, 0.32), 0 4px 12px rgba(91, 140, 101, 0.12); }
          .shadow-speech { box-shadow: 0 10px 25px -4px rgba(70, 90, 75, 0.08), 0 3px 8px rgba(70, 90, 75, 0.04); }
          .touch-friendly-btn { touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none; }
          .touch-friendly-btn:active { transform: scale(0.975); }
        `}</style>
        
        <main className="w-full max-w-[430px] min-h-[100dvh] flex flex-col justify-between relative px-5 py-6 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F1EA] to-[#EFF5F0]" role="region">
          <div aria-hidden="true" className="absolute -top-16 -left-16 w-64 h-64 bg-[#F8E7DF] rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div aria-hidden="true" className="absolute top-1/3 -right-20 w-72 h-72 bg-[#DCEEE0] rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-10 left-1/4 w-80 h-80 bg-[#FFF3E8] rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <header className="relative z-10 flex items-center justify-between pt-2 pb-1">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8E0D5] shadow-sm">
              <span aria-hidden="true" className="w-6 h-6 rounded-full bg-[#E5F2E7] flex items-center justify-center text-[#5B8C65]">
                <Heart className="w-3.5 h-3.5 fill-current text-[#5B8C65]" />
              </span>
              <span className="text-sm font-semibold tracking-wide text-[#25342B] font-sans">SmritiSaathi</span>
            </div>
          </header>

          <section className="relative z-10 flex flex-col items-center justify-center py-2">
            <div className="relative mb-3 max-w-[320px] bg-white rounded-2xl px-4 py-3 border border-[#E9E4DB] shadow-speech companion-float" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center space-x-0.5 h-4 flex-shrink-0" id="audio-wave-bars">
                    <span className={cn("w-1 bg-[#7CA982] rounded-full wave-bar-1", !isSpeaking && "waves-inactive")} />
                    <span className={cn("w-1 bg-[#5B8C65] rounded-full wave-bar-2", !isSpeaking && "waves-inactive")} />
                    <span className={cn("w-1 bg-[#7CA982] rounded-full wave-bar-3", !isSpeaking && "waves-inactive")} />
                  </div>
                  <p className="text-base text-[#25342B] font-medium leading-snug">“Hello, friend! Shall we take a gentle stroll today?”</p>
                </div>
                <button 
                  onClick={() => speakMessage("Hello, friend! Shall we take a gentle stroll today?")}
                  className={cn(
                    "touch-friendly-btn flex-shrink-0 w-10 h-10 rounded-full bg-[#EBF4EC] hover:bg-[#DCEEE0] text-[#5B8C65] flex items-center justify-center transition duration-200 cursor-pointer shadow-sm",
                    isSpeaking && "ring-2 ring-[#7CA982]"
                  )}>
                  <Volume2 className="w-5 h-5 text-[#5B8C65]" />
                </button>
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[10px] border-t-white" />
            </div>

            <div className="relative flex items-center justify-center my-1">
              <div className={cn("absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#E1F1E5] via-[#FFF0E6] to-[#E2F3E7] filter blur-xl", isSpeaking ? "ambient-halo-active" : "ambient-halo")} />
              <div className="absolute w-80 h-80 rounded-full border border-white/60 opacity-60 pointer-events-none" />
              
              <div className={cn("relative z-10 w-80 h-80", isSpeaking ? "companion-speaking" : "companion-float")}>
                <div className="w-full h-full flex items-center justify-center p-2 filter drop-shadow-lg">
                  <img alt="Companion" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UYsjd-TlvK1e9aubadqZCm9W3hsY7VOFYw14sh8P62qYfepPTfe6VpNdlVdroNJtWLbspSIMDn4dbjFXuxJuPEN0K9cQC3Oj-6wNuZTCb5zjFJE00ftxyhPasqxjtHt2Gy5AWRQp1uq7uWDXHtl0HvjUkZ0YlE8JX-o_-Zob-Oh8G1VoqydXVM2GJcgWczFxp4dT5Cs9vObqpMMiY-MnA1ev96ZiIXYjzBgrHvdgdm0YnccMO0e5CzRoLt" />
                </div>
              </div>
            </div>

            <div className="text-center mt-2 px-2">
              <h1 className="text-3xl font-semibold tracking-tight text-[#25342B] font-sans">Memory Walk</h1>
              <p className="mt-1 text-lg text-[#52685B] font-medium">Let’s explore together</p>
              <div className="inline-flex items-center space-x-1.5 mt-3 px-3.5 py-1 rounded-full bg-[#EBF4EC] text-[#5B8C65] border border-[#D8EAD9]/80 text-xs font-medium">
                <svg className="w-3.5 h-3.5 text-[#5B8C65]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Simple &amp; relaxed • No timers • Take your time</span>
              </div>
            </div>
          </section>

          <section className="relative z-10 flex flex-col items-center space-y-3 pt-1 pb-2">
            <button onClick={handleStart} className="touch-friendly-btn w-full h-[68px] rounded-full bg-gradient-to-r from-[#5B8C65] via-[#6C9E74] to-[#7CA982] text-white font-semibold text-xl tracking-wide flex items-center justify-center space-x-3 shadow-pillowy border-2 border-white/40 cursor-pointer">
              <span className="font-sans">Let’s Begin</span>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
            </button>
            <p className="text-xs text-[#52685B]/80 font-medium tracking-wide text-center pt-1">
              A peaceful moment for your mind • SmritiSaathi
            </p>
          </section>
        </main>
      </div>
    );
  }

  // 2. MAIN GAME SCREEN
  return (
    <div className="min-h-[100dvh] text-[#2d3b32] flex justify-center bg-[#fdfcf7] antialiased">
      <style>{`
        .touch-target {
          position: absolute;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          background-color: transparent;
          border-radius: 1.25rem;
          transition: transform 0.2s ease;
          border: none;
          outline: none;
        }
        .touch-target:active { transform: scale(0.97); }
        .tap-ripple { animation: softFeedback 0.85s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
        .found-highlight {
          border: 3px solid #7bc991 !important;
          background: radial-gradient(circle, rgba(254, 243, 199, 0.4) 0%, rgba(148, 221, 174, 0.35) 50%, rgba(255, 255, 255, 0) 75%) !important;
          box-shadow: 0 0 25px rgba(123, 201, 145, 0.6), 0 0 10px rgba(251, 191, 36, 0.3) !important;
          animation: jarHalo 1.4s ease-in-out infinite;
        }
        .found-clock-highlight {
          border: 3px solid #7bc991 !important;
          background: radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, rgba(148, 221, 174, 0.3) 60%, rgba(255, 255, 255, 0) 80%) !important;
          box-shadow: 0 0 24px rgba(123, 201, 145, 0.55), 0 0 10px rgba(251, 191, 36, 0.25) !important;
        }
        .found-cushion-highlight {
          border: 3px solid #7bc991 !important;
          background: radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, rgba(148, 221, 174, 0.32) 60%, rgba(255, 255, 255, 0) 85%) !important;
          box-shadow: 0 0 26px rgba(123, 201, 145, 0.55), 0 0 12px rgba(251, 191, 36, 0.25) !important;
        }
        .shadow-gentle { box-shadow: 0 4px 16px rgba(45, 59, 50, 0.06); }
        .shadow-card { box-shadow: 0 12px 32px -6px rgba(88, 124, 99, 0.12); }
        .shadow-button { box-shadow: 0 10px 25px -3px rgba(88, 124, 99, 0.28), 0 4px 10px -2px rgba(88, 124, 99, 0.15); }
        .shadow-glow { box-shadow: 0 0 28px rgba(123, 201, 145, 0.35); }
      `}</style>
      
      <main className="w-full max-w-4xl min-h-[100dvh] flex flex-col justify-between relative px-4 sm:px-8 py-5 pb-8 overflow-x-hidden mx-auto">
        <header className="w-full flex items-center justify-between z-30 mb-3">
          <button onClick={() => router.push('/patient/activities')} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 border border-[#e0f7e6] shadow-gentle text-[#55655b] font-semibold text-sm cursor-pointer hover:text-[#2d3b32] transition-colors">
            <ChevronLeft className="w-4 h-4 text-[#587c63]" strokeWidth={2.5} />
            <span>Memory Walk</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1fcf4]/90 border border-[#e0f7e6] text-[#385342] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#5fc286] animate-pulse" />
            <span>{isMemoryMode ? 'Memory Challenge' : 'The Living Room'}</span>
          </div>
        </header>

        {/* Room Artwork & Hitboxes Stage */}
        <section 
          className="relative w-full rounded-3xl overflow-hidden shadow-card border-2 border-[#e0f7e6]/80 bg-[#f9f6ed] flex-shrink-0 select-none cursor-pointer"
          onClick={handleBackgroundTap}
        >
          {/* Base Background Image (With objects in Discovery mode, clean empty room in Memory mode) */}
          <img 
            className="w-full h-auto block pointer-events-none transition-transform duration-700" 
            src={isMemoryMode 
              ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZlKdjqzfCvJGqd6F0dE-iwqWHoMSOB4zgzYEBEtbBrHb0B7nt2iWIyTox8Lynh2kyB0Ri5fBcPhygSMwB-uKwkqP2GKQIc1g9Z5Hwh8al5GG2D3Q5aLQ4_rIEZkDl6P6fkE6tzsP7tk9xugHK7VTXSapveN0LpdPphHlcLTeTf2u4Pkq5SFiIGD1MJiTOt4uKMgBzDHrphhAkK9ctW6H7NhX20pxRTxD2qAjSgpW-MzkCXaT9yKqIw"
              : "https://lh3.googleusercontent.com/aida/AEtjO1XNXNv9TbaxpKe5qQGCgkuIS-4fwPa-rgKmPMOiI_V-jXqSkEMK5kNq7D757X6FehZfh5BtxK5ztXNaT1905-EhYSaGI3GeR2tTRtyoeu-NIbjdUTh0nEcJI7hbyjzmov4ZzoOiIKIrj5D6vnj-Q1riaZNwtkVfiLMZW0hp6zt1jJR8BokSSS4cLJKQVrYsgZ-cjNyIhlYUUt2vAOfA7yeskqNE6nIQ9ZbpzQfIImX69twvzmKTfyTk7Yuj"
            } 
            alt="Living Room Scene" 
          />

          {/* Phase 2: Memory Mode Revealed Overlays (Items reappear when tapped correctly) */}
          {isMemoryMode && isJarMemoryRevealed && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1XNXNv9TbaxpKe5qQGCgkuIS-4fwPa-rgKmPMOiI_V-jXqSkEMK5kNq7D757X6FehZfh5BtxK5ztXNaT1905-EhYSaGI3GeR2tTRtyoeu-NIbjdUTh0nEcJI7hbyjzmov4ZzoOiIKIrj5D6vnj-Q1riaZNwtkVfiLMZW0hp6zt1jJR8BokSSS4cLJKQVrYsgZ-cjNyIhlYUUt2vAOfA7yeskqNE6nIQ9ZbpzQfIImX69twvzmKTfyTk7Yuj"
                className="w-full h-full object-fill pointer-events-none"
                style={{ clipPath: 'inset(52% 41% 26% 45%)' }}
                alt="Blue Jar Revealed"
              />
            </div>
          )}
          {isMemoryMode && isCushionMemoryRevealed && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1XNXNv9TbaxpKe5qQGCgkuIS-4fwPa-rgKmPMOiI_V-jXqSkEMK5kNq7D757X6FehZfh5BtxK5ztXNaT1905-EhYSaGI3GeR2tTRtyoeu-NIbjdUTh0nEcJI7hbyjzmov4ZzoOiIKIrj5D6vnj-Q1riaZNwtkVfiLMZW0hp6zt1jJR8BokSSS4cLJKQVrYsgZ-cjNyIhlYUUt2vAOfA7yeskqNE6nIQ9ZbpzQfIImX69twvzmKTfyTk7Yuj"
                className="w-full h-full object-fill pointer-events-none"
                style={{ clipPath: 'inset(41% 61% 38% 21%)' }}
                alt="Cushion Revealed"
              />
            </div>
          )}
          {isMemoryMode && isClockMemoryRevealed && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1XNXNv9TbaxpKe5qQGCgkuIS-4fwPa-rgKmPMOiI_V-jXqSkEMK5kNq7D757X6FehZfh5BtxK5ztXNaT1905-EhYSaGI3GeR2tTRtyoeu-NIbjdUTh0nEcJI7hbyjzmov4ZzoOiIKIrj5D6vnj-Q1riaZNwtkVfiLMZW0hp6zt1jJR8BokSSS4cLJKQVrYsgZ-cjNyIhlYUUt2vAOfA7yeskqNE6nIQ9ZbpzQfIImX69twvzmKTfyTk7Yuj"
                className="w-full h-full object-fill pointer-events-none"
                style={{ clipPath: 'inset(6% 28% 75% 56%)' }}
                alt="Clock Revealed"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#2d3b32]/10 via-transparent to-transparent pointer-events-none" />
          
          {/* HITBOXES */}
          {!isMemoryMode ? (
            <>
              {/* Misc ambient room targets */}
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-3xl z-10" style={{left:'0%', top:'38%', width:'45%', height:'47%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'56%', top:'37%', width:'27%', height:'39%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'28%', top:'62%', width:'45%', height:'33%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'34%', top:'16%', width:'14%', height:'37%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'83%', top:'29%', width:'17%', height:'46%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-xl z-10" style={{left:'2%', top:'7%', width:'22%', height:'28%'}} />

              {/* Find target hitboxes (Step 2, 3, 4) */}
              <button 
                onClick={(e) => handleCorrectTap('blue_jar', e)} 
                className={cn("touch-target rounded-full z-30", isJarFound && "found-highlight")} 
                style={{left:'45%', top:'52%', width:'14%', height:'22%'}} 
                aria-label="Blue Jar"
              />
              <button 
                onClick={(e) => handleCorrectTap('cushion', e)} 
                className={cn("touch-target rounded-2xl z-30", isCushionFound && "found-cushion-highlight", animateCushionPop && "animate-cushion-pop")} 
                style={{left:'21%', top:'41%', width:'18%', height:'21%'}} 
                aria-label="Cushion on sofa"
              />
              <button 
                onClick={(e) => handleCorrectTap('clock', e)} 
                className={cn("touch-target rounded-full z-30", isClockFound && "found-clock-highlight", animateClockPop && "animate-clock-pop")} 
                style={{left:'56%', top:'6%', width:'16%', height:'19%'}} 
                aria-label="Wall Clock"
              />
            </>
          ) : (
            <>
              {/* Misc ambient room targets */}
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-xl z-10" style={{left:'2%', top:'7%', width:'23%', height:'25%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'35%', top:'16%', width:'15%', height:'36%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'57%', top:'38%', width:'27%', height:'38%'}} />
              <button onClick={(e) => {e.stopPropagation(); createRipple(e); handleWrongTap();}} className="touch-target rounded-2xl z-10" style={{left:'84%', top:'29%', width:'16%', height:'48%'}} />

              {/* Memory target locations (Step 6, 7, 8) */}
              <button 
                onClick={(e) => handleCorrectTap('table', e)} 
                className="touch-target rounded-3xl z-30" 
                style={{left:'24%', top:'58%', width:'52%', height:'36%'}} 
                aria-label="Coffee Table location"
              />
              <button 
                onClick={(e) => handleCorrectTap('wall', e)} 
                className="touch-target rounded-2xl z-30" 
                style={{left:'52%', top:'4%', width:'22%', height:'24%'}} 
                aria-label="Wall Clock location"
              />
              <button 
                onClick={(e) => handleCorrectTap('sofa', e)} 
                className="touch-target rounded-2xl z-30" 
                style={{left:'10%', top:'34%', width:'38%', height:'36%'}} 
                aria-label="Sofa Cushion location"
              />
            </>
          )}
          
          {/* Visual Ripples */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {ripples.map(r => (
              <div 
                key={r.id} 
                className="absolute rounded-full pointer-events-none tap-ripple border-2 border-[#94ddae] bg-[#e0f7e6]/40 shadow-sm"
                style={{width: 90, height: 90, left: r.x - 45, top: r.y - 45}}
              />
            ))}
          </div>

          {/* Celebration Badge */}
          <div className={cn("absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 z-40", showBadge ? "opacity-100" : "opacity-0")}>
            <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full border border-[#c2edd0] shadow-glow flex items-center gap-2.5">
              <span className="text-2xl">✨</span>
              <span className="text-[#2f4337] font-bold text-base tracking-wide">Wonderful!</span>
            </div>
          </div>
        </section>

        {/* Companion Dialogue & Bottom Controls */}
        <section className="w-full flex flex-col items-center my-4 z-20 flex-grow justify-end relative">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-[#e0f7e6] flex items-center justify-between gap-3 transition-all duration-300">
            <div className="absolute -bottom-2.5 left-16 transform -translate-x-1/2 w-5 h-5 bg-white border-r border-b border-[#e0f7e6] rotate-45" />
            <div className="flex-1 pr-1">
              <p className="text-[#2d3b32] text-[16px] sm:text-[18px] font-semibold leading-snug">{speechMain}</p>
              <p className="text-[#55655b] text-xs sm:text-sm font-normal mt-1 leading-normal">{speechSub}</p>
            </div>
            <button 
              onClick={replaySpokenVoice}
              className={cn("w-12 h-12 rounded-full bg-[#f1fcf4] hover:bg-[#e0f7e6] text-[#385342] border border-[#c2edd0]/80 flex items-center justify-center shadow-gentle transition-all flex-shrink-0 cursor-pointer", replayScale && "scale-90")}
              title="Replay Voice"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full max-w-xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mt-4 px-2 sm:px-3">
            <div className="flex items-center gap-3.5 flex-shrink-0">
              <div className={cn("relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0", companionAnim)}>
                <div className={haloAnim} />
                <div className="w-full h-full relative z-10 drop-shadow-sm transition-transform duration-300 flex items-center justify-center">
                  <img alt="SmritiSaathi companion" className="w-full h-full object-contain pointer-events-none select-none" src="https://lh3.googleusercontent.com/aida/AEtjO1UYsjd-TlvK1e9aubadqZCm9W3hsY7VOFYw14sh8P62qYfepPTfe6VpNdlVdroNJtWLbspSIMDn4dbjFXuxJuPEN0K9cQC3Oj-6wNuZTCb5zjFJE00ftxyhPasqxjtHt2Gy5AWRQp1uq7uWDXHtl0HvjUkZ0YlE8JX-o_-Zob-Oh8G1VoqydXVM2GJcgWczFxp4dT5Cs9vObqpMMiY-MnA1ev96ZiIXYjzBgrHvdgdm0YnccMO0e5CzRoLt" />
                </div>
                <div className="absolute -top-1 -right-1 text-base transition-opacity duration-300 z-20" style={{opacity: heartOpacity}}>✨</div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-[#2d3b32]">SmritiSaathi</span>
                  {isSpeaking ? (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#c2edd0] text-[11px] font-semibold text-[#2f4337]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#587c63] animate-ping" />
                      <span>speaking...</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#e0f7e6] text-[11px] font-semibold text-[#385342]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5fc286]" />
                      <span>listening</span>
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-[13px] text-[#55655b] font-medium mt-0.5">{companionEmotion}</span>
              </div>
            </div>

            {/* Bottom Interactive Action Buttons */}
            <div className="flex-shrink-0 ml-auto sm:ml-0 flex items-center gap-3">
              {step === 'completed' ? (
                <>
                  <button 
                    onClick={handleStart}
                    className="transition-all duration-300 inline-flex items-center justify-center gap-2 min-h-[52px] px-5 sm:px-6 py-3 rounded-full bg-white hover:bg-[#f1fcf4] text-[#587c63] font-bold text-sm sm:text-base shadow-button border-2 border-[#587c63] focus:outline-none focus:ring-4 focus:ring-[#587c63]/30 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSpeechMain("“Off we go to the sunny garden!”");
                      setSpeechSub("Stepping outside into the fresh breeze...");
                      speakMessage("Off we go to the sunny garden! Enjoy the flowers.");
                      setTimeout(() => {
                        router.push('/patient/activities');
                      }, 1800);
                    }}
                    className="transition-all duration-300 inline-flex items-center justify-center gap-2 min-h-[52px] px-5 sm:px-6 py-3 rounded-full bg-[#587c63] hover:bg-[#466952] text-white font-bold text-sm sm:text-base shadow-button border-2 border-[#587c63]/20 focus:outline-none focus:ring-4 focus:ring-[#587c63]/30 cursor-pointer active:scale-95"
                  >
                    <Home className="w-4 h-4" />
                    <span>Go to Home</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleContinueStroll}
                  disabled={!showContinue}
                  className={cn(
                    "transition-all duration-500 ease-out inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 sm:px-7 py-3 rounded-full bg-[#587c63] hover:bg-[#466952] active:scale-95 text-white font-bold text-base shadow-button border-2 border-[#587c63]/20 focus:outline-none focus:ring-4 focus:ring-[#587c63]/30 cursor-pointer",
                    !showContinue && "opacity-0 pointer-events-none scale-95 translate-y-2"
                  )}
                >
                  <span className="tracking-wide">{continueText}</span>
                  <ChevronRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </section>

        <footer className="w-full flex justify-center mt-2 z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1fcf4]/80 border border-[#e0f7e6] text-[#55655b] text-xs sm:text-[13px] font-medium text-center">
            <CheckCircle className="w-3.5 h-3.5 text-[#587c63] flex-shrink-0" />
            <span>No hurry • Tap anywhere you like • Enjoy the stroll</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
