// Thin client for the public Piston execution API (https://github.com/engineer-man/piston).
// No API key required. Used to actually compile + run the user's C++ submission
// against each test case's stdin and compare stdout to the expected output.

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";
const LANGUAGE = "cpp";
const VERSION = "10.2.0"; // GCC via Piston's cpp runtime

export type PistonResult = {
  stdout: string;
  stderr: string;
  compileError: string | null;
  timedOut: boolean;
};

export async function runCpp(code: string, stdin: string, timeoutMs = 8000): Promise<PistonResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: LANGUAGE,
        version: VERSION,
        files: [{ name: "main.cpp", content: code }],
        stdin,
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return { stdout: "", stderr: `Piston API error (${res.status})`, compileError: null, timedOut: false };
    }

    const data = await res.json();

    if (data.compile && data.compile.code !== 0) {
      return { stdout: "", stderr: "", compileError: data.compile.stderr || data.compile.output || "Compile error", timedOut: false };
    }

    return {
      stdout: data.run?.stdout ?? "",
      stderr: data.run?.stderr ?? "",
      compileError: null,
      timedOut: false,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return { stdout: "", stderr: "", compileError: null, timedOut: true };
    }
    return { stdout: "", stderr: String(err), compileError: null, timedOut: false };
  } finally {
    clearTimeout(timeout);
  }
}

export function normalizeOutput(s: string): string {
  return s.replace(/\r\n/g, "\n").trim();
}

// Runs a batch of test cases with limited concurrency so we don't hammer the
// public Piston instance (it's shared infrastructure, not billed per-project).
export async function runTestCasesBatched<T extends { id: string; input: string; expected_output: string }>(
  code: string,
  cases: T[],
  concurrency: number,
  onProgress: (done: number, total: number) => void
): Promise<Map<string, { passed: boolean; actual: string; error: string | null }>> {
  const results = new Map<string, { passed: boolean; actual: string; error: string | null }>();
  let cursor = 0;
  let done = 0;

  async function worker() {
    while (cursor < cases.length) {
      const idx = cursor++;
      const tc = cases[idx];
      const result = await runCpp(code, tc.input);
      const error = result.compileError ?? (result.timedOut ? "Timed out" : result.stderr || null);
      const actual = normalizeOutput(result.stdout);
      const passed = !error && actual === normalizeOutput(tc.expected_output);
      results.set(tc.id, { passed, actual, error });
      done++;
      onProgress(done, cases.length);
      // if it's a compile error, it'll be identical for every case — stop early
      if (result.compileError) {
        cursor = cases.length;
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}
