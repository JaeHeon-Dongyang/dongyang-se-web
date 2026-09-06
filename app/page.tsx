import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { HeroSection } from "@/components/home/hero-section";
import { ValuesGrid } from "@/components/home/values-grid";
import { buildMetadata } from "@/lib/seo";
import { serviceGroups } from "@/lib/services-data";

/*
 * 홈은 곧 회사소개 화면이다 (시안 v3_2_taste 의 `isHome`).
 * 회사소개 원고 출처: content/company/company-introduction.md
 * 회사 기본 정보 출처: lib/site.ts
 * 검증되지 않은 실적·연혁·인증·수치는 노출하지 않는다.
 */

export const metadata: Metadata = buildMetadata({
  description:
    "동양구조엔지니어링은 구조설계, 안전점검·진단, 내진성능평가, 공사 중 안전점검과 해체공사 구조검토를 수행하는 건축구조 전문기업입니다.",
});

const workflow = [
  {
    number: "01",
    title: "검토",
    description:
      "도면과 기존 자료, 현장 상태를 같은 기준으로 확인합니다. 자료와 현장이 다른 경우 무엇이 다른지부터 정리합니다.",
  },
  {
    number: "02",
    title: "판단",
    description:
      "관련 설계기준과 구조해석 결과를 근거로 안전성과 필요한 조치를 판단합니다. 근거 없는 결론은 내리지 않습니다.",
  },
  {
    number: "03",
    title: "설명",
    description:
      "판단의 기준과 이유, 이어질 조치를 발주자와 현장 관계자가 이해할 수 있는 언어로 전달합니다.",
  },
];

