import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import BookmarkPage from './pages/BookmarkPage';

const App: React.FC = () => {
  return (
    <BookmarkProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
          </Routes>
          <footer className="footer">
            <p>
              Built with ❤️ using React + TypeScript &nbsp;|&nbsp;
              <a
                href="https://developers.google.com/youtube/v3"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Data API
              </a>
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </BookmarkProvider>
  );
};

export default App;
