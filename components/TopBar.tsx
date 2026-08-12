import Clock from "./Clock";
import OnAirIndicator from "./OnAirIndicator";

export default function TopBar() {
  return (
    <header
      className="relative z-10 flex items-start justify-between px-[max(1rem,env(safe-area-inset-left))] pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 sm:pt-6"
    >
      <div className="leading-tight">
        <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide text-cream drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:text-2xl">
          MĀTI RADIO
        </p>
        <p className="font-[family-name:var(--font-ui)] text-[0.65rem] tracking-[0.3em] text-cream/70 sm:text-xs">
          94.7 FM
        </p>
      </div>

      <div className="pt-1">
        <Clock />
      </div>

      <div className="pt-1">
        <OnAirIndicator />
      </div>
    </header>
  );
}
