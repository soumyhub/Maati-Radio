export type StationId = "padharo" | "thar" | "lokGeet" | "maand" | "raat";

export interface Track {
  id: string;
  title: string;
  artist: string;
  category: string;
  year: string;
  duration: string;
  /**
   * IMPORTANT: this is a PLACEHOLDER value.
   * Replace with a real YouTube video ID that you have the right to embed
   * (ideally the rights holder's own upload, with embedding enabled).
   * Do not ship this project with placeholder IDs — playback will fail.
   */
  videoId: string;
}

export interface StationAccent {
  primary: string;
  secondary: string;
  glow: string;
}

export interface Station {
  id: StationId;
  frequency: string;
  name: string;
  tagline: string;
  mood: string;
  region: string;
  description: string;
  accent: StationAccent;
  tracks: Track[];
}
