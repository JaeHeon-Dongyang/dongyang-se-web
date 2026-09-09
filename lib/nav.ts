/**
 * "질문하기"(/ask)와 "기술자료"(/resources)는 접근 제한 대상이다. 기본값은 공개이며,
 * 제한을 켜면 클라이언트가 사내망 여부를 확인한 뒤 `intranetOnly` 메뉴 노출을 결정한다.
 * proxy.ts 는 직접 URL 접근·북마크에 대비한 방어선이다.
 */
export const primaryNav = [
  { label: "회사소개", href: "/", intranetOnly: false },
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
