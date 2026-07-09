import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, ChevronRight, PlayCircle } from "lucide-react";
import { getTrackBySlug, getModule, getLessons, getLessonProgressMap } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";

export default async function ModulePage({
  params,
}: { params: Promise<{ trackId: string; moduleId: string }> }) {
  const { trackId, moduleId } = await params;
  const track = await getTrackBySlug(trackId);
  const mod = await getModule(moduleId);
  if (!track || !mod) notFound();

  const lessons = await getLessons(mod.id);
  const progressMap = await getLessonProgressMap(lessons.map((l) => l.id));

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          <Link href={`/track/${track.slug}`} className="hover:text-foreground">{track.name}</Link> / Module
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight">{mod.title}</h1>
        <p className="mt-2 text-muted-foreground">{mod.description}</p>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson) => {
          const status = progressMap[lesson.id] ?? "not_started";
          const Icon = status === "completed" ? CheckCircle2 : status === "in_progress" ? PlayCircle : Circle;
          const iconClass = status === "completed" ? "text-solved" : status === "in_progress" ? "text-progress" : "text-muted-foreground";

          return (
            <Link key={lesson.id} href={`/track/${track.slug}/module/${mod.id}/lesson/${lesson.id}`}>
              <Card className="hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="truncate text-sm text-muted-foreground">{lesson.summary}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
