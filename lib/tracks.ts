import type { Track } from "./types";

/**
 * ⚠️ VIDEO IDS ARE PLACEHOLDERS.
 *
 * Every `videoId` below is a stand-in ("REPLACE_WITH_VIDEO_ID_n"). Per your
 * instructions, none of these were searched for or sourced — you'll supply
 * real, rights-cleared YouTube video IDs (ideally the rights holder's own
 * upload, with embedding enabled). See README.md for exactly how to swap
 * them in — it's a one-line change per track.
 *
 * This is the "initial example structure" list from the brief. The site is
 * built to comfortably hold ~20 tracks — just append more objects below.
 */
export const tracks: Track[] = [
  {
    id: "kesariya-balam",
    title: "Kesariya Balam",
    artist: "Traditional Rajasthani Folk",
    category: "Rajasthani Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_1",
  },
  {
    id: "ghoomar",
    title: "Ghoomar",
    artist: "Traditional Rajasthani Folk",
    category: "Folk Dance",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_2",
  },
  {
    id: "padharo-mhare-des",
    title: "Padharo Mhare Des",
    artist: "Traditional Rajasthani Folk",
    category: "Rajasthani Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_3",
  },
  {
    id: "nimbooda",
    title: "Nimbooda",
    artist: "Traditional Rajasthani Folk",
    category: "Festive Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_4",
  },
  {
    id: "banna-re-bagan-mein",
    title: "Banna Re Bagan Mein",
    artist: "Traditional Rajasthani Folk",
    category: "Wedding Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_5",
  },
  {
    id: "gorband-nakhralo",
    title: "Gorband Nakhralo",
    artist: "Traditional Rajasthani Folk",
    category: "Rajasthani Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_6",
  },
  {
    id: "moomal",
    title: "Moomal",
    artist: "Traditional Rajasthani Folk",
    category: "Desert Ballad",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_7",
  },
  {
    id: "kurjan",
    title: "Kurjan",
    artist: "Traditional Rajasthani Folk",
    category: "Maand",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_8",
  },
  {
    id: "chirmi",
    title: "Chirmi",
    artist: "Traditional Rajasthani Folk",
    category: "Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_9",
  },
  {
    id: "hichki",
    title: "Hichki",
    artist: "Traditional Rajasthani Folk",
    category: "Folk",
    year: "Traditional",
    duration: "—",
    videoId: "REPLACE_WITH_VIDEO_ID_10",
  },
];

export const defaultTrackId = tracks[0].id;
