'use client';

import React, { useState } from 'react';
import { useQuickPickGame } from '../hooks/useQuickPickGame';
import { WelcomeScreen } from './WelcomeScreen';
import { ModeSelection } from './ModeSelection';
import { DifficultySelection } from './DifficultySelection';
import { GameBoard } from './GameBoard';
import { CorrectFeedback } from './CorrectFeedback';
import { GentleFeedback } from './GentleFeedback';
import { LevelComplete } from './LevelComplete';
import { ProgressScreen } from './ProgressScreen';
import { SettingsScreen } from './SettingsScreen';
import { CharacterUnlock } from './CharacterUnlock';
import { EndScreen } from './EndScreen';
import { HowToPlayModal } from './HowToPlayModal';
import { Trophy, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickPickContainer() {
  const game = useQuickPickGame();
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen bg-[#FDFBF7] text-[#2C5545] flex flex-col font-sans pb-20">
      
      {/* Top Header Bar when in Game */}
      {game.currentScreen !== 'welcome' && (
        <div className="bg-white/80 backdrop-blur-xs border-b border-[#DCE5E0] px-4 py-2 flex items-center justify-between shadow-2xs sticky top-0 z-30">
          <button
            onClick={() => game.setCurrentScreen('welcome')}
            className="text-xs font-black uppercase tracking-wider text-[#4A8B71] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>🐍 Quick Pick Trail</span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => game.setCurrentScreen('progress-screen')}
              className={`rounded-full px-3 text-xs font-bold gap-1 ${
                game.currentScreen === 'progress-screen'
                  ? 'bg-[#E8F3EB] text-[#2C5545]'
                  : 'text-[#5C7065] hover:bg-[#F3F8F5]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#4A8B71]" />
              <span>Progress</span>
            </Button>
          </div>
        </div>
      )}

      {/* Screen Body */}
      <main className="flex-1 w-full">
        {game.currentScreen === 'welcome' && (
          <WelcomeScreen
            character={game.activeCharacter}
            onStart={() => game.setCurrentScreen('mode-selection')}
            onOpenSettings={() => game.setCurrentScreen('settings')}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
          />
        )}

        {game.currentScreen === 'mode-selection' && (
          <ModeSelection
            selectedMode={game.selectedMode}
            onSelectMode={game.setSelectedMode}
            onBack={() => game.setCurrentScreen('welcome')}
            onNext={() => game.setCurrentScreen('difficulty-selection')}
          />
        )}

        {game.currentScreen === 'difficulty-selection' && (
          <DifficultySelection
            selectedDifficulty={game.selectedDifficulty}
            onSelectDifficulty={game.setSelectedDifficulty}
            onBack={() => game.setCurrentScreen('mode-selection')}
            onStartGame={game.startGame}
          />
        )}

        {game.currentScreen === 'game-board' && (
          <GameBoard
            question={game.currentQuestion}
            apples={game.apples}
            snakeBody={game.snakeBody}
            snakeDirection={game.direction}
            score={game.score}
            lives={game.lives}
            isPaused={game.isPaused}
            activeCharacter={game.activeCharacter}
            onSetDirection={game.setDirection}
            onSelectApple={game.selectApple}
            onTogglePause={() => game.setIsPaused(!game.isPaused)}
          />
        )}

        {game.currentScreen === 'correct-feedback' && (
          <CorrectFeedback
            character={game.activeCharacter}
            correctAnswer={game.currentQuestion?.correctAnswer}
            onNextQuestion={() => {
              game.nextQuestion();
              game.setCurrentScreen('game-board');
            }}
          />
        )}

        {game.currentScreen === 'gentle-feedback' && (
          <GentleFeedback
            character={game.activeCharacter}
            onContinue={() => {
              game.setCurrentScreen('game-board');
            }}
          />
        )}

        {game.currentScreen === 'level-complete' && (
          <LevelComplete
            character={game.activeCharacter}
            level={game.level}
            score={game.score}
            difficulty={game.selectedDifficulty}
            onNextLevel={() => {
              game.nextQuestion();
              game.setCurrentScreen('game-board');
            }}
            onHome={game.finishSession}
          />
        )}

        {game.currentScreen === 'character-unlock' && (
          <CharacterUnlock
            unlockedCharacter={game.unlockedCharacter}
            onUseCharacter={(id) => game.selectCharacterSkin(id)}
            onContinue={() => game.setCurrentScreen('level-complete')}
          />
        )}

        {game.currentScreen === 'progress-screen' && (
          <ProgressScreen
            history={game.progressHistory}
            onBack={() => game.setCurrentScreen('welcome')}
          />
        )}

        {game.currentScreen === 'settings' && (
          <SettingsScreen
            settings={game.settings}
            characters={game.characters}
            activeCharacter={game.activeCharacter}
            onUpdateSettings={game.updateSettings}
            onSelectCharacter={game.selectCharacterSkin}
            onBack={() => game.setCurrentScreen('welcome')}
          />
        )}

        {game.currentScreen === 'end-screen' && (
          <EndScreen
            character={game.activeCharacter}
            onPlayAgain={() => game.setCurrentScreen('mode-selection')}
            onHome={() => game.setCurrentScreen('welcome')}
          />
        )}
      </main>

      {/* How To Play Tutorial Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

    </div>
  );
}
