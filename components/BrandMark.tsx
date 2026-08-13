function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M30 6c0 10-8 12-8 18s8 8 8 18M30 6c0 10 8 12 8 18s-8 8-8 18" />
      <circle cx="30" cy="30" r="2.4" fill="currentColor" stroke="none" />
      <path d="M12 30h8M40 30h8" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandMark() {
  return (
    <div className="max-w-[min(90vw,560px)] select-none text-cream">
      <div className="flex items-start gap-3 sm:gap-4">
        <Flourish className="mt-2 h-7 w-7 shrink-0 text-gold/70 sm:h-9 sm:w-9" />
        <h1
          className="font-[family-name:var(--font-devanagari)] text-6xl leading-[1.05] tracking-tight text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl"
          lang="hi"
        >
          माटी
          <br />
          रेडियो
        </h1>
      </div>

      <p
        className="mt-3 pl-1 font-[family-name:var(--font-devanagari)] text-xl tracking-wide text-cream/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:mt-4 sm:pl-14 sm:text-2xl"
        lang="hi"
      >
        राजस्थानी लोक संगीत
      </p>

      <p className="mt-3 pl-1 font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.35em] text-cream/50 sm:pl-14 sm:text-xs">
        94.7 FM · RAJASTHAN
      </p>
    </div>
  );
}
