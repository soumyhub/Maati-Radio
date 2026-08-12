export default function GrainOverlay() {
  return (
    <svg
      className="grain-overlay -z-10"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="matiGrain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#matiGrain)" />
    </svg>
  );
}
