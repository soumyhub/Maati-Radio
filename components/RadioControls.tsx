"use client";

interface RadioControlsProps {
  isPlaying: boolean;
  onPrevTrack: () => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export default function RadioControls({
  isPlaying,
  onPrevTrack,
  onTogglePlay,
  onNextTrack,
  volume,
  onVolumeChange,
}: RadioControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPrevTrack}
          aria-label="Previous song"
          className="control-btn flex h-11 w-11 items-center justify-center rounded-full text-cream/85"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M1 1h2v12H1zM13 1 4 7l9 6z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          aria-pressed={isPlaying}
          className="knob flex h-14 w-14 items-center justify-center rounded-full text-cream"
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="4" height="12" />
              <rect x="9" y="2" width="4" height="12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M3 2l11 6-11 6z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={onNextTrack}
          aria-label="Next song"
          className="control-btn flex h-11 w-11 items-center justify-center rounded-full text-cream/85"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M11 1h2v12h-2zM1 1l9 6-9 6z" />
          </svg>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="shrink-0 text-cream/60"
          aria-hidden="true"
        >
          <path d="M2 6h3l4-3v10l-4-3H2z" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Volume"
          className="h-11 w-full min-w-0 accent-[#E4B366]"
        />
      </div>
    </div>
  );
}
