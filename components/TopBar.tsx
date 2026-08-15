"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";

export default function TopBar() {
  const [listeners, setListeners] = useState(153);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      {/* Clock — top left */}
      <Clock />

      {/* Top right controls */}
      <div className="ml-auto flex items-center gap-3">
        {/* Fullscreen button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          className="group flex items-center gap-2 rounded-full border border-cream/15 bg-[#241811]/55 px-4 py-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.12em] text-cream/75 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cream/30 hover:bg-[#241811]/80 hover:text-cream sm:text-sm"
        >
          {isFullscreen ? (
            /* Exit fullscreen icon */
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3v5H3" />
              <path d="M3 8l5-5" />
              <path d="M16 21v-5h5" />
              <path d="M21 16l-5 5" />
              <path d="M3 16l5 5" />
              <path d="M8 21v-5H3" />
              <path d="M21 8l-5-5" />
              <path d="M16 3v5h5" />
            </svg>
          ) : (
            /* Fullscreen icon */
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3H3v5" />
              <path d="M3 3l5 5" />
              <path d="M16 3h5v5" />
              <path d="M21 3l-5 5" />
              <path d="M8 21H3v-5" />
              <path d="M3 21l5-5" />
              <path d="M16 21h5v-5" />
              <path d="M21 21l-5-5" />
            </svg>
          )}

          <span>Fullscreen</span>
        </button>

        {/* Live listeners */}
        <div className="flex items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:text-sm">
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
      </div>
    </header>
  );
}
