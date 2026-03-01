// ─── TypeScript Interfaces ────────────────────────────────────────────────────

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  videoUrl: string;
}

export interface SearchState {
  query: string;
  results: VideoItem[];
  loading: boolean;
  error: string | null;
}

export interface BookmarkContextType {
  bookmarks: VideoItem[];
  addBookmark: (item: VideoItem) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}
