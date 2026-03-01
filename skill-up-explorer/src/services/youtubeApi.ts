import type { VideoItem } from '../types';

// ─── YouTube Data API v3 ──────────────────────────────────────────────────────
// Replace YOUR_API_KEY with a real YouTube Data API v3 key from:
// https://console.cloud.google.com/apis/credentials
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY ?? 'DEMO_MODE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export interface FetchResult {
    items: VideoItem[];
    totalResults: number;
}

/**
 * Searches YouTube for educational videos matching the given query.
 * Uses async/await with the Fetch API; throws on network or API errors.
 */
export async function searchYouTube(query: string, maxResults = 20): Promise<FetchResult> {
    // ── DEMO MODE – return mock data when no API key is configured ────────────
    if (API_KEY === 'DEMO_MODE' || !API_KEY) {
        return getMockResults(query);
    }

    const params = new URLSearchParams({
        key: API_KEY,
        q: `${query} tutorial course`,
        part: 'snippet',
        type: 'video',
        maxResults: String(maxResults),
        relevanceLanguage: 'en',
        videoCategoryId: '27', // Education
        order: 'relevance',
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
            (errorData as { error?: { message?: string } })?.error?.message ??
            `HTTP ${response.status}`;
        throw new Error(`YouTube API Error: ${message}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: VideoItem[] = data.items.map((item: any) => ({
        id: item.id.videoId as string,
        title: item.snippet.title as string,
        description: (item.snippet.description as string) || 'No description available.',
        thumbnail:
            (item.snippet.thumbnails?.high?.url ??
                item.snippet.thumbnails?.medium?.url ??
                item.snippet.thumbnails?.default?.url) as string,
        channelTitle: item.snippet.channelTitle as string,
        publishedAt: item.snippet.publishedAt as string,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    return { items, totalResults: data.pageInfo?.totalResults ?? items.length };
}

// ─── Demo / Fallback Data ─────────────────────────────────────────────────────
function getMockResults(query: string): FetchResult {
    const lower = query.toLowerCase();

    const catalogue: VideoItem[] = [
        {
            id: 'N3AkSS5hXMA',
            title: 'React Full Course for Beginners',
            description: 'Complete React tutorial covering hooks, context, routing and more.',
            thumbnail: 'https://i.ytimg.com/vi/N3AkSS5hXMA/hqdefault.jpg',
            channelTitle: 'Dave Gray',
            publishedAt: '2023-04-10T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=N3AkSS5hXMA',
        },
        {
            id: 'SqcY0GlETPk',
            title: 'TypeScript Full Course for Beginners',
            description: 'Learn TypeScript from scratch – types, interfaces, generics and more.',
            thumbnail: 'https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg',
            channelTitle: 'Dave Gray',
            publishedAt: '2023-02-15T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        },
        {
            id: 'dGcsHMXbSOA',
            title: 'JavaScript Tutorial for Beginners – Full Course',
            description: 'Master JavaScript fundamentals in one complete video.',
            thumbnail: 'https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg',
            channelTitle: 'Mosh Hamedani',
            publishedAt: '2022-11-20T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
        },
        {
            id: 'Ke90Tje7VS0',
            title: 'React & TypeScript – Full Course',
            description: 'Build type-safe React apps using TypeScript best practices.',
            thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg',
            channelTitle: 'freeCodeCamp',
            publishedAt: '2023-07-05T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        },
        {
            id: 'RVFAyFWO4go',
            title: 'Node.js Full Course – Beginner to Pro',
            description: 'Learn Node.js for backend development including REST APIs.',
            thumbnail: 'https://i.ytimg.com/vi/RVFAyFWO4go/hqdefault.jpg',
            channelTitle: 'Dave Gray',
            publishedAt: '2022-09-12T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=RVFAyFWO4go',
        },
        {
            id: 'bMknfKXIFA8',
            title: 'Python for Everybody – Full University of Michigan Course',
            description: 'Learn Python with Dr. Chuck in this university-level course.',
            thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg',
            channelTitle: 'freeCodeCamp',
            publishedAt: '2022-06-25T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        },
        {
            id: 'rfscVS0vtbw',
            title: 'CSS Full Course – Includes Flexbox and CSS Grid',
            description: 'Master modern CSS layout techniques with hands-on examples.',
            thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg',
            channelTitle: 'freeCodeCamp',
            publishedAt: '2022-08-18T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        },
        {
            id: 'qU76yWHeJh8',
            title: 'Git and GitHub Crash Course for Beginners',
            description: 'Everything you need to know about version control with Git.',
            thumbnail: 'https://i.ytimg.com/vi/qU76yWHeJh8/hqdefault.jpg',
            channelTitle: 'Traversy Media',
            publishedAt: '2022-12-01T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=qU76yWHeJh8',
        },
        {
            id: 'f2EqECiTBL8',
            title: 'SQL Full Course for Beginners',
            description: 'Learn SQL databases from scratch with MySQL and PostgreSQL examples.',
            thumbnail: 'https://i.ytimg.com/vi/f2EqECiTBL8/hqdefault.jpg',
            channelTitle: 'freeCodeCamp',
            publishedAt: '2023-01-08T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=f2EqECiTBL8',
        },
        {
            id: 'pTFZFxd5_lc',
            title: 'Docker & Kubernetes – Full Course for Beginners',
            description: 'Containerize and orchestrate apps with Docker and Kubernetes.',
            thumbnail: 'https://i.ytimg.com/vi/pTFZFxd5_lc/hqdefault.jpg',
            channelTitle: 'TechWorld with Nana',
            publishedAt: '2023-03-22T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=pTFZFxd5_lc',
        },
        {
            id: 'nu_pCVPKzTk',
            title: 'Next.js 14 Full Course 2024',
            description: 'Build full-stack applications with Next.js App Router.',
            thumbnail: 'https://i.ytimg.com/vi/nu_pCVPKzTk/hqdefault.jpg',
            channelTitle: 'Dave Gray',
            publishedAt: '2024-01-03T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
        },
        {
            id: 'GNrdg3PZuyI',
            title: 'Machine Learning Full Course – 12 Hours',
            description: 'Comprehensive machine learning tutorial for beginners.',
            thumbnail: 'https://i.ytimg.com/vi/GNrdg3PZuyI/hqdefault.jpg',
            channelTitle: 'Simplilearn',
            publishedAt: '2023-05-14T00:00:00Z',
            videoUrl: 'https://www.youtube.com/watch?v=GNrdg3PZuyI',
        },
    ];

    // Filter by query
    const keywords = lower.split(/\s+/).filter(Boolean);
    const scored = catalogue.map((v) => {
        const searchText = `${v.title} ${v.description} ${v.channelTitle}`.toLowerCase();
        const score = keywords.reduce(
            (acc, kw) => acc + (searchText.includes(kw) ? 1 : 0),
            0
        );
        return { v, score };
    });

    const filtered = scored
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ v }) => v);

    // If nothing matches, return all items shuffled as "related"
    const items = filtered.length > 0 ? filtered : [...catalogue].sort(() => Math.random() - 0.5);

    return { items, totalResults: items.length };
}
