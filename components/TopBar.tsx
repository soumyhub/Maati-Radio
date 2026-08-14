"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";

interface TopBarProps {
  onToggleSongs: () => void;
  songsOpen: boolean;
}

export default function TopBar({ onToggleSongs, songsOpen }: TopBarProps) {
  const [listeners, setListeners] = useState(() =>
    Math.floor(Math.random() * 61) + 140
  );

  useEffect(() => {
    const id = setInterval(() => {
      setListeners((n) => {
        // Randomly increase or decrease by 1–3
        const change = Math.floor(Math.random() * 3) + 1;
        const direction = Math.random() < 0.5 ? -1 : 1;

        const next = n + change * direction;

        // Keep live count strictly between 140 and 200
        return Math.min(200, Math.max(140, next));
      });
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      {/* Clock — left */}
      <Clock />

      {/* Live listeners — perfectly centered */}
      <div className="pointer-events-none absolute left-1/2 top-[max(1rem,env(safe-area-inset-top))] -translate-x-1/2 flex items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:top-6 sm:text-sm">
        <span
          className="inline-block h-2 w-2 rounded-full bg-[#7BAE6F] animate-pulse-slow"
          aria-hidden="true"
        />

        <span className="tabular-nums">
          {listeners.toLocaleString("en-IN")}
        </span>

        <span className="text-cream/60">
          online
        </span>
      </div>

      {/* Right buttons */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* Add to Spotify */}
        <span
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 sm:inline-block"
          title="Coming soon"
        >
          Add to Spotify
        </span>

        {/* Add to YT Music */}
        <span
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 md:inline-block"
          title="Coming soon"
        >
          Add to YT Music
        </span>
      </div>
    </header>
  );
}
