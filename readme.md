# ZenMaster — Learn Japanese with AI

A modern, full-featured Japanese language learning platform built with React 18, TypeScript, and AI-powered tools. Covers all five JLPT levels (N5–N1) with interactive lessons, spaced-repetition flashcards, AI pronunciation practice, gamification, and a community forum.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Pages & Routing](#pages--routing)
- [Architecture](#architecture)
- [Responsive Design](#responsive-design)
- [Configuration](#configuration)
- [Current Status](#current-status)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Learning
- **JLPT Levels N5 → N1** — structured lesson tracks at every proficiency tier
- **Interactive Lessons** — section-based content (Introduction, Vocabulary, Grammar, Practice) with audio playback and TTS fallback
- **Smart Flashcards** — spaced-repetition system for maximum vocabulary retention
- **Progress Tracking** — per-lesson completion status and visual progress bars

### AI-Powered Tools
- **AI Pronunciation Practice** — record yourself, compare to native audio, and receive AI feedback (mock system, ready for real AI integration)
- **Personalized Learning Path** — adaptive content recommendations based on current level and progress

### Gamification
- **XP System** — earn experience points for completing lessons and activities
- **Achievement Badges** — four rarity tiers: Common, Rare, Epic, Legendary
- **Daily Streaks** — calendar-based streak tracking to build consistent habits
- **Leaderboard** — compete with other learners globally

### Community
- **Discussion Forum** — post questions, share tips, and discuss lessons
- **Thread Upvotes** — surface the most helpful community answers
- **User Profiles** — public stats, XP, badges, and learning history

### User Management
- **Authentication** — mock auth with localStorage (Supabase-ready)
- **Profile Page** — avatar (DiceBear), stats, badges, and recent activity
- **Settings** — account preferences, notification options, theme selection
- **Dashboard** — personalized overview of progress and upcoming lessons

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript 5.8 |
| Build Tool | Vite 5.4 + SWC |
| Routing | React Router DOM 6.30 |
| State / Data | React Context API + TanStack React Query 5.84 |
| UI Components | Shadcn/ui + Radix UI primitives |
| Styling | Tailwind CSS 3.4 + tailwindcss-animate |
| Animations | Framer Motion 11.18 |
| Icons | Lucide React 0.462 |
| Audio | Howler.js 2.2 + Web Speech API |
| Forms | React Hook Form 7.61 + Zod 3.25 |
| Charts | Recharts 2.15 |
| Linting | ESLint 9.32 + TypeScript-ESLint |

---

## Project Structure

```
hackathon-techniki/
├── public/
│   ├── audio/                  # Lesson audio files (MP3)
│   ├── favicon.svg
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
│
└── src/
    ├── assets/
    │   └── hero-image.jpg
    │
    ├── components/
    │   ├── ui/                  # 58 Shadcn/ui + custom components
    │   │   ├── responsive-container.tsx
    │   │   ├── responsive-grid.tsx
    │   │   ├── responsive-text.tsx
    │   │   └── responsive-spacing.tsx
    │   ├── ai-pronunciation.tsx # AI feedback UI component
    │   ├── auth-provider.tsx    # Authentication context
    │   ├── navbar.tsx           # Responsive navigation bar
    │   ├── new-thread-modal.tsx # Community forum thread creator
    │   └── theme-provider.tsx   # Light/dark/system theme context
    │
    ├── hooks/
    │   ├── use-auth.ts          # Auth context consumer
    │   ├── use-lessons.ts       # React Query: fetch lessons
    │   ├── use-levels.ts        # React Query: fetch JLPT levels
    │   ├── use-mobile.tsx       # Responsive breakpoint utilities
    │   └── use-toast.ts         # Toast notification helper
    │
    ├── lib/
    │   ├── mock-data.ts         # Demo data + TypeScript interfaces
    │   └── utils.ts             # cn() class name helper
    │
    ├── pages/
    │   ├── landing.tsx          # Home / marketing page
    │   ├── dashboard.tsx        # Authenticated user dashboard
    │   ├── levels.tsx           # JLPT level overview grid
    │   ├── levels/[id].tsx      # Level detail + lesson list
    │   ├── lesson/[id].tsx      # Individual lesson viewer
    │   ├── ai-pronunciation.tsx # AI pronunciation practice page
    │   ├── flashcards.tsx       # Spaced-repetition flashcard deck
    │   ├── community.tsx        # Forum threads + replies
    │   ├── leaderboard.tsx      # Global XP rankings
    │   ├── login.tsx            # Sign-in form
    │   ├── signup.tsx           # Registration form
    │   ├── profile.tsx          # User profile view
    │   ├── settings.tsx         # Account settings
    │   ├── responsive-test.tsx  # Dev-only responsive layout test
    │   ├── Index.tsx            # Root redirect
    │   └── NotFound.tsx         # 404 page
    │
    ├── App.tsx                  # Router setup + provider tree
    ├── main.tsx                 # React entry point
    ├── index.css                # Global styles + CSS variables
    └── App.css                  # App-level styles
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/rohit-yadav5/hackathon-techniki.git
cd hackathon-techniki

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Demo Login

Any email and password combination will work with the mock auth system. A demo user ("Alex Costa", N5 level, 1250 XP) will be created on first login.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all source files |

---

## Pages & Routing

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing / marketing | No |
| `/dashboard` | Personalized dashboard | Yes |
| `/levels` | JLPT level overview | No |
| `/levels/:levelId` | Level detail + lessons | No |
| `/lesson/:id` | Lesson viewer | Yes |
| `/ai-pronunciation` | AI pronunciation practice | Yes |
| `/flashcards` | Flashcard review | Yes |
| `/community` | Discussion forum | No |
| `/leaderboard` | XP leaderboard | No |
| `/login` | Sign in | No |
| `/signup` | Register | No |
| `/profile` | User profile | Yes |
| `/settings` | Account settings | Yes |
| `*` | 404 Not Found | — |

---

## Architecture

### Provider Tree

```
QueryClientProvider (React Query)
  └── ThemeProvider (light/dark/system)
        └── AuthProvider (user session)
              └── TooltipProvider
                    └── BrowserRouter
                          └── Navbar + Routes
```

### Data Layer

All data currently comes from `src/lib/mock-data.ts`. React Query hooks (`use-lessons.ts`, `use-levels.ts`) simulate real API calls with a 300–500 ms artificial delay. Every hook is structured for straightforward swap-in of a real backend (Supabase or REST).

### Authentication

`AuthProvider` uses `localStorage` for session persistence. The interface matches a Supabase Auth drop-in: `login`, `signup`, `logout`, and `resetPassword` are all implemented and stubbed with Supabase equivalents in comments.

---

## Responsive Design

The app is built mobile-first with six breakpoints:

| Breakpoint | Width |
|---|---|
| `xs` | 480px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Four custom responsive utility components live in `src/components/ui/`:

- **`ResponsiveContainer`** — max-width container with progressive horizontal padding
- **`ResponsiveGrid`** — configurable column count per breakpoint
- **`ResponsiveText`** — progressive font sizing (e.g., `text-2xl sm:text-3xl lg:text-4xl`)
- **`ResponsiveSpacing`** — consistent vertical rhythm across screen sizes

---

## Configuration

### Environment Variables

Create a `.env` file in the project root for future backend integration:

```env
VITE_API_URL=https://your-api-url.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_AI_SERVICE_KEY=your-ai-service-key
```

### Theme

Modify `tailwind.config.ts` to customize colors, fonts, and animations. CSS custom properties for the design tokens are defined in `src/index.css`.

### Mock Data

Update or extend `src/lib/mock-data.ts` to add levels, lessons, vocabulary, badges, or forum threads without touching any component code.

---

## Current Status

### Completed
- [x] Full JLPT N5–N1 level structure
- [x] Interactive lesson viewer with section navigation
- [x] Audio playback with Web Speech API TTS fallback
- [x] AI pronunciation practice interface
- [x] Spaced-repetition flashcard system
- [x] XP and badge gamification
- [x] Daily streak tracking
- [x] Global leaderboard
- [x] Community discussion forum with upvotes
- [x] User dashboard, profile, and settings
- [x] Mock authentication with localStorage persistence
- [x] Mobile-first responsive design across all pages
- [x] Light / dark / system theme support
- [x] PWA manifest

### In Progress
- [ ] Real AI pronunciation scoring (Web Speech API → AI model)
- [ ] Backend integration (Supabase auth + database)
- [ ] Persistent user progress across sessions
- [ ] Full quiz system with grading

### Planned
- [ ] Real-time multiplayer study sessions
- [ ] Offline mode / service worker caching
- [ ] Native mobile app (React Native)
- [ ] Advanced analytics and learning insights
- [ ] Writing practice (stroke order recognition)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style. Run `npm run lint` before submitting.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com) — accessible, composable component library
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) — production-ready animation library
- [Radix UI](https://www.radix-ui.com) — unstyled, accessible UI primitives
- [TanStack React Query](https://tanstack.com/query) — powerful async state management
- [DiceBear](https://www.dicebear.com) — open-source avatar library

---

*Built for Techniki Hackathon — start your Japanese learning journey today with ZenMaster.*
