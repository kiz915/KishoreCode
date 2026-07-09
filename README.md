# KishoreCode

Personal learning platform for two parallel tracks:

1. **C++ Language** — scratch-to-expert C++ mechanics.
2. **Problem Solving & Logic Building** — pattern recognition, independent of language.

Single-user, no auth. Next.js 15 (App Router) + TypeScript + Tailwind + Shadcn-style
components + Monaco editor, backed by Supabase (Postgres).

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at https://supabase.com/dashboard.
2. Open the **SQL Editor** and run the contents of `supabase/schema.sql`.
3. Copy `.env.local.example` to `.env.local` and fill in your project URL + anon key
   (Project Settings → API).

RLS is **enabled with permissive "allow all" policies** (see the note at the top of
`supabase/schema.sql`). That's intentional for a private single-user tool — there's no
Supabase Auth here, so the anon key is the only real gate. Don't commit `.env.local`
or push the anon key to a public repo.

## 3. Seed the database

```bash
npm run seed
```

This inserts:
- Both tracks, all 25 modules, all ~140 lessons (title/order/summary — full markdown
  content is stubbed, fill in per lesson as you go).
- A representative first batch of ~110 problems spread across both tracks, weighted
  toward Track 2 (patterns).

To reach the target of 500+ problems, add more entries to `data/problems-seed.ts`
following the existing shape (each keyed to a `trackSlug` + `moduleTitle` +
`lessonTitle`) and re-run `npm run seed`. To re-seed from scratch, run the `truncate`
statement at the bottom of `supabase/seed.ts` in the SQL editor first.

## 4. Run the app

```bash
npm run dev
```

Visit http://localhost:3000.

## Folder structure

```
app/
  page.tsx                                   Track selector (home)
  track/[trackId]/page.tsx                   Module list for a track
  track/[trackId]/module/[moduleId]/page.tsx Lesson list for a module
  track/.../lesson/[lessonId]/page.tsx       Lesson content + practice problems
  problems/page.tsx                          Filterable problem list
  problems/[problemId]/page.tsx              Problem detail + Monaco workspace
  dashboard/page.tsx                         Progress, streak, pattern-weakness heat map
components/
  ui/           Button, Card, Badge, Progress — Shadcn-style primitives
  theme/        next-themes provider + toggle
  layout/       Navbar
  lessons/      Markdown renderer, mark-complete button
  problems/     Filter bar, Monaco workspace
lib/
  supabase.ts   Client setup
  queries.ts    All data-fetching / mutation functions
  types.ts      Shared row types
data/
  curriculum.ts       Full module + lesson list for both tracks
  problems-seed.ts     Representative problem batch (extension point for 500+)
supabase/
  schema.sql    Full CREATE TABLE + index + RLS policy SQL
  seed.ts       Seed script (npm run seed)
```

## Theming

Light mode is the default (friendlier first-open experience for a C++ course).
Toggle via the sun/moon icon in the navbar; the choice persists via `next-themes`
(localStorage) and there's no flash-of-wrong-theme on load. Monaco's editor theme
switches between `vs` and `vs-dark` in sync with the app theme.

## Explicitly out of scope (v1)

Login/auth, admin panel, discussion/comments, contests, leaderboards, multi-language
support, in-browser code execution.
