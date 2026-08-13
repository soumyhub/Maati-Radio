export interface Track {
  id: string;
  title: string;
  artist: string;
  category: string;
  year?: string;
  duration?: string;
  /**
   * IMPORTANT: placeholder until you supply a real, rights-cleared
   * YouTube video ID (ideally the rights holder's own upload, with
   * embedding enabled). See README.md.
   */
  videoId: string;
}
