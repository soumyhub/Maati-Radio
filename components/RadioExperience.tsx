"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import BrandMark from "./BrandMark";
import PlayerBar from "./PlayerBar";
import SongsDrawer from "./SongsDrawer";
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

    alert(
      `"${currentTrack.title}" is not available on Spotify.`
    );
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

      {/* Player + music actions */}
      <div className="player-position flex flex-col items-center">
        <PlayerBar
          trackIndex={trackIndex}
          onTrackIndexChange={setTrackIndex}
        />

        {/* Current song actions */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {/* Add to Spotify */}
          <button
            type="button"
            onClick={handleSpotifyClick}
            className="pill-btn rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors duration-200 hover:text-cream"
            title={`Open ${currentTrack.title} on Spotify`}
          >
            Add to Spotify
          </button>

          {/* Add to YT Music */}
          <a
            href={youtubeMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn rounded-full px-3 py-1.5 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-wide text-cream/70 transition-colors duration-200 hover:text-cream"
            title={`Open ${currentTrack.title} on YouTube Music`}
          >
            Add to YT Music
          </a>
        </div>
      </div>
    </>
  );
}
