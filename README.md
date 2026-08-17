# MAATI RADIO — Rajasthan 🎙️

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/36bb2228-c1c5-4c78-b106-cfc538964e0b"
    alt="MAATI RADIO"
    width="100%"
  />
</p>

<p align="center">
  <strong>A little piece of home, on the internet.</strong>
</p>

<p align="center">
  <a href="https://maati-radio.vercel.app/">🎧 Live Demo</a>
  •
  <a href="https://github.com/soumyhub/Maati-Radio">💻 GitHub</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-TypeScript-blue?logo=react" alt="React + TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" alt="Vercel" />
</p>

---

## 🌵 What is MAATI RADIO?

Everyone was making a music website.

I wanted to make something that could make someone **miss home.**

MAATI RADIO is an interactive digital radio experience inspired by Rajasthan — its folk music, old radios, desert evenings, courtyards, streets, and the feeling of home.

It isn't just designed to play music.

The idea was to turn **Rajasthani culture into an experience.**

> **What if a music website didn't just play a song, but made you feel somewhere?**

Whether you're still in Rajasthan, studying in another city, working in another country, or simply feeling nostalgic — MAATI RADIO is meant to feel like a small digital connection to home.

---

## 🎧 Experience MAATI RADIO

### 👉 [Open the Live Website](https://maati-radio.vercel.app/)

MAATI RADIO combines:

- 🎵 Rajasthani-inspired folk music
- 📻 An old-radio-inspired interface
- 🌅 Cinematic visual scenes
- 🎞️ Scroll-driven transitions
- 🧱 An interactive Memory Wall
- ⛶ Fullscreen mode
- 📱 Responsive layouts
- 🎨 Custom visual effects and animations

---

# ✨ Features

## 🎵 Interactive Radio Player

A custom music player designed around the visual language of an old radio.

- Play / pause
- Previous / next track
- Track progress and seeking
- Volume control
- Current track information
- Artist and genre information
- Spotify and YouTube Music links
- Responsive controls

---

## 🧱 Memory Wall

MAATI RADIO isn't only about listening.

The **Memory Wall** gives visitors a place to share something connected to home.

Visitors can submit:

- A childhood memory
- A feeling
- Feedback
- A story
- Something else they want to share

Submitted memories are stored using **Supabase** and can appear on the interactive Memory Wall.

The idea is simple:

> **Music carries memories.**

---

## ⛶ Fullscreen Experience

MAATI RADIO includes a dedicated fullscreen mode for a more immersive listening experience.

It removes browser distractions such as:

- Browser tabs
- Address bar
- Other browser UI

Pressing `Esc` exits fullscreen normally.

---

## 👥 Listener Indicator

A subtle listener indicator creates the feeling of tuning into a radio station alongside other listeners.

---

## 🌅 Cinematic Hero

The landing experience is built around a full-screen cinematic scene featuring:

- Rajasthani-inspired artwork
- Large Hindi brand mark
- Old-radio visual language
- Atmospheric grain
- Cinematic background video
- Responsive positioning

---

## 🎞️ Cinematic Scroll Experience

Instead of using a conventional page transition, MAATI RADIO uses a cinematic scroll interaction.

The Hero remains visually immersive while the About section gradually rises over it.

The result is designed to feel more like **entering another scene** than simply scrolling down a webpage.

---

## 📱 Responsive Design

The experience adapts across:

- Desktop
- Laptop
- Tablet
- Mobile

Layouts, positioning, controls, and visual elements respond to different screen sizes and orientations while maintaining the visual identity of the experience.

---

# 🛠️ Built With

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | UI and component architecture |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Styling and responsive layouts |
| **Supabase** | Memory Wall data storage |
| **Vercel** | Deployment |
| **YouTube Player API** | Audio playback |
| **CSS Animations** | Transitions and visual effects |
| **Fullscreen API** | Immersive fullscreen mode |

---

# 🏗️ Architecture

The application is organized around three main areas:

### `app/`

Contains the Next.js application entry points, layout, and global styling.

### `components/`

Contains the interactive UI building blocks including:

- Radio player
- Memory Wall
- Songs drawer
- Brand mark
- Top bar
- Background video
- Scroll reveal
- About section
- Visual effects

### `lib/`

Contains reusable application logic and data:

- Track definitions
- Shared types
- Supabase client
- YouTube player integration

