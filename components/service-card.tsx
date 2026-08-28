import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ServiceGroup } from "@/lib/services-data";

export function ServiceCard({ service }: { service: ServiceGroup }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group border-border bg-surface hover:border-brand/40 focus-visible:ring-focus-ring flex flex-col gap-5 rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="bg-accent-green-light text-brand flex h-11 w-11 items-center justify-center rounded-lg">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-heading text-lg font-bold">{service.title}</h3>
        <p className="text-body-text text-sm leading-relaxed">
          {service.shortDescription}
        </p>
      </div>
      <ul className="flex flex-col gap-1.5">
        {service.items.slice(0, 3).map((item) => (
          <li key={item} className="text-body-text flex items-center gap-2 text-sm">
            <span
              className="bg-accent-green h-1 w-1 shrink-0 rounded-full"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
      <span className="text-brand mt-auto flex items-center gap-1.5 text-sm font-semibold">
        자세히 보기
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
