/**
 * 사이트 전역 상수.
 *
 * 회사 정보는 마스터 프롬프트 2장에서 "확정"으로 제공된 실제 값이다.
 * 임의로 수정하지 말 것. 그 외 카피/설명은 콘텐츠 파일(`content/`)에서 관리한다.
 */

export const company = {
  name: "동양구조엔지니어링",
  representative: "김용철",
  businessRegistrationNumber: "314-81-44186",
  tel: "042-472-9782",
  fax: "042-482-9782",
  email: "dy8000@daum.net",
  address: "대전광역시 유성구 유성대로654번길 38, 5층",
  /** 홈/회사소개 Hero 헤드라인 (content/company/company-introduction.md) */
  tagline: "안전을 설계하고, 신뢰를 쌓습니다",
} as const;

/** `tel:` / `mailto:` 링크용 값 */
export const contactLinks = {
  tel: `tel:${company.tel}`,
  mailto: `mailto:${company.email}`,
} as const;

/** 사이트 배포 URL. 배포 시 NEXT_PUBLIC_SITE_URL 로 주입한다. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const siteMeta = {
  title: company.name,
  titleTemplate: `%s | ${company.name}`,
  description:
    "동양구조엔지니어링은 건축구조설계, 안전진단·점검, 내진성능평가, 공사 중 안전점검과 해체공사 구조검토를 수행하는 건축구조 전문기업입니다.",
  locale: "ko_KR",
} as const;

/** 글로벌 내비게이션 — 마스터 프롬프트 7장의 5개 메뉴만 사용한다. */
export const navigation = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "사업분야", href: "/services" },
  { label: "기술자료", href: "/resources" },
  { label: "문의하기", href: "/contact" },
] as const;

/**
 * 4개 사업분야. `id` 는 `/services#<id>` 앵커와 코드 식별자로 쓰인다.
 * `label` 은 마스터 프롬프트 4장에서 지정한 사용자 노출 명칭이다.
 */
export const businessAreas = [
  {
    id: "structural-design",
    label: "구조설계",
    summary: "건축구조설계, 구조감리, 구조 보강 설계.",
  },
  {
    id: "safety-inspection",
    label: "안전진단·점검",
    summary:
      "정기안전점검(3종시설물), 정밀안전진단·정밀안전점검, 내진성능평가·내진보강, 건축물관리점검.",
  },
  {
    id: "construction-safety",
    label: "공사 중 안전관리",
    summary: "공사 중 안전점검, 안전관리계획 검토.",
  },
  {
    id: "demolition-review",
    label: "해체공사 구조검토",
    summary: "해체공사 구조검토.",
  },
] as const;

export type BusinessAreaId = (typeof businessAreas)[number]["id"];
