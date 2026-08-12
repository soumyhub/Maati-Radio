# MĀTI RADIO — Rajasthan

An old radio, still broadcasting from Rajasthan. Next.js + TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## ⚠️ Two things you must do before this is real

### 1. Add real YouTube video IDs

`lib/stations.ts` lists the 10 songs you gave me, grouped into the 5 stations
by mood. Every `videoId` is a placeholder (`REPLACE_WITH_VIDEO_ID_1`, `_2`,
…) — **I did not search for or attach any actual YouTube video**, per your
instructions. Playback will fail until you swap these in.

For each track, find the song on YouTube — ideally the artist's or label's
own official upload — confirm embedding is enabled (if it's blocked, YouTube
will error with code `101`/`150`, which the player already handles by
auto‑skipping to the next track), then edit one line:

```ts
// lib/stations.ts
{
  id: "padharo-01",
  title: "Dharti Dhora Ri",
  artist: "Traditional Rajasthani Folk",
  category: "Folk Anthem",
  year: "Traditional",
  duration: "—",
  videoId: "REPLACE_WITH_VIDEO_ID_1", // ← paste the real 11-character ID here
},
```

The video ID is the part after `?v=` in a YouTube URL
(`https://www.youtube.com/watch?v=XXXXXXXXXXX`).

Adding a brand-new song anywhere is the same one-line shape — just append a
new object to the relevant station's `tracks` array.

If you hand me a specific song/video ID later and ask me to add it, I'll
flag any rights or embedding concerns before wiring it in, per your brief.

### 2. Drop in the real photography

The background currently falls back to a painted CSS gradient (dusk
sandstone → indigo) so the page still looks intentional with zero assets.
Replace it with your real environment art:

- `public/bg/scene-wide.png` — 16:9 landscape composition
- `public/bg/scene-tall.png` — a **separately composed** portrait version, not a crop
- `public/radio/radio.png` — optional; the radio cabinet is currently built
  entirely from CSS/HTML (wood gradients, a dot-pattern speaker grille, an
  analog dial). If you add this file later, swap it in inside
  `components/RadioDisplay.tsx` / `Radio.tsx`.
- `public/textures/` — optional paper/grain textures (the grain layer
  currently uses a generated SVG `feTurbulence` filter, no file needed)

## Where things live

```
app/
  layout.tsx      fonts (Fraunces + IBM Plex Mono), metadata, viewport, analytics
  page.tsx         page shell: background, grain, header, radio
  globals.css      Tailwind v4 @theme tokens + all custom "physical object" CSS
components/
  Radio.tsx             the tabletop radio — owns all playback/station state
  RadioDisplay.tsx       top screen: station label, big frequency, ON AIR, YouTube window
  FrequencyDial.tsx      the interactive analog tuning dial
  StationSelector.tsx    station name/mood + prev/next station buttons
  RadioControls.tsx      prev/play-pause/next track + volume
  NowPlaying.tsx          "NOW PLAYING" broadcast card
  CulturalInfo.tsx       small region/style metadata line
  Clock.tsx               live IST clock, ticking, blinking colon
  OnAirIndicator.tsx      pulsing "ON AIR" + listener count
  TopBar.tsx              header combining brand, clock, on-air indicator
  GrainOverlay.tsx        fixed SVG paper-grain texture
lib/
  types.ts                 Station / Track types
  stations.ts               the 5 conceptual channels + your 10 songs
  useYouTubePlayer.ts        hook wrapping the YouTube IFrame Player API
```

## Stations

| Freq  | Station            | Mood                         |
|-------|---------------------|-------------------------------|
| 94.7  | Padharo Mhare Des   | Warm, welcoming               |
| 96.2  | Thar Ki Awaaz       | Raw desert folk                |
| 98.4  | Lok Geet            | Lively, communal               |
| 100.1 | Maand               | Elegant, romantic, evening     |
| 102.7 | Raat Ri Dhun        | Quiet, dreamy, desert night     |

Switching stations pauses playback, shows a brief static flicker on the
radio's screen, moves the tuning needle, then loads the new station's first
track and re-themes the accent colour via `station.accent`.

## Not yet built (left as clean extension points)

- **Ambient sound layers** (wind, camel bells, bazaar) — no audio assets
  were provided; wire an `<audio loop>` per station in `Radio.tsx` once you
  have them, keeping volume low and ducking under the music.
- **Cultural map** — the spec calls this optional/secondary; add a
  `CulturalMap.tsx` reading from `station.region` when you're ready.

## Notes on the build

- Tailwind v4, config lives entirely in `app/globals.css` via `@theme` —
  there's no `tailwind.config.*` file.
- All components are declared at module scope (never inside another
  component), per the brief.
- `prefers-reduced-motion` is respected globally in `globals.css`.
- Touch targets are ≥44px; the dial and station buttons are keyboard
  operable (arrow keys) with visible focus rings.
