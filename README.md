# MAATI RADIO — Rajasthan 🎙️

> **A little piece of home, on the internet.**

**MAATI RADIO** is an interactive digital radio experience inspired by Rajasthan — its folk music, old radios, desert evenings, courtyards, and the feeling of home.

It isn't just designed to play music. The goal was to turn **Rajasthani culture into an experience**.

🎧 **Live Website:** https://maati-radio.vercel.app

---

## 🌵 What is MAATI RADIO?

Everyone was making a music website.

I wanted to make something that could make someone **miss home.**

MAATI RADIO was built around a simple idea:

> What if a music website didn't just play a song, but made you feel somewhere?

The experience combines Rajasthani-inspired visuals, folk music, an old-radio aesthetic, cinematic transitions, interactive audio controls, and a **Memory Wall** where visitors can leave a childhood memory, a feeling, or something that reminds them of home.

Whether you're still in Rajasthan, studying in another city, working in another country, or simply feeling nostalgic — MAATI RADIO is meant to feel like a small digital connection to home.

---

## ✨ Features

### 🎵 Interactive Radio Player

A custom music player designed around the visual language of an old radio.

- Play / pause
- Previous / next track
- Track progress and seeking
- Volume control
- Current track information
- Artist and genre information
- Spotify and YouTube Music links
- Responsive controls

### 🧱 Memory Wall

MAATI RADIO isn't only about listening.

Visitors can share:

- A childhood memory
- A feeling
- Feedback
- A story
- Something else they want to share

Submitted memories are stored using **Supabase** and can appear on the interactive Memory Wall.

The idea is simple:

> **Music carries memories.**

### ⛶ Fullscreen Experience

A dedicated fullscreen control lets listeners remove browser distractions and experience MAATI RADIO without tabs, address bars, or other browser UI getting in the way.

Pressing `Esc` exits fullscreen normally.

### 👥 Live Listener Indicator

A subtle listener counter creates the feeling of tuning into a real radio station with other people listening at the same time.

### 🌅 Cinematic Hero

The landing experience uses a full-screen visual scene with:

- Cinematic background
- Rajasthani-inspired artwork
- Large Hindi brand mark
- Old-radio visual language
- Grain / atmosphere effects
- Responsive positioning

### 🎞️ Cinematic Scroll Transition

The Hero transitions into the About section as the user scrolls.

The Hero remains visually immersive while the About panel gradually rises over it, creating a cinematic transition instead of a conventional page scroll.

### 📱 Responsive Design

The experience is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The layout adapts to different screen sizes and orientations while maintaining the visual identity of the experience.

---

# 🛠️ Built With

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | UI and component architecture |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Styling and responsive layout |
| **Supabase** | Memory Wall data storage |
| **Vercel** | Deployment |
| **YouTube Player API** | Audio playback |
| **CSS Animations** | Transitions and visual effects |
| **Fullscreen API** | Immersive fullscreen mode |

---

# 🏗️ Project Structure

```text
MAATI-RADIO/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── AboutSection.tsx
│   ├── BackgroundVideo.tsx
│   ├── BrandMark.tsx
│   ├── Clock.tsx
│   ├── GrainOverlay.tsx
│   ├── MemoryDrawer.tsx
│   ├── PlayerBar.tsx
│   ├── RadioExperience.tsx
│   ├── SceneSilhouette.tsx
│   ├── ScrollReveal.tsx
│   ├── SongsDrawer.tsx
│   └── TopBar.tsx
│
├── lib/
│   ├── tracks.ts
│   ├── types.ts
│   ├── supabase.ts
│   └── useYouTubePlayer.ts
│
└── public/
    └── bg/
