import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSlideshow } from "@/components/home/hero-slideshow";

export function HeroSection() {
  return (
    <section className="container-site pt-10 pb-10 md:pt-16 md:pb-14">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <h1 className="text-heading text-4xl leading-[1.15] font-bold tracking-tight text-balance md:text-5xl">
            안전을 설계하고,
            <br />
            신뢰를 쌓습니다.
          </h1>
          <p className="text-body-text max-w-lg text-base leading-relaxed text-pretty md:text-lg">
            동양구조엔지니어링은 구조설계부터 안전점검·진단, 공사 중 안전관리, 해체공사
            구조검토까지 건축물의 생애주기 전반에 필요한 구조 엔지니어링 서비스를
            제공합니다.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="group bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              사업분야 알아보기
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/about"
              className="border-border bg-surface text-heading hover:border-brand/50 hover:text-brand focus-visible:ring-focus-ring inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              회사 소개 보기
            </Link>
          </div>
        </div>
        <HeroSlideshow />
      </div>
    </section>
  );
}
