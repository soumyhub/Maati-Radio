"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function formatParts(date: Date) {
  const parts = formatter.formatToParts(date);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "--";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "--";
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
  return { hour, minute, dayPeriod };
}

export default function Clock() {
  const [time, setTime] = useState<{ hour: string; minute: string; dayPeriod: string } | null>(
    null
  );

  useEffect(() => {
    setTime(formatParts(new Date()));
    const id = setInterval(() => setTime(formatParts(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="font-[family-name:var(--font-ui)] text-sm tracking-[0.2em] text-cream/90 tabular-nums sm:text-base"
      aria-label={time ? `${time.hour}:${time.minute} ${time.dayPeriod} Indian Standard Time` : "Loading time"}
    >
      {time ? (
        <>
          {time.hour}
          <span className="animate-[blink_1.6s_steps(1)_infinite]">:</span>
          {time.minute}{" "}
          <span className="text-[0.7em] text-cream/60">{time.dayPeriod}</span>
        </>
      ) : (
        "--:--"
      )}
    </div>
  );
}
