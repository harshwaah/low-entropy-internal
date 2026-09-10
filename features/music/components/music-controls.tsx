'use client';

import { useMemo, type ChangeEvent } from 'react';
import {
  Music2,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getTracksForMode } from '../constants/track-catalog';
import { useMusic } from '../hooks/use-music';

export function MusicControls() {
  const {
    status,
    currentTrack,
    volume,
    muted,
    mode,
    autoplayBlocked,
    play,
    pause,
    toggleMute,
    setVolume,
    selectTrack,
  } = useMusic();

  const playableTracks = useMemo(
    () =>
      getTracksForMode(mode).filter(
        (track) => !track.isPlaceholder && track.src.trim().length > 0
      ),
    [mode]
  );

  const currentTrackIndex = playableTracks.findIndex(
    (track) => track.id === currentTrack?.id
  );
  const hasPlayableTracks = playableTracks.length > 0;
  const isCurrentTrackPlayable = currentTrackIndex >= 0;
  const isPlaying = status === 'playing';
  const isLoading = status === 'loading';
  const volumePercent = Math.round(Math.min(1, Math.max(0, volume)) * 100);
  const modeLabel = mode === 'cognitive' ? 'Activity Music' : 'Calm Music';
  const trackTitle = isCurrentTrackPlayable
    ? currentTrack?.title
    : hasPlayableTracks
      ? 'Ready to play music'
      : 'Music will be available soon';

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
      return;
    }

    if (!hasPlayableTracks) return;

    if (!isCurrentTrackPlayable) {
      await selectTrack(playableTracks[0].id);
    }

    await play();
  };

  const handleNextTrack = async () => {
    if (!hasPlayableTracks) return;

    const nextIndex =
      currentTrackIndex < 0
        ? 0
        : (currentTrackIndex + 1) % playableTracks.length;

    await selectTrack(playableTracks[nextIndex].id);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPercent = Number(event.currentTarget.value);
    if (!Number.isFinite(nextPercent)) return;

    const safePercent = Math.min(100, Math.max(0, nextPercent));
    setVolume(safePercent / 100);
  };

  const playLabel = isPlaying
    ? 'Pause'
    : autoplayBlocked
      ? 'Tap to play music'
      : 'Play';

  return (
    <section
      aria-labelledby="patient-music-title"
      className="rounded-3xl border-2 border-brand-border bg-brand-light-alt p-4 text-brand-dark shadow-sm sm:p-5"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white"
          aria-hidden="true"
        >
          <Music2 className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-brand-primary">{modeLabel}</p>
          <h2
            id="patient-music-title"
            className="truncate text-lg font-extrabold text-brand-dark"
          >
            {trackTitle}
          </h2>
        </div>
      </div>

      {!hasPlayableTracks && (
        <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-center text-base font-semibold text-brand-muted">
          Licensed music is being prepared.
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <Button
          type="button"
          size="lg"
          onClick={() => void handlePlayPause()}
          disabled={!hasPlayableTracks || isLoading}
          aria-label={playLabel}
          className="h-14 min-w-0 px-3"
        >
          {isPlaying ? (
            <Pause className="mr-2 h-6 w-6 fill-current" aria-hidden="true" />
          ) : (
            <Play className="mr-2 h-6 w-6 fill-current" aria-hidden="true" />
          )}
          <span className="truncate">{autoplayBlocked ? 'Tap to Play' : playLabel}</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => void handleNextTrack()}
          disabled={!hasPlayableTracks || isLoading}
          aria-label="Play next music track"
          className="h-14 min-w-0 px-3"
        >
          <SkipForward className="mr-2 h-6 w-6" aria-hidden="true" />
          <span>Next</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="h-14 min-w-0 px-3"
        >
          {muted ? (
            <VolumeX className="mr-2 h-6 w-6" aria-hidden="true" />
          ) : (
            <Volume2 className="mr-2 h-6 w-6" aria-hidden="true" />
          )}
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </Button>
      </div>

      <div className="mt-4 rounded-2xl bg-white px-4 py-3">
        <div className="mb-1 flex items-center justify-between gap-3">
          <label htmlFor="patient-music-volume" className="text-base font-bold">
            Volume
          </label>
          <output
            htmlFor="patient-music-volume"
            className="text-base font-extrabold text-brand-primary"
          >
            {volumePercent}%
          </output>
        </div>

        <input
          id="patient-music-volume"
          type="range"
          min="0"
          max="100"
          step="5"
          value={volumePercent}
          onChange={handleVolumeChange}
          aria-label={`Music volume, ${volumePercent} percent`}
          className="h-12 w-full cursor-pointer accent-brand-primary disabled:cursor-not-allowed"
        />
      </div>

      <div className="mt-2 min-h-6 text-center" aria-live="polite">
        {autoplayBlocked && hasPlayableTracks && (
          <p className="text-sm font-bold text-brand-primary">
            Tap Play to start the music.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-bold text-brand-muted">
            Music could not play. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