---

# 📁 Project Structure

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
├── public/
│   └── bg/
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

🎬 How the Experience Works

The main page is built around a fixed cinematic Hero.

                         MAATI RADIO
                              │
                              ▼
                  ┌─────────────────────┐
                  │   Background Scene  │
                  │                     │
                  │   Brand + Player    │
                  │                     │
                  └──────────┬──────────┘
                             │
                        User Scrolls
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Cinematic Reveal  │
                  │                     │
                  │   About MAATI RADIO │
                  └─────────────────────┘

The scroll position is converted into a 0 → 1 reveal value and exposed through the CSS custom property:
```
--reveal
```
This allows the Hero, brand mark, and About section to transition smoothly without forcing React to re-render on every scroll frame.

🎥 Background Experience

The background uses a looping video:
```
<video
  autoPlay
  muted
  loop
  playsInline
/>
```
The video uses:
```
object-fit: cover;
```
This allows the visual scene to adapt across different screen orientations.

A poster image provides a visual fallback while the video is loading.


🎨 Design Philosophy

The visual direction was inspired by:

Rajasthani folk culture
Traditional radios
Desert landscapes
Warm earthy tones
Hand-painted aesthetics
Old photographs
Courtyards and village streets
Nostalgia

The goal wasn't to recreate Rajasthan literally.

It was to recreate:
```
the feeling of remembering Rajasthan.
```
🔐 Environment Variables

MAATI RADIO uses Supabase for the Memory Wall.

Create a .env.local file in the project root:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Important
```
Never commit ```.env.local``` or private credentials to GitHub.

The repository excludes local environment files through .gitignore:
```
.env.local
.env*.local
```

🚀 Run Locally

1. Clone the repository
```
git clone https://github.com/soumyhub/Maati-Radio.git
```
2. Enter the project
```
cd Maati-Radio
```
3. Install dependencies
```
npm install
```
4. Configure environment variables

Create ```.env.local``` and add the required Supabase variables.

5. Start the development server
```
npm run dev
```


Open:

```http://localhost:3000```


🏭 Production Build

Create an optimized production build:

```npm run build```

Run the production build locally:

```npm run start```


☁️ Deployment

MAATI RADIO is deployed using Vercel.



Production:

🎧 https://maati-radio.vercel.app/

The project is connected to the main branch, allowing production deployments to be triggered by changes pushed to the repository.


🧠 What I Learned

Building MAATI RADIO was more than just putting together a music player.

Some of the biggest things I explored:

- Designing an experience around cultural identity
- Building interactive audio interfaces
- Creating cinematic scroll interactions
- Working with browser fullscreen APIs
- Building responsive layouts for different orientations
- Connecting a frontend application to Supabase
- Designing user-generated content features
- Handling client-side state and browser APIs
- Debugging hydration issues in Next.js
- Working with Git, GitHub, and Vercel deployments
- Thinking about how technology can preserve a feeling, not just deliver functionality


❤️ Why I Built It

Sometimes the best projects aren't completely new ideas.

You can take something everyone is building...

and make it personal.

MAATI RADIO started as a web development experiment.

But somewhere along the way, it became an attempt to answer a simple question:

Can a website make someone feel a little closer to home?


📸 Preview

The project combines:

- A cinematic landing experience
- Interactive radio controls
- Rajasthani-inspired visuals
- Memory Wall
- Fullscreen mode
- Responsive layouts
- Cinematic scroll interactions

The preview above shows the main MAATI RADIO experience.


🔮 Future Ideas

Some things I'd like to explore in future versions:

- More Rajasthani folk tracks
- Curated regional stations
- More interactive cultural stories
- Better memory discovery
- Animated visualizers
- More regional languages
- Community features
- Improved accessibility
- Offline / PWA support


👨‍💻 Built By
Soumy Paliwal

A personal creative-development project combining:

Web Development × Music × Design × Rajasthan × Nostalgia


⭐ Support

If you like the idea behind MAATI RADIO, consider giving the repository a ⭐ on GitHub.

And if you have a hometown or childhood memory of your own:

What would you put into a digital experience that reminds someone of home?

<p align="center">
MAATI RADIO

A little piece of home, on the internet. ❤️

<br /> <a href="https://maati-radio.vercel.app/"> 🎧 Experience MAATI RADIO </a> </p> ```

