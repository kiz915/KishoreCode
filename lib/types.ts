export type Track = {
  id: string;
  slug: "cpp_language" | "problem_solving";
  name: string;
  description: string | null;
};

export type Module = {
  id: string;
  track_id: string;
  title: string;
  description: string | null;
  order_index: number;
};

export type Lesson = {
  id: string;
  module_id: string;
  title: string;
  order_index: number;
  content: string;
  code_examples: { title: string; code: string; explanation?: string }[];
  summary: string | null;
  key_takeaways: string[];
};

export type Difficulty = "easy" | "medium" | "hard";

export type Problem = {
  id: string;
  lesson_id: string;
  title: string;
  difficulty: Difficulty;
  statement: string;
  constraints: string | null;
  sample_input: string | null;
  sample_output: string | null;
  hints: string[];
  tags: string[];
  pattern_tags: string[];
  created_at: string;
};

export type LessonStatus = "not_started" | "in_progress" | "completed";
export type LessonProgress = {
  id: string;
  lesson_id: string;
  status: LessonStatus;
  completed_at: string | null;
};

export type ProblemStatus = "not_started" | "attempted" | "solved";
export type ProblemProgress = {
  id: string;
  problem_id: string;
  status: ProblemStatus;
  my_solution_code: string;
  notes: string;
  confidence_rating: number | null;
  last_attempted_at: string | null;
  solved_at: string | null;
};

export type TestCase = {
  id: string;
  problem_id: string;
  order_index: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
};

export type Streak = {
  id: string;
  date: string;
  lessons_completed_count: number;
  problems_solved_count: number;
  active: boolean;
};
