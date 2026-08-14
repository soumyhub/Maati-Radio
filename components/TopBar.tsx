"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";
import type { Track } from "../lib/types";

interface TopBarProps {
  currentTrack: Track;
  onToggleSongs: () => void;
  songsOpen: boolean;
}

export default function TopBar({
  currentTrack,
  onToggleSongs,
  songsOpen,
}: TopBarProps) {
  const [listeners, setListeners] = useState(() =>
    Math.floor(Math.random() * 61) + 140
  );

  useEffect(() => {
    const id = setInterval(() => {
      setListeners((n) => {
        const change = Math.floor(Math.random() * 3) + 1;
        const direction = Math.random() < 0.5 ? -1 : 1;

        const next = n + change * direction;

        return Math.min(200, Math.max(140, next));
      });
    }, 4000);

    return () => clearInterval(id);
  }, []);

  // Opens the exact YouTube video in YouTube Music.
  const youtubeMusicUrl = `https://music.youtube.com/watch?v=${currentTrack.videoId}`;

  // Spotify search for the currently playing song.
  // This will search Spotify using the current song title + artist.
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
    `${currentTrack.title} ${currentTrack.artist.replace(/^by\s+/i, "")}`
  )}`;

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      {/* Clock */}
      <Clock />

      {/* Live listeners — perfectly centered */}
      <div className="pointer-events-none absolute left-1/2 top-[max(1rem,env(safe-area-inset-top))] flex -translate-x-1/2 items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:top-6 sm:text-sm">
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

      {/* Music links */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* Add to Spotify */}
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors hover:text-cream sm:inline-block"
          title={`Open ${currentTrack.title} on Spotify`}
        >
          Add to Spotify
        </a>

        {/* Add to YT Music */}
        <a
          href={youtubeMusicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn hidden rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors hover:text-cream md:inline-block"
          title={`Open ${currentTrack.title} on YouTube Music`}
        >
          Add to YT Music
        </a>
      </div>
    </header>
  );
}
