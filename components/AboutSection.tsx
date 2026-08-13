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
          Maati Radio is an imagined old transistor set, still broadcasting from
          somewhere between a Rajasthani desert town and an old haveli
          courtyard. Every station on the dial carries a different mood of
          Rajasthan, the warmth of Padharo Mhare Des, the raw desert folk of
          the Thar, the communal lift of a village Lok Geet, the unhurried
          elegance of Maand, and the quiet of a Raat Ri Dhun.
        </p>

        <p className="mt-4 font-[family-name:var(--font-display)] text-base leading-relaxed text-cream/70 sm:text-lg">
          Only a dial, a speaker, and the sound of a place 
          that has been singing for a very long time.
        </p>

        <p className="mt-8 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/45">
          94.7 FM · RAJASTHAN
        </p>
        
        <p className="mt-12 font-[family-name:var(--font-ui)] text-[0.75rem] tracking-[0.45em] text-cream/45">
          by Soumy Paliwal - workspaliwal@gmail.com
          </p>
      </div>
    </section>
  );
}
