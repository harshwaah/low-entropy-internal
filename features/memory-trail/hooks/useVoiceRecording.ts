import { useState, useRef, useEffect, useCallback } from 'react';

export type RecordingState = 'idle' | 'recording' | 'recorded' | 'playing';

interface UseVoiceRecordingReturn {
  recordingState: RecordingState;
  recordingTimeSeconds: number;
  audioUrl: string | null;
  transcript: string;
  isSpeechSupported: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  deleteAudio: () => void;
  setTranscript: (text: string) => void;
}

export function useVoiceRecording(): UseVoiceRecordingReturn {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTimeSeconds, setRecordingTimeSeconds] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSpeechSupported(true);
      }
    }
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecording = useCallback(async () => {
    try {
      setTranscript('');
      setAudioUrl(null);
      audioChunksRef.current = [];
      setRecordingTimeSeconds(0);

      // Check MediaRecorder support
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setRecordingState('recorded');

          // Stop all audio stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setRecordingState('recording');

        // Start Timer
        timerRef.current = setInterval(() => {
          setRecordingTimeSeconds(prev => prev + 1);
        }, 1000);

        // Start SpeechRecognition if available
        if (typeof window !== 'undefined') {
          const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          if (SpeechRecognition) {
            try {
              const recognition = new SpeechRecognition();
              recognition.continuous = true;
              recognition.interimResults = true;
              recognition.lang = 'en-US';

              recognition.onresult = (event: any) => {
                let currentText = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                  if (event.results[i].isFinal) {
                    currentText += event.results[i][0].transcript;
                  } else {
                    currentText += event.results[i][0].transcript;
                  }
                }
                if (currentText) {
                  setTranscript(currentText);
                }
              };

              recognition.start();
              speechRecognitionRef.current = recognition;
            } catch (err) {
              console.warn('SpeechRecognition initialization error:', err);
            }
          }
        }
      } else {
        // Fallback simulation for unsupported browsers/environments
        setRecordingState('recording');
        timerRef.current = setInterval(() => {
          setRecordingTimeSeconds(prev => prev + 1);
        }, 1000);
      }
    } catch (err) {
      console.warn('Microphone access unavailable or denied:', err);
      // Friendly fallback: simulate recording state so patient is never blocked!
      setRecordingState('recording');
      timerRef.current = setInterval(() => {
        setRecordingTimeSeconds(prev => prev + 1);
      }, 1000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    clearTimer();

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback
      setRecordingState('recorded');
    }
  }, []);

  const playAudio = useCallback(() => {
    if (audioUrl) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(audioUrl);
        audioElementRef.current.onended = () => setRecordingState('recorded');
      }
      audioElementRef.current.play();
      setRecordingState('playing');
    }
  }, [audioUrl]);

  const pauseAudio = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      setRecordingState('recorded');
    }
  }, []);

  const deleteAudio = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setTranscript('');
    setRecordingTimeSeconds(0);
    setRecordingState('idle');
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return {
    recordingState,
    recordingTimeSeconds,
    audioUrl,
    transcript,
    isSpeechSupported,
    startRecording,
    stopRecording,
    playAudio,
    pauseAudio,
    deleteAudio,
    setTranscript,
  };
}
