"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import BrandMark from "./BrandMark";
import PlayerBar from "./PlayerBar";
import SongsDrawer from "./SongsDrawer";
import TrackMeaning from "./TrackMeaning";
import { tracks } from "../lib/tracks";

export default function RadioExperience() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [songsOpen, setSongsOpen] = useState(false);

  const currentTrack = tracks[trackIndex];

  const youtubeMusicUrl = `https://music.youtube.com/watch?v=${currentTrack.videoId}`;

  const handleSpotifyClick = () => {
    if (currentTrack.spotifyUrl) {
      window.open(
        currentTrack.spotifyUrl,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    alert(`"${currentTrack.title}" is not available on Spotify.`);
  };

  return (
    <>
      {/* Top navigation */}
      <div className="relative">
        <TopBar />

        <SongsDrawer
          open={songsOpen}
          activeIndex={trackIndex}
          onSelect={setTrackIndex}
          onClose={() => setSongsOpen(false)}
        />
      </div>

      <BrandMark />

      {/* Player + music actions + track meaning */}
      <div className="player-position flex flex-col items-center">
        <PlayerBar
          trackIndex={trackIndex}
          onTrackIndexChange={setTrackIndex}
        />

        {/* Current song actions */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {/* Spotify */}
          <button
            type="button"
            onClick={handleSpotifyClick}
            className="pill-btn flex items-center gap-2 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors duration-200 hover:text-cream"
            title={`Open ${currentTrack.title} on Spotify`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.47a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.15a.75.75 0 1 1-.34-1.46c4.58-1.05 8.5-.6 11.67 1.34.35.22.46.68.25 1.02Zm1.38-3.07a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.55-11.97-1.4a.94.94 0 1 1-.54-1.8c4.36-1.32 9.82-.68 13.49 1.57.44.27.58.85.31 1.32Zm.12-3.2C14.2 7.86 7.73 7.64 3.98 8.77a1.13 1.13 0 0 1-.65-2.16c4.3-1.3 11.47-1.04 15.85 1.56a1.13 1.13 0 0 1-1.16 2.03Z" />
            </svg>

            <span>Spotify</span>
          </button>

          {/* YouTube Music */}
          <a
            href={youtubeMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn flex items-center gap-2 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors duration-200 hover:text-cream"
            title={`Open ${currentTrack.title} on YouTube Music`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm-2.2 13.1V7.9l6.1 4.1-6.1 4.1Z" />
            </svg>

            <span>YT Music</span>
          </a>
        </div>

        {/* Meaning/story of the currently playing track */}
        <TrackMeaning track={currentTrack} />
      </div>
    </>
  );
}
