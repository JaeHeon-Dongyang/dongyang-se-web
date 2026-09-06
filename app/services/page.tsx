import type { Metadata } from "next";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceContactCta } from "@/components/services/service-contact-cta";
import { ServiceDetailSection } from "@/components/services/service-detail-section";
import { ServiceIndex } from "@/components/services/service-index";
import { ServicesHero } from "@/components/services/services-hero";
import { serviceGroups } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "사업분야",
  description:
    "동양구조엔지니어링의 구조설계, 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토 사업분야와 업무 범위를 안내합니다.",
};

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />

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

      <ServiceContactCta />
    </div>
  );
}
