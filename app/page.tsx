import GrainOverlay from "@/components/GrainOverlay";
import SceneSilhouette from "@/components/SceneSilhouette";
import RadioExperience from "@/components/RadioExperience";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden">
      {/* Painted-gradient + placeholder scenery — only visible until real
          artwork exists at public/bg/scene-wide.png and scene-tall.png */}
      <div className="scene-fallback" aria-hidden="true" />
      <SceneSilhouette />

      {/* The actual hero: your Rajasthan illustration, full-bleed */}
      <div className="scene-bg" aria-hidden="true" />

      {/* Only enough overlay for text/UI legibility */}
      <div className="scene-overlay" aria-hidden="true" />

      <GrainOverlay />

      <RadioExperience />
    </main>
  );
}
