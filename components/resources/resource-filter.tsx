"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/resource-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { resourceCategories, type Resource } from "@/lib/resources-data";

export function ResourceFilter({ resources }: { resources: Resource[] }) {
  const [category, setCategory] = useState<string>("전체");

  const filtered = useMemo(() => {
    if (category === "전체") return resources;
    return resources.filter((r) => r.category === category);
  }, [category, resources]);

  return (
    <div className="flex flex-col gap-8">
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="text-body-text py-16 text-center text-sm">
          해당 카테고리의 자료가 아직 없습니다.
        </p>
      )}
    </div>
  );
}
