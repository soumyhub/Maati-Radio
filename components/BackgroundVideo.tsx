"use client";

import { useEffect, useRef } from "react";

const SRC = "/bg/maati-radio-bg.mp4";

// Must match the transition duration set on `.scene-video` in globals.css
// (`transition: opacity 1.75s linear`) — kept as one constant here and
// mirrored there since CSS can't read a JS value directly.
const CROSSFADE_SECONDS = 1.75;

/**
 * Two stacked, identical <video> elements ping-ponging control of an
 * "active" role. As the active video nears the end of its duration, the
 * idle one is rewound to 0 and started, and the two cross-fade via CSS
 * opacity — so the loop point is masked by the fade instead of showing
 * the native hard cut a single `loop` video produces.
 */
export default function BackgroundVideo() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let active = a;
    let idle = b;
    let transitioning = false;
    let resetTimer: number | undefined;

    idle.pause();

    function swap() {
      if (transitioning) return;
      transitioning = true;

      idle.currentTime = 0;
      idle.play().catch(() => {
        // Autoplay can be rejected in rare cases (e.g. very aggressive
        // browser power-saving); the fade simply won't show new frames
        // until playback is allowed again, no crash either way.
      });

      active.style.opacity = "0";
      idle.style.opacity = "1";

      const nextActive = idle;
      const nextIdle = active;
      active = nextActive;
      idle = nextIdle;

      resetTimer = window.setTimeout(() => {
        idle.pause();
        transitioning = false;
      }, CROSSFADE_SECONDS * 1000);
    }

    function onTimeUpdate() {
      if (transitioning) return;
      const dur = active.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      if (dur - active.currentTime <= CROSSFADE_SECONDS) {
        swap();
      }
    }

    // Safety net: if timeupdate granularity ever misses the crossfade
    // window, don't let the video freeze on its last frame — swap
    // immediately (still fades, just later than ideal).
    function onEnded() {
      if (!transitioning) swap();
    }

    a.addEventListener("timeupdate", onTimeUpdate);
    b.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("ended", onEnded);
    b.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("timeupdate", onTimeUpdate);
      b.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("ended", onEnded);
      b.removeEventListener("ended", onEnded);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <>
      <video
        ref={aRef}
        className="scene-video"
        style={{ opacity: 1 }}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={SRC} type="video/mp4" />
      </video>
      <video
        ref={bRef}
        className="scene-video"
        style={{ opacity: 0 }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={SRC} type="video/mp4" />
      </video>
    </>
  );
}
