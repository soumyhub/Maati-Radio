import type { Station } from "@/lib/types";

interface StationSelectorProps {
  station: Station;
  onPrevStation: () => void;
  onNextStation: () => void;
}

export default function StationSelector({
  station,
  onPrevStation,
  onNextStation,
}: StationSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-cream/90">
      <button
        type="button"
        onClick={onPrevStation}
        aria-label="Previous station"
        className="control-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/80"
      >
        ‹
      </button>

      <div className="min-w-0 flex-1 text-center">
        <p className="truncate font-[family-name:var(--font-display)] text-base font-medium tracking-wide sm:text-lg">
          {station.name}
        </p>
        <p className="font-[family-name:var(--font-ui)] text-[0.6rem] uppercase tracking-[0.25em] text-cream/50 sm:text-[0.65rem]">
          {station.mood}
        </p>
      </div>

      <button
        type="button"
        onClick={onNextStation}
        aria-label="Next station"
        className="control-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream/80"
      >
        ›
      </button>
    </div>
  );
}
