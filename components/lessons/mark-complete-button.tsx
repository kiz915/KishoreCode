"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setLessonStatus } from "@/lib/queries";
import type { LessonStatus } from "@/lib/types";

export function MarkCompleteButton({
  lessonId, initialStatus,
}: { lessonId: string; initialStatus: LessonStatus }) {
  const [status, setStatus] = React.useState<LessonStatus>(initialStatus);
  const [saving, setSaving] = React.useState(false);
  const router = useRouter();

  async function toggle() {
    setSaving(true);
    const next: LessonStatus = status === "completed" ? "in_progress" : "completed";
    try {
      await setLessonStatus(lessonId, next);
      setStatus(next);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const isDone = status === "completed";

  return (
    <Button onClick={toggle} disabled={saving} variant={isDone ? "subtle" : "default"}>
      {isDone ? <CheckCircle2 className="h-4 w-4 text-solved" /> : <Circle className="h-4 w-4" />}
      {isDone ? "Completed" : "Mark complete"}
    </Button>
  );
}
