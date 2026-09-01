/**
 * "질문하기"(/ask)와 "기술자료"(/resources)는 사내 전용이다. 외부망에서는
 * middleware.ts 가 not-found 를 반환하므로 메뉴를 눌러도 열리지 않는다.
 */
export const primaryNav = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "사업분야", href: "/services" },
  { label: "기술자료", href: "/resources" },
  { label: "질문하기", href: "/ask" },
] as const;

export const contactNav = { label: "문의하기", href: "/contact" } as const;

/**
 * 개인정보처리방침은 초안 검증 전이라 링크하지 않는다.
 * 검증 후 { label: "개인정보처리방침", href: "/privacy" } 추가. (docs/PLAN.md)
 */
export const footerLegalNav: ReadonlyArray<{ label: string; href: string }> = [];
