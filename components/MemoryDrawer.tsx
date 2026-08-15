"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Panel = "share" | "wall" | null;

type Memory = {
  id: number;
  category: string;
  message: string;
  created_at: string;
};

export default function MemoryDrawer() {
  const [panel, setPanel] = useState<Panel>(null);

  // Share form
  const [type, setType] = useState("A childhood memory");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Memory Wall
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);
  const [wallError, setWallError] = useState(false);

  const isOpen = panel !== null;

  const handleClose = () => {
    if (isSubmitting) return;

    setPanel(null);

    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };

  const openShare = () => {
    if (isSubmitting) return;

    setPanel("share");
    setStatus("idle");
  };

  const openWall = () => {
    if (isSubmitting) return;

    setPanel("wall");
    setWallError(false);
  };

  const fetchMemories = async () => {
    setIsLoadingMemories(true);
    setWallError(false);

    try {
      const { data, error } = await supabase
        .from("memories")
        .select("id, category, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Memory Wall error:", error);
        setWallError(true);
        return;
      }

      setMemories((data as Memory[]) ?? []);
    } catch (error) {
      console.error("Unexpected Memory Wall error:", error);
      setWallError(true);
    } finally {
      setIsLoadingMemories(false);
    }
  };

  useEffect(() => {
    if (panel === "wall") {
      fetchMemories();
    }
  }, [panel]);

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

      setStatus("success");
      setMessage("");
    } catch (error) {
      console.error("Unexpected memory submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(date));
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* =========================================================
          CLOSED STATE — RIGHT EDGE TABS
      ========================================================= */}

      <div
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 overflow-hidden rounded-l-xl border border-r-0 border-cream/15 bg-[#241811]/75 shadow-lg backdrop-blur-md transition-all duration-300 ${
          isOpen
            ? "pointer-events-none translate-x-3 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {/* SHARE */}

        <button
          type="button"
          onClick={openShare}
          aria-label="Share a memory"
          className="group flex w-[54px] flex-col items-center justify-center gap-2 border-b border-cream/10 px-2.5 py-4 text-cream/70 transition-colors duration-300 hover:bg-[#241811]/90 hover:text-cream"
        >
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
          onClick={openWall}
          aria-label="Open Memory Wall"
          className="group flex w-[54px] flex-col items-center justify-center gap-2 px-2.5 py-4 text-cream/70 transition-colors duration-300 hover:bg-[#241811]/90 hover:text-cream"
        >
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
            <circle cx="8" cy="8" r="2.5" />
            <circle cx="16" cy="8" r="2.5" />
            <circle cx="8" cy="16" r="2.5" />
            <circle cx="16" cy="16" r="2.5" />
            <path d="M8 10.5v3" />
            <path d="M16 10.5v3" />
            <path d="M10.5 8h3" />
            <path d="M10.5 16h3" />
          </svg>

          <span className="font-[family-name:var(--font-ui)] text-[0.43rem] tracking-[0.14em] [writing-mode:vertical-rl]">
            MEMORY WALL
          </span>
        </button>
      </div>

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
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* =======================================================
            SHARE PANEL
        ======================================================= */}

        {panel === "share" && (
          <div className="flex min-h-full flex-col px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}

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

            {/* Intro */}

            <p className="mt-6 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/75 sm:text-lg">
              A memory. A feeling. A thought about home.
            </p>

            <p className="mt-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/55 sm:text-base">
              If Maati Radio reminded you of something, we'd love to hear it.
              Share a childhood memory, a feeling, or simply tell us what you
              felt while listening.
            </p>

            {/* Form */}

            <div className="mt-8">
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

              <div className="mt-2 text-right">
                <span className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.12em] text-cream/35">
                  {message.length}/1000
                </span>
              </div>

              {/* Anonymous notice */}

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
                  Shared anonymously. No name or personal details are
                  required.
                </p>
              </div>

              {/* Success */}

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

              {/* Error */}

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

              {/* Submit */}

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

            {/* Bottom */}

            <div className="mt-auto pt-12 text-center">
              <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-cream/30">
                94.7 FM · RAJASTHAN
              </p>
            </div>
          </div>
        )}

        {/* =======================================================
            MEMORY WALL PANEL
        ======================================================= */}

        {panel === "wall" && (
          <div className="flex min-h-full flex-col px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}

            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.35em] text-cream/50">
                  THE MEMORY WALL
                </p>

                <h2
                  className="mt-3 font-[family-name:var(--font-devanagari)] text-3xl font-bold leading-tight text-cream sm:text-4xl"
                  lang="hi"
                >
                  लोगों की यादें
                </h2>
              </div>

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

            {/* Intro */}

            <p className="mt-6 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/70 sm:text-lg">
              Little pieces of home, left here by listeners.
            </p>

            <p className="mt-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/50 sm:text-base">
              Every note is shared anonymously. Read what others remembered,
              felt, and carried with them.
            </p>

            {/* Memory list */}

            <div className="mt-8">
              {isLoadingMemories && (
                <div className="py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border border-cream/20 border-t-cream/70" />

                  <p className="mt-4 font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.2em] text-cream/35">
                    GATHERING MEMORIES...
                  </p>
                </div>
              )}

              {!isLoadingMemories && wallError && (
                <div className="rounded-xl border border-cream/10 bg-[#241811]/35 px-5 py-6 text-center">
                  <p className="font-[family-name:var(--font-ui)] text-xs tracking-[0.12em] text-cream/70">
                    COULDN'T LOAD THE MEMORY WALL.
                  </p>

                  <button
                    type="button"
                    onClick={fetchMemories}
                    className="mt-4 rounded-lg border border-cream/15 px-4 py-2 font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.15em] text-cream/60 transition-colors hover:border-cream/30 hover:text-cream"
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}

              {!isLoadingMemories &&
                !wallError &&
                memories.length === 0 && (
                  <div className="rounded-xl border border-cream/10 bg-[#241811]/35 px-5 py-8 text-center">
                    <p className="font-[family-name:var(--font-ui)] text-xs tracking-[0.15em] text-cream/60">
                      THE WALL IS QUIET.
                    </p>

                    <p className="mt-3 font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/40">
                      Be the first to leave a little memory here.
                    </p>

                    <button
                      type="button"
                      onClick={openShare}
                      className="mt-5 rounded-lg border border-cream/15 px-4 py-2.5 font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.15em] text-cream/65 transition-colors hover:border-cream/30 hover:text-cream"
                    >
                      LEAVE A MEMORY
                    </button>
                  </div>
                )}

              {!isLoadingMemories &&
                !wallError &&
                memories.length > 0 && (
                  <div className="space-y-4">
                    {memories.map((memory) => (
                      <article
                        key={memory.id}
                        className="rounded-xl border border-cream/10 bg-[#241811]/35 px-4 py-4 transition-colors hover:border-cream/15"
                      >
                        {/* Anonymous identity */}

                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-[#0f0b08]/70 text-cream/55">
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
                              <circle cx="12" cy="8" r="3" />
                              <path d="M5 20c.8-3.3 3.1-5 7-5s6.2 1.7 7 5" />
                            </svg>
                          </div>

                          <div className="min-w-0">
                            <p className="font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.12em] text-cream/70">
                              Anonymous User
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="font-[family-name:var(--font-ui)] text-[0.52rem] tracking-[0.12em] text-cream/35">
                                {memory.category}
                              </span>

                              {memory.created_at && (
                                <>
                                  <span className="text-cream/20">·</span>

                                  <span className="font-[family-name:var(--font-ui)] text-[0.5rem] tracking-[0.08em] text-cream/25">
                                    {formatDate(memory.created_at)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Message */}

                        <p className="mt-4 whitespace-pre-wrap font-[family-name:var(--font-display)] text-sm leading-relaxed text-cream/70 sm:text-base">
                          {memory.message}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
            </div>

            {/* Bottom */}

            <div className="mt-auto pt-12 text-center">
              <p className="font-[family-name:var(--font-ui)] text-[0.55rem] tracking-[0.3em] text-cream/30">
                94.7 FM · RAJASTHAN
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
