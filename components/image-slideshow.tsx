"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5200;

/**
 * 히어로 이미지 슬라이드쇼. 5.2초마다 크로스페이드로 전환하며 활성 이미지가 천천히 확대된다.
 * 마우스를 올리면 자동 재생을 멈추고, prefers-reduced-motion 이면 확대 효과만 끈다.
 * 로드 실패한 슬라이드는 순환에서 제외(이미지 일부만 있어도 동작).
 */
export function ImageSlideshow({ images, alt = "" }: { images: string[]; alt?: string }) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const available = useMemo(
    () => images.map((src, i) => ({ src, i })).filter(({ i }) => !broken[i]),
    [images, broken],
  );

  useEffect(() => {
    if (available.length <= 1 || paused) return;

    const id = window.setTimeout(() => {
      setIndex((current) => {
        const pos = available.findIndex(({ i }) => i === current);
        return available[(pos + 1) % available.length].i;
      });
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [available, cycleKey, index, paused]);

  function selectSlide(nextIndex: number) {
    setIndex(nextIndex);
    setCycleKey((current) => current + 1);
  }

  return (
    <div
      className="bg-surface-muted relative min-h-[280px] w-full overflow-hidden sm:min-h-[380px] lg:min-h-[520px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
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
              "object-cover will-change-[opacity,transform] [transition:opacity_900ms_ease,transform_6200ms_linear] motion-reduce:transform-none",
              i === index ? "scale-[1.05] opacity-100" : "scale-100 opacity-0",
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
              onClick={() => selectSlide(i)}
              aria-label={`${i + 1}번째 이미지 보기`}
              aria-current={i === index}
              className={cn(
                "relative flex h-8 w-9 items-center justify-center text-[11px] font-medium tabular-nums [transition:color_240ms_ease] before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:origin-left before:bg-white before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
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
