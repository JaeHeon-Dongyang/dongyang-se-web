import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company, contactLinks, navigation } from "@/lib/site";

/**
 * 사이트 푸터.
 * 표기 순서는 마스터 프롬프트 2장의 푸터 표기 예시를 따른다.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <p className="text-h4 text-heading">{company.name}</p>
          <address className="space-y-1 text-small not-italic text-text">
            <p>
              대표 {company.representative} | 사업자등록번호{" "}
              {company.businessRegistrationNumber}
            </p>
            <p>{company.address}</p>
            <p>
              T.{" "}
              <a href={contactLinks.tel} className="hover:text-primary">
                {company.tel}
              </a>{" "}
              | F. {company.fax} | E.{" "}
              <a href={contactLinks.mailto} className="hover:text-primary">
                {company.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="푸터 메뉴" className="flex flex-col gap-2 text-small">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-text hover:text-primary">
              {item.label}
            </Link>
          ))}
          <Link href="/privacy" className="text-text hover:text-primary">
            개인정보처리방침
          </Link>
        </nav>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-caption text-muted">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
