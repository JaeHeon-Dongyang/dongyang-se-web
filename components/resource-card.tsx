import Link from "next/link";
import type { Resource } from "@/lib/resources-data";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group border-border bg-surface hover:border-brand focus-visible:ring-focus-ring flex flex-col gap-3.5 border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none md:p-7"
    >
      <span className="text-brand w-fit bg-[#f1f6f2] px-2.5 py-1 text-[11.5px] font-bold">
        {resource.category}
      </span>
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
