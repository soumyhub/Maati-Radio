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
    title: "Kesariya Balam Padharo Mhare Desh",
    artist: "by Seema Mishra",
    category: "Rajasthani Folk",
    year: "2002",
    duration: "7:52",
    videoId: "_tDOaWIFfYI",
  },
  {
    id: "mishri-ko-baag-laga-de-rasiya",
    title: "Mishri Ko Baag Laga De Rasiya",
    artist: "by Seema Mishra",
    category: "Folk Dance",
    year: "2002",
    duration: "6:51",
    videoId: "PMWCFuGLHkA",
  },
  {
    id: "jalalo-bilalo",
    title: "JALALO BILALO-A (Longing Of A Woman In Love)",
    artist: "by RAAHEIN Gharana x Shefali Khanna",
    category: "Rajasthani Folk",
    year: "2023",
    duration: "5:28",
    videoId: "jRr-RVqP-l0",
  },
  {
    id: "sundar-gori",
    title: "Sundar Gori",
    artist: "by SAZ",
    category: "Festive Folk",
    year: "2025",
    duration: "6:56",
    videoId: "araonQrXfpg",
  },
  {
    id: "naina-ro-lobhi",
    title: "Naina Ro Lobhi",
    artist: "by Seema Mishra",
    category: "World Record Folk Dance",
    year: "2000",
    duration: "7:28",
    videoId: "obJpe-T-nA4",
  },
  {
    id: "boli-pyari-lage",
    title: "Boli Pyari Lage",
    artist: "by Kheta Khan & Kailash Jangid",
    category: "Rajasthani Folk",
    year: "2025",
    duration: "5:02",
    videoId: "4TSxPTfsF6U",
  },
  {
    id: "mumal",
    title: "Mumal",
    artist: "by Dapu Khan & Vibha Saraf",
    category: "Desert Ballad",
    year: "Traditional",
    duration: "4:52",
    videoId: "Ah1gS3ZtNrg",
  },
  {
    id: "savariya-parnaye",
    title: "Savariya Parnaye",
    artist: "Divana",
    category: "Folk",
    year: "1996",
    duration: "7:44",
    videoId: "-OEh1EQ-vuM",
  },
  {
    id: "hiwde-ro-haar",
    title: "Hiwde Ro Haar",
    artist: "by Akram Khan and Group",
    category: "Traditional Rajasthani Folk",
    year: "2001",
    duration: "4:25",
    videoId: "zOxgU11gw8g",
  },
  {
    id: "aave-re-hichki",
    title: "Aave Re Hichki",
    artist: "by Mharo Barmer",
    category: "Rajasthani Original Langa Song",
    year: "2020",
    duration: "9:25",
    videoId: "IwiG-aSfDLg",
  },
];

export const defaultTrackId = tracks[0].id;
