"use client";

import type { Track } from "../lib/types";

interface TrackMeaningProps {
  track: Track;
}

export default function TrackMeaning({ track }: TrackMeaningProps) {
  if (!track.description) return null;

  return (
    <div className="mt-4 max-w-2xl px-5 text-center">
      <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-cream/40">
        FROM THE TRACK
      </p>

      <p className="mt-2 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/65 sm:text-[0.9rem]">
        {track.description}
      </p>
    </div>
  );
}
