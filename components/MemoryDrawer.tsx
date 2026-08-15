"use client";

import { useState } from "react";

type Panel = "share" | "wall" | null;

const sampleStories = [
  {
    category: "A childhood memory",
    message:
      "My grandfather used to play folk songs on his old radio every evening. Somehow, this brought that sound back.",
  },
  {
    category: "A feeling",
    message:
      "I have been away from Rajasthan for years. This website somehow felt like a small piece of home.",
  },
  {
    category: "A story",
    message:
      "The sound of folk music always reminds me of summer evenings, rooftops, and sitting outside with family.",
  },
];

export default function MemoryDrawer() {
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [type, setType] = useState("A childhood memory");
  const [message, setMessage] = useState("");

  const isOpen = activePanel !== null;

  const openPanel = (panel: "share" | "wall") => {
    setActivePanel(panel);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  return (
    <>
      {/* =========================================================
          RIGHT EDGE CONTROL
          SHARE + MEMORY WALL
          ========================================================= */}
      <div
        className={`fixed right-0 top-1/2 z-[60] -translate-y-1/2 overflow-hidden rounded-l-xl border border-r-0 border-cream/15 bg-[#241811]/85 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? "pointer-events-none translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* SHARE */}
        <button
          type="button"
          onClick={() => openPanel("share")}
          aria-label="Share a memory or feedback"
          className="group flex w-[54px] flex-col items-center gap-2 border-b border-cream/10 px-2.5 py-4 text-cream/70 transition-colors duration-300 hover:bg-[#241811] hover:text-cream"
        >
          {/* Note icon */}
          <svg
            width="17"
            height="17"
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

          <span className="font-[family-name:var(--font-ui)] text-[0.48rem] tracking-[0.16em] [writing-mode:vertical-rl]">
            SHARE
          </span>
        </button>

        {/* MEMORY WALL */}
        <button
          type="button"
          onClick={() => openPanel("wall")}
          aria-label="Open memory wall"
          className="group flex w-[54px] flex-col items-center gap-2 px-2.5 py-4 text-cream/70 transition-colors duration-300 hover:bg-[#241811] hover:text-cream"
        >
          {/* Small wall / people icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="8" r="2.5" />
            <circle cx="17" cy="9" r="2" />
            <path d="M4 18c0-3 2.2-5 5-5s5 2 5 5" />
            <path d="M14 14c.8-.7 1.8-1 3-1 2.2 0 3.8 1.5 4 4" />
          </svg>

          <span className="font-[family-name:var(--font-ui)] text-[0.43rem] tracking-[0.13em] [writing-mode:vertical-rl]">
            MEMORY WALL
          </span>
        </button>
      </div>

      {/* =========================================================
          SUBTLE BACKDROP
          ========================================================= */}
      <button
        type="button"
        aria-label="Close panel"
        onClick={closePanel}
        className={`fixed inset-0 z-[45] bg-black/15 backdrop-blur-[3px] transition-all duration-500 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* =========================================================
          SHARE DRAWER
          ========================================================= */}
      <aside
        aria-hidden={activePanel !== "share"}
        className={`fixed right-0 top-1/2 z-[50] w-[min(88vw,360px)] -translate-y-1/2 overflow-hidden rounded-l-2xl border border-r-0 border-cream/15 bg-[#241811]/90 text-cream shadow-2xl backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activePanel === "share" ? "translate-x-0" : "translate-x-full"
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
              onClick={closePanel}
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

          {/* Form */}
          <div className="mt-6">
            {/* Category */}
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
              className="mt-2 w-full appearance-none rounded-lg border border-cream/15 bg-[#241811]/70 px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-xs text-cream/80 outline-none transition-colors focus:border-cream/30"
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
              className="mt-2 w-full resize-none rounded-lg border border-cream/15 bg-[#241811]/70 px-3.5 py-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/85 outline-none placeholder:text-cream/30 transition-colors focus:border-cream/30"
            />

            {/* Character count */}
            <div className="mt-1.5 text-right">
              <span className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.1em] text-cream/30">
                {message.length}/1000
              </span>
            </div>

            {/* Anonymous notice */}
            <div className="mt-4 flex gap-2.5 rounded-lg border border-cream/10 bg-[#241811]/50 px-3.5 py-2.5">
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

          {/* Bottom label */}
          <div className="mt-6 text-center">
            <p className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.28em] text-cream/25">
              94.7 FM · RAJASTHAN
            </p>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MEMORY WALL DRAWER
          ========================================================= */}
      <aside
        aria-hidden={activePanel !== "wall"}
        className={`fixed right-0 top-1/2 z-[50] w-[min(88vw,360px)] -translate-y-1/2 overflow-hidden rounded-l-2xl border border-r-0 border-cream/15 bg-[#241811]/90 text-cream shadow-2xl backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activePanel === "wall" ? "translate-x-0" : "translate-x-full"
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
                यादों की दीवार
              </h2>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closePanel}
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

          <p className="mt-5 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/65">
            Little memories, feelings, and stories left behind by people who
            stopped by Maati Radio.
          </p>

          {/* Stories */}
          <div className="mt-6 space-y-4">
            {sampleStories.map((story, index) => (
              <article
                key={index}
                className="rounded-xl border border-cream/10 bg-[#241811]/45 px-4 py-4"
              >
                {/* Anonymous user */}
                <div className="flex items-center gap-3">
                  {/* Anonymous avatar */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-[#18100c] text-cream/50">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="3" />
                      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/75">
                      Anonymous User
                    </p>

                    <p className="mt-0.5 font-[family-name:var(--font-ui)] text-[0.48rem] tracking-[0.16em] text-cream/35">
                      {story.category.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Story */}
                <p className="mt-4 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/70">
                  “{story.message}”
                </p>
              </article>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-cream/10 pt-5 text-center">
            <p className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.25em] text-cream/25">
              94.7 FM · RAJASTHAN
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
