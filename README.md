# MĀTI RADIO — Rajasthan

A full-screen illustrated Rajasthan desert-sunset scene with a large Hindi
brand mark and a wide parchment music player anchored at the bottom. Next.js
+ TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## ⚠️ Two things are still missing — on purpose

### 1. The real background artwork

**`public/bg/scene-wide.png` and `public/bg/scene-tall.png` do not exist
yet.** You haven't supplied them, so per your instructions I'm not silently
substituting something else — I'm telling you directly.

Until they exist, the page shows:
- a painted CSS gradient (dusk sky, glowing sun, dark foreground) approximating
  the reference's palette, and
- a small SVG placeholder scene (dunes, a distant fort silhouette, a camel
  caravan and herder) so you can already judge the composition and layout.

Both live in `app/globals.css` (`.scene-fallback`) and
`components/SceneSilhouette.tsx`. The moment you drop real files into
`public/bg/`, `.scene-bg` (which sits in front of the fallback) will cover
them completely — nothing else needs to change.

### 2. Real YouTube video IDs

`lib/tracks.ts` has the 10-track "initial example structure" from your
brief (Kesariya Balam, Ghoomar, Padharo Mhare Des, Nimbooda, Banna Re Bagan
Mein, Gorband Nakhralo, Moomal, Kurjan, Chirmi, Hichki). Every `videoId` is
a placeholder (`REPLACE_WITH_VIDEO_ID_1` … `_10`) — none were searched for
or sourced, per your instructions.

Right now, pressing Play on any track shows a small inline note in the
player ("No playable video ID yet…") instead of pretending to play — see
"How playback is tested/fixed" below for why.

To add a real song, edit one line in `lib/tracks.ts`:

```ts
{
  id: "kesariya-balam",
  title: "Kesariya Balam",
  artist: "Traditional Rajasthani Folk",
  category: "Rajasthani Folk",
  year: "Traditional",
  duration: "—",
  videoId: "REPLACE_WITH_VIDEO_ID_1", // ← paste the real 11-character ID here
},
```

The ID is the part after `?v=` in a YouTube URL. Use a source you have the
right to embed — ideally the rights holder's own upload with embedding
enabled. Adding a brand-new song anywhere in the ~20-track list this is
built for is the same one-line shape.

## How playback is tested/fixed

I don't have a browser in this environment, so I can't click through a live
page — what I *did* do is trace every path through the playback code by
hand against the YouTube IFrame API's documented behaviour, and fix what I
found:

- **Autoplay-safe by construction.** The player is created with
  `autoplay: 0`. It only calls `playVideo()` from inside a `<button
  onClick>` handler — a genuine user gesture — never on mount or on track
  change. `pause()`/`play()`/`next`/`prev` all go through the same handlers.
- **UI state only ever reflects YouTube's real state.** `isPlaying` /
  `isBuffering` are derived from `onStateChange`'s reported `PlayerState`,
  never set optimistically. The progress bar polls `getCurrentTime()` /
  `getDuration()` on a 250ms interval **only while `status === "playing"`**
  — it cannot move from a paused or unstarted player.
  (`lib/useYouTubePlayer.ts`)
- **Race condition on first click, fixed.** If someone presses Play before
  the IFrame API script has finished loading, `play()` used to silently
  no-op. Now a `pendingPlayRef` flag is set and consumed inside `onReady`,
  so the very first click still results in playback once the player is
  ready.
- **Seeking uses pointer events, not click.** The progress bar uses
  `onPointerDown` / `onPointerMove` with `setPointerCapture`, so dragging
  works with mouse, touch, and pen — not just discrete clicks.
- **Errors skip forward instead of hanging.** `onError` logs the code and
  video ID, then calls the same `advanceTrack()` used by `ENDED`.
- **Infinite-error-loop guard, added during this pass.** With every
  `videoId` currently a placeholder, the *first* version of this fix would
  have errored, skipped, errored again, skipped again — forever, in a tight
  loop, the moment you pressed Play. I added an error-streak counter: after
  the player has failed on every track back-to-back, it stops auto-
  advancing and shows the inline "no playable video ID yet" message
  instead. It resets automatically the instant a track actually reaches a
  real `PLAYING` state. There's also a client-side short-circuit —
  `videoId.startsWith("REPLACE_WITH_VIDEO_ID")` — so pressing Play on an
  obvious placeholder shows the message immediately without even calling
  the YouTube API.

**What I can't verify without a browser:** actual network/embedding
behaviour once you paste in real video IDs (e.g. a specific video having
embedding disabled, regional blocks, etc.). Once you add real IDs, run
`npm run dev` and open the browser console — any embedding/rights errors
will log there with the YouTube error code and the offending video ID
before the player skips to the next track.

## Where things live

```
app/
  layout.tsx          fonts (Fraunces, Yatra One for Devanagari, IBM Plex Mono), metadata, viewport
  page.tsx             layers the scene (fallback → SVG scenery → real bg → overlay → grain) + RadioExperience
  globals.css          Tailwind v4 @theme tokens + scene/parchment-player CSS
components/
  RadioExperience.tsx   client component owning shared state (active track, songs drawer open/closed)
  TopBar.tsx             minimal header: clock, online count, Spotify/YT Music/Playlists (inert) + Songs (functional)
  BrandMark.tsx           large माटी रेडियो / राजस्थानी लोक संगीत — the primary visual identity
  SceneSilhouette.tsx     SVG placeholder dunes/fort/camel caravan (remove once real art is in place)
  SongsDrawer.tsx          dropdown song list, opened from "Songs" in the top bar
  PlayerBar.tsx            the bottom parchment player — artwork/YouTube stage, now playing, progress, controls, volume
  Clock.tsx                live IST clock, ticking, blinking colon
  GrainOverlay.tsx         fixed SVG paper-grain texture (subtle, mix-blend overlay)
lib/
  types.ts                  Track type
  tracks.ts                  the flat playlist (~10 of ~20 planned tracks)
  useYouTubePlayer.ts         hook wrapping the YouTube IFrame Player API (state, progress, seek)
```

## Removed in this redesign

The previous tabletop-radio centerpiece (`Radio.tsx`, `RadioDisplay.tsx`,
`FrequencyDial.tsx`, `StationSelector.tsx`, `RadioControls.tsx`,
`NowPlaying.tsx`, `CulturalInfo.tsx`, `OnAirIndicator.tsx`) and the 5-station
data model (`lib/stations.ts`) have been deleted entirely, per your brief —
the background illustration is now the hero, and the radio/station identity
is expressed through the page's aesthetic and the player, not a physical
object.

## Notes on the build

- Tailwind v4, config lives entirely in `app/globals.css` via `@theme` —
  there's no `tailwind.config.*` file.
- All components are declared at module scope.
- `prefers-reduced-motion` is respected globally.
- Touch targets are ≥44px; the song list and player controls are keyboard
  and screen-reader accessible (`role="slider"` with `aria-value*` on the
  progress bar, `aria-pressed`/`aria-current` on toggles).
