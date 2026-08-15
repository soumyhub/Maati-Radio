"use client";

import { useState } from "react";

export default function MemoryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("A childhood memory");
  const [message, setMessage] = useState("");

  return (
    <>
      {/* =========================================================
          CLOSED SHARE TAB
          ========================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Share a memory or feedback"
        className={`fixed right-0 top-1/2 z-[60] -translate-y-1/2 rounded-l-xl border border-r-0 border-cream/15 bg-[#241811]/85 px-2.5 py-4 text-cream/75 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#241811] hover:text-cream ${
          isOpen
            ? "pointer-events-none translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <span className="flex flex-col items-center gap-2">
          {/* Note / memory icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 4h14v16H5z" />
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h5" />
          </svg>

          <span className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.18em] [writing-mode:vertical-rl]">
            SHARE
          </span>
        </span>
      </button>

      {/* =========================================================
          SMALL RIGHT-SIDE DRAWER
          ========================================================= */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-1/2 z-50 w-[min(88vw,360px)] -translate-y-1/2 overflow-hidden rounded-l-2xl border border-r-0 border-cream/15 bg-[#241811]/95 text-cream shadow-2xl backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="max-h-[82vh] overflow-y-auto px-5 py-6 sm:px-6 sm:py-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-cream/45">
                FROM THE LISTENERS
              </p>

              <h2
                className="mt-2 font-[family-name:var(--font-devanagari)] text-2xl font-bold leading-tight text-cream sm:text-3xl"
                lang="hi"
              >
                कुछ छोड़ जाइए
              </h2>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/55 transition-colors duration-200 hover:border-cream/30 hover:text-cream"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Intro */}
          <p className="mt-5 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/75">
            A memory. A feeling. A thought about home.
          </p>

          <p className="mt-2.5 font-[family-name:var(--font-display)] text-xs leading-relaxed text-cream/55 sm:text-sm">
            If Maati Radio reminded you of something, we'd love to hear it.
            Share a childhood memory, a feeling, or simply tell us what you
            felt while listening.
          </p>

          {/* =====================================================
              FORM
              ===================================================== */}
          <div className="mt-6">
            {/* Type */}
            <label
              htmlFor="memory-type"
              className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.22em] text-cream/45"
            >
              THIS IS
            </label>

            <select
              id="memory-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full appearance-none rounded-lg border border-cream/15 bg-[#241811]/75 px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-xs text-cream/80 outline-none transition-colors focus:border-cream/30"
            >
              <option>A childhood memory</option>
              <option>A feeling</option>
              <option>Feedback</option>
              <option>A story</option>
              <option>Something else</option>
            </select>

            {/* Message */}
            <label
              htmlFor="memory-message"
              className="mt-5 block font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.22em] text-cream/45"
            >
              YOUR WORDS
            </label>

            <textarea
              id="memory-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something you remember..."
              rows={5}
              maxLength={1000}
              className="mt-2 w-full resize-none rounded-lg border border-cream/15 bg-[#241811]/75 px-3.5 py-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/85 outline-none placeholder:text-cream/30 transition-colors focus:border-cream/30"
            />

            {/* Character count */}
            <div className="mt-1.5 text-right">
              <span className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.1em] text-cream/30">
                {message.length}/1000
              </span>
            </div>

            {/* Anonymous notice */}
            <div className="mt-4 flex gap-2.5 rounded-lg border border-cream/10 bg-[#241811]/55 px-3.5 py-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-cream/45"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0-6 6v3a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6Z" />
                <path d="M8 21h8" />
                <path d="M12 15v6" />
              </svg>

              <p className="font-[family-name:var(--font-ui)] text-[0.55rem] leading-relaxed tracking-wide text-cream/45">
                Shared anonymously. No name or personal details are required.
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              disabled={!message.trim()}
              className="mt-5 w-full rounded-lg border border-cream/20 bg-cream/10 px-4 py-3 font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.2em] text-cream transition-all duration-300 hover:bg-cream/15 disabled:cursor-not-allowed disabled:opacity-30"
            >
              LEAVE IT HERE
            </button>
          </div>

          {/* Bottom station label */}
          <div className="mt-6 text-center">
            <p className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.28em] text-cream/25">
              94.7 FM · RAJASTHAN
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
