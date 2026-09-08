"use client";

import Link from "next/link";
import { useIntranetAccess } from "@/components/intranet-access-provider";
import { LogoHorizontal } from "@/components/logo";
import { footerLegalNav, primaryNav } from "@/lib/nav";
import { company, contactLinks } from "@/lib/site";

export function SiteFooter() {
  const intranet = useIntranetAccess();
  const navItems = primaryNav.filter((item) => intranet || !item.intranetOnly);

  return (
    <footer className="border-input bg-background border-t">
      <div className="container-site">
        <div className="flex flex-col gap-10 py-10 md:flex-row md:gap-16 md:py-16 lg:gap-20">
          <div className="flex max-w-md flex-[2] flex-col gap-5">
            <LogoHorizontal />
            <p className="text-body-text text-sm leading-relaxed">
              구조설계, 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토 분야 등에서
              안전하고 신뢰할 수 있는 전문 엔지니어링 서비스를 제공합니다.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="푸터 내비게이션" className="flex min-w-36 flex-col gap-3">
              <span className="text-heading text-xs font-semibold tracking-[0.1em] uppercase">
                MENU
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

            <div className="flex min-w-52 flex-col gap-3">
              <span className="text-heading text-xs font-semibold tracking-[0.1em] uppercase">
                CONTACT
              </span>
              <a
                href={contactLinks.tel}
                className="text-body-text hover:text-brand text-sm tabular-nums transition-colors"
              >
                T. {company.tel}
              </a>
              <span className="text-body-text text-sm tabular-nums">
                F. {company.fax}
              </span>
              <a
                href={contactLinks.mailto}
                className="text-body-text hover:text-brand text-sm transition-colors"
              >
                {company.email}
              </a>
              <p className="text-body-text text-sm leading-relaxed">{company.address}</p>
            </div>
          </div>
        </div>

        <div className="border-border text-body-text/70 flex flex-col gap-4 border-t py-5 text-[11.5px] tracking-[0.02em] md:flex-row md:items-center md:justify-between md:pb-9">
          <p>
            {company.name} · 대표 {company.representative} · 사업자등록번호{" "}
            {company.businessRegistrationNumber}
          </p>
          <div className="flex items-center gap-4">
            {footerLegalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
            <span>&copy; {new Date().getFullYear()} DONGYANG SE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
