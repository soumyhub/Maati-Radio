export default function SceneSilhouette() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* distant fort / haveli */}
      <g fill="#2a160c" opacity="0.55">
        <rect x="980" y="360" width="14" height="60" />
        <rect x="1010" y="340" width="16" height="80" />
        <rect x="1040" y="355" width="12" height="65" />
        <rect x="1060" y="330" width="18" height="90" />
        <rect x="1090" y="350" width="14" height="70" />
        <path d="M960 420h180v10H960z" />
      </g>

      {/* dune ridgelines, back to front */}
      <path d="M0 560 Q400 500 800 545 T1600 520 V900 H0 Z" fill="#3a1c10" opacity="0.55" />
      <path d="M0 640 Q500 580 900 620 T1600 600 V900 H0 Z" fill="#28130a" opacity="0.75" />
      <path d="M0 720 Q400 670 900 705 T1600 690 V900 H0 Z" fill="#180b06" />

      {/* camel caravan + herder, walking the near ridge */}
      <g fill="#140905" opacity="0.92">
        {/* herder */}
        <path d="M660 706c3-14 12-22 12-34 0-8-6-10-6-16 0-5 4-8 8-8s8 3 8 8c0 6-6 8-6 16 0 12 9 20 12 34z" />
        {/* three camels, simple humped silhouettes */}
        {[
          { x: 700, s: 1 },
          { x: 800, s: 0.92 },
          { x: 900, s: 0.85 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} 706) scale(${c.s})`}>
            <path d="M0 0c-4-26-2-40 10-52 6-7 8-14 8-22 0-9 7-14 14-14s13 6 13 14c0 3 8 4 8 12 0 6-6 8-6 14 8 4 14 14 16 30 2 10 10 14 10 18H0z" />
            <path d="M55 0c2-8 4-14 10-14v14z" />
          </g>
        ))}
      </g>

      {/* a few birds */}
      <g stroke="#1c0f08" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M1150 220q10-10 20 0q10-10 20 0" />
        <path d="M1210 260q8-8 16 0q8-8 16 0" />
      </g>
    </svg>
  );
}
