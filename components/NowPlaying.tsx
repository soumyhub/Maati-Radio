import type { Track } from "@/lib/types";

interface NowPlayingProps {
  track: Track;
}

export default function NowPlaying({ track }: NowPlayingProps) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.3em] text-cream/50">
        NOW PLAYING
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-cream sm:text-2xl">
        {track.title}
      </p>
      <p className="font-[family-name:var(--font-ui)] text-xs tracking-wide text-cream/60">
        {track.artist}
      </p>
    </div>
  );
}
