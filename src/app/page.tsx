import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { businessAreas, company } from "@/lib/site";

/*
 * 홈.
 * 카피는 content/company/company-introduction.md 의 "홈페이지용 짧은 소개" 를 사용한다.
 * (M1 에서 MDX 로 이전 예정)
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <Container className="py-20 sm:py-28">
          <p className="text-label text-primary">건축구조 전문기업</p>
          <h1 className="text-display mt-3 max-w-3xl">{company.tagline}</h1>
          <p className="text-body-lg mt-6 max-w-2xl">
            {company.name}은 구조설계, 안전진단·점검, 공사 중 안전관리와 해체공사
            구조검토를 수행하는 건축구조 전문기업입니다. 구조기술사와 시공기술사를 포함한
            전문 인력, 체계적인 협업 인프라와 지속적인 소통을 바탕으로 안전하고 합리적인
            해결책을 제공합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/services" size="lg">
              사업분야 알아보기
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              문의하기
            </Button>
          </div>
        </Container>
      </section>

      {/* 사업분야 요약 */}
      <section>
        <Container className="py-20">
          <h2 className="text-h2">사업분야</h2>
          <p className="text-body mt-2">
            4개 전문 분야로 건축물의 생애주기 전반을 지원합니다.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {businessAreas.map((area) => (
              <li
                key={area.id}
                className="rounded-card border-border bg-surface border p-6"
              >
                <h3 className="text-h4 text-heading">{area.label}</h3>
                <p className="text-small mt-2">{area.summary}</p>
                <Link
                  href={`/services#${area.id}`}
                  className="text-label text-primary hover:text-primary-hover mt-4 inline-block"
                >
                  자세히 보기 →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 문의 CTA */}
      <section className="bg-primary-light">
        <Container className="py-16 text-center">
          <h2 className="text-h3 text-heading">프로젝트 문의가 있으신가요?</h2>
          <p className="text-body mt-2">
            사업 내용을 확인하시고 통합 문의 폼으로 연락 주세요.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" size="lg">
              문의하기
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
