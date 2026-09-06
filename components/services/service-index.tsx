"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { serviceGroups } from "@/lib/services-data";
import { cn } from "@/lib/utils";

/**
 * 사업분야 페이지 상단 고정 앵커 내비게이션.
 * 스크롤 위치에 따라 활성 항목을 표시합니다.
 * 좁은 화면에서는 항목이 자연스럽게 다음 줄로 배치됩니다.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<string>(serviceGroups[0].slug);
  const scrollAnimationFrame = useRef<number | null>(null);

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    const section = document.getElementById(slug);
    if (!section) return;

    event.preventDefault();
    setActive(slug);
    window.history.pushState(null, "", `#${slug}`);

    if (scrollAnimationFrame.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrame.current);
    }

    const startY = window.scrollY;
    const parsedScrollMarginTop = Number.parseFloat(
      window.getComputedStyle(section).scrollMarginTop,
    );
    const scrollMarginTop = Number.isFinite(parsedScrollMarginTop)
      ? parsedScrollMarginTop
      : 0;
    const maximumY = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(
      maximumY,
      Math.max(0, startY + section.getBoundingClientRect().top - scrollMarginTop),
    );
    const distance = targetY - startY;
    const duration = 700;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      startTime ??= currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        scrollAnimationFrame.current = window.requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = window.requestAnimationFrame(animateScroll);
  }

  useEffect(() => {
    const sections = serviceGroups
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let animationFrame = 0;
    const updateActive = () => {
      const current =
        [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= 140) ?? sections[0];
      setActive((previous) => (previous === current.id ? previous : current.id));
    };
    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActive);
    };

    animationFrame = window.requestAnimationFrame(updateActive);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (scrollAnimationFrame.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrame.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="사업분야 바로가기"
      className="border-input bg-background/95 sticky top-16 z-30 border-b backdrop-blur-[6px]"
    >
      <ul className="container-site flex flex-wrap gap-x-[clamp(0.375rem,1.6vw,1.25rem)]">
        {serviceGroups.map((s, index) => (
          <li key={s.slug} className="shrink-0">
            <a
              href={`#${s.slug}`}
              onClick={(event) => handleAnchorClick(event, s.slug)}
              aria-current={active === s.slug ? "true" : undefined}
              className={cn(
                "flex items-baseline gap-2.5 px-[clamp(0.25rem,0.8vw,0.625rem)] py-[15px] text-sm font-semibold tracking-[-0.015em] whitespace-nowrap transition-colors",
                active === s.slug
                  ? "text-brand shadow-[inset_0_-2px_0_0_#0b6c43]"
                  : "text-body-text hover:text-heading",
              )}
            >
              <span className="text-xs tracking-[0.1em] tabular-nums opacity-75">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
