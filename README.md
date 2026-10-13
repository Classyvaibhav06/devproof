# 🛡️ DevProof (formerly GrindSync)
**Elevate Your Grind. Verify Your Progress.**

DevProof is a **"Proof of Progress"** developer gamification and social productivity platform. It eliminates "tutorial hell" and resume puffery by automatically validating and tracking your real-world coding activity—including daily DSA problem-solving on LeetCode, verified GitHub commits, and focused coding sessions—turning your authentic grind into verified XP, streak status, and collaborative opportunities.

---

## ⚡ Core Pillars & Key Features

### 1. 🧩 Automated Daily DSA Verification
- **Daily LeetCode Challenge:** Features a curated or daily challenge from LeetCode.
- **Automated Verification Engine:** Connects to LeetCode's public GraphQL API using your LeetCode handle. Verifies your accepted submissions (`recentAcSubmissionList`) within a 48-hour window without needing private passwords or cookies.
- **Instant XP & Streaks:** Automatically awards daily problem-solving XP and advances your daily problem streak.

### 2. 🐙 GitHub Activity & Contribution Heatmaps
- **Live 52-Week Contribution Calendar:** Renders an interactive, SVG-level contribution heatmap of all public GitHub contributions.
- **Commit Tracking & Streaks:** Analyzes daily push events to calculate active commit streaks and daily commit counts.
- **Language & Tech Breakdown:** Aggregates your GitHub repositories to showcase your top programming languages by percentage.

### 3. ⏱️ Focus Sessions & Timed Challenges
- **Interactive Focus Timers:** In-browser visual circular timers (30 min, 1 hr, 2 hrs, 3 hrs) with difficulty tiers (Easy, Medium, Hard, Elite).
- **Pomodoro & Deep Work Sessions:** Built-in web timer designed to keep developers in flow state while solving challenges or building projects.
- **Milestone Rewards:** Awards XP upon completing focused sessions.

### 4. 🏆 Global Leaderboard & Tiered Ranking
- **Global XP Leaderboard:** Competitive standings ranked by total earned XP and challenge completions.
- **Skill Tiers:**
  - 🔰 **Grinder** (0 – 349 XP)
  - 🥉 **Gold** (350 – 799 XP)
  - 🥈 **Platinum** (800 – 1,999 XP)
  - 💎 **Diamond** (2,000 – 4,999 XP)
  - 👑 **Legend** (5,000+ XP)
- **Timeframe Filtering:** Filter leaderboard by Weekly, Monthly, and All-Time.

### 5. 🪪 Developer Identity & Living Resume
- **Verified Proof of Work:** A public developer profile acting as an undeniable proof-of-work portfolio.
- **Profile Customization:** Custom bio, location, personal website, customizable header banners, and high-resolution avatars.
- **Badges & Achievements:** Showcase milestone badges earned through consistency, streaks, and verified achievements.
- **Social Graph:** Follow/unfollow developers, view followers/following lists, and discover builders.

### 6. 🚀 Project Showcase & Devlog Feed ("Ship in Public")
- **Showcase Special Projects:** Share what you've built—whether it's a website, full-stack app, mobile app, CLI, or open-source tool.
- **Media & Screenshots:** Upload multi-image screenshot galleries, UI mockups, and preview banners securely via Neon S3 object storage.
- **Rich Technical Devlogs:** Write detailed technical write-ups and blogs explaining the architecture, challenges solved, tech stack choices, and live links (Live Demo & GitHub repo).
- **Interactive Community Engagement:**
  - Upvote & react with developer expressions (🚀 *Launched*, 🔥 *Fire*, 💡 *Innovative*, ❤️ *Love*).
  - Threaded discussion comments for technical feedback, bug reports, and brainstorming.
