import { ExternalLink, Info } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="flex flex-col gap-16 pb-24 md:gap-20">
      <PageHero
        eyebrow="사내 전용"
        title="질문하기"
        description="분야를 고르면 해당 노트북으로 이동합니다. 설계기준·점검 절차·사내 규정을 물어볼 수 있습니다."
      />

      <section className="container-site">
        <Alert className="border-border bg-surface-muted content-measure flex items-center gap-2.5 [&>svg]:translate-y-0">
          <Info className="text-brand shrink-0" />
          <AlertDescription className="text-body-text text-sm leading-relaxed text-pretty">
            AI 답변은 참고용입니다. 성과품에 반영하기 전 반드시 원문을 대조하세요.
            노트북은 초대받은 사내 계정만 열람할 수 있으며, 발주처 자료를 노트북에 추가로
            올리지 않습니다.
          </AlertDescription>
        </Alert>
      </section>

      <div className="container-site flex flex-col gap-14">
        {askGroups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="flex flex-col gap-2">
              <h2
                id={`group-${group.id}`}
                className="text-heading text-xl font-bold tracking-tight md:text-2xl"
              >
                {group.title}
              </h2>
              <p className="text-body-text text-sm leading-relaxed text-pretty">
                {group.description}
              </p>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.notebooks.map((notebook) => (
                <li key={notebook.title}>
                  {notebook.url ? (
                    <a
                      href={notebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border bg-surface hover:border-brand focus-visible:ring-focus-ring flex h-full flex-col gap-2 rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
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
                    <div className="border-border bg-surface-muted flex h-full flex-col gap-2 rounded-xl border border-dashed p-5">
                      <span className="text-heading flex items-start justify-between gap-2 text-base font-semibold">
                        {notebook.title}
                        <span className="text-body-text bg-surface shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
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
      </div>
    </div>
  );
}
