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

      <div className="relative z-10 flex flex-1 items-center px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-10">
        <BrandMark />
      </div>

      <div className="relative z-10 px-[max(1rem,env(safe-area-inset-left))] pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] sm:pb-8">
        <PlayerBar trackIndex={trackIndex} onTrackIndexChange={setTrackIndex} />
      </div>
    </>
  );
}
