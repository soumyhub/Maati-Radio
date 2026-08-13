import GrainOverlay from "@/components/GrainOverlay";
import SceneSilhouette from "@/components/SceneSilhouette";
import BackgroundVideo from "@/components/BackgroundVideo";
import RadioExperience from "@/components/RadioExperience";
import ScrollReveal from "@/components/ScrollReveal";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="relative">
      {/* The Hero is fixed/pinned for the whole visit — it never scrolls
          itself. Scrolling instead drives --reveal (see ScrollReveal),
          which fades/lifts the title and brings the About panel up over
          this from below. */}
      <div className="hero-fixed">
        {/* Painted-gradient stand-in — only visible where the video below
            is transparent (before it exists / while loading / if it fails). */}
        <div className="scene-fallback" aria-hidden="true" />
        <SceneSilhouette />

        {/* The actual hero: /bg/maati-radio-bg.mp4, full-bleed, looping. */}
        <BackgroundVideo />

        {/* Only enough overlay for text/UI legibility */}
        <div className="scene-overlay" aria-hidden="true" />

        <GrainOverlay />

        <RadioExperience />
      </div>

      {/* Reserves the initial full-viewport scroll room so the Hero reads
          as a complete, full-screen opening view before anything moves. */}
      <div className="about-spacer" aria-hidden="true" />

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
    </main>
  );
}
