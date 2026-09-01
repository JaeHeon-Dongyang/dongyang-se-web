import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { LogoSymbol } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <LogoSymbol className="mb-8 h-[90px] w-[90px]" />
      <span className="text-brand text-sm font-semibold tracking-[0.15em]">
        ERROR 404
      </span>
      <h1 className="text-heading mt-4 text-3xl font-bold md:text-4xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-body mt-4 max-w-md text-sm leading-relaxed md:text-base">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다. 아래 버튼을 통해
        홈으로 이동하거나 다른 페이지를 확인해 주세요.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="group bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          홈으로 돌아가기
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/contact"
          className="border-border bg-surface text-heading hover:bg-muted focus-visible:ring-focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          문의하기
        </Link>
      </div>
    </div>
  );
}
