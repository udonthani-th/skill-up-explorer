# Skill-Up Roadmap Explorer 

A modern, interactive web application for discovering and bookmarking free online courses and tutorials. Built with **React + TypeScript + Vite**.
# Skill-Up Roadmap Explorer 

**Developed by:** [Mr.Pakutsawat Tousanit]  
**Student ID:** [4400090193]  
**Course:** [JavaScript]
##  Features

| Feature | Implementation |
|---|---|
| Course search | YouTube Data API v3 via `Fetch API` (async/await) |
| Search bar | Controlled React Form with `useState` |
| Results re-fetch | `useEffect` triggered on query change |
| Reusable card | `CourseCard` component used on both Search & Bookmark pages |
| Bookmark system | React Context (`BookmarkContext`) + `localStorage` persistence |
| Routing | `react-router-dom` – Explore & Saved pages |
| Skeleton loading | CSS shimmer animation while fetching |
| Type safety | Full TypeScript interfaces & strict types |
| Demo mode | Built-in mock data when no API key is configured |

##  Project Structure

```
skill-up-explorer/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navbar with bookmark count badge
│   │   ├── CourseCard.tsx      # Reusable card (search + bookmark pages)
│   │   └── SearchBar.tsx       # Controlled form component
│   ├── context/
│   │   └── BookmarkContext.tsx # Global state (Context API)
│   ├── pages/
│   │   ├── SearchPage.tsx      # Home / search with async API calls
│   │   └── BookmarkPage.tsx    # Saved courses
│   ├── services/
│   │   └── youtubeApi.ts       # YouTube API + demo fallback
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx                 # Router + provider setup
│   ├── main.tsx                # Entry point
│   └── index.css               # Premium dark-mode styles
├── .env                        # API key configuration
└── README.md
```

##  Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd skill-up-explorer

# Install dependencies
npm install
```

### Configuration (Optional)

The app runs in **Demo Mode** without an API key, using curated mock data.

To use the real YouTube API:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project and enable **YouTube Data API v3**
3. Create an API key
4. Edit `.env`:

```env
VITE_YOUTUBE_API_KEY=your_actual_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

##  Concepts Demonstrated

- **React Hooks**: `useState`, `useEffect`, `useContext`, `useCallback`
- **Context API**: BookmarkProvider shares state across components without prop drilling
- **Async JavaScript**: `async/await` with `Fetch API`, Promise error handling
- **TypeScript**: Interfaces, generic types, strict null checks
- **React Forms**: Controlled inputs, form submission events
- **Reusable Components**: `CourseCard` used identically on two different pages
- **React Router**: Client-side navigation between Explore and Saved pages
- **localStorage**: Persistent bookmarks across browser sessions
- **Event Handling**: onClick, onSubmit, onChange events throughout

##  Dependencies

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool
- [react-router-dom](https://reactrouter.com/) — routing
- [lucide-react](https://lucide.dev/) — icons

##  License

MIT
