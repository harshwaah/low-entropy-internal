import { useState, useEffect, useCallback } from 'react';
import { MemoryEntry, MemoryLocation, FamilyContribution } from '../types';
import { MEMORY_LOCATIONS } from '../data/memoryLocations';
import { memoryStorageService } from '../services/memoryStorageService';
import { familyContributionService } from '../services/familyContributionService';
import { memoryStoryService } from '../services/memoryStoryService';
import { useActivityTracking } from './useActivityTracking';

export type MemoryTrailScreen =
  | 'welcome' // 1
  | 'choose-location' // 2
  | 'memory-experience' // 3
  | 'gentle-question' // 4
  | 'patient-response' // 5
  | 'positive-feedback' // 6
  | 'memory-saved' // 7
  | 'continue-explore' // 8
  | 'memory-book' // 9
  | 'family-contributions'; // 10

export function useMemoryTrail() {
  const [currentScreen, setCurrentScreen] = useState<MemoryTrailScreen>('welcome');
  const [selectedLocation, setSelectedLocation] = useState<MemoryLocation | null>(null);
  const [visitedLocationIds, setVisitedLocationIds] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [promptSelected, setPromptSelected] = useState<string | undefined>(undefined);
  const [textResponse, setTextResponse] = useState<string>('');
  const [savedMemories, setSavedMemories] = useState<MemoryEntry[]>([]);
  const [familyContributions, setFamilyContributions] = useState<FamilyContribution[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);

  const tracking = useActivityTracking();

  // Load saved memories & family contributions on mount
  useEffect(() => {
    async function loadData() {
      const memories = await memoryStorageService.getMemories('patient-1');
      setSavedMemories(memories);
      const visited = Array.from(new Set(memories.map(m => m.locationId)));
      setVisitedLocationIds(visited);

      const familyContent = await familyContributionService.getFamilyContributions('patient-1');
      setFamilyContributions(familyContent);
    }
    loadData();
  }, []);

  const selectLocation = useCallback(
    (location: MemoryLocation) => {
      setSelectedLocation(location);
      setCurrentQuestionIndex(0);
      setPromptSelected(undefined);
      setTextResponse('');
      setIsAudioPlaying(false);
      setIsSongPlaying(false);

      tracking.trackEvent('location_selected', { locationId: location.id, title: location.title });
      setCurrentScreen('memory-experience');
    },
    [tracking]
  );

  const rotateQuestion = useCallback(() => {
    if (!selectedLocation || selectedLocation.defaultQuestions.length <= 1) return;
    const nextIdx = (currentQuestionIndex + 1) % selectedLocation.defaultQuestions.length;
    setCurrentQuestionIndex(nextIdx);
    setPromptSelected(undefined);
    tracking.trackEvent('question_asked', {
      question: selectedLocation.defaultQuestions[nextIdx],
      rotated: true,
    });
  }, [selectedLocation, currentQuestionIndex, tracking]);

  const saveCurrentMemory = useCallback(
    async (params: {
      voiceUrl?: string | null;
      voiceTranscript?: string;
      skipped?: boolean;
    }) => {
      if (!selectedLocation) return;

      const questionAsked = selectedLocation.defaultQuestions[currentQuestionIndex] || '';
      const responseText = params.skipped ? '' : textResponse;
      const formattedStory = await memoryStoryService.formatLifeStorySnippet(
        responseText || params.voiceTranscript || '',
        selectedLocation.title,
        promptSelected
      );

      const entry: MemoryEntry = {
        id: `mem-${Date.now()}`,
        patientId: 'patient-1',
        locationId: selectedLocation.id,
        locationTitle: selectedLocation.title,
        locationEmoji: selectedLocation.emoji,
        questionAsked,
        promptSelected,
        patientResponseText: responseText || undefined,
        voiceRecordingUrl: params.voiceUrl || undefined,
        voiceTranscript: params.voiceTranscript || undefined,
        familyContribution: selectedLocation.familyContribution,
        formattedStory,
        createdAt: new Date().toISOString(),
      };

      if (!params.skipped) {
        await memoryStorageService.saveMemory(entry);
        setSavedMemories(prev => [entry, ...prev]);
        setVisitedLocationIds(prev => Array.from(new Set([selectedLocation.id, ...prev])));
      }

      // Track progress record
      const responseType = params.skipped
        ? 'skipped'
        : params.voiceUrl && responseText
        ? 'voice_and_text'
        : params.voiceUrl
        ? 'voice'
        : 'text';

      await tracking.saveProgressRecord({
        locationId: selectedLocation.id,
        locationName: selectedLocation.title,
        questionAsked,
        responseType,
        responseProvided: !params.skipped,
        optionalPromptSelected: promptSelected,
        voiceRecordingAvailable: Boolean(params.voiceUrl),
        transcriptAvailable: Boolean(params.voiceTranscript),
        memorySaved: !params.skipped,
        completed: true,
        familyContentViewed: true,
        familyContentInteracted: Boolean(selectedLocation.familyContribution),
      });

      setCurrentScreen('positive-feedback');
    },
    [selectedLocation, currentQuestionIndex, textResponse, promptSelected, tracking]
  );

  const navigateToScreen = useCallback((screen: MemoryTrailScreen) => {
    setCurrentScreen(screen);
  }, []);

  return {
    currentScreen,
    setCurrentScreen: navigateToScreen,
    selectedLocation,
    selectLocation,
    visitedLocationIds,
    locations: MEMORY_LOCATIONS,
    currentQuestionIndex,
    currentQuestion: selectedLocation
      ? selectedLocation.defaultQuestions[currentQuestionIndex]
      : '',
    rotateQuestion,
    promptSelected,
    setPromptSelected,
    textResponse,
    setTextResponse,
    savedMemories,
    familyContributions,
    isAudioPlaying,
    setIsAudioPlaying,
    isSongPlaying,
    setIsSongPlaying,
    saveCurrentMemory,
    tracking,
  };
}
