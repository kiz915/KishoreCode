import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrackBySlug, getModule, getLesson, getLessonProgressMap, getProblems } from "@/lib/queries";
import { LessonMarkdown } from "@/components/lessons/lesson-markdown";
import { MarkCompleteButton } from "@/components/lessons/mark-complete-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LessonPage({
  params,
}: { params: Promise<{ trackId: string; moduleId: string; lessonId: string }> }) {
  const { trackId, moduleId, lessonId } = await params;
  const [track, mod, lesson] = await Promise.all([
    getTrackBySlug(trackId), getModule(moduleId), getLesson(lessonId),
  ]);
  if (!track || !mod || !lesson) notFound();

  const progressMap = await getLessonProgressMap([lesson.id]);
  const problems = await getProblems({ lessonId: lesson.id });

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted-foreground">
        <Link href={`/track/${track.slug}`} className="hover:text-foreground">{track.name}</Link>
        {" / "}
        <Link href={`/track/${track.slug}/module/${mod.id}`} className="hover:text-foreground">{mod.title}</Link>
      </p>

      <div className="mt-2 flex items-start justify-between gap-4">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
        <MarkCompleteButton lessonId={lesson.id} initialStatus={progressMap[lesson.id] ?? "not_started"} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-6 sm:p-8">
          <LessonMarkdown content={lesson.content} />

          {lesson.code_examples.length > 0 && (
            <div className="mt-6 space-y-4">
              {lesson.code_examples.map((ex, i) => (
                <div key={i}>
                  <p className="mb-1 text-sm font-medium">{ex.title}</p>
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>{ex.code}</code></pre>
                  {ex.explanation && <p className="mt-1 text-sm text-muted-foreground">{ex.explanation}</p>}
                </div>
              ))}
            </div>
          )}

          {lesson.key_takeaways.length > 0 && (
            <div className="mt-6 rounded-lg bg-primary/5 p-4">
              <p className="mb-2 text-sm font-semibold">Key takeaways</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/90">
                {lesson.key_takeaways.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {problems.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display mb-3 text-lg font-semibold">Practice problems</h2>
          <div className="space-y-2">
            {problems.map((p) => (
              <Link key={p.id} href={`/problems/${p.id}`}>
                <Card className="hover:border-primary/50">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <span className="font-medium">{p.title}</span>
                    <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
