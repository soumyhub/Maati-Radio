"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";

interface TopBarProps {
  onToggleSongs: () => void;
  songsOpen: boolean;
}

export default function TopBar({ onToggleSongs, songsOpen }: TopBarProps) {
  const [listeners, setListeners] = useState(481);

  useEffect(() => {
    const id = setInterval(() => {
      setListeners((n) => Math.max(220, n + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      <Clock />

      <div className="flex items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:text-sm">
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#7BAE6F] text-[#7BAE6F] animate-pulse-slow"
          aria-hidden="true"
        />
        <span className="tabular-nums">{listeners.toLocaleString("en-IN")}</span>
        <span className="hidden text-cream/60 sm:inline">online</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <span
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 sm:inline-block"
          title="Coming soon"
        >
          Spotify
        </span>
        <span
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 md:inline-block"
          title="Coming soon"
        >
          YT Music
        </span>
        <span
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 lg:inline-block"
          title="Coming soon"
        >
          Playlists
        </span>
        <button
          type="button"
          onClick={onToggleSongs}
          aria-pressed={songsOpen}
          className="pill-btn rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/85"
        >
          Songs
        </button>
      </div>
    </header>
  );
}
