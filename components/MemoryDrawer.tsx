"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function MemoryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("A childhood memory");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleClose = () => {
    if (isSubmitting) return;

    setIsOpen(false);

    // Clear temporary status when drawer closes
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const { error } = await supabase.from("memories").insert({
        category: type,
        message: trimmedMessage,
      });

      if (error) {
        console.error("Memory submission error:", error);
        setStatus("error");
        return;
      }

      // Successful submission
      setStatus("success");
      setMessage("");
    } catch (error) {
      console.error("Unexpected memory submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* =========================================================
          CLOSED STATE — SHARE TAB
      ========================================================= */}

      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setStatus("idle");
        }}
        aria-label="Share a memory or feedback"
        className={`memory-tab fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl border border-r-0 border-cream/15 bg-[#241811]/75 px-2.5 py-4 text-cream/75 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#241811]/90 hover:text-cream ${
          isOpen
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <span className="flex flex-col items-center gap-2">
          {/* Memory / note icon */}
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

          <span
            className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.18em] [writing-mode:vertical-rl]"
          >
            SHARE
          </span>
        </span>
      </button>

      {/* =========================================================
          BACKDROP
      ========================================================= */}

      <button
        type="button"
        aria-label="Close memory panel"
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-all duration-500 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* =========================================================
          DRAWER
      ========================================================= */}

      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 h-dvh w-[min(88vw,430px)] overflow-y-auto border-l border-cream/10 bg-[#241811]/95 shadow-2xl backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex min-h-full flex-col px-6 py-8 sm:px-8 sm:py-10">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="flex items-start justify-between">
            <div>
              <p className="font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.35em] text-cream/50">
                FROM THE LISTENERS
              </p>

              <h2
                className="mt-3 font-[family-name:var(--font-devanagari)] text-3xl font-bold leading-tight text-cream sm:text-4xl"
                lang="hi"
              >
                कुछ छोड़ जाइए
              </h2>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 hover:border-cream/30 hover:text-cream"
            >
              <svg
                width="18"
                height="18"
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

          {/* =====================================================
              INTRO
          ===================================================== */}

          <p className="mt-6 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/75 sm:text-lg">
            A memory. A feeling. A thought about home.
          </p>

          <p className="mt-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/55 sm:text-base">
            If Maati Radio reminded you of something, we'd love to hear it.
            Share a childhood memory, a feeling, or simply tell us what you
            felt while listening.
          </p>

          {/* =====================================================
              FORM
          ===================================================== */}

          <div className="mt-8">

            {/* Category */}
            <label
              htmlFor="memory-type"
              className="font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.25em] text-cream/50"
            >
              THIS IS
            </label>

            <select
              id="memory-type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setStatus("idle");
              }}
              disabled={isSubmitting}
              className="mt-2 w-full appearance-none rounded-xl border border-cream/15 bg-[#241811]/60 px-4 py-3 font-[family-name:var(--font-ui)] text-sm text-cream/80 outline-none backdrop-blur-sm transition-colors focus:border-cream/30 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="mt-6 block font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.25em] text-cream/50"
            >
              YOUR WORDS
            </label>

            <textarea
              id="memory-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setStatus("idle");
              }}
              placeholder="Write something you remember..."
              rows={7}
              maxLength={1000}
              disabled={isSubmitting}
              className="mt-2 w-full resize-none rounded-xl border border-cream/15 bg-[#241811]/60 px-4 py-4 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/85 outline-none placeholder:text-cream/30 backdrop-blur-sm transition-colors focus:border-cream/30 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            />

            {/* Character count */}
            <div className="mt-2 text-right">
              <span className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.12em] text-cream/35">
                {message.length}/1000
              </span>
            </div>

            {/* =================================================
                ANONYMOUS NOTICE
            ================================================= */}

            <div className="mt-5 flex gap-3 rounded-xl border border-cream/10 bg-[#241811]/35 px-4 py-3">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-cream/50"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0-6 6v3a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6Z" />
                <path d="M8 21h8" />
                <path d="M12 15v6" />
              </svg>

              <p className="font-[family-name:var(--font-ui)] text-[0.65rem] leading-relaxed tracking-wide text-cream/45">
                Shared anonymously. No name or personal details are required.
              </p>
            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {status === "success" && (
              <div className="mt-5 rounded-xl border border-cream/15 bg-cream/5 px-4 py-4 text-center">
                <p className="font-[family-name:var(--font-ui)] text-xs tracking-[0.12em] text-cream/80">
                  LEFT HERE, ANONYMOUSLY.
                </p>

                <p className="mt-2 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/55">
                  Thank you for leaving a little piece of your story with
                  Maati Radio.
                </p>
              </div>
            )}

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {status === "error" && (
              <div className="mt-5 rounded-xl border border-red-200/10 bg-red-950/20 px-4 py-4">
                <p className="font-[family-name:var(--font-ui)] text-xs tracking-[0.1em] text-cream/75">
                  SOMETHING WENT WRONG.
                </p>

                <p className="mt-2 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/50">
                  Your memory wasn't saved. Please try again.
                </p>
              </div>
            )}

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitting}
              className="mt-6 w-full rounded-xl border border-cream/20 bg-cream/10 px-5 py-3.5 font-[family-name:var(--font-ui)] text-xs tracking-[0.2em] text-cream transition-all duration-300 hover:bg-cream/15 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isSubmitting
                ? "LEAVING IT HERE..."
                : status === "success"
                  ? "LEAVE ANOTHER"
                  : "LEAVE IT HERE"}
            </button>
          </div>

          {/* =====================================================
              BOTTOM
          ===================================================== */}

          <div className="mt-auto pt-12 text-center">
            <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-cream/30">
              94.7 FM · RAJASTHAN
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
