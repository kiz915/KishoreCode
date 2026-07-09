"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Save, CheckCircle2, Play, Loader2, XCircle, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveProblemProgress } from "@/lib/queries";
import { runTestCasesBatched } from "@/lib/piston";
import type { ProblemProgress, ProblemStatus, TestCase } from "@/lib/types";

const CPP_STARTER = `#include <bits/stdc++.h>
using namespace std;

int main() {
    // your solution here
    return 0;
}
`;

type CaseResult = { passed: boolean; actual: string; error: string | null };

export function ProblemWorkspace({
  problemId, initialProgress, testCases,
}: { problemId: string; initialProgress: ProblemProgress | null; testCases: TestCase[] }) {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = React.useState(initialProgress?.my_solution_code || CPP_STARTER);
  const [notes, setNotes] = React.useState(initialProgress?.notes || "");
  const [confidence, setConfidence] = React.useState(initialProgress?.confidence_rating ?? 0);
  const [status, setStatus] = React.useState<ProblemStatus>(initialProgress?.status ?? "not_started");
  const [saving, setSaving] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState<string | null>(null);

  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState({ done: 0, total: testCases.length });
  const [results, setResults] = React.useState<Map<string, CaseResult> | null>(null);
  const [compileError, setCompileError] = React.useState<string | null>(null);

  async function save(nextStatus?: ProblemStatus) {
    setSaving(true);
    try {
      const finalStatus = nextStatus ?? status;
      await saveProblemProgress(problemId, {
        my_solution_code: code, notes, confidence_rating: confidence || null, status: finalStatus,
      });
      setStatus(finalStatus);
      setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  }

  async function runTests() {
    setRunning(true);
    setResults(null);
    setCompileError(null);
    setProgress({ done: 0, total: testCases.length });

    const map = await runTestCasesBatched(code, testCases, 5, (done, total) => setProgress({ done, total }));
    setResults(map);
    setRunning(false);

    const errors = [...map.values()].map((r) => r.error).filter((e): e is string => !!e && e !== "Timed out");
    const allFailed = [...map.values()].every((r) => !r.passed);
    if (allFailed && errors.length > 0 && errors.every((e) => e === errors[0])) {
      setCompileError(errors[0]);
    }

    const allPassed = testCases.length > 0 && [...map.values()].every((r) => r.passed);
    await save(allPassed ? "solved" : "attempted");
  }

  const passedCount = results ? [...results.values()].filter((r) => r.passed).length : 0;
  const visibleCases = testCases.filter((t) => !t.is_hidden);
  const hiddenCases = testCases.filter((t) => t.is_hidden);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <div className="overflow-hidden rounded-lg border border-border">
          <Editor
            height="420px"
            defaultLanguage="cpp"
            theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
            value={code}
            onChange={(v) => setCode(v ?? "")}
            options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 12 } }}
          />
        </div>

        {testCases.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={runTests} disabled={running}>
                {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                {running ? `Running ${progress.done}/${progress.total}…` : `Run against ${testCases.length} test cases`}
              </Button>
              {results && !running && (
                <span className={`text-sm font-medium ${passedCount === testCases.length ? "text-solved" : "text-attempted"}`}>
                  {passedCount}/{testCases.length} passed
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Compiled and run via a public C++ (GCC) sandbox — real compilation, not a simulation.
            </p>

            {compileError && (
              <div className="mt-3 rounded-md border border-red-500/30 bg-red-500/5 p-3">
                <p className="mb-1 text-sm font-semibold text-red-500">Compile error</p>
                <pre className="whitespace-pre-wrap text-xs text-red-500/90">{compileError}</pre>
              </div>
            )}

            {results && !compileError && (
              <div className="mt-3 space-y-4">
                {visibleCases.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-semibold">Visible test cases</p>
                    <div className="space-y-2">
                      {visibleCases.map((tc, i) => {
                        const r = results.get(tc.id);
                        return (
                          <div key={tc.id} className="rounded-md border border-border p-3 text-sm">
                            <div className="flex items-center gap-2">
                              {r?.passed ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-solved" />
                              ) : (
                                <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                              )}
                              <span className="font-medium">Case {i + 1}</span>
                            </div>
                            <div className="mt-2 grid gap-2 pl-6 text-xs sm:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground">Input</p>
                                <pre className="mt-0.5 rounded bg-muted p-1.5">{tc.input}</pre>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Expected</p>
                                <pre className="mt-0.5 rounded bg-muted p-1.5">{tc.expected_output}</pre>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Your output</p>
                                <pre className={`mt-0.5 rounded p-1.5 ${r?.passed ? "bg-muted" : "bg-red-500/10"}`}>
                                  {r?.error ? r.error : r?.actual || "(empty)"}
                                </pre>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {hiddenCases.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-semibold">Hidden test cases</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hiddenCases.map((tc, i) => {
                        const r = results.get(tc.id);
                        return (
                          <div
                            key={tc.id}
                            title={r?.passed ? "Passed" : r ? "Failed" : "Not run"}
                            className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium ${
                              r?.passed ? "bg-solved/15 text-solved" : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Approach, complexity, what you'd do differently next time..."
            className="w-full rounded-md border border-border bg-surface p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Confidence</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setConfidence(n)}
                className={`h-8 w-8 rounded-md border text-sm font-medium transition-colors ${
                  confidence >= n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={() => save("attempted")} disabled={saving} variant="outline">
            <Save className="h-4 w-4" /> Save attempt
          </Button>
          <Button onClick={() => save("solved")} disabled={saving}>
            <CheckCircle2 className="h-4 w-4" /> Mark solved
          </Button>
        </div>
        {savedAt && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {status === "solved" ? <CheckCircle2 className="h-3.5 w-3.5 text-solved" /> : <CircleDashed className="h-3.5 w-3.5" />}
            Saved at {savedAt} · status: {status.replace("_", " ")}
          </p>
        )}
      </div>
    </div>
  );
}
