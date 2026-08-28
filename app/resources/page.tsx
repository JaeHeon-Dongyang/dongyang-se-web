import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ResourceFilter } from "@/components/resources/resource-filter";
import { resources } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "기술자료",
  description:
    "구조 안전점검 주기, 내진성능평가 절차, 구조 보강 공법, PF3D 사용 매뉴얼 등 동양구조엔지니어링의 기술 문서와 참고자료를 확인하세요.",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-14 pb-24 md:gap-16">
      <PageHero
        eyebrow="TECHNICAL RESOURCES"
        title="기술자료"
        description="점검 주기, 평가 절차, 보강 공법, 프로그램 매뉴얼 등 실무에 참고할 수 있는 기술 자료를 정리했습니다."
      />
      <section className="container-site">
        <ResourceFilter resources={resources} />
      </section>
    </div>
  );
}
