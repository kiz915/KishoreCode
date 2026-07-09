import { Flame, TrendingDown, Target } from "lucide-react";
import { getDashboardData } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function DashboardPage() {
  const { tracks, modules, lessons, problems, lessonProg, problemProg, streaks } = await getDashboardData();

  const lessonStatusById = new Map(lessonProg.map((r: any) => [r.lesson_id, r.status]));
  const problemStatusById = new Map(problemProg.map((r: any) => [r.problem_id, r.status]));

  // per-track lesson completion
  const trackStats = tracks.map((t: any) => {
    const trackModuleIds = new Set(modules.filter((m: any) => m.track_id === t.id).map((m: any) => m.id));
    const trackLessons = lessons.filter((l: any) => trackModuleIds.has(l.module_id));
    const done = trackLessons.filter((l: any) => lessonStatusById.get(l.id) === "completed").length;
    return { track: t, total: trackLessons.length, done, pct: trackLessons.length ? Math.round((done / trackLessons.length) * 100) : 0 };
  });

  // difficulty breakdown
  const byDifficulty: Record<string, { solved: number; total: number }> = { easy: { solved: 0, total: 0 }, medium: { solved: 0, total: 0 }, hard: { solved: 0, total: 0 } };
  for (const p of problems as any[]) {
    byDifficulty[p.difficulty].total++;
    if (problemStatusById.get(p.id) === "solved") byDifficulty[p.difficulty].solved++;
  }

  // pattern_tag breakdown (weak-pattern surfacing)
  const patternStats = new Map<string, { solved: number; total: number }>();
  for (const p of problems as any[]) {
    for (const tag of p.pattern_tags ?? []) {
      const cur = patternStats.get(tag) ?? { solved: 0, total: 0 };
      cur.total++;
      if (problemStatusById.get(p.id) === "solved") cur.solved++;
      patternStats.set(tag, cur);
    }
  }
  const patternList = [...patternStats.entries()]
    .map(([tag, v]) => ({ tag, ...v, pct: v.total ? v.solved / v.total : 0 }))
    .sort((a, b) => a.pct - b.pct || b.total - a.total);
  const weakestPattern = patternList.find((p) => p.total >= 2) ?? patternList[0];

  // weakest module (by lesson completion %)
  const moduleStats = modules.map((m: any) => {
    const modLessons = lessons.filter((l: any) => l.module_id === m.id);
    const done = modLessons.filter((l: any) => lessonStatusById.get(l.id) === "completed").length;
    return { module: m, total: modLessons.length, done, pct: modLessons.length ? done / modLessons.length : 1 };
  }).filter((m) => m.total > 0);
  const weakestModule = [...moduleStats].sort((a, b) => a.pct - b.pct)[0];

  const totalSolved = problems.filter((p: any) => problemStatusById.get(p.id) === "solved").length;
  const currentStreak = computeStreak(streaks as any[]);

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Flame className="h-7 w-7 text-attempted" />
            <div>
              <p className="text-2xl font-bold font-display">{currentStreak}</p>
              <p className="text-sm text-muted-foreground">day streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Target className="h-7 w-7 text-solved" />
            <div>
              <p className="text-2xl font-bold font-display">{totalSolved}</p>
              <p className="text-sm text-muted-foreground">problems solved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <TrendingDown className="h-7 w-7 text-red-500" />
            <div>
              <p className="truncate text-lg font-semibold font-display">{weakestPattern?.tag ?? "—"}</p>
              <p className="text-sm text-muted-foreground">weakest pattern</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {trackStats.map(({ track, done, total, pct }: any) => (
          <Card key={track.id}>
            <CardHeader>
              <CardTitle>{track.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Progress value={pct} className="flex-1" />
                <span className="text-sm text-muted-foreground shrink-0">{done}/{total} lessons</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Problems solved by difficulty</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(["easy", "medium", "hard"] as const).map((d) => {
            const s = byDifficulty[d];
            const pct = s.total ? Math.round((s.solved / s.total) * 100) : 0;
            return (
              <div key={d}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize">{d}</span>
                  <span className="text-muted-foreground">{s.solved}/{s.total}</span>
                </div>
                <Progress value={pct} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pattern mastery — the forge heat map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patternList.length === 0 && <p className="text-sm text-muted-foreground">Solve some pattern problems to see this fill in.</p>}
          {patternList.map((p) => (
            <div key={p.tag}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{p.tag}</span>
                <span className="text-muted-foreground">{p.solved}/{p.total} solved</span>
              </div>
              <Progress value={p.pct * 100} heat />
            </div>
          ))}
        </CardContent>
      </Card>

      {weakestModule && (
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Weakest module</p>
            <p className="font-display text-lg font-semibold">{weakestModule.module.title}</p>
            <p className="text-sm text-muted-foreground">{weakestModule.done}/{weakestModule.total} lessons completed</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function computeStreak(streaks: { date: string; active: boolean }[]): number {
  const sorted = [...streaks].sort((a, b) => (a.date < b.date ? 1 : -1));
  let count = 0;
  const today = new Date();
  for (let i = 0; i < sorted.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    const expectedStr = expected.toISOString().slice(0, 10);
    if (sorted[i]?.date === expectedStr && sorted[i]?.active) count++;
    else break;
  }
  return count;
}
