import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { getTrackBySlug, getModules, getLessons, getLessonProgressMap } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  const track = await getTrackBySlug(trackId);
  if (!track) notFound();

  const modules = await getModules(track.id);
  const lessonsByModule = await Promise.all(modules.map((m) => getLessons(m.id)));
  const allLessonIds = lessonsByModule.flat().map((l) => l.id);
  const progressMap = await getLessonProgressMap(allLessonIds);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Track</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">{track.name}</h1>
        <p className="mt-2 text-muted-foreground">{track.description}</p>
      </div>

      <div className="space-y-3">
        {modules.map((mod, i) => {
          const lessons = lessonsByModule[i];
          const completed = lessons.filter((l) => progressMap[l.id] === "completed").length;
          const pct = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;

          return (
            <Link key={mod.id} href={`/track/${track.slug}/module/${mod.id}`}>
              <Card className="hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-5">
                  {pct === 100 ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-solved" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold">{mod.title}</h3>
                    <p className="truncate text-sm text-muted-foreground">{mod.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={pct} className="max-w-[160px]" />
                      <span className="text-xs text-muted-foreground">{completed}/{lessons.length} lessons</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
