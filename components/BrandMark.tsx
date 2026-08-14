export default function BrandMark() {
  return (
    <div
      className="brand-hero absolute left-1/2 z-10 w-[min(92vw,900px)] -translate-x-1/2 -translate-y-[54%] select-none text-center"
      aria-hidden="false"
    >
      <div className="hero-title-reveal">
        <h1
          className="title-extrude font-[family-name:var(--font-devanagari)] text-[3.75rem] font-extrabold leading-[0.88] tracking-tight text-cream sm:text-[5.2rem] md:text-[6.9rem] lg:text-[9.8rem] xl:text-[10.95rem]"
          lang="hi"
        >
          माटी
          <br />
          रेडियो
        </h1>

        <p
          className="subtitle-extrude mt-2 font-[family-name:var(--font-devanagari)] text-lg font-semibold tracking-wide text-cream/90 sm:mt-3 sm:text-2xl md:text-3xl"
          lang="hi"
        >
          राजस्थानी लोक संगीत
        </p>

        <p className="mt-2 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/60 sm:mt-3 sm:text-xs">
          94.7 FM · RAJASTHAN
        </p>
      </div>
    </div>
  );
}
