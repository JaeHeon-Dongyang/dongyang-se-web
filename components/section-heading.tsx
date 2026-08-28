import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-brand text-sm font-semibold tracking-[0.14em] uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-heading text-2xl font-bold tracking-tight text-balance md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-body-text text-base leading-relaxed text-pretty",
            align === "left" ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
