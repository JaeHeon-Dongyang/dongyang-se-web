import { CheckCircle2 } from "lucide-react";
import type { ServiceGroup } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function ServiceDetailSection({
  service,
  reversed = false,
}: {
  service: ServiceGroup;
  reversed?: boolean;
}) {
  const Icon = service.icon;

  return (
    <section
      id={service.slug}
      className="container-site border-border grid scroll-mt-20 grid-cols-1 gap-10 border-t pt-14 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16"
    >
      <div className={cn("flex flex-col gap-5", reversed && "md:order-2")}>
        <span className="bg-accent-green-light text-brand flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-heading text-2xl font-bold tracking-tight text-balance md:text-3xl">
          {service.title}
        </h2>
        <p className="text-body-text text-base leading-relaxed text-pretty">
          {service.intro}
        </p>
        <div className="flex flex-col gap-2">
          <span className="text-heading text-sm font-semibold">주요 업무</span>
          <ul className="flex flex-wrap gap-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="bg-surface-muted text-body-text rounded-full px-3.5 py-1.5 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn("flex flex-col gap-6", reversed && "md:order-1")}>
        <div className="border-border bg-surface flex flex-col gap-3 rounded-2xl border p-6">
          <span className="text-heading text-sm font-semibold">
            이런 경우에 필요합니다
          </span>
          <ul className="flex flex-col gap-3">
            {service.situations.map((situation) => (
              <li
                key={situation}
                className="text-body-text flex items-start gap-2.5 text-sm"
              >
                <CheckCircle2
                  className="text-brand mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-relaxed text-pretty">{situation}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface-muted flex flex-col gap-2 rounded-2xl p-6">
          <span className="text-heading text-sm font-semibold">수행 범위</span>
          <p className="text-body-text text-sm leading-relaxed text-pretty">
            {service.scope}
          </p>
        </div>
      </div>
    </section>
  );
}
