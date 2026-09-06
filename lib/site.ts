/**
 * 사이트 전역 상수.
 *
 * 회사 정보는 마스터 프롬프트 2장에서 "확정"으로 제공된 실제 값이다. 임의로 수정하지 말 것.
 * 내비게이션은 `lib/nav.ts`, 사업분야 데이터는 `lib/services-data.ts` 참고.
 */

export const company = {
  name: "(주)동양구조엔지니어링",
  representative: "김용철",
  businessRegistrationNumber: "314-81-44186",
  tel: "042-472-9782",
  fax: "042-482-9782",
  email: "dy8000@daum.net",
  address: "대전광역시 유성구 유성대로654번길 38, 5층",
  /** 홈/회사소개 Hero 헤드라인 (content/company/company-introduction.md) */
  tagline: "안전을 설계하고, 신뢰를 쌓습니다",
} as const;

export const contactLinks = {
  tel: `tel:${company.tel}`,
  mailto: `mailto:${company.email}`,
} as const;

/**
 * 사이트 절대 URL. 우선순위:
 * 1. NEXT_PUBLIC_SITE_URL — 실제 도메인 연결 시 명시적으로 지정
 * 2. VERCEL_PROJECT_PRODUCTION_URL — Vercel 이 배포마다 자동 주입 (무료 플랜 포함, 설정 불필요)
 * 3. 로컬 개발 기본값
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteMeta = {
  title: company.name,
  titleTemplate: `%s | ${company.name}`,
  description:
    "동양구조엔지니어링은 구조설계, 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토까지 건축물의 생애주기 전반에 필요한 구조 엔지니어링 서비스를 제공합니다.",
  locale: "ko_KR",
} as const;
