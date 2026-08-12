"use client";

import { useRef } from "react";
import type { Station } from "@/lib/types";

interface FrequencyDialProps {
  stations: Station[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function FrequencyDial({ stations, activeIndex, onSelect }: FrequencyDialProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const step = 100 / (stations.length - 1);
  const needlePercent = activeIndex * step;

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onSelect(Math.min(stations.length - 1, index + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onSelect(Math.max(0, index - 1));
    }
  }

  return (
    <div
      className="dial-glass relative rounded-lg px-4 pb-5 pt-6 sm:px-6"
      role="group"
      aria-label="Tune frequency"
    >
      {/* tuning needle track */}
      <div ref={trackRef} className="relative mb-4 h-8">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#7a5a3a]/40" />
        {/* tick marks */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
          {stations.map((s) => (
            <span key={s.id} className="h-3 w-px bg-[#8a6a48]/50" aria-hidden="true" />
          ))}
        </div>
        {/* needle */}
        <div
          className="absolute top-0 h-8 w-[2px] -translate-x-1/2 bg-[#E4B366] shadow-[0_0_6px_rgba(228,179,102,0.8)] transition-[left] duration-500 ease-out"
          style={{ left: `${needlePercent}%` }}
          aria-hidden="true"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#E4B366]" />
        </div>
      </div>

      {/* frequency labels, doubling as the interactive control surface */}
      <div className="flex justify-between" role="radiogroup" aria-label="Radio stations">
        {stations.map((s, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`min-h-11 min-w-11 rounded-sm px-1.5 py-1 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B366] sm:text-xs ${
                active ? "text-[#E4B366]" : "text-[#8a6a48] hover:text-[#c9a25e]"
              }`}
            >
              {s.frequency}
            </button>
          );
        })}
      </div>
    </div>
  );
}
