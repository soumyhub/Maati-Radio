# MĀTI RADIO — Rajasthan

A full-screen looping background video with a large Hindi brand mark, a
compact parchment music player, and a cinematic scroll transition into an
About section. Next.js + TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## ⚠️ Still missing: the background video file

**`public/bg/maati-radio-bg.mp4` does not exist in this project yet.** I
was never given the file directly — same situation as the earlier
background images, which were uploaded straight to your GitHub repo rather
than to me. Per the "don't substitute another background" instruction, I'm
telling you plainly rather than faking it.

Until it exists, `.scene-fallback` (a painted gradient) and the SVG
placeholder scenery in `components/SceneSilhouette.tsx` show through, and
the `<video>` element's `poster="/bg/scene-wide.png"` shows your existing
photo as a static frame. The moment you add the real file to
`public/bg/maati-radio-bg.mp4`, it plays automatically — nothing else to
change (see `components/BackgroundVideo.tsx`).

## What changed in this pass

### 1. Background image → looping video
- `components/BackgroundVideo.tsx` — a real `<video>` element:
  `autoPlay muted loop playsInline`, `poster="/bg/scene-wide.png"`,
  `<source src="/bg/maati-radio-bg.mp4" type="video/mp4" />`.
- `.scene-video` in `globals.css` handles the full-bleed fill:
  `position:absolute; inset:0; object-fit:cover;`.
- The old two-image (`scene-wide.png` / `scene-tall.png` via orientation
  media query) approach is retired — a single video with `object-fit:
  cover` handles both orientations. `scene-wide.png` is kept on as the
  video's `poster`.
- The painted-gradient fallback and SVG placeholder scenery are unchanged
  and still sit behind everything, for the same reason as before (nothing
  to show until the real asset exists).

### 2. Cinematic Hero → About scroll transition
- The Hero (background video + top bar + brand title + player) is now
  `position: fixed` (`.hero-fixed` in `globals.css`, wrapping
  `<RadioExperience />` in `app/page.tsx`) — it never scrolls itself and
  stays visually immersive the whole time, including once About has
  risen over it (About is semi-translucent + blurred, not opaque).
- `components/ScrollReveal.tsx` measures how far the About panel has
  scrolled into view (via `getBoundingClientRect`, throttled with
  `requestAnimationFrame`) and writes a single `0–1` value to a CSS custom
  property, `--reveal`, on `<html>`. No animation library, no extra
  dependency, no per-frame React re-render.
- `components/BrandMark.tsx` — the title/subtitle/frequency block is now
  wrapped in an inner `.hero-title-reveal` div (deliberately a *separate*
  element from the existing centering wrapper, so its scroll-driven
  `transform`/`opacity` can't collide with the pre-existing
  `left-1/2 -translate-x-1/2 -translate-y-1/2` centering transform). As
  `--reveal` goes 0→1, it moves up, shrinks slightly, and fades.
- `components/AboutSection.tsx` (new) — the panel that rises up: a
  translucent, blurred dark backdrop (`.about-panel`) over a short "what
  is Māti Radio" blurb, using the same fonts/palette as the rest of the
  site. It has its own scroll-driven `transform`/`opacity` (a gentle
  "lag" on top of its natural document-flow scroll position, for the
  eased/cinematic feel) via the same `--reveal` variable.
- `app/page.tsx` — now: fixed Hero → `.about-spacer` (100dvh, reserves
  the initial full-viewport hold before anything moves) → `<ScrollReveal>`
  wrapping `<AboutSection />`.
- All easing is plain CSS `transition: transform … cubic-bezier(...)`
  smoothing the JS-driven variable updates — works with mouse wheel,
  trackpad, and touch scroll identically, and respects
  `prefers-reduced-motion` (existing global rule).

### 3. Smaller, higher, centered player
- `components/RadioExperience.tsx` — the player's wrapper changed from a
  bottom-flow flex item to `.player-position`: `position: absolute; left:
  50%; bottom: 20%; transform: translateX(-50%);`, with `max-height`
  media queries (`bottom: 15%` / `12%`) so it can't drift toward the
  bottom edge on short viewports. (The now-unused flex spacer that used
  to push it down was removed, since both BrandMark and the player are
  absolutely positioned now.)
- `components/PlayerBar.tsx` — width cap `1300px → 900px`, padding,
  artwork thumbnail, play button, and volume slider all reduced slightly.
  **Previous/Next buttons were deliberately left at their existing 44px
  minimum touch target** rather than shrunk further, per the site's
  existing accessibility baseline. No logic, structure, or JSX beyond
  class names changed — playback, seeking, error handling, etc. are
  identical to before.

## Verification performed

Same two static checks as previous passes (this sandbox has no network
access, so `npm run build` itself can't run here):
- A custom cross-file import/export check across every `.ts`/`.tsx` file —
  clean.
- A full TypeScript transpile (syntax-level) pass over every file — clean.

Also directly confirmed:
- `lib/tracks.ts` and `lib/useYouTubePlayer.ts` are byte-for-byte
  unchanged (line counts / diffs checked).
- `components/TopBar.tsx`, `SongsDrawer.tsx`, and `Clock.tsx` are
  unchanged (checksummed).

## Where things live (updated)

```
app/
  page.tsx              fixed Hero + about-spacer + ScrollReveal(AboutSection)
  layout.tsx             fonts, metadata, viewport (unchanged)
  globals.css             @theme tokens + hero-fixed/scene-video/about-panel/
                           hero-title-reveal/player-position CSS (this pass)
                           + all prior styling, unchanged
components/
  BackgroundVideo.tsx      NEW — the looping <video> background
  ScrollReveal.tsx         NEW — drives --reveal from scroll position
  AboutSection.tsx         NEW — the panel that rises over the Hero
  RadioExperience.tsx      player wrapper repositioned (this pass)
  BrandMark.tsx            title wrapped in .hero-title-reveal (this pass)
  PlayerBar.tsx            sizing-only class changes (this pass)
  TopBar.tsx / SongsDrawer.tsx / Clock.tsx / SceneSilhouette.tsx /
  GrainOverlay.tsx          unchanged
lib/
  tracks.ts, types.ts, useYouTubePlayer.ts   unchanged
```
