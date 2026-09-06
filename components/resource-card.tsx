import Link from "next/link";
import type { Resource } from "@/lib/resources-data";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group border-border bg-surface hover:border-brand focus-visible:ring-focus-ring flex min-h-[238px] flex-col gap-5 border p-7 transition-colors focus-visible:ring-2 focus-visible:outline-none md:min-h-[250px] md:p-8"
    >
      <span className="text-brand w-fit bg-[#f1f6f2] px-3 py-1.5 text-xs font-semibold">
        {resource.category}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="text-heading group-hover:text-brand text-xl leading-[1.42] font-bold tracking-[-0.032em] text-balance">
          {resource.title}
        </h3>
        <p className="text-body-text line-clamp-3 text-[15px] leading-[1.8] text-pretty">
          {resource.summary}
        </p>
      </div>
    </Link>
  );
}
