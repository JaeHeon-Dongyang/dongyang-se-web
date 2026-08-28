import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";
import { company, contactLinks } from "@/lib/site";

/*
 * 개인정보처리방침 — 초안 검토 전. 사용자 제공 원고를 법정 항목(보존기간, 위탁업체,
 * 국내외 이전, 자동수집 등) 검증 후 반영한다. 그때까지 내비/푸터에서 링크하지 않으며
 * 검색엔진 색인도 제외한다. (docs/PLAN.md)
 */
export const metadata: Metadata = buildMetadata({
  title: "개인정보처리방침",
  description:
    "동양구조엔지니어링의 개인정보 수집·이용·보관 및 파기에 관한 처리방침입니다.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="법적 정보"
        title="개인정보처리방침"
        description="현재 처리방침 내용을 준비 중입니다. 확정 전까지 개인정보 관련 문의는 아래 연락처로 주시기 바랍니다."
      />

      <section className="border-border bg-background border-b py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6">
          <p className="text-body-text text-sm leading-relaxed">
            동양구조엔지니어링(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」 등 관련
            법령을 준수하며, 문의 과정에서 수집되는 개인정보를 상담 및 회신 목적으로만
            이용합니다. 정식 개인정보처리방침은 검토 후 이 페이지에 게시됩니다.
          </p>
          <ul className="text-body-text mt-2 flex flex-col gap-1 text-sm">
            <li>
              전화:{" "}
              <a href={contactLinks.tel} className="hover:text-brand">
                {company.tel}
              </a>
            </li>
            <li>
              이메일:{" "}
              <a href={contactLinks.mailto} className="hover:text-brand">
                {company.email}
              </a>
            </li>
            <li>주소: {company.address}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
