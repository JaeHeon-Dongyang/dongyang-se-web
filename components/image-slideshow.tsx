"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

/**
 * 히어로 이미지 슬라이드쇼. 5초마다 크로스페이드로 전환하며 각 이미지에 ken-burns 줌 유지.
 * prefers-reduced-motion 이면 자동 전환·줌 없이 첫 이미지만 표시.
 * 로드 실패한 슬라이드는 순환에서 제외(이미지 일부만 있어도 동작).
 */
export function ImageSlideshow({ images, alt = "" }: { images: string[]; alt?: string }) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const available = useMemo(
    () => images.map((src, i) => ({ src, i })).filter(({ i }) => !broken[i]),
    [images, broken],
  );

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
    <div className="bg-surface-muted relative aspect-square w-full overflow-hidden">
      {images.map((src, i) =>
        broken[i] ? null : (
          <Image
            key={src}
            src={src}
            alt={alt}
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
        <div className="bg-heading/75 absolute bottom-0 left-0 flex">
          {available.map(({ i }) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번째 이미지 보기`}
              aria-current={i === index}
              className={cn(
                "relative flex h-8 w-9 items-center justify-center text-[11px] font-medium tabular-nums transition-colors before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:origin-left before:bg-white before:transition-transform",
                i === index
                  ? "text-white before:scale-x-100"
                  : "text-white/60 before:scale-x-0 hover:text-white/85",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
