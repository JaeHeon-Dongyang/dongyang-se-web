import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContactCta({
  title = "구조 안전에 관한 검토가 필요하신가요?",
  description = "구조설계, 안전진단, 공사 중 안전관리, 해체공사 구조검토까지 프로젝트에 필요한 사항을 알려주시면 담당 엔지니어가 신속히 답변드립니다.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("container-site", className)}>
      <div className="bg-heading flex flex-col items-start gap-6 rounded-3xl px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12 md:py-14">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-balance text-white md:text-3xl">
            {title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/70 md:text-base">
            {description}
          </p>
        </div>
        <Link
          href="/contact"
          className="group bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring focus-visible:ring-offset-heading inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
