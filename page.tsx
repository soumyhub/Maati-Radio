import GrainOverlay from "@/components/GrainOverlay";
import SceneSilhouette from "@/components/SceneSilhouette";
import RadioExperience from "@/components/RadioExperience";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden">
      {/* Painted-gradient stand-in — only visible where the real photo
          below is transparent (i.e. before it existed / if it 404s). */}
      <div className="scene-fallback" aria-hidden="true" />
      <SceneSilhouette />

      {/* The actual hero: /bg/scene-wide.png (desktop) or
          /bg/scene-tall.png (portrait, swapped via media query in
          globals.css), full-bleed behind everything else. */}
      <div className="scene-bg" aria-hidden="true" />

      {/* Only enough overlay for text/UI legibility */}
      <div className="scene-overlay" aria-hidden="true" />

      <GrainOverlay />

      <RadioExperience />
    </main>
  );
}
