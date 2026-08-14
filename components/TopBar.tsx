"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";

export default function TopBar() {
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

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
      {/* Clock — top left */}
      <Clock />

      {/* Live listeners — top right */}
      <div className="ml-auto flex items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:text-sm">
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
    </header>
  );
}