const capabilityItems = [
  {
    title: "축적된 정보를 연결하는 협업 체계",
    paragraphs: [
      "중앙화된 사내 자료관리 및 협업 인프라를 바탕으로 프로젝트 자료, 기술 문서와 업무 이력을 체계적으로 관리합니다.",
      "구성원이 동일한 자료를 기준으로 협업할 수 있도록 업무 환경을 개선해 반복 업무를 줄이고 검토의 연속성을 높입니다.",
    ],
  },
  {
    title: "프로젝트 경험을 기술 자산으로",
    paragraphs: [
      "설계와 점검, 현장 대응 과정에서 얻은 판단 기준과 검토 사례를 사내 자료로 축적해 다음 프로젝트의 검토와 판단에 활용합니다.",
    ],
  },
  {
    title: "현장 경험을 공공의 안전으로",
    paragraphs: [
      "김용철 대표는 2021년 대전광역시 건설기술심의위원회 건축구조 분야 위원으로 위촉되어 콘크리트구조 및 내진·구조해석 분야의 전문성을 인정받았습니다.",
    ],
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <section className="pt-[clamp(5.25rem,9vw,9rem)] pb-[clamp(3.5rem,6.5vw,6rem)]">
        <div className="container-site">
          <h2 className="text-heading mb-[clamp(2.125rem,4vw,3.75rem)] max-w-[19em] text-[clamp(1.75rem,3.3vw,2.75rem)] leading-[1.18] font-bold tracking-[-0.034em]">
            구조안전을 위한 정확한 판단
          </h2>
          <div className="flex flex-wrap gap-x-[clamp(1.375rem,3vw,4rem)] gap-y-5">
            <p className="text-body-text min-w-0 flex-[1_1_320px] text-[16.5px] leading-[1.9] text-pretty">
              건축물의 안전은 경험만으로도, 계산만으로도 완성되지 않습니다. 현장의 조건을
              정확히 이해하고, 기준과 데이터를 바탕으로 검토하며, 프로젝트 관계자와 충분히
              소통하는 과정이 함께해야 합니다.
            </p>
            <p className="text-body-text min-w-0 flex-[1_1_320px] text-[16.5px] leading-[1.9] text-pretty">
              동양구조엔지니어링은 구조설계, 구조감리와 보강, 정기안전점검, 정밀안전진단,
              내진성능평가, 공사 중 안전점검 및 해체공사 구조검토 등 다양한 업무를
              수행합니다. 각 업무의 목적과 현장 여건을 면밀히 살피고, 안전성과 실현
              가능성을 함께 고려합니다.
            </p>
          </div>
          <div className="relative mt-[clamp(2.75rem,5.4vw,5.5rem)] h-[clamp(15rem,30vw,28.75rem)] overflow-hidden">
            <Image
              src="/images/about-engineers-review.jpg"
              alt="구조 엔지니어들이 구조도면과 구조해석 모델을 검토하는 모습"
              fill
              className="object-cover"
              sizes="(min-width: 1360px) 1360px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="py-[clamp(5.25rem,9vw,9rem)]">
        <div className="container-site">
          <h2 className="text-heading mb-[clamp(2.5rem,4.6vw,4.5rem)] max-w-[21em] text-[clamp(1.75rem,3.3vw,2.75rem)] leading-[1.18] font-bold tracking-[-0.034em]">
            검토하고, 판단하고,
            <br />
            이해할 수 있게 설명합니다
          </h2>
          <ol className="flex flex-col gap-[clamp(2.375rem,4.4vw,4.5rem)]">
            {workflow.map((item) => (
              <li
                key={item.number}
                className="flex flex-wrap gap-x-[clamp(1.5rem,3.4vw,4rem)] gap-y-3"
              >
                <span className="flex-none text-[clamp(2.5rem,4.4vw,3.75rem)] leading-[0.82] font-extralight tracking-[-0.05em] text-[#cde0d4] tabular-nums">
                  {item.number}
                </span>
                <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
                  <h3 className="text-brand text-[clamp(1.3125rem,2.1vw,1.6875rem)] leading-[1.28] font-bold tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="text-body-text max-w-[44em] text-base leading-[1.9] text-pretty">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-[clamp(5.25rem,9vw,9rem)]">
        <div className="container-site">
          <div className="border-heading flex flex-wrap items-baseline gap-x-5 gap-y-3 border-b pb-6">
            <span className="text-brand text-xs font-bold tracking-[0.18em]">
              SERVICES
            </span>
            <h2 className="text-heading text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.16] font-bold tracking-[-0.034em]">
              구조 엔지니어링 서비스
            </h2>
          </div>
          <div>
            {serviceGroups.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group border-heading hover:bg-accent flex flex-wrap gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-2.5 border-b py-[clamp(1.75rem,2.8vw,2.5rem)] transition-[background-color_200ms_ease,transform_280ms_cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 lg:px-5"
              >
                <span className="flex min-w-0 flex-[1_1_220px] items-baseline gap-3.5">
                  <span className="text-brand text-[13px] font-bold tracking-[0.1em] tabular-nums opacity-80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-heading text-[clamp(1.25rem,2vw,1.5625rem)] font-bold tracking-[-0.03em]">
                    {service.title}
                  </span>
                </span>
                <span className="flex min-w-0 flex-[2_1_400px] flex-col gap-3.5">
                  <span className="text-body-text text-[15.5px] leading-[1.75] text-pretty">
                    {service.shortDescription}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="bg-accent text-brand-hover px-3 py-1.5 text-[12.5px] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-brand flex flex-none items-center pt-1.5">
                  <ArrowRight
                    aria-hidden
                    className="size-5 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(5.25rem,9vw,9rem)]">
        <div className="container-site">
          <h2 className="text-heading mb-[clamp(1.75rem,3.2vw,3rem)] text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.16] font-bold tracking-[-0.034em]">
            핵심 가치
          </h2>
          <ValuesGrid />
        </div>
      </section>

      <section className="pt-[clamp(3.5rem,6.5vw,6rem)] pb-[clamp(5.25rem,9vw,9rem)]">
        <div className="container-site">
          <div className="bg-accent grid gap-[clamp(1.75rem,3.4vw,3.75rem)] p-[clamp(1.75rem,3.4vw,3.5rem)] lg:grid-cols-[1.2fr_1fr]">
            <div className="flex min-w-0 flex-col items-start gap-4">
              <span className="text-brand-hover text-xs font-bold tracking-[0.18em]">
                TECHNICAL CAPABILITY
              </span>
              <h2 className="text-heading text-[clamp(1.3125rem,2.1vw,1.6875rem)] leading-[1.3] font-bold tracking-[-0.03em]">
                검토 방식을 문서로 정리하고 공유합니다
              </h2>
              <p className="text-[15.5px] leading-[1.85] text-pretty text-[#4a5049]">
                구조해석 모델링 절차와 AI 도구 활용 기준을 사내 매뉴얼과 기술 가이드로
                정리하고 있습니다. 같은 기준으로 검토하고, 판단 근거를 설명할 수 있게 하기
                위한 작업입니다.
              </p>
              <Link
                href="/resources"
                className="bg-brand hover:bg-brand-hover focus-visible:ring-focus-ring mt-1.5 inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] hover:-translate-y-px focus-visible:ring-2 focus-visible:outline-none"
              >
                기술자료 보기
                <ArrowRight aria-hidden className="size-3.5" strokeWidth={2.2} />
              </Link>
              <div className="relative mt-2 aspect-[3/2] w-full overflow-hidden">
                <Image
                  src="/images/company-manual.png"
                  alt="구조설계와 안전점검 업무 매뉴얼을 체계적으로 관리하는 모습"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              {capabilityItems.map((item, index) => (
                <article
                  key={item.title}
                  className={`flex flex-col gap-3.5 py-7 first:pt-0 last:pb-0 ${
                    index < capabilityItems.length - 1 ? "border-brand/15 border-b" : ""
                  }`}
                >
                  <h3 className="text-heading text-[clamp(1.1875rem,1.9vw,1.4375rem)] leading-[1.32] font-bold tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  {item.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-[1.85] text-pretty text-[#4a5049]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
