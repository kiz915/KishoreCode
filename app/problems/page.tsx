import Link from "next/link";
import { getProblems } from "@/lib/queries";
import { ProblemFilters } from "@/components/problems/problem-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProblemStatus } from "@/lib/types";

const PATTERN_TAGS = [
  "two-pointer", "sliding-window", "prefix-sum", "difference-array", "binary-search",
  "binary-search-on-answer", "backtracking", "greedy", "divide-and-conquer",
  "dynamic-programming", "0-1-knapsack", "unbounded-knapsack", "lcs", "interval-dp",
  "digit-dp", "bfs", "dfs", "topological-sort", "union-find", "dijkstra",
  "tree-traversal", "tree-recursion", "lca", "binary-lifting", "bit-manipulation",
  "xor", "bitmask-dp", "number-theory", "modular-arithmetic", "sieve", "combinatorics", "hashmap",
];

export default async function ProblemsPage({
  searchParams,
}: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const problems = await getProblems({
    trackSlug: sp.track || undefined,
    difficulty: sp.difficulty || undefined,
    patternTag: sp.pattern || undefined,
    status: (sp.status as ProblemStatus) || undefined,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Problems</h1>
        <p className="mt-2 text-muted-foreground">{problems.length} problem{problems.length === 1 ? "" : "s"} matching your filters.</p>
      </div>

      <div className="mb-6">
        <ProblemFilters patternTags={PATTERN_TAGS} />
      </div>

      <div className="space-y-2">
        {problems.map((p: any) => {
          const status: ProblemStatus = p.problem_progress?.[0]?.status ?? "not_started";
          return (
            <Link key={p.id} href={`/problems/${p.id}`}>
              <Card className="hover:border-primary/50">
                <CardContent className="flex flex-wrap items-center gap-3 p-4">
                  <span className="flex-1 min-w-[180px] font-medium">{p.title}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.pattern_tags?.slice(0, 3).map((t: string) => (
                      <Badge key={t} variant="default">{t}</Badge>
                    ))}
                  </div>
                  <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                  <Badge variant={status}>{status.replace("_", " ")}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {problems.length === 0 && (
        <Card><CardContent className="p-8 text-center text-muted-foreground">No problems match these filters.</CardContent></Card>
      )}
    </div>
  );
}
