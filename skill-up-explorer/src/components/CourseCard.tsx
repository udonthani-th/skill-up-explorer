import React from 'react';
import { Bookmark, BookmarkCheck, ExternalLink, Clock } from 'lucide-react';
import type { VideoItem } from '../types';
import { useBookmarks } from '../context/BookmarkContext';

interface CourseCardProps {
    item: VideoItem;
}

// Format ISO date string to readable
const formatDate = (iso: string): string => {
    try {
        return new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return '';
    }
};

const CourseCard: React.FC<CourseCardProps> = ({ item }) => {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const bookmarked = isBookmarked(item.id);

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        bookmarked ? removeBookmark(item.id) : addBookmark(item);
    };

    return (
        <article className={`card ${bookmarked ? 'card--bookmarked' : ''}`} id={`card-${item.id}`}>
            <div className="card__thumb-wrapper">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="card__thumb"
                    loading="lazy"
                />
                <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card__play-overlay"
                    aria-label={`Watch ${item.title}`}
                >
                    <ExternalLink size={28} />
                </a>
            </div>

            <div className="card__body">
                <h3 className="card__title">{item.title}</h3>
                <p className="card__channel">{item.channelTitle}</p>
                <p className="card__desc">{item.description}</p>
                <div className="card__footer">
                    <span className="card__date">
                        <Clock size={13} />
                        {formatDate(item.publishedAt)}
                    </span>
                    <button
                        className={`card__bookmark-btn ${bookmarked ? 'card__bookmark-btn--active' : ''}`}
                        onClick={handleBookmark}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                        id={`bookmark-btn-${item.id}`}
                    >
                        {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        {bookmarked ? 'Saved' : 'Save'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
