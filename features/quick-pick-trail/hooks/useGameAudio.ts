import { useRef, useCallback } from 'react';
import { AudioSettings } from '../types';

export function useGameAudio(settings: AudioSettings) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Soft Chime on Correct Answer
  const playCorrectSound = useCallback(() => {
    if (!settings.sfxOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Pleasant major triad arpeggio (C5 -> E5 -> G5)
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }, [settings.sfxOn, getAudioContext]);

  // Very Soft Neutral Pop on Wrong Answer (No scary buzzers!)
  const playWrongSound = useCallback(() => {
    if (!settings.sfxOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }, [settings.sfxOn, getAudioContext]);

  // Soft Button Tap Sound
  const playTapSound = useCallback(() => {
    if (!settings.sfxOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }, [settings.sfxOn, getAudioContext]);

  // Celebration Chime on Level Complete
  const playCelebrationSound = useCallback(() => {
    if (!settings.sfxOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.6);
    });
  }, [settings.sfxOn, getAudioContext]);

  // Character Voice Encouragement using SpeechSynthesis
  const speakPhrase = useCallback(
    (text: string) => {
      if (!settings.characterVoiceOn || typeof window === 'undefined') return;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // cancel ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85; // slow & clear for elderly patients
        utterance.pitch = 1.1; // warm & friendly
        window.speechSynthesis.speak(utterance);
      }
    },
    [settings.characterVoiceOn]
  );

  return {
    playCorrectSound,
    playWrongSound,
    playTapSound,
    playCelebrationSound,
    speakPhrase,
  };
}
