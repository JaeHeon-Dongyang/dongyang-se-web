import { cn } from "@/lib/utils";

export function CategoryBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-brand inline-flex items-center bg-[#f1f6f2] px-2.5 py-1 text-[11.5px] font-bold",
        className,
      )}
    >
      {children}
    </span>
  );
}
