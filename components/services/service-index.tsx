"use client";

import { useEffect, useState } from "react";
import { serviceGroups } from "@/lib/services-data";
import { cn } from "@/lib/utils";

/**
 * 사업분야 페이지 상단 고정 앵커 내비게이션.
 * 스크롤 위치에 따라 활성 항목을 표시(IntersectionObserver).
 * 모바일에서는 가로 스크롤.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<string>(serviceGroups[0].slug);

  useEffect(() => {
    const sections = serviceGroups
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="사업분야 바로가기"
      className="border-border bg-background/90 sticky top-16 z-30 border-y backdrop-blur md:top-20"
    >
      <ul className="container-site flex gap-1 overflow-x-auto py-2 md:justify-center">
        {serviceGroups.map((s) => (
          <li key={s.slug} className="shrink-0">
            <a
              href={`#${s.slug}`}
              aria-current={active === s.slug ? "true" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                active === s.slug
                  ? "bg-brand text-brand-foreground"
                  : "text-body-text hover:text-heading",
              )}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
