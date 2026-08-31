import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { HeroSection } from "@/components/home/hero-section";
import { ValuesGrid } from "@/components/home/values-grid";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { resources } from "@/lib/resources-data";
import { buildMetadata } from "@/lib/seo";
import { serviceGroups } from "@/lib/services-data";

export const metadata: Metadata = buildMetadata({
  description:
    "동양구조엔지니어링은 구조설계, 안전진단·점검, 공사 중 안전관리, 해체공사 구조검토까지 건축물의 생애주기 전반에 필요한 구조 엔지니어링 서비스를 제공합니다.",
});

export default function HomePage() {
  const featuredResources = resources.slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="container-site py-16 md:py-20">
        <div className="border-border grid grid-cols-1 gap-10 border-t pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="회사 소개" title="구조안전을 위한 정확한 판단" />
          <p className="text-body-text max-w-2xl text-base leading-relaxed text-pretty">
            동양구조엔지니어링은 구조기술사와 시공기술사를 포함한 전문 인력, 체계적인 협업
            인프라와 지속적인 소통을 바탕으로 안전하고 합리적인 해결책을 제공합니다.
            정확한 기술 검토와 책임 있는 판단으로 건축물의 생애주기 전반에서 구조 안전을
            지킵니다.
          </p>
        </div>
      </section>

      <section className="container-site py-6 md:py-10">
        <SectionHeading
          eyebrow="사업분야"
          title="구조 엔지니어링 서비스"
          description="설계부터 진단, 시공 중 안전관리, 해체까지 건축물의 전 생애주기를 함께합니다."
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceGroups.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="핵심 가치"
              title="동양구조엔지니어링이 일하는 방식"
            />
            <p className="text-body-text border-border border-t pt-6 text-sm leading-relaxed text-pretty">
              김용철 대표는 2021년 대전광역시 건설기술심의위원회 건축구조 분야 위원으로
              위촉되어 콘크리트구조 및 내진·구조해석 분야의 전문성을 인정받았습니다.
              <br />
              <Link
                href="/about"
                className="text-brand hover:text-brand-hover font-semibold"
              >
                회사 소개에서 더 알아보기
              </Link>
            </p>
          </div>
          <ValuesGrid />
        </div>
      </section>

      {featuredResources.length > 0 ? (
        <section className="container-site py-6 pb-20 md:pb-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="기술자료" title="기술 자료실" className="mb-0" />
            <Link
              href="/resources"
              className="text-brand hover:text-brand-hover text-sm font-semibold"
            >
              전체 자료 보기
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </section>
      ) : null}

      <ContactCta className="pb-20 md:pb-24" />
    </>
  );
}
