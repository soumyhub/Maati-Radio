export default function AboutSection() {
  return (
    <section className="about-panel px-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] py-20">
      <div className="mx-auto max-w-2xl text-center text-cream">
        <p className="font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/50">
          ABOUT THE STATION
        </p>

        <h2
          className="mt-4 font-[family-name:var(--font-devanagari)] text-4xl font-bold leading-tight text-cream sm:text-5xl"
          lang="hi"
        >
          माटी रेडियो क्या है?
        </h2>

        <p className="mt-6 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/80 sm:text-lg">
          Maati Radio is an imagined old transistor, broadcasting from somewhere between the Thar and an old haveli courtyard.
          A place where folk songs travel slowly through desert winds, village evenings, wedding courtyards, distant train rides,
          and memories passed from one generation to another.

          Turn the dial and find a different Rajasthan each time: Padharo Mhare Des, the raw voice of the Thar, the warmth
          of a Lok Geet, the quiet elegance of Maand, or the stillness of a Raat Ri Dhun.
        </p>

        <p className="mt-4 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/70 sm:text-lg">
          No playlists. No algorithms. Just a dial, a speaker, and the sound of a land that has been singing for a very long time.

          Maati Radio — a little piece of Rajasthan, playing somewhere in the air.
        </p>

        <p className="mt-8 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/45">
          94.7 FM · RAJASTHAN
        </p>

        <div className="mt-8 flex flex-col items-center text-center">
          {/* Credit */}
          <p className="font-[family-name:var(--font-ui)] text-sm tracking-[0.18em] text-cream/70">
            By Soumy Paliwal
          </p>

          {/* Email */}
          <a
            href="mailto:workspaliwal@gmail.com"
            className="mt-4 flex items-center gap-2 font-[family-name:var(--font-ui)] text-sm text-cream/65 transition-opacity duration-300 hover:text-cream hover:opacity-100"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <span>workspaliwal@gmail.com</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/soumypaliwal"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 font-[family-name:var(--font-ui)] text-sm text-cream/65 transition-opacity duration-300 hover:text-cream hover:opacity-100"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 10v6" />
              <path d="M8 7.5v.01" />
              <path d="M12 16v-3.2a2.8 2.8 0 0 1 5.6 0V16" />
              <path d="M12 10v6" />
            </svg>

            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
