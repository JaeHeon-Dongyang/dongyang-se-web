/**
 * "질문하기"(/ask)와 "기술자료"(/resources)는 사내 전용이다. `intranetOnly` 항목은
 * app/layout.tsx 가 사내망이 아닐 때 메뉴에서 아예 제외한다(middleware.ts 는 직접
 * URL 접근·북마크에 대비한 방어선으로 not-found 를 반환).
 */
export const primaryNav = [
  { label: "홈", href: "/", intranetOnly: false },
  { label: "회사소개", href: "/about", intranetOnly: false },
  { label: "사업분야", href: "/services", intranetOnly: false },
  { label: "기술자료", href: "/resources", intranetOnly: true },
  { label: "질문하기", href: "/ask", intranetOnly: true },
] as const;

export const contactNav = { label: "문의하기", href: "/contact" } as const;

/**
 * 개인정보처리방침은 초안 검증 전이라 링크하지 않는다.
 * 검증 후 { label: "개인정보처리방침", href: "/privacy" } 추가. (docs/PLAN.md)
 */
export const footerLegalNav: ReadonlyArray<{ label: string; href: string }> = [];
