import { cn } from "@/lib/utils";

export function Progress({
  value, className, heat = false,
}: { value: number; className?: string; heat?: boolean }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", heat ? "heat-bar" : "bg-primary")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
