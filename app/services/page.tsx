import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
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
    <div>
      <PageHero
        eyebrow="OUR SERVICES"
        title={
          <>
            구조안전이 필요한
            <br />
            순간에 함께합니다
          </>
        }
        description="설계 단계의 구조 계획부터 사용 중 안전진단과 점검, 시공 중 안전관리, 해체 단계의 구조검토까지 각 상황에 필요한 전문적인 기술 검토를 제공합니다. 판단의 근거와 필요한 조치를 명확하게 설명하는 것을 중요하게 생각합니다."
      />

      <div>
        <ServiceIndex />

        <div>
          {serviceGroups.map((service) => (
            <ServiceDetailSection key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <section className="pt-[clamp(3.5rem,6.5vw,6rem)] pb-[clamp(3rem,6vw,5.5rem)]">
        <div className="container-site">
          <span className="text-brand text-xs font-bold tracking-[0.16em]">
            WORKING PROCESS
          </span>
          <h2 className="text-heading mt-4 text-2xl leading-[1.22] font-bold tracking-[-0.03em] md:text-[32px]">
            업무 진행 절차
          </h2>
          <p className="text-body-text mt-3 mb-[clamp(1.875rem,3.4vw,3rem)] max-w-[44em] text-[15px] leading-[1.75]">
            검토 대상과 목적에 따라 세부 절차는 달라질 수 있으며, 기본적인 업무는 다음과
            같은 순서로 진행합니다.
          </p>

          <ProcessSteps />
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
