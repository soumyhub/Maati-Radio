"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { stations } from "@/lib/stations";
import { useYouTubePlayer } from "@/lib/useYouTubePlayer";
import RadioDisplay from "./RadioDisplay";
import FrequencyDial from "./FrequencyDial";
import StationSelector from "./StationSelector";
import RadioControls from "./RadioControls";
import NowPlaying from "./NowPlaying";
import CulturalInfo from "./CulturalInfo";

const YOUTUBE_ELEMENT_ID = "mati-radio-youtube-player";
const STATIC_TRANSITION_MS = 550;

export default function Radio() {
  const [stationIndex, setStationIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isStatic, setIsStatic] = useState(false);
  const pendingStationIndex = useRef<number | null>(null);

  const station = stations[stationIndex];
  const track = station.tracks[trackIndex];

  const advanceTrack = useCallback(() => {
    setTrackIndex((i) => (i + 1) % station.tracks.length);
  }, [station.tracks.length]);

  const handleError = useCallback((code: number, videoId: string) => {
    // eslint-disable-next-line no-console
    console.warn(`[mati-radio] YouTube playback error ${code} for video ${videoId} — skipping.`);
    if (typeof window !== "undefined" && "va" in window) {
      // Fires only if @vercel/analytics' custom event bridge is present.
      (window as unknown as { va?: (e: string, p: object) => void }).va?.(
        "event",
        { name: "youtube_playback_error", code, videoId }
      );
    }
    advanceTrack();
  }, [advanceTrack]);

  const { status, play, pause, setVolume: setPlayerVolume } = useYouTubePlayer({
    elementId: YOUTUBE_ELEMENT_ID,
    videoId: track.videoId,
    onEnded: advanceTrack,
    onError: handleError,
  });

  useEffect(() => {
    setPlayerVolume(volume);
  }, [volume, setPlayerVolume]);

  const isPlaying = status === "playing" || status === "buffering";

  function togglePlay() {
    if (isPlaying) pause();
    else play();
  }

  function nextTrack() {
    advanceTrack();
  }

  function prevTrack() {
    setTrackIndex((i) => (i - 1 + station.tracks.length) % station.tracks.length);
  }

  function tuneTo(index: number) {
    if (index === stationIndex) return;
    pendingStationIndex.current = index;
    setIsStatic(true);
    pause();
    window.setTimeout(() => {
      const next = pendingStationIndex.current;
      if (next !== null) {
        setStationIndex(next);
        setTrackIndex(0);
      }
      setIsStatic(false);
    }, STATIC_TRANSITION_MS);
  }

  function nextStation() {
    tuneTo((stationIndex + 1) % stations.length);
  }

  function prevStation() {
    tuneTo((stationIndex - 1 + stations.length) % stations.length);
  }

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
      <div className="radio-cabinet w-full max-w-[520px] rounded-2xl p-4 sm:p-6">
        <RadioDisplay station={station} isStatic={isStatic} youtubeElementId={YOUTUBE_ELEMENT_ID} />

        <div className="speaker-grille my-4 h-20 rounded-md sm:h-24" aria-hidden="true" />

        <FrequencyDial stations={stations} activeIndex={stationIndex} onSelect={tuneTo} />

        <div className="mt-4 space-y-4">
          <StationSelector station={station} onPrevStation={prevStation} onNextStation={nextStation} />
          <RadioControls
            isPlaying={isPlaying}
            onPrevTrack={prevTrack}
            onTogglePlay={togglePlay}
            onNextTrack={nextTrack}
            volume={volume}
            onVolumeChange={setVolume}
          />
        </div>

        <div className="mt-5 border-t border-[#6b4a30]/40 pt-4 sm:hidden">
          <NowPlaying track={track} />
          <div className="mt-2">
            <CulturalInfo station={station} track={track} />
          </div>
        </div>
      </div>

      {/* Desktop-only supporting info beside the radio */}
      <div className="hidden w-full max-w-xs flex-col gap-4 sm:flex">
        <NowPlaying track={track} />
        <CulturalInfo station={station} track={track} />
        <p className="max-w-[24ch] font-[family-name:var(--font-display)] text-sm italic leading-relaxed text-cream/55">
          {station.description}
        </p>
      </div>
    </div>
  );
}
