import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-heading border-b", className)}>
      <div className="container-site grid gap-6 py-11 md:py-16 lg:grid-cols-[1fr_3fr] lg:gap-16 lg:py-[4.75rem]">
        <div className="flex flex-wrap content-start items-start gap-2.5">
          <span className="text-brand text-[13px] font-bold tracking-[0.16em] uppercase">
            {eyebrow}
          </span>
          {badge ? (
            <span className="bg-surface-muted text-body-text px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em]">
              {badge}
            </span>
          ) : null}
        </div>
        <div>
          <h1 className="text-heading max-w-[22em] text-3xl leading-[1.14] font-extrabold tracking-[-0.035em] text-balance md:text-[46px]">
            {title}
          </h1>
          {description ? (
            <p className="text-body-text mt-6 max-w-[46em] text-base leading-[1.8] text-pretty md:text-[17px]">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
