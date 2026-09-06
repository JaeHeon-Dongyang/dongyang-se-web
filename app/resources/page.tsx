import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
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
    <div>
      <PageHero
        eyebrow="TECHNICAL RESOURCES"
        badge="사내 전용"
        title="기술자료"
        description="점검 주기와 평가 절차, 구조해석 모델링 과정, AI 도구 활용 기준을 사내 매뉴얼과 기술 가이드로 정리했습니다. 검토자가 달라도 같은 기준으로 판단하고 그 근거를 설명하기 위한 자료입니다."
      />
      <section className="container-site py-16 md:py-20">
        <ResourceFilter resources={resources} />
      </section>

      <section className="container-site pb-16 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-6 bg-[#f1f6f2] p-7 md:p-10">
          <div>
            <h2 className="text-heading text-xl font-bold tracking-[-0.03em] md:text-2xl">
              찾는 자료가 없거나 특정 기준에 대한 확인이 필요하신가요?
            </h2>
            <p className="mt-2 max-w-[40em] text-[14.5px] leading-[1.8] text-[#4a5049]">
              분야별 AI 노트북에 설계기준·점검 절차·사내 규정을 직접 질문할 수 있습니다.
            </p>
          </div>
          <Link
            href="/ask"
            className="bg-brand hover:bg-brand-hover inline-flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white"
          >
            질문하기
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
