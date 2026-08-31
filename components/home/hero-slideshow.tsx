"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = Array.from(
  { length: 6 },
  (_, i) => `/images/hero-structural-frame-${i + 1}.jpg`,
);
const INTERVAL_MS = 5000;

/**
 * 홈 히어로 이미지 슬라이드쇼. 5초마다 크로스페이드로 전환하며 각 이미지에 ken-burns 줌 유지.
 * prefers-reduced-motion 이면 자동 전환·줌 없이 첫 이미지만 표시.
 * 로드 실패한 슬라이드는 순환에서 제외(이미지 일부만 있어도 동작).
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const available = slides.map((src, i) => ({ src, i })).filter(({ i }) => !broken[i]);

  useEffect(() => {
    if (available.length <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setIndex((current) => {
        const pos = available.findIndex(({ i }) => i === current);
        return available[(pos + 1) % available.length].i;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [available]);

  return (
    <div className="bg-surface-muted relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
      {slides.map((src, i) =>
        broken[i] ? null : (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 45vw, 100vw"
            onError={() => setBroken((b) => ({ ...b, [i]: true }))}
            className={cn(
              "hero-kenburns object-cover transition-opacity duration-1000",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ),
      )}
      {available.length > 1 ? (
        <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
          {available.map(({ i }) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번째 이미지 보기`}
              aria-current={i === index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/75",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
