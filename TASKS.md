# TASKS

마일스톤별 작업 목록. 각 항목: 상태 · 산출물 · 의존성 · 테스트/완료 조건.
배경은 [`docs/PLAN.md`](docs/PLAN.md).

상태 표기: `[ ]` 대기 · `[~]` 진행 · `[x]` 완료

---

## M0 — 분석 · 계획 (승인 대기)

- [x] 저장소 분석 (빈 저장소 확인)
- [x] 사용자 결정 확정 (배포=Vercel / 폼=메일만·사본없음 / 지도=네이버 / 한국어 단일 / 로고 제공예정 / PF3D=PERFORM-3D+자체 전후처리)
- [x] 회사명 정정: 동양구조엔지니어링 (초기 오독 수정)
- [x] 회사소개 원고 수령 → `content/company/company-introduction.md`
- [x] 기술 스택 확정 · Next 16 변경점 파악 → `AGENTS.md` 규칙화
- [x] 아키텍처 2안 비교 → A안(정적+Git) 채택
- [x] 사이트맵 · 화면 목록 · 콘텐츠 모델 초안 → `docs/PLAN.md`
- [x] 프로젝트 스캐폴드 생성 (`create-next-app`, 폴더 구조, 토큰, Header/Footer/Button/Container, 홈 스캐폴드)
- [x] `lint` + `build` 통과 확인
- [x] `docs/PLAN.md` 13장 항목 회신 (배포 도메인만 미확정)
- [~] 회사소개 `/about` 페이지 구현 (M2 항목 선진행 — 원고 확보되어 먼저 완료)
- [ ] **사용자 검토 · M1 승인**

## M1 — 프로젝트 기반

- [ ] Prettier 설정 + `format` 스크립트, `lint` 규칙 확정
- [ ] `typecheck` 스크립트(`tsc --noEmit`) 추가
- [ ] GitHub Actions: install → lint → typecheck → build (E2E 제외)
- [ ] `docs/screens.md` — 9개 화면 상세 명세 (목적·데이터·컴포넌트·반응형·상태·SEO·접근권한)
- [ ] Pretendard `next/font/local` 셀프호스팅 전환, layout `<link>` 제거
- [ ] 공통 컴포넌트 확장 + 상태 정의: Section, Card(사업분야/기술자료), Breadcrumb, Badge, Tag,
      Input/Textarea/Select/FileInput, FormField, Pagination, EmptyState, ErrorState, LoadingState,
      SearchInput, FilterBar, CTASection
- [ ] `src/lib/seo` — 페이지별 metadata 헬퍼, JSON-LD(Organization) 생성기
- [ ] `app/sitemap.ts` · `app/robots.ts`
- [ ] 샘플 콘텐츠 1건씩 (`content/services`, `content/resources`) — placeholder 명시
- [ ] 테스트 환경: Vitest(unit/integration) + Playwright(e2e) 설정, 스모크 1개씩
- [ ] 완료 조건: CI 그린, Storybook 없이도 컴포넌트 상태 확인 페이지(`/_dev` 또는 문서) 존재

## M2 — 기술 사이트 MVP

- [x] `/about` — 회사소개 단일 딥페이지 (M0 에서 선진행). M1 후 MDX 이전 + `<link>` 정리
- [x] 홈 짧은 소개 카피 반영 (`content/company/company-introduction.md`)
- [ ] `/services` — 4개 분야 딥페이지 + 앵커 네비게이션, 각 분야 카드(업무·상황·범위·CTA)
      · 콘텐츠 미비 항목은 "콘텐츠 준비 중"
- [ ] 홈 세부 카피 반영 (사용자 제공 시)
- [ ] 네이버 지도 연동 (`/contact`) — API 키 없을 때 주소 링크 폴백
- [ ] `/contact` — 통합 문의 폼 UI + 회사정보 + 주소(외부 지도 링크)
- [ ] `src/lib/validation` — Zod `inquirySchema` (클라이언트/서버 공유)
- [ ] `POST /api/contact` Route Handler — 검증 · honeypot · rate limit · Resend 발송 인터페이스
      · 키 없을 때 명확한 실패 응답 + 로그
- [ ] `.env.local` 연동 문서화 (`docs/deployment.md` 초안)
- [ ] `/privacy` — 개인정보처리방침 (사용자 제공 문구)
- [ ] `not-found.tsx` · `error.tsx` · `global-error.tsx`
- [ ] 완료 조건: 키보드만으로 전 페이지 탐색 가능, 폼 검증 동작(발송은 테스트 주소), Lighthouse a11y ≥ 95

## M3 — 기술자료 & PF3D 매뉴얼

- [ ] `@next/mdx` + front matter 파서, `src/lib/content` 로더/타입
- [ ] `/resources` 목록 — 카드, 카테고리 필터, 정렬, 페이지네이션, 빈 상태
- [ ] `/resources/[slug]` 상세 — 본문 렌더, 첨부파일 목록, 메타(작성일/수정일/버전), 문의 연결
- [ ] `/resources/pf3d-manual` — 목차(TOC), 제목 앵커, 문서 내 검색, 버전 표시, 인쇄 스타일
- [ ] 하위 문서 확장 대비 라우팅 구조(`/resources/pf3d-manual/[section]`) 경계만 마련
- [ ] `src/lib/search` — 정적 인덱스(제목/요약/본문/키워드), 한글 부분 일치, 결과 하이라이트, 빈 상태
- [ ] `/contact` 지도 섹션 — 선택된 지도 공급자 임베드 또는 주소 링크
- [ ] 첨부파일 보안 — 확장자 화이트리스트, 용량 제한, `public/documents` 정리 규칙
- [ ] 완료 조건: 매뉴얼 TOC/앵커/검색 동작, 첨부 다운로드 동작, 목록↔상세 왕복 E2E 통과

## M4 — 운영 기능

- [ ] Resend 실연동 (도메인 인증 후), 발송 성공/실패 처리 · 사용자 피드백
- [ ] (사용자 승인 시) 문의 사본 경량 저장 — Google Sheet 또는 Supabase
- [ ] 로그 · 에러 추적 (Vercel 로그 우선, 필요 시 Sentry) — 최소 구성
- [ ] 콘텐츠 링크 검사 스크립트
- [ ] 완료 조건: 실제 수신함으로 테스트 문의 도달, 실패 시 폴백 안내 확인

## M5 — 검증 · 출시

- [ ] 접근성 점검 (axe, 키보드, 포커스 표시, 시맨틱 구조)
- [ ] 반응형 점검 (모바일/태블릿/데스크톱 주요 브레이크포인트)
- [ ] 성능 — 주요 공개 페이지 Lighthouse Performance ≥ 90
- [ ] 검색 품질 점검
- [ ] 보안 점검 (`/security-review`), 폼 rate limit·첨부 제한 검증
- [ ] 콘텐츠 최종 감수 (임의 생성물·placeholder 잔존 여부)
- [ ] Vercel 프로덕션 배포 · 롤백 절차 확인 · `docs/deployment.md` 확정
- [ ] 완료 조건: 핵심 사용자 플로우 E2E 통과, CI 그린, 목표 지표 달성
