"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

interface YTNamespace {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: { data: number }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return apiPromise;
}

export type PlaybackStatus = "idle" | "cued" | "playing" | "paused" | "buffering" | "ended";

interface UseYouTubePlayerArgs {
  elementId: string;
  videoId: string;
  onEnded: () => void;
  onError?: (code: number, videoId: string) => void;
}

export function useYouTubePlayer({
  elementId,
  videoId,
  onEnded,
  onError,
}: UseYouTubePlayerArgs) {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  onEndedRef.current = onEnded;
  onErrorRef.current = onError;

  // Create the player once. autoplay is never set, so this never plays
  // audio on its own — actual playback only begins when play() is called
  // from a user gesture (see PlayerBar).
  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(elementId, {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          autoplay: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setStatus("cued");
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setStatus("playing");
            else if (e.data === YT.PlayerState.PAUSED) setStatus("paused");
            else if (e.data === YT.PlayerState.BUFFERING) setStatus("buffering");
            else if (e.data === YT.PlayerState.CUED) setStatus("cued");
            else if (e.data === YT.PlayerState.ENDED) {
              setStatus("ended");
              onEndedRef.current();
            }
          },
          onError: (e) => {
            onErrorRef.current?.(e.data, videoId);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
    };
    // Player is intentionally created once per mounted <div id=elementId>.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementId]);

  // Swap the video whenever the track changes (does not auto-play).
  const lastVideoId = useRef(videoId);
  useEffect(() => {
    if (lastVideoId.current === videoId) return;
    lastVideoId.current = videoId;
    setCurrentTime(0);
    setDuration(0);
    if (readyRef.current && playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId]);

  // Poll real playback position only while actually playing — the
  // progress bar never moves unless YouTube confirms PLAYING state.
  useEffect(() => {
    if (status !== "playing") return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime() || 0);
      const d = player.getDuration();
      if (d) setDuration(d);
    }, 250);
    return () => window.clearInterval(id);
  }, [status]);

  const play = useCallback(() => {
    if (readyRef.current && playerRef.current) {
      playerRef.current.playVideo();
    } else {
      pendingPlayRef.current = true;
    }
  }, []);

  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const setVolume = useCallback((v: number) => playerRef.current?.setVolume(v), []);
  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return { status, duration, currentTime, play, pause, setVolume, seekTo };
}
