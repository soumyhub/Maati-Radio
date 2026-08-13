"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import BrandMark from "./BrandMark";
import PlayerBar from "./PlayerBar";
import SongsDrawer from "./SongsDrawer";

export default function RadioExperience() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [songsOpen, setSongsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <TopBar onToggleSongs={() => setSongsOpen((o) => !o)} songsOpen={songsOpen} />
        <SongsDrawer
          open={songsOpen}
          activeIndex={trackIndex}
          onSelect={setTrackIndex}
          onClose={() => setSongsOpen(false)}
        />
      </div>

      <BrandMark />

      <div className="player-position">
        <PlayerBar trackIndex={trackIndex} onTrackIndexChange={setTrackIndex} />
      </div>
    </>
  );
}
