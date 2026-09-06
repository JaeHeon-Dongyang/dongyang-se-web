import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { askGroups } from "@/lib/ask-data";
import { buildMetadata } from "@/lib/seo";

/*
 * 사내 전용 AI 질문 창구.
 * 각 카드는 Google Gemini Notebook(구 NotebookLM) 노트북으로 이동한다.
 * 노트북은 전부 비공개 + 이메일 초대 상태이므로 초대받지 않은 계정은 열리지 않는다.
 * 외부망 접근은 middleware.ts 가 404 로 차단한다.
 */
export const metadata: Metadata = buildMetadata({
  title: "질문하기",
  description: "사내 전용 AI 질문 창구입니다.",
  path: "/ask",
  noindex: true,
});

export default function AskPage() {
  return (
    <div>
      <PageHero
        eyebrow="AI NOTEBOOKS"
        badge="사내 전용"
        title={
          <>
            분야를 고르면
            <br />
            노트북이 답합니다
          </>
        }
        description="사업분야별로 근거 법령과 기준 문서를 학습시킨 AI 노트북을 나누어 두었습니다. 대상 시설물과 점검 목적에 맞는 노트북을 고르면 설계기준·절차·사내 규정을 바로 물어볼 수 있습니다. 노트북은 초대받은 사내 계정만 열람할 수 있으며, AI 답변은 참고용으로 성과품에 반영하기 전 원문을 대조합니다."
      />

      <div className="container-site py-16 md:py-20">
        {askGroups.map((group, groupIndex) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="border-border first:border-heading border-t py-8 first:pt-10 md:py-11"
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:gap-14">
              <div className="flex items-baseline gap-3.5">
                <span className="text-brand font-bold tracking-[0.12em] tabular-nums opacity-80">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`group-${group.id}`}
                  className="text-heading text-xl font-bold tracking-[-0.032em] md:text-[26px]"
                >
                  {group.title}
                </h2>
              </div>
              <p className="text-body-text max-w-[48em] text-[14.5px] leading-[1.8] text-pretty">
                {group.description}
              </p>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.notebooks.map((notebook) => (
                <li key={notebook.title}>
                  {notebook.url ? (
                    <a
                      href={notebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border bg-surface hover:border-brand focus-visible:ring-focus-ring flex h-full flex-col gap-2.5 border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none md:p-6"
                    >
                      <span className="text-heading flex items-start justify-between gap-2 text-base font-semibold">
                        {notebook.title}
                        <ExternalLink
                          className="text-brand mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-body-text text-sm leading-relaxed text-pretty">
                        {notebook.description}
                      </span>
                      <span className="text-body-text mt-auto pt-2 text-xs">
                        근거 · {notebook.basis}
                      </span>
                      <span className="sr-only">새 창에서 열림</span>
                    </a>
                  ) : (
                    <div className="border-border bg-surface-muted flex h-full flex-col gap-2 border border-dashed p-5">
                      <span className="text-heading flex items-start justify-between gap-2 text-base font-semibold">
                        {notebook.title}
                        <span className="text-body-text bg-surface shrink-0 px-2 py-0.5 text-xs font-medium">
                          준비 중
                        </span>
                      </span>
                      <span className="text-body-text text-sm leading-relaxed text-pretty">
                        {notebook.description}
                      </span>
                      <span className="text-body-text mt-auto pt-2 text-xs">
                        근거 · {notebook.basis}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-body-text/70 mt-8 max-w-[52em] text-[13px] leading-[1.8]">
          노트북은 전원 뷰어 권한의 비공개 상태로 운영하며, 초대·해제는 관리자 계정에서만
          수행합니다. 발주처에서 제공받은 자료는 노트북에 추가하지 않습니다.
        </p>
      </div>

      <section className="container-site pb-16 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-6 bg-[#f1f6f2] p-7 md:p-10">
          <div>
            <h2 className="text-heading text-xl font-bold tracking-[-0.03em] md:text-2xl">
              노트북에 없는 내용이거나, 실제 프로젝트 검토가 필요하신가요?
            </h2>
            <p className="mt-2 text-[14.5px] leading-[1.8] text-[#4a5049]">
              건축물 개요와 확인하고 싶은 사항을 남겨주시면 담당 엔지니어가 검토 후
              답변드립니다.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-brand hover:bg-brand-hover inline-flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white"
          >
            문의 남기기
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
