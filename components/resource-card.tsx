import Link from "next/link";
import type { Resource } from "@/lib/resources-data";

export function ResourceCard({
  resource,
  number,
}: {
  resource: Resource;
  number?: number;
}) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group border-border bg-surface hover:border-brand focus-visible:ring-focus-ring flex flex-col gap-3.5 border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none md:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-brand bg-[#f1f6f2] px-2.5 py-1 text-[11.5px] font-bold">
          {resource.category}
        </span>
        {number ? (
          <span className="text-body-text/70 text-[11px] font-bold tracking-[0.12em] tabular-nums">
            {String(number).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-heading group-hover:text-brand text-[17.5px] leading-[1.45] font-bold tracking-[-0.03em] text-balance">
          {resource.title}
        </h3>
        <p className="text-body-text line-clamp-3 text-sm leading-[1.75] text-pretty">
          {resource.summary}
        </p>
      </div>
    </Link>
  );
}
