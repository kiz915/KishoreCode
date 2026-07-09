"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const TRACKS = [
  { value: "", label: "All tracks" },
  { value: "cpp_language", label: "C++ Language" },
  { value: "problem_solving", label: "Problem Solving" },
];
const DIFFICULTIES = ["", "easy", "medium", "hard"];
const STATUSES = ["", "not_started", "attempted", "solved"];

function Select({
  value, options, onChange, labelFor,
}: { value: string; options: string[]; onChange: (v: string) => void; labelFor?: (v: string) => string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-border bg-surface px-3 text-sm capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>{labelFor ? labelFor(o) : (o || "All")}</option>
      ))}
    </select>
  );
}

export function ProblemFilters({ patternTags }: { patternTags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`/problems?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={searchParams.get("track") ?? ""}
        options={TRACKS.map((t) => t.value)}
        labelFor={(v) => TRACKS.find((t) => t.value === v)?.label ?? "All"}
        onChange={(v) => update("track", v)}
      />
      <Select value={searchParams.get("difficulty") ?? ""} options={DIFFICULTIES} onChange={(v) => update("difficulty", v)} />
      <Select value={searchParams.get("status") ?? ""} options={STATUSES} onChange={(v) => update("status", v)} />
      <select
        value={searchParams.get("pattern") ?? ""}
        onChange={(e) => update("pattern", e.target.value)}
        className={cn("h-9 rounded-md border border-border bg-surface px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary max-w-[180px]")}
      >
        <option value="">All patterns</option>
        {patternTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
      </select>
    </div>
  );
}
