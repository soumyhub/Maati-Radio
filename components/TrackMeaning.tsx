"use client";

import type { Track } from "../lib/types";

interface TrackMeaningProps {
  track: Track;
}

export default function TrackMeaning({ track }: TrackMeaningProps) {
  return (
    <div className="absolute left-1/2 top-full mt-4 w-[min(90vw,720px)] -translate-x-1/2 text-center">
      {/* Label */}
      <p className="mb-2 font-[family-name:var(--font-ui)] text-[0.55rem] uppercase tracking-[0.3em] text-cream/40">
        From the Track
      </p>

      {/* Meaning */}
      <p className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/70">
        {track.description}
      </p>
    </div>
  );
}
