import type { Station, Track } from "@/lib/types";

interface CulturalInfoProps {
  station: Station;
  track: Track;
}

export default function CulturalInfo({ station, track }: CulturalInfoProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-[family-name:var(--font-ui)] text-[0.6rem] uppercase tracking-[0.2em] text-cream/45 sm:justify-start">
      <span>Region — {station.region}</span>
      <span aria-hidden="true">·</span>
      <span>Style — {track.category}</span>
    </div>
  );
}
