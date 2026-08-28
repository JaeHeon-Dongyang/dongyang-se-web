/**
 * 기술자료 데이터.
 *
 * 실제 콘텐츠(사업분야 기술문서, PF3D 사용 매뉴얼 등)는 사용자 제공 예정이며,
 * 확정 전까지 임의 항목을 만들지 않는다. 지금은 빈 목록으로 두고 각 페이지는
 * "콘텐츠 준비 중" 빈 상태를 렌더한다. (docs/PLAN.md — M3)
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Attachment = {
  name: string;
  size: string;
  type: string;
};

export type Resource = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  updatedAt: string;
  attachments?: Attachment[];
  body: ContentBlock[];
  related?: string[];
  version?: string;
};

export const resourceCategories = [
  "전체",
  "기술 문서",
  "기술 가이드",
  "참고자료",
  "프로그램 매뉴얼",
] as const;

export const resources: Resource[] = [];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}
