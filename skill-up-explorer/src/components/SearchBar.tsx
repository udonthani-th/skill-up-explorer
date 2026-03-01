import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed) onSearch(trimmed);
    };

    const handleClear = () => {
        setValue('');
    };

    return (
        <form className="search-form" onSubmit={handleSubmit} aria-label="Search courses">
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Search topics, courses, or skills..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-label="Search query"
                    autoComplete="off"
                    spellCheck={false}
                />
                {value && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            <button
                id="search-submit-btn"
                type="submit"
                className="search-btn"
                disabled={loading || !value.trim()}
                aria-label="Submit search"
            >
                {loading ? <span className="spinner" /> : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;
