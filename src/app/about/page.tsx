import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { businessAreas, company } from "@/lib/site";

/*
 * 회사소개 — 하위 메뉴 없는 단일 딥페이지 (마스터 프롬프트 9.2).
 * 카피 출처: content/company/company-introduction.md (사용자 제공). 문구 임의 변경 금지.
 * 공공 자문 이력은 검증된 1건만 노출한다(원고의 "공개 전 주의" 참고).
 */

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "동양구조엔지니어링은 건축구조설계, 안전진단·점검, 내진성능평가, 공사 중 안전점검과 해체공사 구조검토를 수행하는 건축구조 전문기업입니다.",
};

const coreValues = [
  {
    en: "Safety",
    ko: "안전성",
    body: "모든 판단의 출발점은 안전입니다. 관련 기준과 현장 조건을 면밀히 검토하고, 작은 위험 요소도 놓치지 않도록 책임 있게 업무를 수행합니다.",
  },
  {
    en: "Expertise",
    ko: "전문성",
    body: "구조설계, 시공, 안전진단과 내진 분야의 전문 인력이 지식과 경험을 공유합니다. 복합적인 문제를 한 가지 관점으로 판단하지 않고 여러 분야의 시각에서 검토합니다.",
  },
  {
    en: "Trust",
    ko: "신뢰성",
    body: "근거가 분명한 검토와 일관된 품질을 통해 신뢰를 쌓습니다. 결과만 전달하는 것이 아니라 판단의 기준과 이유를 이해하기 쉽게 설명합니다.",
  },
  {
    en: "Communication",
    ko: "지속적인 소통",
    body: "좋은 엔지니어링은 충분한 소통에서 시작됩니다. 고객과 프로젝트 관계자의 요구를 정확히 이해하고, 검토 과정과 주요 판단 사항을 투명하게 공유합니다.",
  },
];

