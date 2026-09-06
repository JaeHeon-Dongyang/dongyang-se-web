import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContactCta({
  title = "구조 안전에 관한 검토가 필요하신가요?",
  description = "건축물 개요와 확인하고 싶은 사항을 알려주시면 담당 엔지니어가 검토 범위와 절차를 안내드립니다.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-heading", className)}>
      <div className="container-site flex flex-col items-start gap-7 py-12 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="flex flex-col gap-3">
          <h2 className="max-w-[22em] text-2xl leading-[1.2] font-extrabold tracking-[-0.035em] text-balance text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-[40em] text-sm leading-[1.8] text-pretty text-white/70 md:text-[15.5px]">
            {description}
          </p>
        </div>
        <Link
          href="/contact"
          className="group bg-background text-heading hover:bg-surface-muted focus-visible:ring-focus-ring focus-visible:ring-offset-heading inline-flex shrink-0 items-center gap-3 px-7 py-[18px] text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          문의하기
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
