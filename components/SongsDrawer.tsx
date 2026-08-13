"use client";

import { tracks } from "@/lib/tracks";

interface SongsDrawerProps {
  open: boolean;
  activeIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function SongsDrawer({ open, activeIndex, onSelect, onClose }: SongsDrawerProps) {
  if (!open) return null;

  return (
    <div className="absolute right-4 top-16 z-30 w-64 overflow-hidden rounded-xl border border-cream/15 bg-[#1c110a]/92 shadow-2xl backdrop-blur-sm sm:right-8">
      <div className="flex items-center justify-between border-b border-cream/10 px-4 py-2.5">
        <span className="font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.25em] text-cream/60">
          SONGS
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close song list"
          className="flex h-6 w-6 items-center justify-center rounded-full text-cream/50 hover:text-cream"
        >
          ×
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto py-1">
        {tracks.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(i);
                onClose();
              }}
              aria-current={i === activeIndex}
              className={`flex w-full min-h-11 items-center justify-between gap-2 px-4 py-2 text-left transition-colors ${
                i === activeIndex ? "bg-cream/10 text-gold" : "text-cream/75 hover:bg-cream/5"
              }`}
            >
              <span className="truncate font-[family-name:var(--font-display)] text-sm">{t.title}</span>
              <span className="shrink-0 font-[family-name:var(--font-ui)] text-[0.6rem] text-cream/40">
                {t.category}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
