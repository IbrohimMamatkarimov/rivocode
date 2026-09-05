# RivoCode

**Learn to code. Build real skills.**

A frontend skeleton for a modern programming education platform, built with Next.js, TypeScript, and Tailwind CSS.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- TypeScript
- Tailwind CSS v4
- [Lucide React](https://lucide.dev) icons
- [Supabase](https://supabase.com) Auth, profiles, settings, and learning-progress schema

No other runtime dependencies were added — no chart, animation, or state-management libraries.

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

## Build

```bash
npm run build
npm run start
```

`npm run build` runs a production build and a full TypeScript check. `npm run lint` runs ESLint.

## Project structure

```
src/
  app/                  Routes (App Router)
    dashboard/
    learn/
    courses/            course discovery
    courses/[id]/       course detail (sections + lessons)
    lessons/[id]/       lesson detail (content + code editor)
    practice/
    projects/
    progress/
    profile/
    settings/
  components/
    layout/             Sidebar, MobileNav, Header, AppShell
    dashboard/          StatCard, ContinueLearning, LearningPath
    courses/             CourseCard, CourseProgress
    lessons/             LessonContent, LessonSidebar, CodeEditor
    practice/            ChallengeCard
    projects/            ProjectCard
    progress/            ProgressChart, SkillProgress
    theme/               ThemeProvider, ThemeToggle (light/dark mode)
    ui/                  Button, Card, Badge, ProgressBar, EmptyState, Skeleton
  lib/
    mock-data.ts        All mock content — swap this for real API calls later
    types.ts            Shared domain types
    icon-map.ts         Maps icon name strings (from mock data) to Lucide components
    utils.ts            Small `cn()` classname helper
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Stats, "continue learning", learning path |
| `/learn` | Full learning path + recommended courses |
| `/courses` | Course discovery with search + category filters |
| `/courses/[id]` | Course outline: sections and lessons |
| `/lessons/[id]` | Lesson content, code editor, prev/next navigation |
| `/practice` | Coding challenges with track + difficulty filters |
| `/projects` | Project cards with progress |
| `/progress` | Streak, weekly activity, skills, achievements |
| `/profile` | Avatar, stats, achievements |
| `/settings` | Account, appearance (theme), notifications, learning preferences |

## Notes and limitations

The course catalog, dashboard statistics, and challenges are still static starter content in `src/lib/mock-data.ts`. Authentication and account settings now use Supabase, with a secure database schema ready for profiles and lesson progress.

For the complete first-time setup—creating the GitHub repository, Supabase project and tables, Google auth, and Vercel deployment—follow [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

Current frontend limitations:

- Dashboard statistics and course catalog are static until they are wired to `lesson_progress` queries.
- The code editor (`components/lessons/CodeEditor.tsx`) is a visual skeleton: "Run" simulates output after a short delay rather than executing real code.

To connect a real backend, the natural next step is to replace the functions in `mock-data.ts` (e.g. `getCourseBySlug`, `getAllLessons`) with data-fetching calls, and turn the relevant pages into async Server Components or add client-side fetching.

Light and dark mode are both fully styled and can be toggled from the header or the Settings page; the choice is remembered in `localStorage`.
