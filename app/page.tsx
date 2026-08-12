import TopBar from "@/components/TopBar";
import Radio from "@/components/Radio";
import GrainOverlay from "@/components/GrainOverlay";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden">
      <div className="hero-bg -z-20" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-black/20 via-transparent to-black/75"
        aria-hidden="true"
      />
      <GrainOverlay />

      <TopBar />

      <div className="relative z-10 flex flex-1 items-center justify-center px-[max(1rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] pt-6">
        <Radio />
      </div>

      <footer className="relative z-10 px-[max(1rem,env(safe-area-inset-left))] pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center font-[family-name:var(--font-ui)] text-[0.6rem] tracking-[0.2em] text-cream/35 sm:pb-4">
        A DIGITAL MEMORY OF RAJASTHAN
      </footer>
    </main>
  );
}
