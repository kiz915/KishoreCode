import { notFound } from "next/navigation";
import { getProblem, getProblemProgress, getTestCases } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProblemWorkspace } from "@/components/problems/problem-workspace";

export default async function ProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const problem = await getProblem(problemId);
  if (!problem) notFound();

  const [progress, testCases] = await Promise.all([
    getProblemProgress(problem.id),
    getTestCases(problem.id),
  ]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{problem.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
            {problem.pattern_tags.map((t) => <Badge key={t}>{t}</Badge>)}
            {testCases.length > 0 && (
              <span className="ml-1 text-xs text-muted-foreground">
                {testCases.filter((t) => !t.is_hidden).length} visible · {testCases.filter((t) => t.is_hidden).length} hidden test case{testCases.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="space-y-4 p-6">
          <p className="leading-7">{problem.statement}</p>
          {problem.constraints && (
            <div>
              <p className="text-sm font-semibold">Constraints</p>
              <p className="text-sm text-muted-foreground">{problem.constraints}</p>
            </div>
          )}
          {(problem.sample_input || problem.sample_output) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {problem.sample_input && (
                <div>
                  <p className="text-sm font-semibold">Sample input</p>
                  <pre className="mt-1 rounded-md bg-muted p-3 text-sm">{problem.sample_input}</pre>
                </div>
              )}
              {problem.sample_output && (
                <div>
                  <p className="text-sm font-semibold">Sample output</p>
                  <pre className="mt-1 rounded-md bg-muted p-3 text-sm">{problem.sample_output}</pre>
                </div>
              )}
            </div>
          )}
          {problem.hints.length > 0 && (
            <details className="rounded-md bg-primary/5 p-3">
              <summary className="cursor-pointer text-sm font-semibold">Hints</summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                {problem.hints.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </details>
          )}
        </CardContent>
      </Card>

      <ProblemWorkspace problemId={problem.id} initialProgress={progress} testCases={testCases} />
    </div>
  );
}
