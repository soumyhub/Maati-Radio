import type { Station } from "@/lib/types";

interface RadioDisplayProps {
  station: Station;
  isStatic: boolean;
  youtubeElementId: string;
}

export default function RadioDisplay({ station, isStatic, youtubeElementId }: RadioDisplayProps) {
  return (
    <div className="dial-glass rounded-lg p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.25em] text-cream/50 sm:text-xs">
        <span>MĀTI RADIO</span>
        <span>{station.frequency} FM</span>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="shrink-0">
          <p
            className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none text-[#E4B366] drop-shadow-[0_0_10px_rgba(228,179,102,0.35)] sm:text-5xl"
            aria-live="polite"
          >
            {station.frequency}
          </p>
          <p className="mt-1 font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.35em] text-cream/50 sm:text-[0.6rem]">
            RAJASTHAN
          </p>
          <div className="mt-2 flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.2em] text-[#7BAE6F]">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-slow" aria-hidden="true" />
            ON AIR
          </div>
        </div>

        {/* Visible YouTube screen — framed like an old radio's dial window */}
        <div className="relative aspect-video w-full max-w-[220px] overflow-hidden rounded-[2px] border border-[#6b4a30]/60 bg-black/70 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]">
          <div id={youtubeElementId} className="h-full w-full" />
          {isStatic && (
            <div
              className="static-flicker pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,#000_0px,#333_1px,#000_2px)] mix-blend-screen"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
