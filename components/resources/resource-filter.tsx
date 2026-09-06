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
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative w-full max-w-[420px]">
          <Search
            className="text-body-text pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="자료 검색 (제목 · 요약 · 키워드)"
            aria-label="기술자료 검색"
            className="border-input bg-surface text-heading placeholder:text-body-text/70 focus-visible:border-brand h-[46px] w-full border pr-4 pl-10 text-sm transition-colors focus-visible:outline-none"
          />
        </div>

        <ToggleGroup
          value={[category]}
          onValueChange={(value) => {
            if (value.length > 0) setCategory(value[0] as string);
          }}
          variant="outline"
          className="flex-wrap justify-start gap-2"
          aria-label="기술자료 카테고리 필터"
        >
          {resourceCategories.map((cat) => (
            <ToggleGroupItem
              key={cat}
              value={cat}
              className="h-auto rounded-none px-[18px] py-3 text-[13px]"
            >
              {cat}
              <span className="ml-2 text-[11px] tabular-nums opacity-65">
                {String(
                  cat === "전체"
                    ? resources.length
                    : resources.filter((resource) => resource.category === cat).length,
                ).padStart(2, "0")}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="border-heading mt-9 mb-5 flex items-baseline justify-between border-b pb-3.5">
        <span className="text-body-text/70 text-xs font-bold tracking-[0.12em]">
          {String(filtered.length).padStart(2, "0")} DOCUMENTS
        </span>
        <button
          type="button"
          onClick={() => {
            setCategory("전체");
            setQuery("");
          }}
          className="text-brand disabled:text-body-text/60 text-xs font-semibold"
          disabled={!q && category === "전체"}
        >
          전체 보기
        </button>
      </div>

      {!hasResources ? (
        <p className="text-body-text py-16 text-center text-sm">
          등록된 기술자료가 아직 없습니다. 준비되는 대로 이곳에 게시됩니다.
        </p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="text-body-text py-16 text-center text-sm">
          {q
            ? `‘${query.trim()}’ 에 대한 검색 결과가 없습니다.`
            : "해당 조건의 자료가 없습니다."}
        </p>
      )}

      <p className="text-body-text/70 mt-9 max-w-[52em] text-[13px] leading-[1.8]">
        게시 자료는 일반적인 참고를 위한 것으로, 개별 프로젝트의 구조 안전에 대한 판단을
        대체하지 않습니다. 실제 검토는 대상 건축물의 도면과 현장 조건을 확인한 후
        수행합니다.
      </p>
    </div>
  );
}
