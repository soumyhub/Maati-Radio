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

  return (
    <>
      <div className="relative">
        <TopBar
          currentTrack={currentTrack}
          onToggleSongs={() => setSongsOpen((o) => !o)}
          songsOpen={songsOpen}
        />

        <SongsDrawer
          open={songsOpen}
          activeIndex={trackIndex}
          onSelect={setTrackIndex}
          onClose={() => setSongsOpen(false)}
        />
      </div>

      <BrandMark />

      <div className="player-position">
        <PlayerBar
          trackIndex={trackIndex}
          onTrackIndexChange={setTrackIndex}
        />
      </div>
    </>
  );
}
