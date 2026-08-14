"use client";

import type { Track } from "../lib/types";

interface TrackMeaningProps {
  track: Track;
}

export default function TrackMeaning({ track }: TrackMeaningProps) {
  return (
    <div className="pointer-events-none fixed left-1/2 bottom-[4.5%] z-[11] w-[min(88vw,680px)] -translate-x-1/2 text-center">
      {/* Label */}
      <p className="mb-2 font-[family-name:var(--font-ui)] text-[0.55rem] uppercase tracking-[0.3em] text-cream/40">
        From the Track
      </p>

      {/* Meaning */}
      <p className="mx-auto font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/70">
        {track.description}
      </p>
    </div>
  );
}
