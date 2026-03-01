import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';
import { searchYouTube } from '../services/youtubeApi';
import type { VideoItem } from '../types';
import { Sparkles, AlertCircle, SearchX } from 'lucide-react';

// Popular topic suggestions
const SUGGESTIONS = [
    'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
    'CSS', 'SQL', 'Docker', 'Machine Learning', 'Next.js',
];

const SearchPage: React.FC = () => {
    const [results, setResults] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);

    // Performs the async API call; demonstrates Promise + async/await
    const handleSearch = useCallback(async (query: string) => {
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setLastQuery(query);

        try {
            const { items, totalResults: total } = await searchYouTube(query);
            setResults(items);
            setTotalResults(total);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-search on mount with a popular topic to show results immediately
    useEffect(() => {
        handleSearch('React');
    }, [handleSearch]);

    const handleSuggestion = (topic: string) => {
        handleSearch(topic);
    };

    return (
        <main className="page search-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero__content">
                    <div className="hero__badge">
                        <Sparkles size={14} />
                        AI-Powered Learning
                    </div>
                    <h1 className="hero__title">
                        Find Your Next&nbsp;
                        <span className="gradient-text">Skill Upgrade</span>
                    </h1>
                    <p className="hero__subtitle">
                        Search thousands of free courses and tutorials from top educators.
                        Save what you love, learn at your pace.
                    </p>
                    <SearchBar onSearch={handleSearch} loading={loading} />
                    {/* Suggestion chips */}
                    <div className="suggestions" aria-label="Topic suggestions">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                className="suggestion-chip"
                                onClick={() => handleSuggestion(s)}
                                id={`suggestion-${s.toLowerCase()}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="results-section">
                {hasSearched && !loading && !error && (
                    <div className="results-header">
                        <h2 className="results-title">
                            {results.length > 0
                                ? `Found ${totalResults.toLocaleString()} results for "${lastQuery}"`
                                : `No results for "${lastQuery}"`}
                        </h2>
                    </div>
                )}

                {loading && (
                    <div className="loading-grid" aria-live="polite">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="card card--skeleton" aria-hidden="true">
                                <div className="skeleton skeleton--thumb" />
                                <div className="card__body">
                                    <div className="skeleton skeleton--title" />
                                    <div className="skeleton skeleton--text" />
                                    <div className="skeleton skeleton--text skeleton--short" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="error-state" role="alert">
                        <AlertCircle size={40} />
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                        <button className="retry-btn" onClick={() => handleSearch(lastQuery)}>
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && results.length === 0 && hasSearched && (
                    <div className="empty-state">
                        <SearchX size={48} />
                        <h3>No courses found</h3>
                        <p>Try a different keyword or browse our suggestions above.</p>
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className="cards-grid" id="search-results">
                        {results.map((item) => (
                            <CourseCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default SearchPage;
