import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-site pt-14 pb-10 md:pt-20 md:pb-14", className)}>
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="text-brand text-xs font-semibold tracking-[0.14em] uppercase">
          {eyebrow}
        </span>
        <h1 className="text-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="text-body-text text-base leading-relaxed text-pretty md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
