import { supabase } from "./supabase";
import type {
  Track, Module, Lesson, Problem, LessonProgress, ProblemProgress, ProblemStatus, LessonStatus,
} from "./types";

export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase.from("tracks").select("*").order("slug");
  if (error) throw error;
  return data;
}

export async function getTrackBySlug(slug: string): Promise<Track | null> {
  const { data, error } = await supabase.from("tracks").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getModules(trackId: string): Promise<Module[]> {
  const { data, error } = await supabase
    .from("modules").select("*").eq("track_id", trackId).order("order_index");
  if (error) throw error;
  return data;
}

export async function getModule(moduleId: string): Promise<Module | null> {
  const { data, error } = await supabase.from("modules").select("*").eq("id", moduleId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getLessons(moduleId: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons").select("*").eq("module_id", moduleId).order("order_index");
  if (error) throw error;
  return data;
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  const { data, error } = await supabase.from("lessons").select("*").eq("id", lessonId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getLessonProgressMap(lessonIds: string[]): Promise<Record<string, LessonStatus>> {
  if (lessonIds.length === 0) return {};
  const { data, error } = await supabase
    .from("lesson_progress").select("lesson_id, status").in("lesson_id", lessonIds);
  if (error) throw error;
  const map: Record<string, LessonStatus> = {};
  for (const row of data) map[row.lesson_id] = row.status as LessonStatus;
  return map;
}

export async function setLessonStatus(lessonId: string, status: LessonStatus) {
  const { error } = await supabase
    .from("lesson_progress")
    .update({ status, completed_at: status === "completed" ? new Date().toISOString() : null, updated_at: new Date().toISOString() })
    .eq("lesson_id", lessonId);
  if (error) throw error;
}

export async function getProblems(filters: {
  trackSlug?: string; moduleId?: string; lessonId?: string; difficulty?: string;
  patternTag?: string; status?: ProblemStatus;
}): Promise<Problem[]> {
  let query = supabase
    .from("problems")
    .select("*, lessons!inner(module_id, modules!inner(track_id, tracks!inner(slug))), problem_progress(status)");

  if (filters.lessonId) query = query.eq("lesson_id", filters.lessonId);
  if (filters.moduleId) query = query.eq("lessons.module_id", filters.moduleId);
  if (filters.trackSlug) query = query.eq("lessons.modules.tracks.slug", filters.trackSlug);
  if (filters.difficulty) query = query.eq("difficulty", filters.difficulty);
  if (filters.patternTag) query = query.contains("pattern_tags", [filters.patternTag]);
  if (filters.status) query = query.eq("problem_progress.status", filters.status);

  const { data, error } = await query.order("created_at");
  if (error) throw error;
  return data as unknown as Problem[];
}

export async function getProblem(problemId: string): Promise<Problem | null> {
  const { data, error } = await supabase.from("problems").select("*").eq("id", problemId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getTestCases(problemId: string): Promise<import("./types").TestCase[]> {
  const { data, error } = await supabase
    .from("test_cases").select("*").eq("problem_id", problemId).order("order_index");
  if (error) throw error;
  return data;
}

export async function getProblemProgressMap(problemIds: string[]): Promise<Record<string, ProblemProgress>> {
  if (problemIds.length === 0) return {};
  const { data, error } = await supabase
    .from("problem_progress").select("*").in("problem_id", problemIds);
  if (error) throw error;
  const map: Record<string, ProblemProgress> = {};
  for (const row of data) map[row.problem_id] = row as ProblemProgress;
  return map;
}

export async function getProblemProgress(problemId: string): Promise<ProblemProgress | null> {
  const { data, error } = await supabase
    .from("problem_progress").select("*").eq("problem_id", problemId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveProblemProgress(problemId: string, patch: {
  status?: ProblemStatus; my_solution_code?: string; notes?: string; confidence_rating?: number | null;
}) {
  const now = new Date().toISOString();
  const update: Record<string, unknown> = { ...patch, updated_at: now };
  if (patch.status === "attempted") update.last_attempted_at = now;
  if (patch.status === "solved") { update.last_attempted_at = now; update.solved_at = now; }
  const { error } = await supabase.from("problem_progress").update(update).eq("problem_id", problemId);
  if (error) throw error;
}

// ---- Dashboard aggregates ----
export async function getDashboardData() {
  const [{ data: tracks }, { data: modules }, { data: lessons }, { data: problems },
    { data: lessonProg }, { data: problemProg }, { data: streaks }] = await Promise.all([
    supabase.from("tracks").select("*"),
    supabase.from("modules").select("*"),
    supabase.from("lessons").select("id, module_id, title"),
    supabase.from("problems").select("id, lesson_id, difficulty, pattern_tags, tags"),
    supabase.from("lesson_progress").select("lesson_id, status"),
    supabase.from("problem_progress").select("problem_id, status"),
    supabase.from("streaks").select("*").order("date", { ascending: false }).limit(60),
  ]);

  return {
    tracks: tracks ?? [],
    modules: modules ?? [],
    lessons: lessons ?? [],
    problems: problems ?? [],
    lessonProg: lessonProg ?? [],
    problemProg: problemProg ?? [],
    streaks: streaks ?? [],
  };
}
