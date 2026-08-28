import { FileText } from "lucide-react";
import Link from "next/link";
import { CategoryBadge } from "@/components/category-badge";
import type { Resource } from "@/lib/resources-data";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group border-border bg-surface hover:border-brand/40 focus-visible:ring-focus-ring flex flex-col gap-4 rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-3">
        <CategoryBadge>{resource.category}</CategoryBadge>
        {resource.attachments?.length ? (
          <FileText className="text-body-text h-4 w-4 shrink-0" aria-hidden="true" />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-heading group-hover:text-brand text-base font-bold text-balance">
          {resource.title}
        </h3>
        <p className="text-body-text line-clamp-2 text-sm leading-relaxed text-pretty">
          {resource.summary}
        </p>
      </div>
      <time
        dateTime={resource.updatedAt}
        className="text-body-text/80 mt-auto text-xs font-medium"
      >
        {resource.updatedAt}
      </time>
    </Link>
  );
}
