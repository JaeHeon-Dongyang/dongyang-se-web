import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ServiceIndex } from "@/components/services/service-index";
import { serviceGroups } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "사업분야",
  description:
    "동양구조엔지니어링의 구조설계, 안전진단·점검, 공사 중 안전관리, 해체공사 구조검토 사업분야와 업무 범위를 안내합니다.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-20 pb-24 md:gap-28">
      <PageHero
        eyebrow="OUR SERVICES"
        title="건축물의 일생을 함께합니다"
        description={
          <>
            설계 단계의 구조 계획부터 사용 중 안전진단, 시공 중 안전관리, 해체 단계의
            구조검토까지, 필요한 시점에
            <br />
            필요한 전문성으로 대응합니다.
          </>
        }
      />

      <section className="container-site">
        <div className="bg-surface-muted relative aspect-[16/6] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/services-drawing-detail.png"
            alt="구조도면의 부재 상세와 치수선을 검토하는 모습"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <div>
        <ServiceIndex />
        <div className="mt-16 flex flex-col gap-16 md:mt-20 md:gap-20">
          {serviceGroups.map((service, index) => (
            <ServiceDetailSection
              key={service.slug}
              service={service}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>

      <section className="container-site">
        <SectionHeading
          eyebrow="WORKING PROCESS"
          title="업무 진행 절차"
          description="검토 대상과 목적에 따라 세부 절차는 조정되지만, 기본적인 진행 순서는 다음과 같습니다."
          className="mb-10"
        />
        <ProcessSteps />
      </section>

      <ContactCta />
    </div>
  );
}
