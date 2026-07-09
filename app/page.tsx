import Link from "next/link";
import { Code2, Brain, ArrowRight } from "lucide-react";
import { getTracks } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";

const TRACK_META: Record<string, { icon: typeof Code2; accent: string }> = {
  cpp_language: { icon: Code2, accent: "text-primary" },
  problem_solving: { icon: Brain, accent: "text-accent" },
};

export default async function HomePage() {
  const tracks = await getTracks();

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">KishoreCode</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Two tracks, one goal: fluent C++ and fast pattern recognition. Pick a track to continue.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {tracks.map((track) => {
          const meta = TRACK_META[track.slug] ?? { icon: Code2, accent: "text-primary" };
          const Icon = meta.icon;
          return (
            <Link key={track.id} href={`/track/${track.slug}`}>
              <Card className="group h-full hover:border-primary/50">
                <CardContent className="flex h-full flex-col p-6">
                  <Icon className={`h-8 w-8 ${meta.accent}`} strokeWidth={1.75} />
                  <h2 className="font-display mt-4 text-xl font-semibold">{track.name}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{track.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Enter track <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {tracks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No tracks found. Run <code className="rounded bg-muted px-1.5 py-0.5">npm run seed</code> after
            setting up your Supabase project.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
