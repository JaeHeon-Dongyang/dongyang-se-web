import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { LogoHorizontal } from "@/components/logo";
import { footerLegalNav, type primaryNav } from "@/lib/nav";

export function SiteFooter({
  navItems,
}: {
  navItems: ReadonlyArray<(typeof primaryNav)[number]>;
}) {
  return (
    <footer className="border-border bg-surface border-t">
      <div className="container-site flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <LogoHorizontal />
            <p className="text-body-text text-sm leading-relaxed">
              동양구조엔지니어링은 구조설계, 안전진단·점검, 공사 중 안전관리, 해체공사
              구조검토 분야에서 안전하고 신뢰할 수 있는 전문 엔지니어링 서비스를
              제공합니다.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="푸터 내비게이션" className="flex flex-col gap-3">
              <span className="text-heading text-xs font-semibold tracking-[0.1em] uppercase">
                메뉴
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-body-text hover:text-brand text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-body-text hover:text-brand text-sm transition-colors"
              >
                문의하기
              </Link>
            </nav>

            <div className="flex flex-col gap-3">
              <span className="text-heading text-xs font-semibold tracking-[0.1em] uppercase">
                연락처
              </span>
              <a
                href="tel:042-472-9782"
                className="text-body-text hover:text-brand flex items-center gap-2 text-sm transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                042-472-9782
              </a>
              <a
                href="mailto:dy8000@daum.net"
                className="text-body-text hover:text-brand flex items-center gap-2 text-sm transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                dy8000@daum.net
              </a>
              <p className="text-body-text text-sm leading-relaxed">
                대전광역시 유성구 유성대로654번길 38, 5층
              </p>
            </div>
          </div>
        </div>

        <div className="border-border text-body-text/80 flex flex-col gap-4 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            (주)동양구조엔지니어링 · 대표 김용철 · 사업자등록번호 314-81-44186 · 팩스
            042-482-9782
          </p>
          <div className="flex items-center gap-4">
            {footerLegalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
            <span>&copy; {new Date().getFullYear()} Dongyang Structural Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
