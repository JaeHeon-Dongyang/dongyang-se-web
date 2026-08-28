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
- [x] 회사소개 `/about` 페이지 구현 (원고 확보되어 선진행)
- [x] 색 체계 `#47b089` 단일 재확인 / v0 디자인 프롬프트 미채택 (V0 디자인 추후 수령)
- [x] 배포 도메인 확정: https://dongyang-web-nine.vercel.app

## M0.5 — V0 디자인 채택 (완료)

- [x] V0 프로젝트를 베이스로 병합 (src/ → 루트 app/·components/·lib/)
- [x] V0 생성 가짜 콘텐츠 제거 (about 통계·연혁·인증, resources 가짜 목록, privacy AI 문안)
- [x] 인프라 재적용: lib/site.ts·seo.ts, sitemap.ts·robots.ts, error/global-error, layout 메타·JSON-LD
- [x] 2톤 그린 색 체계(V0), Pretendard next/font/local, favicon/아이콘(로고 심벌)
- [x] 로고: V0 인라인 SVG 마크 (사용자 선택)
- [x] 네이버 지도 링크(contact-info)
- [x] 브랜치 분리: main(프로덕션) / design(V0) / dev(Claude)
- [x] Vercel Hobby 배포: 저장소 public 전환

## M1 — 프로젝트 기반

- [x] Prettier(+tailwind plugin), `format`/`typecheck` 스크립트
- [x] GitHub Actions CI: format → lint → typecheck → build
- [x] Pretendard `next/font/local` 셀프호스팅
- [x] favicon / icon / apple-icon (로고 심벌)
- [x] `lib/seo.ts` — `buildMetadata` 헬퍼, Organization JSON-LD
- [x] `app/sitemap.ts` · `app/robots.ts` (privacy·pf3d 제외)
- [x] `not-found.tsx` · `error.tsx` · `global-error.tsx`
- [x] `lib/validation/inquiry.ts` — Zod `inquirySchema` (클라/서버 공용, honeypot·동의 포함)
- [x] `POST /api/contact` — 검증(422) · honeypot(silent 200) · IP rate limit(429) · Resend fetch 전송
      · 키 없으면 503 `not_configured` + 서버 로그(유실 방지)
- [x] `components/contact/contact-form.tsx` — 목업 제거, `/api/contact` 연결, 상태(submitting/success/error)
- [ ] `docs/deployment.md` — env 주입, Resend 계정·발신 도메인 인증 절차
- [ ] `lib/content` — MDX + front matter 로더/타입 (services·resources 공용)
- [ ] 테스트 환경: Vitest + Playwright 설정, 스모크 각 1개
- [ ] `/api/contact` 검증 로직 유닛테스트

## M1.5 — 콘텐츠 반영 (UTF-8 원고 수령 후)

- [ ] `content/services/*` — 사업분야 원고 → `lib/services-data.ts` 정교화 / `/services` 반영
- [ ] `content/legal/privacy-policy*` — `/privacy` 실문안 (내비/푸터 링크·색인은 검증 후)
- [ ] `content/resources/pf3d-manual/*` — `lib/resources-data.ts` + `/resources/pf3d-manual` (내비/링크 없음)

## M2 — 기술 사이트 MVP

- [x] `/about` — 회사소개 단일 딥페이지 (M0 에서 선진행). M1 후 MDX 이전 + `<link>` 정리
- [x] 홈 짧은 소개 카피 반영 (`content/company/company-introduction.md`)
- [ ] `/services` — 4개 분야 딥페이지 + 앵커 네비게이션, 각 분야 카드(업무·상황·범위·CTA)
      · 콘텐츠 미비 항목은 "콘텐츠 준비 중"
- [ ] 홈 세부 카피 반영 (사용자 제공 시)
- [ ] 네이버 지도 연동 (`/contact`) — API 키 없을 때 주소 링크 폴백
- [x] `/contact` — 통합 문의 폼 UI + 회사정보 + 네이버 지도 링크 (V0 + 백엔드 연결)
- [x] `/privacy`, `not-found`/`error`/`global-error` (M0.5·M1 에서 완료)
- [ ] 첨부파일 지원 (현재는 "회신 이메일로 별도 전달" 안내) — 후순위
- [ ] 완료 조건: 키보드만으로 전 페이지 탐색, 폼 검증 동작, 실제 수신 테스트(키 주입 후), Lighthouse a11y ≥ 95

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
