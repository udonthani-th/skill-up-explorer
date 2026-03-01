import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { useBookmarks } from '../context/BookmarkContext';
import { BookMarked, Compass } from 'lucide-react';

const BookmarkPage: React.FC = () => {
    const { bookmarks } = useBookmarks();

    return (
        <main className="page bookmark-page">
            <section className="page-header">
                <div className="page-header__icon">
                    <BookMarked size={32} />
                </div>
                <div>
                    <h1 className="page-header__title">Saved Courses</h1>
                    <p className="page-header__subtitle">
                        {bookmarks.length > 0
                            ? `${bookmarks.length} course${bookmarks.length > 1 ? 's' : ''} saved for later`
                            : 'Your learning list is empty'}
                    </p>
                </div>
            </section>

            {bookmarks.length === 0 ? (
                <div className="empty-state">
                    <BookMarked size={64} />
                    <h3>Nothing saved yet</h3>
                    <p>Click the bookmark icon on any course to save it here.</p>
                    <Link to="/" className="cta-btn" id="go-explore-btn">
                        <Compass size={18} />
                        Start Exploring
                    </Link>
                </div>
            ) : (
                <div className="cards-grid" id="bookmarks-grid">
                    {bookmarks.map((item) => (
                        <CourseCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default BookmarkPage;
