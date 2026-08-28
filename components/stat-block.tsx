import { cn } from "@/lib/utils";

export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-brand flex flex-col gap-1 border-l-2 pl-4", className)}>
      <span className="text-heading text-3xl font-bold tabular-nums md:text-4xl">
        {value}
      </span>
      <span className="text-body-text text-sm leading-relaxed">{label}</span>
    </div>
  );
}
