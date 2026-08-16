MAATI RADIO — Rajasthan 🎙️

<img width="2940" height="1844" alt="og-image" src="https://github.com/user-attachments/assets/36bb2228-c1c5-4c78-b106-cfc538964e0b" />


> **A little piece of home, on the internet.**

🎧 **Live Demo:** https://maati-radio.vercel.app

**MAATI RADIO** is an interactive digital radio experience inspired by Rajasthan — its folk music, old radios, desert evenings, courtyards, and the feeling of home.

It isn't just designed to play music. The goal was to turn **Rajasthani culture into an experience.**

────────────────────────────────────────────────────────────────────────────────

🌵 What is MAATI RADIO?

Everyone was making a music website.

I wanted to make something that could make someone **miss home.**

MAATI RADIO was built around a simple idea:

> What if a music website didn't just play a song, but made you feel somewhere?

The experience combines Rajasthani-inspired visuals, folk music, an old-radio aesthetic, cinematic transitions, interactive audio controls, and a **Memory Wall** where visitors can leave a childhood memory, a feeling, or something that reminds them of home.

Whether you're still in Rajasthan, studying in another city, working in another country, or simply feeling nostalgic — MAATI RADIO is meant to feel like a small digital connection to home.

────────────────────────────────────────────────────────────────────────────────

✨ Features

🎵 Interactive Radio Player

A custom music player designed around the visual language of an old radio.

- Play / pause
- Previous / next track
- Track progress and seeking
- Volume control
- Current track information
- Artist and genre information
- Spotify and YouTube Music links
- Responsive controls

🧱 Memory Wall

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

⛶ Fullscreen Experience

A dedicated fullscreen control lets listeners remove browser distractions and experience MAATI RADIO without tabs, address bars, or other browser UI getting in the way.

Pressing `Esc` exits fullscreen normally.

👥 Live Listener Indicator

A subtle listener counter creates the feeling of tuning into a real radio station with other people listening at the same time.

🌅 Cinematic Hero

The landing experience uses a full-screen visual scene with:

- Cinematic background
- Rajasthani-inspired artwork
- Large Hindi brand mark
- Old-radio visual language
- Grain / atmosphere effects
- Responsive positioning

🎞️ Cinematic Scroll Transition

The Hero transitions into the About section as the user scrolls.

The Hero remains visually immersive while the About panel gradually rises over it, creating a cinematic transition instead of a conventional page scroll.

📱 Responsive Design

The experience is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The layout adapts to different screen sizes and orientations while maintaining the visual identity of the experience.

────────────────────────────────────────────────────────────────────────────────

🛠️ Built With

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

────────────────────────────────────────────────────────────────────────────────

🏗️ Project Structure

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
```

────────────────────────────────────────────────────────────────────────────────

🎬 How the Experience Works

The main page is built around a fixed cinematic Hero.

```text
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
```

The scroll position is converted into a `0 → 1` reveal value and exposed through the CSS custom property:

```css
--reveal
```

This allows the Hero, brand mark, and About section to transition smoothly without forcing React to re-render on every scroll frame.

────────────────────────────────────────────────────────────────────────────────

🎥 Background Experience

The background uses a looping video:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
/>
```

The video uses:

```css
object-fit: cover;
```

so the same visual system can adapt across different screen orientations.

A poster image is also provided so the experience has a visual fallback before the video is ready.

────────────────────────────────────────────────────────────────────────────────

🎨 Design Philosophy

The visual direction was inspired by:

- Rajasthani folk culture
- Traditional radios
- Desert landscapes
- Warm earthy tones
- Hand-painted aesthetics
- Old photographs
- Courtyards and village streets
- Nostalgia

The goal wasn't to recreate Rajasthan literally.

It was to recreate **the feeling of remembering Rajasthan.**

────────────────────────────────────────────────────────────────────────────────

🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

> **Never commit `.env.local` or private credentials to GitHub.**

The repository's `.gitignore` excludes local environment files:

```gitignore
.env.local
.env*.local
```

────────────────────────────────────────────────────────────────────────────────

🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/soumyhub/Maati-Radio.git
```

Enter the project:

```bash
cd Maati-Radio
```

Install dependencies:

```bash
npm install
```

Create your `.env.local` file with the required Supabase variables.

Then start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

────────────────────────────────────────────────────────────────────────────────

🏭 Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

────────────────────────────────────────────────────────────────────────────────

☁️ Deployment

The project is deployed using **Vercel**.

Every push to the `main` branch can trigger a new production deployment.

Live

https://maati-radio.vercel.app

────────────────────────────────────────────────────────────────────────────────

🧠 What I Learned

Building MAATI RADIO was more than just putting together a music player.

Some of the biggest things I explored while building it:

- Designing an experience around a cultural identity
- Building interactive audio interfaces
- Creating cinematic scroll interactions
- Managing browser fullscreen APIs
- Building responsive layouts for different orientations
- Connecting a frontend application to Supabase
- Designing user-generated content features
- Handling client-side state and browser APIs
- Debugging hydration issues in Next.js
- Working with Git, GitHub, and Vercel deployments
- Thinking about how technology can preserve a feeling, not just deliver functionality

────────────────────────────────────────────────────────────────────────────────

❤️ Why I Built It

Sometimes the best projects aren't completely new ideas.

You can take something everyone is building...

and make it **personal.**

MAATI RADIO started as a web development experiment.

But somewhere along the way, it became an attempt to answer a simple question:

> **Can a website make someone feel a little closer to home?**

────────────────────────────────────────────────────────────────────────────────

📸 Preview

The project combines a cinematic landing experience with an interactive radio player, Memory Wall, fullscreen mode, and responsive layouts.

The preview above shows the main MAATI RADIO experience.

────────────────────────────────────────────────────────────────────────────────

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

────────────────────────────────────────────────────────────────────────────────

👨‍💻 Built By

Soumy Paliwal

Built as a personal creative-development project combining:

**Web Development × Music × Design × Rajasthan × Nostalgia**

────────────────────────────────────────────────────────────────────────────────

⭐ Support

If you like the idea behind MAATI RADIO, consider giving the repository a ⭐ on GitHub.

And if you have a hometown or childhood memory of your own:

> **What would you put into a digital experience that reminds someone of home?**

────────────────────────────────────────────────────────────────────────────────

<p align="center">

MAATI RADIO

**A little piece of home, on the internet.** ❤️

</p>
