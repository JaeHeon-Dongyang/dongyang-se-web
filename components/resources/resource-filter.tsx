"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { resourceCategories, type Resource } from "@/lib/resources-data";

function resourceText(r: Resource): string {
  const parts: string[] = [r.title, r.summary, r.category];
  for (const block of r.body) {
    if (
      block.type === "paragraph" ||
      block.type === "heading" ||
      block.type === "callout"
    ) {
      parts.push(block.text);
    } else if (block.type === "list") {
      parts.push(...block.items);
    } else if (block.type === "table") {
      parts.push(...block.headers, ...block.rows.flat());
    }
  }
  return parts.join(" ").toLowerCase();
}

export function ResourceFilter({ resources }: { resources: Resource[] }) {
  const [category, setCategory] = useState<string>("전체");
  const [query, setQuery] = useState("");

  const indexed = useMemo(
    () => resources.map((r) => ({ resource: r, text: resourceText(r) })),
    [resources],
  );

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      indexed
        .filter(({ resource, text }) => {
          const catOk = category === "전체" || resource.category === category;
          const qOk = q === "" || text.includes(q);
          return catOk && qOk;
        })
        .map(({ resource }) => resource),
    [indexed, category, q],
  );

  const hasResources = resources.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="text-body-text pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="자료 검색 (제목·내용·키워드)"
            aria-label="기술자료 검색"
            className="border-border bg-surface text-heading placeholder:text-body-text/70 focus-visible:border-brand focus-visible:ring-focus-ring/40 h-11 w-full rounded-full border pr-4 pl-10 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>

        <ToggleGroup
          value={[category]}
          onValueChange={(value) => {
            if (value.length > 0) setCategory(value[0] as string);
          }}
          variant="outline"
          className="flex-wrap"
          aria-label="기술자료 카테고리 필터"
        >
          {resourceCategories.map((cat) => (
            <ToggleGroupItem key={cat} value={cat} className="rounded-full px-4">
              {cat}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {!hasResources ? (
        <p className="text-body-text py-16 text-center text-sm">
          등록된 기술자료가 아직 없습니다. 준비되는 대로 이곳에 게시됩니다.
        </p>
      ) : filtered.length > 0 ? (
        <>
          <p className="text-body-text/80 text-xs">
            {q || category !== "전체"
              ? `${filtered.length}건`
              : `전체 ${filtered.length}건`}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-body-text py-16 text-center text-sm">
          {q
            ? `‘${query.trim()}’ 에 대한 검색 결과가 없습니다.`
            : "해당 조건의 자료가 없습니다."}
        </p>
      )}
    </div>
  );
}
