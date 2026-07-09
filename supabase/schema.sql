-- CodeForge schema
-- Single-user, private-use app. RLS is enabled with permissive "allow all"
-- policies rather than disabled outright, so the tables are still governed
-- by policy (easy to tighten later) instead of wide open with no RLS at all.
-- Tradeoff: because there's no Supabase Auth, the anon key itself is the
-- only gate. Fine for local/private use — do NOT expose this anon key in a
-- public repo or public-facing deployment.

create extension if not exists "pgcrypto";

-- 1. tracks -----------------------------------------------------------
create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('cpp_language', 'problem_solving')),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

-- 2. modules ------------------------------------------------------------
create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  title text not null,
  description text,
  order_index int not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_modules_track_id on modules(track_id);

-- 3. lessons ------------------------------------------------------------
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  title text not null,
  order_index int not null,
  content text default '',              -- markdown
  code_examples jsonb default '[]'::jsonb, -- [{ "title": "", "code": "", "explanation": "" }]
  summary text,
  key_takeaways text[] default '{}',
  created_at timestamptz not null default now()
);
create index if not exists idx_lessons_module_id on lessons(module_id);

-- 4. problems -------------------------------------------------------------
create table if not exists problems (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  title text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  statement text not null,
  constraints text,
  sample_input text,
  sample_output text,
  hints text[] default '{}',
  tags text[] default '{}',
  pattern_tags text[] default '{}',
  created_at timestamptz not null default now()
);
create index if not exists idx_problems_lesson_id on problems(lesson_id);
create index if not exists idx_problems_difficulty on problems(difficulty);
create index if not exists idx_problems_pattern_tags on problems using gin(pattern_tags);
create index if not exists idx_problems_tags on problems using gin(tags);

-- 5. lesson_progress ------------------------------------------------------
create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade unique,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists idx_lesson_progress_lesson_id on lesson_progress(lesson_id);
create index if not exists idx_lesson_progress_status on lesson_progress(status);

-- 6. problem_progress -------------------------------------------------
create table if not exists problem_progress (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references problems(id) on delete cascade unique,
  status text not null default 'not_started'
    check (status in ('not_started', 'attempted', 'solved')),
  my_solution_code text default '',
  notes text default '',
  confidence_rating int check (confidence_rating between 1 and 5),
  last_attempted_at timestamptz,
  solved_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists idx_problem_progress_problem_id on problem_progress(problem_id);
create index if not exists idx_problem_progress_status on problem_progress(status);

-- 7. streaks --------------------------------------------------------------
create table if not exists streaks (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  lessons_completed_count int not null default 0,
  problems_solved_count int not null default 0,
  active boolean not null default true
);
create index if not exists idx_streaks_date on streaks(date);

-- 8. test_cases -----------------------------------------------------------
-- Structured test cases per problem, separate from the single sample_input /
-- sample_output shown on the problem statement. is_hidden = true means the
-- input/expected_output are never rendered in the UI — only pass/fail.
create table if not exists test_cases (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid not null references problems(id) on delete cascade,
  order_index int not null,
  input text not null default '',
  expected_output text not null,
  is_hidden boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_test_cases_problem_id on test_cases(problem_id);

-- ---------------------------------------------------------------------
-- RLS: enabled with permissive "allow all" policies (single-user, no auth)
-- ---------------------------------------------------------------------
alter table tracks enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table problems enable row level security;
alter table lesson_progress enable row level security;
alter table problem_progress enable row level security;
alter table streaks enable row level security;
alter table test_cases enable row level security;

create policy "allow all - tracks" on tracks for all using (true) with check (true);
create policy "allow all - modules" on modules for all using (true) with check (true);
create policy "allow all - lessons" on lessons for all using (true) with check (true);
create policy "allow all - problems" on problems for all using (true) with check (true);
create policy "allow all - lesson_progress" on lesson_progress for all using (true) with check (true);
create policy "allow all - problem_progress" on problem_progress for all using (true) with check (true);
create policy "allow all - streaks" on streaks for all using (true) with check (true);
create policy "allow all - test_cases" on test_cases for all using (true) with check (true);
