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
        <div className="content-measure flex flex-col gap-4">
          <p className="text-body-text text-base leading-relaxed text-pretty">
            동양구조엔지니어링은 구조설계부터 안전진단·점검, 공사 중 안전관리, 해체공사
            구조검토까지 건축물의 생애주기 전반에 필요한 구조 엔지니어링 서비스를
            제공합니다.
          </p>
          <p className="text-body-text text-base leading-relaxed text-pretty">
            관련 기준과 현장 조건을 면밀히 검토하고, 프로젝트 관계자와 지속적으로 소통하며
            안전성과 실현 가능성을 함께 고려한 기술적 해답을 제시합니다.
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
          description="검토 대상과 목적에 따라 세부 절차는 조정되지만, 기본적인 진행 순서는 다음과 같습니다."
          className="mb-10"
        />
        <ProcessSteps />
      </section>

      <ContactCta />
    </div>
  );
}
