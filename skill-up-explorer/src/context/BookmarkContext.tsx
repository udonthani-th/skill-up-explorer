import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { VideoItem, BookmarkContextType } from '../types';

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookmarks, setBookmarks] = useState<VideoItem[]>(() => {
        try {
            const stored = localStorage.getItem('skill-up-bookmarks');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Persist to localStorage whenever bookmarks change
    useEffect(() => {
        localStorage.setItem('skill-up-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = useCallback((item: VideoItem) => {
        setBookmarks((prev) => {
            if (prev.find((b) => b.id === item.id)) return prev;
            return [item, ...prev];
        });
    }, []);

    const removeBookmark = useCallback((id: string) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }, []);

    const isBookmarked = useCallback(
        (id: string) => bookmarks.some((b) => b.id === id),
        [bookmarks]
    );

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

// Custom hook — throws if used outside provider
export const useBookmarks = (): BookmarkContextType => {
    const ctx = useContext(BookmarkContext);
    if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
    return ctx;
};
