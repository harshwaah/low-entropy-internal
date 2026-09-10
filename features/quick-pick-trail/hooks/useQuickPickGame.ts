import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ApplePosition,
  AudioSettings,
  Direction,
  GameCharacter,
  GameDifficulty,
  GameMode,
  GameQuestion,
  QuickPickProgressRecord,
  SnakeSegment,
} from '../types';
import { questionService } from '../services/questionService';
import { adaptiveDifficultyService } from '../services/adaptiveDifficultyService';
import { quickPickStorageService } from '../services/quickPickStorageService';
import { useGameAudio } from './useGameAudio';
import { useGameTracking } from './useGameTracking';

export type GameScreenState =
  | 'welcome'
  | 'mode-selection'
  | 'difficulty-selection'
  | 'game-board'
  | 'correct-feedback'
  | 'gentle-feedback'
  | 'level-complete'
  | 'progress-screen'
  | 'settings'
  | 'character-unlock'
  | 'end-screen';

const SEGMENT_SPACING = 3.6; // percentage distance between body segments

function samplePathPosition(
  pathHistory: Array<{ x: number; y: number }>,
  targetDistance: number
): SnakeSegment {
  if (pathHistory.length === 0) return { xPercent: 50, yPercent: 70 };
  if (pathHistory.length === 1) return { xPercent: pathHistory[0].x, yPercent: pathHistory[0].y };

  let accumulatedDist = 0;
  for (let i = 0; i < pathHistory.length - 1; i++) {
    const p1 = pathHistory[i];
    const p2 = pathHistory[i + 1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (accumulatedDist + dist >= targetDistance) {
      const remaining = targetDistance - accumulatedDist;
      const ratio = dist > 0 ? remaining / dist : 0;
      return {
        xPercent: p1.x + dx * ratio,
        yPercent: p1.y + dy * ratio,
      };
    }
    accumulatedDist += dist;
  }

  // If pathHistory isn't long enough, extrapolate backward from the last segment
  const last = pathHistory[pathHistory.length - 1];
  const secondLast = pathHistory[pathHistory.length - 2] || last;
  const dx = last.x - secondLast.x;
  const dy = last.y - secondLast.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const extraDist = targetDistance - accumulatedDist;

  return {
    xPercent: last.x + (dx / len) * extraDist,
    yPercent: last.y + (dy / len) * extraDist,
  };
}

export function useQuickPickGame() {
  const [currentScreen, setCurrentScreen] = useState<GameScreenState>('welcome');
  const [selectedMode, setSelectedMode] = useState<GameMode>('math');
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>('gentle');

  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [questionsSolvedInLevel, setQuestionsSolvedInLevel] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [apples, setApples] = useState<ApplePosition[]>([]);
  const [lastSelectedApple, setLastSelectedApple] = useState<ApplePosition | null>(null);

  // Snake length and body state
  const [snakeLength, setSnakeLength] = useState<number>(3);
  const [snakeBody, setSnakeBody] = useState<SnakeSegment[]>([
    { xPercent: 50, yPercent: 70 },
    { xPercent: 50, yPercent: 73.6 },
    { xPercent: 50, yPercent: 77.2 },
  ]);

  const pathHistoryRef = useRef<Array<{ x: number; y: number }>>([]);
  const currentDirectionRef = useRef<Direction>('UP');
  const nextDirectionRef = useRef<Direction>('UP');
  const [direction, setDirectionState] = useState<Direction>('UP');

  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Adaptation state
  const [speedLevel, setSpeedLevel] = useState<number>(1);
  const [optionsCount, setOptionsCount] = useState<number>(3);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState<number>(0);

  // Settings & Characters
  const [settings, setSettings] = useState<AudioSettings>(() => quickPickStorageService.getSettings());
  const [characters, setCharacters] = useState<GameCharacter[]>(() => quickPickStorageService.getCharacters());
  const [unlockedCharacter, setUnlockedCharacter] = useState<GameCharacter | null>(null);
  const [progressHistory, setProgressHistory] = useState<QuickPickProgressRecord[]>([]);

  const questionStartTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const audio = useGameAudio(settings);
  const tracking = useGameTracking();

  const activeCharacter = characters.find(c => c.selected) || characters[0];

  useEffect(() => {
    quickPickStorageService.getProgressRecords('patient-1').then(records => {
      setProgressHistory(records);
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AudioSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      quickPickStorageService.saveSettings(updated);
      return updated;
    });
  }, []);

  const selectCharacterSkin = useCallback((charId: string) => {
    const updated = quickPickStorageService.selectCharacter(charId);
    setCharacters(updated);
  }, []);

  // Direction Change Handler (Prevents 180° instant turns)
  const setDirection = useCallback((newDir: Direction) => {
    const curr = currentDirectionRef.current;
    if (curr === 'UP' && newDir === 'DOWN') return;
    if (curr === 'DOWN' && newDir === 'UP') return;
    if (curr === 'LEFT' && newDir === 'RIGHT') return;
    if (curr === 'RIGHT' && newDir === 'LEFT') return;

    nextDirectionRef.current = newDir;
    setDirectionState(newDir);
  }, []);

  // Reset snake position facing UP with smooth path history
  const resetSnakeTrail = useCallback((length: number) => {
    const startX = 50;
    const startY = 70;
    currentDirectionRef.current = 'UP';
    nextDirectionRef.current = 'UP';
    setDirectionState('UP');

    const initialHistory: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= (length + 4) * 60; i++) {
      initialHistory.push({ x: startX, y: startY + i * 0.1 });
    }
    pathHistoryRef.current = initialHistory;

    const initialSegments: SnakeSegment[] = [];
    for (let s = 0; s < length; s++) {
      initialSegments.push(samplePathPosition(initialHistory, s * SEGMENT_SPACING));
    }
    setSnakeBody(initialSegments);
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen !== 'game-board' || isPaused) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, isPaused, setDirection]);

  // Spawn Apples/Objects on board
  const spawnApplesForQuestion = useCallback((question: GameQuestion, count: number) => {
    const selectedOptions = question.options.slice(0, count);

    const coordPool = [
      { x: 25, y: 30 },
      { x: 75, y: 30 },
      { x: 25, y: 65 },
      { x: 75, y: 65 },
    ];

    const newApples: ApplePosition[] = selectedOptions.map((opt, idx) => {
      const isCorrect = String(opt) === String(question.correctAnswer);
      const pos = coordPool[idx] || { x: 50, y: 50 };
      return {
        id: `apple-${idx}-${Date.now()}`,
        value: opt,
        xPercent: pos.x,
        yPercent: pos.y,
        isCorrect,
        isFaded: false,
      };
    });

    setApples(newApples);
  }, []);

  const nextQuestion = useCallback(() => {
    const q = questionService.generateQuestion(selectedMode, level);
    setCurrentQuestion(q);
    spawnApplesForQuestion(q, optionsCount);
    resetSnakeTrail(snakeLength);
    questionStartTimeRef.current = Date.now();
  }, [selectedMode, level, optionsCount, spawnApplesForQuestion, resetSnakeTrail, snakeLength]);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setQuestionsSolvedInLevel(0);
    setSpeedLevel(1);
    setOptionsCount(3);
    setConsecutiveCorrect(0);
    setSnakeLength(3);
    setIsPaused(false);

    audio.playTapSound();
    const q = questionService.generateQuestion(selectedMode, 1);
    setCurrentQuestion(q);
    spawnApplesForQuestion(q, 3);
    resetSnakeTrail(3);
    questionStartTimeRef.current = Date.now();

    setCurrentScreen('game-board');
  }, [selectedMode, spawnApplesForQuestion, audio, resetSnakeTrail]);

  // Handle Apple Collision
  const selectApple = useCallback(
    (apple: ApplePosition) => {
      if (!currentQuestion) return;

      const responseTimeSeconds = (Date.now() - questionStartTimeRef.current) / 1000;
      tracking.recordResponseTime(responseTimeSeconds);
      setLastSelectedApple(apple);

      if (apple.isCorrect) {
        audio.playCorrectSound();
        audio.speakPhrase('Wonderful! Great job!');

        setScore(prev => prev + 1);
        const newSolved = questionsSolvedInLevel + 1;
        setQuestionsSolvedInLevel(newSolved);

        // Grow snake body by 1 segment on correct answer
        setSnakeLength(prev => Math.min(10, prev + 1));

        const adaptation = adaptiveDifficultyService.evaluateAdaptation(
          {
            currentLevel: level,
            speedLevel,
            optionsCount,
            consecutiveCorrect,
            consecutiveIncorrect: 0,
          },
          true,
          responseTimeSeconds
        );
        setSpeedLevel(adaptation.speedLevel);
        setOptionsCount(adaptation.optionsCount);
        setConsecutiveCorrect(adaptation.consecutiveCorrect);

        if (newSolved >= 5) {
          const nextLvl = level + 1;
          setLevel(nextLvl);
          setQuestionsSolvedInLevel(0);
          audio.playCelebrationSound();

          const unlockable = characters.find(c => !c.unlocked && c.unlockLevel <= nextLvl);
          if (unlockable) {
            const updatedChars = quickPickStorageService.unlockCharacter(unlockable.id);
            setCharacters(updatedChars);
            setUnlockedCharacter(unlockable);
            setCurrentScreen('character-unlock');
          } else {
            setCurrentScreen('level-complete');
          }
        } else {
          setCurrentScreen('correct-feedback');
        }
      } else {
        // Gentle wrong feedback
        audio.playWrongSound();
        audio.speakPhrase('That is okay! Take your time.');

        setApples(prev => prev.map(a => (a.id === apple.id ? { ...a, isFaded: true } : a)));
        setLives(prev => Math.max(1, prev - 1));

        const adaptation = adaptiveDifficultyService.evaluateAdaptation(
          {
            currentLevel: level,
            speedLevel,
            optionsCount,
            consecutiveCorrect: 0,
            consecutiveIncorrect: 1,
          },
          false,
          responseTimeSeconds
        );
        setSpeedLevel(adaptation.speedLevel);
        setOptionsCount(adaptation.optionsCount);
        setConsecutiveCorrect(0);

        setCurrentScreen('gentle-feedback');
      }
    },
    [
      currentQuestion,
      questionsSolvedInLevel,
      level,
      speedLevel,
      optionsCount,
      consecutiveCorrect,
      characters,
      audio,
      tracking,
    ]
  );

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    if (currentScreen !== 'game-board' || isPaused) return;

    let isSubscribed = true;
    lastTimeRef.current = performance.now();

    const gameLoop = (now: number) => {
      if (!isSubscribed) return;

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Update direction
      currentDirectionRef.current = nextDirectionRef.current;
      const dir = currentDirectionRef.current;

      const multiplier = adaptiveDifficultyService.getSpeedMultiplier(selectedDifficulty, speedLevel);
      const baseSpeed = 16; // % of screen per second
      const stepDist = baseSpeed * multiplier * dt;

      const history = pathHistoryRef.current;
      const currentHead = history[0] || { x: 50, y: 70 };

      let nextX = currentHead.x;
      let nextY = currentHead.y;

      if (dir === 'UP') nextY = Math.max(16, currentHead.y - stepDist);
      if (dir === 'DOWN') nextY = Math.min(84, currentHead.y + stepDist);
      if (dir === 'LEFT') nextX = Math.max(12, currentHead.x - stepDist);
      if (dir === 'RIGHT') nextX = Math.min(88, currentHead.x + stepDist);

      // Record new head position
      history.unshift({ x: nextX, y: nextY });

      const maxHistory = (snakeLength + 4) * 60;
      if (history.length > maxHistory) {
        history.length = maxHistory;
      }

      // Sample gapless body segments from path history
      const newBody: SnakeSegment[] = [];
      for (let i = 0; i < snakeLength; i++) {
        newBody.push(samplePathPosition(history, i * SEGMENT_SPACING));
      }
      setSnakeBody(newBody);

      // Check collision with answer apples
      for (let i = 0; i < apples.length; i++) {
        const apple = apples[i];
        if (!apple.isFaded) {
          const dx = nextX - apple.xPercent;
          const dy = nextY - apple.yPercent;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 6.5) {
            selectApple(apple);
            break;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isSubscribed = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentScreen, isPaused, selectedDifficulty, speedLevel, apples, selectApple, snakeLength]);

  const finishSession = useCallback(async () => {
    await tracking.saveGameRecord({
      mode: selectedMode,
      difficulty: selectedDifficulty,
      questionsAttempted: score + (lives < 3 ? 1 : 0),
      correctAnswers: score,
      incorrectAnswers: lives < 3 ? 1 : 0,
      levelReached: level,
      speedLevel,
      completed: true,
    });
    const updatedHistory = await quickPickStorageService.getProgressRecords('patient-1');
    setProgressHistory(updatedHistory);
    setCurrentScreen('end-screen');
  }, [tracking, selectedMode, selectedDifficulty, score, lives, level, speedLevel]);

  return {
    currentScreen,
    setCurrentScreen,
    selectedMode,
    setSelectedMode,
    selectedDifficulty,
    setSelectedDifficulty,
    score,
    lives,
    level,
    questionsSolvedInLevel,
    currentQuestion,
    apples,
    snakeBody,
    snakeHead: snakeBody[0] || { xPercent: 50, yPercent: 70 },
    direction,
    setDirection,
    isPaused,
    setIsPaused,
    activeCharacter,
    characters,
    unlockedCharacter,
    lastSelectedApple,
    settings,
    updateSettings,
    selectCharacterSkin,
    startGame,
    selectApple,
    nextQuestion,
    finishSession,
    progressHistory,
    audio,
  };
}