- **Discovery & Tech Tags:** Browse launches filtered by technology (e.g. #Nextjs, #AI, #Rust, #Postgres, #Fullstack).

### 7. ⚔️ Project War Room & Contribution Marketplace
- **Showcase Projects:** List your active projects with GitHub repository links, tech tags, and project goals.
- **Find Contributors:** Match with collaborators based on verified tech stack proficiency and skill level.
- **Verified Contributions:** Track contributor commits directly against project repositories, awarding XP for merged work.

### 8. 💬 Direct Messaging & Real-Time Presence
- **Direct Messaging:** One-on-one developer chat with persistent message history.
- **Online Presence & Heartbeats:** Dynamic online/offline indicators based on active heartbeat pings.
- **Typing Indicators:** Lightweight, ephemeral typing indicator indicators.
- **In-App Notifications:** Real-time audio tones (Web Audio API) and actionable toasts for incoming messages, comments, reactions, and new followers.

---

## 🛠️ Modern Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
│       Next.js 16 (App Router) • React 19 • Tailwind CSS v4   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌───────────────────────────────┐ ┌───────────────────────────┐
│     Neon Serverless Auth      │ │     Neon S3 Storage       │
│  Better Auth (Sessions/OAuth) │ │   Avatars, Banners, Media │
└──────────────┬────────────────┘ └───────────┬───────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│               Neon Serverless PostgreSQL                    │
│   Users • Posts • Reactions • Comments • Messages • Challenges │
└─────────────────────────────────────────────────────────────┘
```

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** & **React 19** | Zero-waterfall server components, streaming SSR, and edge compatibility. |
| **Language** | **TypeScript 5** | Strict end-to-end type safety across schemas, API payloads, and UI. |
| **Styling** | **Tailwind CSS v4** + OKLCH Tokens | Ultra-fast CSS compilation, sleek dark mode by default, and high-contrast tokens. |
| **Icons & UI** | **Tabler Icons**, **Lucide React**, **Base UI** | Clean, accessible primitives and expressive developer iconography. |
| **Database** | **Neon Serverless PostgreSQL** | Instant branching, connection pooling, and autoscaling SQL performance. |
| **Auth** | **Neon Auth (Better Auth)** | Native PostgreSQL session store, email/password, and OAuth (Google / GitHub). |
| **File Storage**| **Neon S3-Compatible Object Store** | Presigned S3 uploads for avatars, banners, and project screenshots; prevents database bloat and HTTP 431 header limits. |
| **Deployment** | **Vercel** | Native serverless hosting with preview environments and sub-second edge routing. |

---

## 📂 Planned Project Layout

```
devproof/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth routes (/login, /register, /complete-profile)
│   │   ├── (dashboard)/          # Authenticated app shell
│   │   │   ├── home/             # Main dashboard feed
│   │   │   ├── showcase/         # Project showcase & devlogs (/showcase, /showcase/new, /showcase/[id])
│   │   │   ├── challenges/       # DSA challenges & coding timer
│   │   │   ├── leaderboard/      # Global rankings
│   │   │   ├── projects/         # Project War Room & marketplace
│   │   │   ├── chat/             # Direct messaging
│   │   │   ├── stats/            # Detailed activity metrics & graphs
│   │   │   ├── users/            # Discover developers
│   │   │   ├── network/          # Following / followers list
│   │   │   └── profile/[id]/     # Public profile & proof-of-work
│   │   ├── api/                  # Route handlers
│   │   │   ├── auth/             # Neon Auth handlers
│   │   │   ├── showcase/         # Showcase posts, reactions & comments
│   │   │   ├── dsa/              # Daily challenge & LeetCode verification
│   │   │   ├── github/           # Contributions & commit stats
│   │   │   ├── upload/           # Presigned S3 upload URLs for screenshots & avatars (Neon Storage)
│   │   │   ├── challenges/       # Timed challenges & completions
│   │   │   └── ...               # Domain endpoints
│   │   ├── globals.css           # Tailwind v4 styles & theme tokens
│   │   └── layout.tsx            # Root layout & providers
│   ├── components/               # Modular UI components
│   │   ├── ui/                   # Buttons, cards, modals, tabs, avatars
│   │   ├── dsa/                  # Challenge cards & verification modal
│   │   ├── github/               # Heatmap graph & commit stream
│   │   ├── chat/                 # Chat panel, conversation list, typing bubble
│   │   └── layout/               # Navbars, sidebar, notifications
│   ├── db/                       # Database layer
│   │   ├── schema.ts             # PostgreSQL table definitions
│   │   └── index.ts              # Neon client instance
│   ├── lib/                      # Utilities & external clients
│   │   ├── auth.ts               # Better Auth / Neon Auth client
│   │   ├── s3.ts                 # Neon S3 storage client
│   │   ├── github.ts             # GitHub GraphQL & REST fetchers
│   │   └── leetcode.ts           # LeetCode verification client
│   └── types/                    # Shared TypeScript interfaces
├── .env.example                  # Environment variable reference
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript compiler options
```

---

## 🔑 Environment Variables (.env.local)

```bash
# ------------------------------------------------------------------------------
# App & Deployment
# ------------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ------------------------------------------------------------------------------
# Neon PostgreSQL Database
# ------------------------------------------------------------------------------
DATABASE_URL=postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require

# ------------------------------------------------------------------------------
# Neon Auth (Better Auth)
# ------------------------------------------------------------------------------
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEON_AUTH_BASE_URL=https://[endpoint].neonauth.[region].aws.neon.tech/neondb/auth

# ------------------------------------------------------------------------------
# Neon S3-Compatible Object Storage (Avatars, Banners, Media)
# ------------------------------------------------------------------------------
NEON_STORAGE_ENDPOINT=https://[branch-id].storage.c-1.[region].aws.neon.tech
NEON_STORAGE_REGION=us-east-2
NEON_STORAGE_BUCKET=uploads
NEON_STORAGE_ACCESS_KEY_ID=your_storage_access_key_id
NEON_STORAGE_SECRET_ACCESS_KEY=your_storage_secret_access_key

# ------------------------------------------------------------------------------
# GitHub Integration (GraphQL Contributions & Commits)
# ------------------------------------------------------------------------------
GITHUB_TOKEN=ghp_your_github_personal_access_token
```

---

## 🚀 Getting Started

### 1. Clone & Navigate
```bash
cd devproof
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env.local
# Fill in your DATABASE_URL, Neon Auth, and GitHub token in .env.local
```

### 4. Push Database Schema
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License
MIT © 2026 DevProof. Engineered for peak developer performance.
