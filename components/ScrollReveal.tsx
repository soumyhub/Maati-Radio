"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the cinematic Hero → About transition. Measures how far its
 * wrapped content (the About panel) has scrolled into view and writes a
 * single 0–1 progress value to `--reveal` on the root element. BrandMark's
 * title and the About panel each read that same variable in globals.css
 * (`.hero-title-reveal`, `.about-panel`) to animate in sync, without any
 * extra animation library or per-frame React re-renders.
 */
export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function measure() {
      const el = triggerRef.current;
      ticking = false;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // progress 0 → About's top is at the bottom of the viewport (just
      // arriving). progress 1 → its top has risen 90% of the way to the
      // top of the viewport. Clamped so it holds steady before/after.
      const raw = (vh - rect.top) / (vh * 0.9);
      const progress = Math.min(1, Math.max(0, raw));

      document.documentElement.style.setProperty("--reveal", progress.toFixed(4));
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    }

    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return <div ref={triggerRef}>{children}</div>;
}
