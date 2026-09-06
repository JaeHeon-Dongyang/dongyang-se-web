import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServiceContactCta() {
  return (
    <section className="container-site pb-16 md:pb-20">
      <div className="flex flex-wrap items-center justify-between gap-6 bg-[#f1f6f2] p-7 md:p-10">
        <div>
          <h2 className="text-heading text-xl font-bold tracking-[-0.03em] md:text-2xl">
            구조 안전에 관한 전문 검토가 필요하신가요?
          </h2>
          <p className="mt-2 max-w-[44em] text-[14.5px] leading-[1.8] text-[#4a5049]">
            건축물의 용도와 현재 단계, 확인이 필요한 사항을 알려주시면 적합한 업무 범위와
            진행 절차를 안내해 드립니다.
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-brand hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          문의하기
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