const companyInfo: Array<{ label: string; value: string; href?: string }> = [
  { label: "회사명", value: company.name },
  { label: "대표", value: company.representative },
  { label: "사업자등록번호", value: company.businessRegistrationNumber },
  { label: "주소", value: company.address },
  { label: "전화", value: company.tel, href: `tel:${company.tel}` },
  { label: "팩스", value: company.fax },
  { label: "이메일", value: company.email, href: `mailto:${company.email}` },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-surface">
        <Container className="py-20 sm:py-24">
          <p className="text-label text-primary">회사소개</p>
          <h1 className="text-h1 mt-3 max-w-3xl">{company.tagline}</h1>
          <div className="text-body-lg mt-6 max-w-2xl space-y-4">
            <p>
              동양구조엔지니어링은 구조설계부터 안전진단·점검, 공사 중 안전관리, 해체공사
              구조검토까지 건축물의 생애주기 전반에 필요한 구조 엔지니어링 서비스를
              제공합니다.
            </p>
            <p>
              정확한 기술 검토와 책임 있는 판단, 고객과의 지속적인 소통을 바탕으로 더
              안전하고 합리적인 해답을 제시합니다.
            </p>
          </div>
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

      {/* 2. 회사 소개 */}
      <section>
        <Container className="py-16">
          <h2 className="text-h2">구조안전을 위한 정확한 판단</h2>
          <div className="text-body mt-6 max-w-3xl space-y-4">
            <p>
              건축물의 안전은 경험만으로도, 계산만으로도 완성되지 않습니다. 현장의 조건을
              정확히 이해하고, 기준과 데이터를 바탕으로 검토하며, 프로젝트 관계자와 충분히
              소통하는 과정이 함께해야 합니다.
            </p>
            <p>
              동양구조엔지니어링은 건축구조설계, 구조감리와 보강, 정기안전점검,
              정밀안전진단, 내진성능평가, 공사 중 안전점검 및 해체공사 구조검토 등 다양한
              업무를 수행합니다. 각 업무의 목적과 현장 여건을 면밀히 살피고, 안전성과 실현
              가능성을 함께 고려한 엔지니어링 서비스를 제공합니다.
            </p>
            <p>
              우리는 익숙한 방식에 머무르지 않습니다. 더 정확하게 검토하고, 더 효율적으로
              협업하며, 더 명확하게 설명하기 위해 업무 방식과 기술 역량을 지속적으로
              개선합니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 3. 우리의 경쟁력 */}
      <section className="bg-surface">
        <Container className="py-16">
          <h2 className="text-h2">전문성과 실행력을 갖춘 엔지니어링 팀</h2>
          <div className="text-body mt-6 max-w-3xl space-y-4">
            <p>
              동양구조엔지니어링은 젊은 엔지니어들의 민첩한 실행력과 풍부한 현장 경험을
              갖춘 전문가의 판단이 조화를 이루는 조직입니다.
            </p>
            <p>
              구조기술사와 시공기술사를 포함한 다양한 전문 인력이 각자의 경험과 관점을
              공유하며 하나의 해답을 만들어갑니다. 세대와 분야를 아우르는 협업을 통해
              설계와 시공, 안전점검과 유지관리까지 폭넓게 검토합니다.
            </p>
            <p>
              빠르게 변화하는 설계 기준과 건설 환경에 대응하기 위해 지속적으로 학습하고
              기술을 공유하며, 새로운 도구와 업무 방식을 적극적으로 받아들입니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 4. 핵심 가치 */}
      <section>
        <Container className="py-16">
          <h2 className="text-h2">핵심 가치</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {coreValues.map((value) => (
              <li
                key={value.en}
                className="rounded-card border-border bg-surface border p-6"
              >
                <h3 className="text-h4 text-heading">
                  {value.en} · {value.ko}
                </h3>
                <p className="text-small mt-2">{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. 업무 인프라 */}
      <section className="bg-surface">
        <Container className="py-16">
          <h2 className="text-h2">축적된 정보를 연결하는 협업 체계</h2>
          <div className="text-body mt-6 max-w-3xl space-y-4">
            <p>
              동양구조엔지니어링은 중앙화된 사내 자료관리 및 협업 인프라를 바탕으로
              프로젝트 자료, 기술 문서와 업무 이력을 체계적으로 관리합니다.
            </p>
            <p>
              필요한 정보를 빠르게 확인하고 구성원이 동일한 자료를 기준으로 협업할 수
              있도록 업무 환경을 지속적으로 개선하고 있습니다. 이를 통해 반복 업무를
              줄이고 검토의 연속성과 업무 효율을 높이며, 프로젝트별 기술 자료가 안전하게
              축적될 수 있도록 관리합니다.
            </p>
            <p>
              특정 저장장치나 네트워크 구성 등 보안에 영향을 줄 수 있는 상세 인프라는
              외부에 공개하지 않습니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. 공공 자문 및 전문 활동 */}
      <section>
        <Container className="py-16">
          <h2 className="text-h2">현장 경험을 공공의 안전으로 확장합니다</h2>
          <div className="text-body mt-6 max-w-3xl space-y-4">
            <p>
              동양구조엔지니어링은 실무에서 축적한 구조 엔지니어링 경험을 바탕으로
              건축구조와 안전 분야의 공공 자문 및 기술심의 활동에 참여해 왔습니다.
            </p>
            <p>
              김용철 대표는 2021년 대전광역시 건설기술심의위원회 건축구조 분야 위원으로
              위촉되어 콘크리트구조 및 내진·구조해석 분야의 전문성을 인정 받았습니다.
            </p>
            <p>
              또한 건축구조안전 자문, 주택건설사업 통합심의 및 관계 기관의 기술 자문 등
              다양한 전문 활동을 통해 안전한 건축 환경을 만드는 데 기여하고 있습니다.
            </p>
          </div>
          <ul className="text-body marker:text-primary mt-6 max-w-3xl list-disc space-y-2 pl-5">
            <li>2021년 대전광역시 건설기술심의위원회 건축구조 분야 위원</li>
            {/*
              원고의 "공개 전 주의"에 따라, 검증되지 않은 아래 항목은 노출하지 않는다.
              위촉장·공식 명단으로 정확한 위원회 명칭과 활동 기간을 확인한 뒤 추가할 것.
                - 건축구조안전 관련 자문 활동
                - 세종특별자치시 주택건설사업 통합심의 관련 전문 활동
                - 대전지방법원 및 대전광역시 관련 기술 자문 활동
            */}
          </ul>
        </Container>
      </section>

      {/* 사업분야 요약 */}
      <section className="bg-surface">
        <Container className="py-16">
          <h2 className="text-h2">네 가지 전문 분야</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {businessAreas.map((area) => (
              <li
                key={area.id}
                className="rounded-card border-border bg-background border p-6"
              >
                <h3 className="text-h4 text-heading">{area.label}</h3>
                <p className="text-small mt-2">{area.summary}</p>
                <a
                  href={`/services#${area.id}`}
                  className="text-label text-primary hover:text-primary-hover mt-4 inline-block"
                >
                  자세히 보기 →
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 회사 기본 정보 */}
      <section>
        <Container className="py-16">
          <h2 className="text-h2">회사 기본 정보</h2>
          <dl className="divide-border border-border mt-8 max-w-2xl divide-y border-y">
            {companyInfo.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="text-label text-heading">{row.label}</dt>
                <dd className="text-body">
                  {row.href ? (
                    <a href={row.href} className="hover:text-primary">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 7. 마무리 메시지 + CTA */}
      <section className="bg-primary-light">
        <Container className="py-16">
          <h2 className="text-h3 text-heading">신뢰할 수 있는 구조 엔지니어링 파트너</h2>
          <div className="text-body mt-4 max-w-3xl space-y-4">
            <p>
              동양구조엔지니어링이 지향하는 것은 단순한 검토 결과의 제출이 아닙니다.
              고객이 안심하고 다음 단계로 나아갈 수 있도록 명확한 근거와 현실적인 해결책을
              제공하는 것입니다.
            </p>
            <p>
              안전성, 전문성, 신뢰성 그리고 지속적인 소통을 바탕으로 건축물의 가치를
              지키고 프로젝트의 성공을 함께 만들어가는 엔지니어링 파트너가 되겠습니다.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              동양구조엔지니어링에 문의하기
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
