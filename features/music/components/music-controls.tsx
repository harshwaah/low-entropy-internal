'use client';

import { useMemo, type ChangeEvent } from 'react';
import {
  Music2,
  Pause,
  Play,
  SkipBack,
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

  const handlePreviousTrack = async () => {
    if (!hasPlayableTracks) return;

    const previousIndex =
      currentTrackIndex < 0
        ? playableTracks.length - 1
        : (currentTrackIndex - 1 + playableTracks.length) % playableTracks.length;

    await selectTrack(playableTracks[previousIndex].id);
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
      className="rounded-2xl border-2 border-brand-border bg-brand-light-alt/95 p-3 text-brand-dark shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white"
          aria-hidden="true"
        >
          <Music2 className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-brand-primary">{modeLabel}</p>
          <h2
            id="patient-music-title"
            className="truncate text-base font-extrabold text-brand-dark"
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

      <div className="mt-3 grid grid-cols-4 gap-2">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => void handlePreviousTrack()}
          disabled={!hasPlayableTracks || isLoading}
          aria-label="Play previous music track"
          className="h-14 min-w-0 gap-1 px-2 text-xs sm:text-sm"
        >
          <SkipBack className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">Previous</span>
        </Button>

        <Button
          type="button"
          size="lg"
          onClick={() => void handlePlayPause()}
          disabled={!hasPlayableTracks || isLoading}
          aria-label={playLabel}
          className="h-14 min-w-0 gap-1 px-2 text-xs sm:text-sm"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 shrink-0 fill-current" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 shrink-0 fill-current" aria-hidden="true" />
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
          className="h-14 min-w-0 gap-1 px-2 text-xs sm:text-sm"
        >
          <SkipForward className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">Next</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="h-14 min-w-0 gap-1 px-2 text-xs sm:text-sm"
        >
          {muted ? (
            <VolumeX className="h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <Volume2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate">{muted ? 'Unmute' : 'Mute'}</span>
        </Button>
      </div>

      <div className="mt-2 flex items-center gap-3 rounded-xl bg-white px-3 py-1">
        <label htmlFor="patient-music-volume" className="shrink-0 text-sm font-bold">
          Volume
        </label>

        <input
          id="patient-music-volume"
          type="range"
          min="0"
          max="100"
          step="5"
          value={volumePercent}
          onChange={handleVolumeChange}
          aria-label={`Music volume, ${volumePercent} percent`}
          className="h-10 min-w-0 flex-1 cursor-pointer accent-brand-primary disabled:cursor-not-allowed"
        />

        <output
          htmlFor="patient-music-volume"
          className="w-10 shrink-0 text-right text-sm font-extrabold text-brand-primary"
        >
          {volumePercent}%
        </output>
      </div>

      <div className="text-center" aria-live="polite">
        {autoplayBlocked && hasPlayableTracks && (
          <p className="mt-1 text-xs font-bold text-brand-primary">
            Tap Play to start the music.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-1 text-xs font-bold text-brand-muted">
            Music could not play. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
