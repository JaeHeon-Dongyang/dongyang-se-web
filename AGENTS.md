<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 동양구조엔지니어링 웹사이트 — 프로젝트 규칙

## 개요

구조 엔지니어링·안전진단 전문기업 **동양구조엔지니어링**의 공식 웹사이트.
전체 배경과 계획은 [`docs/PLAN.md`](docs/PLAN.md), 작업 목록은 [`TASKS.md`](TASKS.md) 참고.
원본 요청서는 [`docs/master-prompt-source.md`](docs/master-prompt-source.md) (ChatGPT 작성, 강제 사양 아님).

## 스택

- Next.js 16 (App Router, Turbopack) · React 19.2 · TypeScript
- Tailwind CSS v4 + **shadcn/ui** (`@base-ui/react`), lucide-react, class-variance-authority
- 디자인 토큰: `app/globals.css` (`:root` CSS 변수 + `@theme inline`)
- 배포: Vercel (저장소 public) · 폼 전송: 트랜잭션 메일(Resend, 서버 라우트) — DB 없음

## 언어 규칙

- **사용자 노출 텍스트·주석·문서: 한국어**
- **코드 식별자(변수·함수·파일·타입): 영어**

## 코드 규칙

- 커밋 전 `npm run lint` · `npm run typecheck` · `npm run build` · `npm run format:check` 통과.
- **커밋 메시지에 Claude 공동작성자(Co-Authored-By) 트레일러를 넣지 않는다** (Vercel Hobby 배포 차단 원인).
- React 19 규칙 준수: effect 안에서 동기 `setState` 금지.
- `params` / `searchParams` / `cookies()` / `headers()` 는 항상 `await`.
- 회사 정보(상호·대표·주소·연락처)는 `lib/site.ts` 가 유일 출처. 임의 변경 금지.
- **제공되지 않은 회사 정보·법령·실적·인증·연혁·수치는 만들지 않는다.** V0 가 생성한
  가짜 실적/연혁/인증/통계는 이미 제거함. 필요한 자리엔 "준비 중" 표시.
- 외부 사이트의 코드·문구·이미지·로고를 복제하지 않는다.
- 비밀키·계정정보는 코드에 넣지 않는다. `.env.local` 사용, 예시는 `.env.example`.
- `components/ui/*` 는 shadcn 생성 파일 — Prettier/직접 수정 대상에서 제외(`shadcn` CLI 로 갱신).

## 디렉터리 (V0 베이스)

- `app/` — 라우트 (layout, page, api, sitemap.ts, robots.ts, error, global-error, not-found)
- `components/` — `ui/`(shadcn) + 도메인별 컴포넌트(home/, about/, services/, resources/, contact/)
- `lib/` — `site.ts`(회사 상수), `seo.ts`, `nav.ts`, `utils.ts`(cn), `services-data.ts`, `resources-data.ts`
- `content/` — 사용자 제공 원고. `public/logo/` — 로고 에셋. `public/images/` — 이미지.
- `docs/` — 설계 문서. `tests/{unit,integration,e2e}` — 테스트(미구성).
- 경로 alias `@/*` → 저장소 루트.

## 정보 구조 (변경 시 합의 필요)

글로벌 메뉴는 **홈 / 회사소개 / 사업분야 / 기술자료 / 문의하기** 5개로 고정 (`lib/nav.ts`).
회사소개·사업분야는 하위 메뉴 없는 단일 딥페이지. PF3D 매뉴얼은 별도 메뉴가 아니라
기술자료 게시물 1건으로 취급한다.

## 작업 분담 (V0 + Claude, 같은 저장소)

디자인은 V0, 기능은 Claude. 파일 담당 표와 병합 규칙은 [`docs/workflow.md`](docs/workflow.md).
요약: V0 = `app/globals.css` + `components/**` 스타일 + `public/images/**`.
Claude = `app/api/**`, `lib/**`, `app/sitemap.ts`·`robots.ts`, `metadata`, `content/**`, `docs/**`.
V0 는 `design` 브랜치(또는 PR)로만 들어오고, 디자인 diff 만 `main` 에 반영한다.
V0 diff 가 `app/about/page.tsx` 를 "2012년 설립/480건+" 로 되돌리면 병합 금지 (가짜 콘텐츠).

## 디자인

- **V0 디자인을 베이스로 채택.** 색 체계는 V0 대로 **2톤 그린**:
  `--brand`/`--primary` = `#0b6c43` (로고색, primary 버튼·링크·활성 메뉴),
  `--accent-green` = `#47b089` (아이콘·필터·강조·포커스 링).
- 라이트 단일 테마. Pretendard Variable (`next/font/local`, `app/fonts/`).
- 사용자가 V0에서 디자인을 계속 다듬어 추후 재전달 가능 → 큰 레이아웃 변경은 합의 후.

## 도메인 메모

- **PF3D** = 자체 개발한 PERFORM-3D 전처리·후처리 프로그램. PERFORM-3D 는 CSI 의 외부 제품이며
  항상 CSI 제품으로 표기하고 CSI 콘텐츠를 복제하지 않는다.
- 지도는 **네이버 지도**. API 키 없이 주소 링크로 위치 확인 가능해야 한다 (`components/contact/contact-info.tsx`).
- 로고: `components/logo.tsx` 는 **V0 인라인 SVG 마크**를 쓴다 (사용자 선택). `public/logo/**` 의
  실제 에셋은 favicon/아이콘(`app/favicon.ico`·`icon.png`·`apple-icon.png`)에만 사용.
- 회사소개 원고: `content/company/company-introduction.md` (임의 수정 금지). 공공 자문 이력 중
  검증된 항목(2021 대전광역시 건설기술심의위원회)만 노출.
- 개인정보처리방침(`/privacy`)·PF3D 매뉴얼은 초안 검증 전까지 내비/푸터 링크 없음 + `noindex`.
