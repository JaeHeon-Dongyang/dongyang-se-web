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
- Tailwind CSS v4 (`@theme` 토큰, `src/app/globals.css`)
- 배포: Vercel · 폼 전송: 트랜잭션 메일(Resend, 서버 라우트) — DB 없음

## 언어 규칙

- **사용자 노출 텍스트·주석·문서: 한국어**
- **코드 식별자(변수·함수·파일·타입): 영어**

## 코드 규칙

- 커밋 전 `npm run lint` 와 `npm run build` 통과 필수.
- React 19 규칙 준수: effect 안에서 동기 `setState` 금지(파생 상태·이벤트 핸들러 사용).
- `params` / `searchParams` / `cookies()` / `headers()` 는 항상 `await`.
- 회사 정보(상호·대표·주소·연락처)는 `src/lib/site.ts` 의 값이 유일 출처. 임의 변경 금지.
- 제공되지 않은 회사 정보·법령·실적·인증·수치는 만들지 않는다. 필요한 자리에는
  "콘텐츠 준비 중" 표시 또는 콘텐츠 파일의 placeholder 로 남긴다.
- 외부 사이트의 코드·문구·이미지·로고를 복제하지 않는다.
- 비밀키·계정정보는 코드에 넣지 않는다. `.env.local` 사용, 예시는 `.env.example`.

## 디렉터리

- `src/app` — 라우트. `src/components/{layout,ui,sections,resources,forms}` — 컴포넌트.
- `src/features/{company,services,resources,inquiry}` — 도메인별 로직.
- `src/lib/{content,search,validation,seo}` — 유틸. `content/` — MDX/front matter 콘텐츠.
- `docs/` — 설계 문서. `tests/{unit,integration,e2e}` — 테스트.

## 정보 구조 (변경 시 합의 필요)

글로벌 메뉴는 **홈 / 회사소개 / 사업분야 / 기술자료 / 문의하기** 5개로 고정.
회사소개·사업분야는 하위 메뉴 없는 단일 딥페이지. PF3D 매뉴얼은 별도 메뉴가 아니라
기술자료 게시물 1건으로 취급한다.

## 디자인 상태 (중요)

- 사용자가 **V0에서 웹 디자인을 별도 진행 중**. 확정 디자인을 추후 전달 예정.
- 그때까지 **페이지 비주얼/레이아웃에 시간을 쓰지 말 것.** 현재 컴포넌트는 임시이며 교체된다.
- 색은 `#47b089` 단일 유지. `docs/v0-design-prompt.md`(있다면)는 **참고하지 않는다**.
- 개인정보처리방침(`/privacy`)·PF3D 매뉴얼(`/resources/pf3d-manual`)은 페이지만 만들고
  내비/푸터에서 링크하지 않는다 (초안, 미검증).

## 도메인 메모

- **PF3D** = 자체 개발한 PERFORM-3D 전처리·후처리 프로그램. PERFORM-3D 는 CSI 의 외부 제품이며
  항상 CSI 제품으로 표기하고 CSI 콘텐츠를 복제하지 않는다. 기술자료의 매뉴얼은 자체 도구 사용설명서다.
- 지도는 **네이버 지도**. API 키가 없어도 주소 링크로 위치 확인이 가능해야 한다.
- 로고 자산은 `public/logo/`. 없는 동안 헤더/푸터는 텍스트 워드마크.
- 회사소개 원고: `content/company/company-introduction.md` (임의 수정 금지). 공공 자문 이력 중
  검증된 항목(2021 대전광역시 건설기술심의위원회)만 노출한다.
