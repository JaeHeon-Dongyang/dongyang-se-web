"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(M4): 에러 추적 서비스로 전송
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-brand text-sm font-semibold tracking-[0.15em]">ERROR</span>
      <h1 className="text-heading mt-4 text-3xl font-bold md:text-4xl">
        문제가 발생했습니다
      </h1>
      <p className="text-body-text mt-4 max-w-md text-sm leading-relaxed md:text-base">
        일시적인 오류일 수 있습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="group bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          다시 시도
        </button>
        <Link
          href="/"
          className="border-border bg-surface text-heading hover:bg-muted focus-visible:ring-focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          홈으로
        </Link>
      </div>
    </div>
  );
}
