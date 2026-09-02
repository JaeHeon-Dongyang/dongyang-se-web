import type { Metadata } from "next";
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
    "동양구조엔지니어링의 구조설계, 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토 사업분야와 업무 범위를 안내합니다.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-20 pb-24 md:gap-28">
      <PageHero
        eyebrow="OUR SERVICES"
        title="구조안전이 필요한 순간에 함께합니다"
        description="설계 단계의 구조 계획부터 사용 중 안전진단과 점검, 시공 중 안전관리, 해체 단계의 구조검토까지 각 상황에 필요한 전문적인 기술 검토를 제공합니다."
      />

      <section className="container-site">
        <div className="content-measure flex flex-col gap-4">
          <p className="text-body-text text-base leading-relaxed text-pretty">
            동양구조엔지니어링은 건축구조설계, 안전점검·진단, 공사 중 안전관리, 해체공사
            구조검토 등 건축물의 각 단계에서 요구되는 구조안전 업무를 수행합니다.
          </p>

          <p className="text-body-text text-base leading-relaxed text-pretty">
            검토 목적과 현장 조건을 정확히 파악하고, 관련 기준과 데이터를 바탕으로
            검토합니다. 단순히 결과를 제시하는 데 그치지 않고, 판단의 근거와 필요한 조치를
            명확하게 설명하는 것을 중요하게 생각합니다.
          </p>
        </div>
      </section>

      <div>
        <ServiceIndex />

        <div className="mt-16 flex flex-col gap-16 md:mt-20 md:gap-20">
          {serviceGroups.map((service) => (
            <ServiceDetailSection key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <section className="container-site">
        <SectionHeading
          eyebrow="WORKING PROCESS"
          title="업무 진행 절차"
          description="검토 대상과 목적에 따라 세부 절차는 달라질 수 있으며, 기본적인 업무는 다음과 같은 순서로 진행합니다."
          className="mb-10"
        />

        <ProcessSteps />
      </section>

      <ContactCta />
    </div>
  );
}
