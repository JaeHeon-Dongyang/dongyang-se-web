import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageSlideshow } from "@/components/image-slideshow";

const heroImages = Array.from(
  { length: 6 },
  (_, i) => `/images/hero-structural-frame-${i + 1}.jpg`,
);

export function HeroSection() {
  return (
    <section className="border-input border-b">
      <div className="container-site flex flex-wrap items-stretch gap-x-[clamp(2rem,4vw,4.75rem)]">
        <div className="reveal-up flex min-w-0 flex-[1_1_420px] flex-col gap-[clamp(1.5rem,2.8vw,2.375rem)] py-[clamp(3.25rem,6vw,6rem)]">
          <span className="text-brand text-xs font-bold tracking-[0.18em]">
            STRUCTURAL ENGINEERING
          </span>
          <h1 className="text-heading text-[clamp(2.125rem,4.6vw,3.625rem)] leading-[1.06] font-semibold tracking-[-0.042em]">
            안전을 설계하고,
            <br />
            신뢰를 쌓습니다.
          </h1>
          <p className="text-body-text max-w-[27em] text-[16.5px] leading-[1.8] text-pretty">
            구조설계부터 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토까지. 건축물의
            생애주기 전반에서 구조 안전을 판단합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex items-center gap-2.5 px-7 py-[17px] text-[14.5px] font-semibold text-white transition-[background-color,transform] hover:-translate-y-px focus-visible:ring-2 focus-visible:outline-none"
            >
              문의하기
              <ArrowRight aria-hidden className="size-[15px]" strokeWidth={2.2} />
            </Link>
            <Link
              href="/services"
              className="border-heading text-heading hover:bg-surface-muted focus-visible:ring-focus-ring inline-flex items-center border px-[26px] py-[17px] text-[14.5px] font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              사업분야 보기
            </Link>
          </div>
        </div>

        <div className="reveal-up min-w-0 flex-[1_1_380px] [animation-delay:140ms]">
          <ImageSlideshow images={heroImages} />
        </div>
      </div>
    </section>
  );
}
