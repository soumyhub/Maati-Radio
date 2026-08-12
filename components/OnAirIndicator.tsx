"use client";

import { useEffect, useState } from "react";

export default function OnAirIndicator() {
  // Small organic drift so the number doesn't feel like a static prop.
  const [listeners, setListeners] = useState(1284);

  useEffect(() => {
    const id = setInterval(() => {
      setListeners((n) => {
        const drift = Math.floor(Math.random() * 5) - 2;
        return Math.max(900, n + drift);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/85 sm:text-sm">
      <span
        className="inline-block h-2 w-2 rounded-full bg-[#7BAE6F] text-[#7BAE6F] animate-pulse-slow"
        aria-hidden="true"
      />
      <span>ON AIR</span>
      <span className="hidden text-cream/40 sm:inline">·</span>
      <span className="hidden tabular-nums sm:inline">
        {listeners.toLocaleString("en-IN")} LISTENING
      </span>
    </div>
  );
}
