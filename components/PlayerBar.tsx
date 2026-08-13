"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "@/lib/tracks";
import { useYouTubePlayer } from "@/lib/useYouTubePlayer";

const YOUTUBE_ELEMENT_ID = "mati-radio-youtube-player";

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  seekTo: (seconds: number) => void;
  className?: string;
}

function ProgressBar({ duration, currentTime, seekTo, className = "" }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const percent = duration ? (currentTime / duration) * 100 : 0;

  function ratioFromPointer(clientX: number) {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!duration) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    seekTo(ratioFromPointer(e.clientX) * duration);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons !== 1 || !duration) return;
    seekTo(ratioFromPointer(e.clientX) * duration);
  }

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`progress-track relative h-1.5 ${className}`}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration) || 0}
      aria-valuenow={Math.round(currentTime)}
    >
      <div className="progress-fill absolute inset-y-0 left-0" style={{ width: `${percent}%` }} />
      <div
        className="progress-thumb absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full"
        style={{ left: `${percent}%` }}
      />
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

interface PlayerBarProps {
  trackIndex: number;
  onTrackIndexChange: (i: number) => void;
}

export default function PlayerBar({ trackIndex, onTrackIndexChange }: PlayerBarProps) {
  const [volume, setVolume] = useState(70);
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false);
  const errorStreakRef = useRef(0);
  const track = tracks[trackIndex];
  const isPlaceholder = track.videoId.startsWith("REPLACE_WITH_VIDEO_ID");

  const advanceTrack = useCallback(() => {
    onTrackIndexChange((trackIndex + 1) % tracks.length);
  }, [trackIndex, onTrackIndexChange]);

  const handleError = useCallback(
    (code: number, videoId: string) => {
      // eslint-disable-next-line no-console
      console.warn(`[mati-radio] YouTube error ${code} for ${videoId} — skipping track.`);
      errorStreakRef.current += 1;
      // Every track has now failed back-to-back (e.g. all placeholder IDs) —
      // stop auto-advancing so we don't spin in an infinite error loop.
      if (errorStreakRef.current >= tracks.length) {
        setPlaybackUnavailable(true);
        return;
      }
      advanceTrack();
    },
    [advanceTrack]
  );

  const { status, duration, currentTime, play, pause, setVolume: setPlayerVolume, seekTo } =
    useYouTubePlayer({
      elementId: YOUTUBE_ELEMENT_ID,
      videoId: track.videoId,
      onEnded: advanceTrack,
      onError: handleError,
    });

  // A real PLAYING state means at least one track works — clear any
  // stuck "unavailable" flag and reset the error streak.
  useEffect(() => {
    if (status === "playing") {
      errorStreakRef.current = 0;
      setPlaybackUnavailable(false);
    }
  }, [status]);

  const isPlaying = status === "playing";
  const isBuffering = status === "buffering";

  function togglePlay() {
    if (isPlaying || isBuffering) {
      pause();
      return;
    }
    if (isPlaceholder) {
      // Don't even ask YouTube to play an ID we already know is a stand-in.
      setPlaybackUnavailable(true);
      return;
    }
    setPlaybackUnavailable(false);
    play();
  }

  function nextTrack() {
    setPlaybackUnavailable(false);
    onTrackIndexChange((trackIndex + 1) % tracks.length);
  }

  function prevTrack() {
    setPlaybackUnavailable(false);
    onTrackIndexChange((trackIndex - 1 + tracks.length) % tracks.length);
  }

  function handleVolumeChange(v: number) {
    setVolume(v);
    setPlayerVolume(v);
  }

  return (
    <div className="player-parchment relative z-20 mx-auto w-full max-w-[900px] rounded-2xl p-2.5 sm:p-3">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Artwork / visible YouTube stage — no thumbnails downloaded or re-hosted */}
        <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg border border-[#3b2618]/30 bg-[#20140c] shadow-inner sm:w-16">
          <div id={YOUTUBE_ELEMENT_ID} className="h-full w-full" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-[#5a3d24]/70">
            NOW PLAYING
          </p>
          <p className="truncate font-[family-name:var(--font-display)] text-sm font-semibold text-[#241812] sm:text-base">
            {track.title}
          </p>
          <p className="truncate font-[family-name:var(--font-ui)] text-[0.7rem] text-[#5a3d24]/80">
            {track.artist} · {track.category}
          </p>

          {playbackUnavailable && (
            <p className="mt-1 font-[family-name:var(--font-ui)] text-[0.6rem] tracking-wide text-[#8a3a22]" role="status">
              No playable video ID yet for this track — add one in lib/tracks.ts.
            </p>
          )}

          {/* Progress bar — pointer-driven seeking, only moves on real playback */}
          <div className="mt-2 hidden items-center gap-2 sm:flex">
            <ProgressBar duration={duration} currentTime={currentTime} seekTo={seekTo} className="flex-1" />
            <span className="shrink-0 font-[family-name:var(--font-ui)] text-[0.65rem] tabular-nums text-[#5a3d24]/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={prevTrack}
            aria-label="Previous song"
            className="control-btn flex h-11 w-11 items-center justify-center rounded-full"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M1 1h2v12H1zM13 1 4 7l9 6z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
            className="play-btn flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12"
          >
            {isBuffering ? (
              <span className="h-3 w-3 animate-pulse rounded-full bg-current" aria-hidden="true" />
            ) : isPlaying ? (
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="3" y="2" width="4" height="12" />
                <rect x="9" y="2" width="4" height="12" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3 2l11 6-11 6z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={nextTrack}
            aria-label="Next song"
            className="control-btn flex h-11 w-11 items-center justify-center rounded-full"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M11 1h2v12h-2zM1 1l9 6-9 6z" />
            </svg>
          </button>

          <div className="hidden items-center gap-1.5 md:flex">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-[#5a3d24]/70" aria-hidden="true">
              <path d="M2 6h3l4-3v10l-4-3H2z" />
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              aria-label="Volume"
              className="h-11 w-16 accent-[#B5522E]"
            />
          </div>
        </div>
      </div>

      {/* Mobile progress bar — stacked below on narrow screens */}
      <div className="mt-3 flex items-center gap-2 sm:hidden">
        <ProgressBar duration={duration} currentTime={currentTime} seekTo={seekTo} className="flex-1" />
        <span className="shrink-0 font-[family-name:var(--font-ui)] text-[0.6rem] tabular-nums text-[#5a3d24]/80">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
