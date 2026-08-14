export default function BrandMark() {
  return (
    <div
      className="brand-hero absolute left-1/2 z-10 w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2 select-none text-center"
      aria-hidden="false"
    >
     <div className="hero-title-reveal">
  <h1
    className="title-extrude font-[family-name:var(--font-devanagari)] text-[4.875rem] font-extrabold leading-[0.88] tracking-tight text-cream sm:text-[6.75rem] md:text-[9rem] lg:text-[12.75rem] xl:text-[14.25rem]"
    lang="hi"
  >
    रेत राग
  </h1>

        <p
          className="subtitle-extrude mt-3 font-[family-name:var(--font-devanagari)] text-lg font-semibold tracking-wide text-cream/90 sm:mt-4 sm:text-2xl md:text-3xl"
          lang="hi"
        >
          राजस्थानी लोक संगीत
        </p>

        <p className="mt-3 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/60 sm:mt-4 sm:text-xs">
          94.7 FM · RAJASTHAN
        </p>
      </div>
    </div>
  );
}
