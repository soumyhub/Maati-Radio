import type { Station } from "./types";

/**
 * ⚠️ VIDEO IDS ARE PLACEHOLDERS.
 *
 * Every `videoId` below reads "REPLACE_WITH_VIDEO_ID_n". None of these songs
 * were searched for or sourced on your behalf — per your brief, that choice
 * is left entirely to you. Before shipping, swap each placeholder for a real
 * YouTube video ID that you have the right to use (ideally the rights
 * holder's own upload, with embedding enabled). See README.md for exactly
 * how to do this — it's a one-line change per track.
 */

export const stations: Station[] = [
  {
    id: "padharo",
    frequency: "94.7",
    name: "Padharo Mhare Des",
    tagline: "The welcoming sound of Rajasthan",
    mood: "Warm · Melodic · Nostalgic",
    region: "Rajasthan — statewide",
    description:
      "The songs that greet you at the door. Warm, familiar, and instantly recognizable — the sound of a haveli courtyard at golden hour.",
    accent: { primary: "#C68A3D", secondary: "#B55B3A", glow: "#E4B366" },
    tracks: [
      {
        id: "padharo-01",
        title: "Dharti Dhora Ri",
        artist: "Traditional Rajasthani Folk",
        category: "Folk Anthem",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_1",
      },
      {
        id: "padharo-02",
        title: "Chand Chadiyo Gignar",
        artist: "Traditional Rajasthani Folk",
        category: "Folk",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_2",
      },
      {
        id: "padharo-03",
        title: "Aur Rang De",
        artist: "Traditional Rajasthani Folk",
        category: "Festive Folk",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_3",
      },
    ],
  },
  {
    id: "thar",
    frequency: "96.2",
    name: "Thar Ki Awaaz",
    tagline: "Raw desert folk",
    mood: "Earthy · Intimate · Ancient",
    region: "Jaisalmer · Barmer · the Thar",
    description:
      "Manganiyar and Langa traditions — sarangi, kamayacha, algoza, khartal, morchang. The desert's own instruments, close and unpolished.",
    accent: { primary: "#8A5A34", secondary: "#5C3A22", glow: "#B9834F" },
    tracks: [
      {
        id: "thar-01",
        title: "Kuve Par Ekali",
        artist: "Traditional Rajasthani Folk",
        category: "Desert Folk / Manganiyar",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_4",
      },
    ],
  },
  {
    id: "lokGeet",
    frequency: "98.4",
    name: "Lok Geet",
    tagline: "Traditional Rajasthani folk music",
    mood: "Lively · Colourful · Human",
    region: "Villages across Rajasthan",
    description:
      "Wedding songs, village songs, seasonal songs, community singing. The sound of a courtyard full of people.",
    accent: { primary: "#C97A4A", secondary: "#D9A441", glow: "#E8B96E" },
    tracks: [
      {
        id: "lokgeet-01",
        title: "Ghoomar",
        artist: "Traditional Rajasthani Folk",
        category: "Folk Dance",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_5",
      },
      {
        id: "lokgeet-02",
        title: "Kalyo Kood Padyo",
        artist: "Traditional Rajasthani Folk",
        category: "Folk",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_6",
      },
      {
        id: "lokgeet-03",
        title: "Nakhralo Devriyo",
        artist: "Traditional Rajasthani Folk",
        category: "Folk",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_7",
      },
    ],
  },
  {
    id: "maand",
    frequency: "100.1",
    name: "Maand",
    tagline: "Slow, melodic Rajasthani folk traditions",
    mood: "Elegant · Emotional · Romantic",
    region: "Jaipur · Jodhpur courts",
    description:
      "The classical folk form born in the royal courts — unhurried, ornamented, and deeply felt. Best heard as the light fades.",
    accent: { primary: "#B76B63", secondary: "#8C4A45", glow: "#D99893" },
    tracks: [
      {
        id: "maand-01",
        title: "Misri Ko Bag",
        artist: "Traditional Rajasthani Folk",
        category: "Maand",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_8",
      },
      {
        id: "maand-02",
        title: "Balam Choto So",
        artist: "Traditional Rajasthani Folk",
        category: "Maand",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_9",
      },
    ],
  },
  {
    id: "raat",
    frequency: "102.7",
    name: "Raat Ri Dhun",
    tagline: "Late-night Rajasthan",
    mood: "Quiet · Lonely · Dreamy",
    region: "The desert, after dark",
    description:
      "Slower folk, instrumental pieces, and the hush of a desert night. For the hours when the town has gone quiet.",
    accent: { primary: "#3A4A63", secondary: "#232B3D", glow: "#5E7699" },
    tracks: [
      {
        id: "raat-01",
        title: "Supno",
        artist: "Traditional Rajasthani Folk",
        category: "Night Folk",
        year: "Traditional",
        duration: "—",
        videoId: "REPLACE_WITH_VIDEO_ID_10",
      },
    ],
  },
];

export const defaultStationId = stations[0].id;

export function getStation(id: string): Station {
  return stations.find((s) => s.id === id) ?? stations[0];
}
