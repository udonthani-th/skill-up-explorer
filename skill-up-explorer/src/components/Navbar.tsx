import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookMarked, Zap } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

const Navbar: React.FC = () => {
    const location = useLocation();
    const { bookmarks } = useBookmarks();

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <Link to="/" className="navbar__brand" id="nav-brand">
                <Zap className="navbar__brand-icon" size={24} />
                <span>Skill-Up Explorer</span>
            </Link>

            <div className="navbar__links">
                <Link
                    to="/"
                    id="nav-search"
                    className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
                >
                    <Compass size={18} />
                    <span>Explore</span>
                </Link>
                <Link
                    to="/bookmarks"
                    id="nav-bookmarks"
                    className={`navbar__link ${location.pathname === '/bookmarks' ? 'navbar__link--active' : ''}`}
                >
                    <BookMarked size={18} />
                    <span>Saved</span>
                    {bookmarks.length > 0 && (
                        <span className="navbar__badge">{bookmarks.length}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
