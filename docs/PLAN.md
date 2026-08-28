# 동양구조엔지니어링 웹사이트 — 계획

> 원본 요청서: [`master-prompt-source.md`](master-prompt-source.md) (ChatGPT 작성). 강제 사양이 아니며,
> 아래 "요청서와의 조정 사항"에 이견과 변경점을 정리한다.

---

## 1. 저장소 현황

- 착수 시점: 커밋 없는 빈 저장소 (요청서 `.md` 1개만 존재). 보존할 기존 코드·설정 없음.
- 원격: `github.com/JaeHeon-Dongyang/dongyang-se-web`.
- 이번 작업으로 Next.js 16 프로젝트 스캐폴드를 생성했다(아래 6장).

## 2. 확정된 결정 (사용자 확인 완료)

| 항목 | 결정 |
| --- | --- |
| 이번 단계 산출물 | 가벼운 계획 문서 + 프로젝트 스캐폴드 (전체 페이지 구현은 승인 후) |
| 배포 대상 | **Vercel** |
| 문의 폼 처리 | **트랜잭션 메일 발송만** (Resend → `dy8000@daum.net`). DB·사본 저장 없음. 사업 형태가 다양해 현재는 메일만으로 충분, 사업별 문의 형태는 추후 구축 |
| 실제 콘텐츠 | 사용자가 전부 제공. 회사소개 원고 수령 완료(`content/company/company-introduction.md`), 나머지(사업분야·PF3D 매뉴얼·개인정보처리방침) 대기 |
| 지도 | **네이버 지도** |
| 로고 | 사용자 제공 예정. `public/logo/` 에 배치, 도착 전 텍스트 워드마크 사용 |
| 다국어 | 없음. **한국어 단일** |
| PF3D | 아래 8-1 참고 |

## 3. 기술 스택 (최종)

- **Next.js 16.3** App Router + Turbopack, **React 19.2**, **TypeScript 5**
- **Tailwind CSS v4** — `@theme` 기반 디자인 토큰 (`src/app/globals.css`)
- **MDX** (`@next/mdx` + gray-matter/`next-mdx-remote`) — 기술자료·PF3D 매뉴얼 (M3에서 도입)
- **Zod** — 문의 폼 입력 검증 (서버/클라이언트 공유) (M2)
- **Resend** — 문의 메일 전송 서버 라우트 (M2)
- ESLint (flat config, `next lint` 제거됨) + Prettier
- Playwright — 핵심 플로우 E2E (M5, 범위 최소)
- 배포: Vercel (자동 프리뷰/프로덕션)

근거: 요청서 12장 권장과 일치. 버전은 `create-next-app` 최신 스캐폴드 기준으로 확정했고,
Next 16의 주요 변경(Turbopack 기본, async request API, `middleware`→`proxy`, `next lint` 제거)은
[`AGENTS.md`](../AGENTS.md)에 규칙으로 반영했다.

## 4. 아키텍처 2안 비교

| 기준 | A안: 정적 + Git 기반 (채택) | B안: Headless CMS + DB |
| --- | --- | --- |
| 초기 구축 비용 | 낮음 | 높음 |
| 유지보수 | 콘텐츠=Git PR, 단순 | CMS 운영 부담 |
| SEO | 정적 프리렌더로 우수 | 동등하나 설정 필요 |
| 문서 관리 | MDX + front matter | CMS UI (비개발자 유리) |
| 비개발자 편집 | 약함 (후속 CMS 연결로 보완) | 강함 |
| 검색 확장 | 정적 인덱스로 충분 | 외부 검색 서비스 |
| 문의 데이터 | 메일 전송만 | DB 저장 |
| 배포 복잡도 | 낮음 (Vercel 단독) | DB·CMS 인프라 추가 |
| 향후 인증/내부도구 | 라우트 추가로 확장 | 이미 기반 존재 |
| 공급업체 종속 | 낮음 | CMS 종속 |

**채택: A안.** MVP 요구(회사 소개 + 4개 사업분야 + 기술자료/매뉴얼 + 문의)에 DB·CMS는 과投자다.
콘텐츠 접근을 `src/lib/content` 계층으로 분리해 두어, 이후 비개발자 편집 수요가 생기면
동일 인터페이스로 Headless CMS를 뒤에 붙일 수 있게 설계한다.

## 5. 정보 구조 · 사이트맵

글로벌 메뉴 5개 고정:

```
/                     홈
/about                회사소개  (하위 메뉴 없는 단일 딥페이지)
/services             사업분야  (단일 딥페이지 + 4개 앵커)
  #structural-design      구조설계
  #safety-inspection      안전진단·점검
  #construction-safety    공사 중 안전관리
  #demolition-review      해체공사 구조검토
/resources            기술자료 목록
/resources/[slug]     기술자료 상세
  /resources/pf3d-manual  PF3D 사용 매뉴얼 (기술자료 게시물 1건)
/contact              문의하기 (통합 폼 + 회사정보 + 지도)
/privacy              개인정보처리방침
/  (not-found)        404
```

MVP에서 만들지 않음: 프로젝트/실적, 진행중 프로젝트, 채용, FAQ 독립 페이지, 다운로드 독립 메뉴,
회사소개/사업분야 하위 메뉴, PF3D 고정 상단 메뉴, 문의 유형별 개별 페이지. (요청서 7장과 동일)

## 6. 핵심 화면 목록

| # | 화면 | 경로 | 상태 |
| --- | --- | --- | --- |
| 1 | 홈 | `/` | 스캐폴드 완료 (짧은 소개 카피 반영, 세부 카피 대기) |
| 2 | 회사소개 | `/about` | **구현 완료** (제공 원고 기반, 공공 자문 미검증 3건 비노출) |
| 3 | 사업분야 | `/services` | M2 (콘텐츠 대기) |
| 4 | 기술자료 목록 | `/resources` | M3 |
| 5 | 기술자료 상세 (일반) | `/resources/[slug]` | M3 |
| 6 | PF3D 매뉴얼 상세 | `/resources/pf3d-manual` | M3 |
| 7 | 문의하기 | `/contact` | M2(폼) + M3(지도) |
| 8 | 개인정보처리방침 | `/privacy` | M2 |
| 9 | 404 / 오류 | `not-found`, `error` | M2 |

각 화면 상세 명세(목적·데이터·컴포넌트·반응형·SEO·상태)는 M1 착수 시 `docs/screens.md`에 작성.

## 7. 디자인 시스템 개요

- 토큰: `src/app/globals.css` 의 `@theme` 블록 (요청서 6장 팔레트 그대로 + 파생 토큰).
  - 브랜드: `--color-primary #47b089`, `--color-primary-light #ecf7f3`, hover/active 파생
  - 표면/텍스트: `--color-background #f9fafb`, `--color-surface #fff`, `--color-heading #16181d`, `--color-text #686f7d`
  - 상태: success/warning/error/info, disabled, focus-ring
  - 타이포: Display/H1~H4/Body Large/Body/Small/Caption/Label → `text-*` 유틸
  - 폰트: Pretendard Variable + 시스템 폴백 (현재 CDN, 후속 셀프호스팅)
- **라이트 단일 테마로 확정.** 요청서에 다크 모드 요구가 없고, 기업 브로슈어 사이트에서
  반쪽짜리 다크 테마는 유지보수 부담만 크다. 필요 시 후속에 토큰 레이어 추가.
- **브랜드 기준색: `#47b089` 로 확정** (2026-08-28, 사용자 "일단 이 색"). 요청서 6장 값 그대로 유지.
  제공된 로고 에셋은 짙은 녹색 `#0B6C43` 기반이라 로고와 UI 액센트 톤이 다소 다르지만
  현 단계에서는 수용한다. 추후 로고 리컬러 또는 토큰 조정으로 재검토 가능.
- CTA 기본형: `#16181D` 배경 + 흰색 텍스트 (WCAG AA). primary 배경 위 흰 텍스트는 대비 미달이라 사용 안 함.
- 컴포넌트 상태 규약: Default / Hover / Focus / Active / Disabled (+ 폼은 Loading / Error).
- 스캐폴드 완료 컴포넌트: `Container`, `Button`, `Header`(모바일 내비 포함), `Footer`.

## 8. 콘텐츠 모델

MVP 모델 (요청서 11장):

- **Company** — `src/lib/site.ts` 상수 (확정값)
- **BusinessArea** — `src/lib/site.ts` 배열 (id/label/summary) + `content/services/*.mdx` 본문
- **TechnicalResource** — `content/resources/*.mdx` + front matter
- **ResourceAttachment** — TechnicalResource front matter의 `attachments[]` (별도 Download 모델 없음)
- **ManualDocument / ManualSection** — `content/resources/pf3d-manual/*.mdx` (초기 1개, 이후 하위 문서 확장)
- **Inquiry** — 폼 제출 payload 타입 (Zod 스키마). 저장 안 함, 메일 본문으로만 전송.

제외: Project, Download 독립 모델, FAQ, JobPosting, User/Role/AuditLog (인증 도입 시 추가).

기술자료 front matter (초안):

```yaml
title: ""
slug: ""
summary: ""
category: ""        # 기술문서 | 기술가이드 | 참고자료 | 매뉴얼
contentType: ""     # article | manual
thumbnail: ""
publishedAt: ""
updatedAt: ""
visibility: public
featured: false
keywords: []
attachments: []     # { filename, type, size, description, version, publishedAt, visibility, url }
seoTitle: ""
seoDescription: ""
```

PF3D 매뉴얼 front matter는 위에 더해 `version`, `order`, `status`, `relatedDocuments[]` 를 둔다.

### 8-1. PF3D 정의

- **PERFORM-3D** — CSI(Computers and Structures, Inc.)가 개발한 구조해석 프로그램.
  <https://www.csiamerica.com/products/perform3d> — 외부 제품이다.
- 동양구조엔지니어링은 PERFORM-3D 를 활용하기 위한 **전처리·후처리 프로그램(PF3D)** 을 자체 개발했다.
- 기술자료에 싣는 문서는 **전체 PF3D 프로세스에 대한 사용설명서(user manual)** 다.
- 저작권/톤: 매뉴얼은 자체 개발 도구의 사용 안내이며, PERFORM-3D 는 CSI 제품으로 명확히 표기한다.
  CSI 문서·화면·문구를 복제하지 않는다.

## 9. 문의 폼 처리

- 흐름: 클라이언트 폼 → `POST /api/contact` (Route Handler, nodejs) → Zod 검증 → Resend 발송 → 결과 반환.
- 필드: 문의유형(사업/기술/PF3D/기타) · 이름 · 회사/소속 · 전화 · 이메일 · 제목 · 내용 · 첨부 · 개인정보 동의.
- 보안: 서버측 재검증, honeypot + 제출 rate limit(IP 기준 인메모리, 이후 Turnstile), 첨부 확장자/용량 제한.
- **리스크(수용됨):** DB·사본 저장을 하지 않으므로 메일 발송 실패 시 문의가 유실된다.
  사용자가 "현재는 메일만으로 충분"으로 확정했다. 대응은 (1) 발송 실패 시 사용자에게
  전화·이메일 대체 연락처 안내, (2) 서버 로그 기록까지만 한다. 사본 저장은 하지 않는다.
- 자격증명 미제공 상태이므로 M2는 인터페이스·환경변수(`.env.example`)까지 구현하고
  실제 키 주입은 사용자가 Resend 계정/도메인 인증 후 진행.
- 문의 유형은 폼의 선택 항목으로만 구분한다(사업/기술/PF3D/기타). 사업별 개별 폼·페이지는 추후.

## 10. 폴더 구조

```
src/
  app/                 라우트 (layout, page, api, not-found, error, sitemap, robots)
  components/
    layout/  ui/  sections/  resources/  forms/
  features/            company/ services/ resources/ inquiry/   (도메인 로직)
  lib/                 content/ search/ validation/ seo/  + site.ts, cn.ts
  types/
content/               company/ services/ resources/ (+ pf3d-manual/)
public/                images/ documents/
docs/                  PLAN.md 외 설계 문서
tests/                  unit/ integration/ e2e/
```

## 11. 마일스톤 (요약 — 상세는 [`TASKS.md`](../TASKS.md))

- **M0 분석·계획** — 이 문서, 스캐폴드. ✅ (승인 대기)
- **M1 프로젝트 기반** — Prettier/CI, 화면 명세, 공통 컴포넌트·상태, 샘플 콘텐츠, 테스트 환경.
- **M2 기술 사이트 MVP** — 홈/회사소개/사업분야/문의(폼)/개인정보/404·오류/푸터.
- **M3 기술자료 & PF3D** — MDX 파이프라인, 목록/상세, 첨부, 검색, PF3D 매뉴얼, 목차/앵커, 지도.
- **M4 운영 기능** — 메일 전송 실연동, 로그/에러 추적, (필요 시) 콘텐츠 사본 저장.
- **M5 검증·출시** — 접근성/반응형/성능/보안 점검, 콘텐츠 감수, E2E, 배포·롤백 확인.

## 12. 요청서와의 조정 사항 (이견 포함)

1. **인프라·테스트 범위 축소.** 요청서 12·14장의 CI/CD 풀 파이프라인, Playwright E2E 스위트,
   에러 추적 인프라, 백업/복구, 배포 롤백은 소규모 회사 사이트엔 과하다. MVP는
   반응형 · WCAG 2.2 AA · SEO/메타 · Lighthouse 목표 · 폼 검증/rate limit 을 필수로 하고,
   CI는 lint+build+타입체크만, E2E는 핵심 플로우 스모크만, 에러 추적은 M4로 미룬다.
2. **다크 모드 제외** (7장 참고). 라이트 단일 테마 확정.
3. **완전 정적 아님.** 문의 폼 때문에 서버리스 라우트 1개가 필요하다. Vercel에서 처리.
4. **문의 유실 리스크.** "DB 없음 + 메일만" 정책의 부작용을 9장에 명시했고 M2에서 재확인한다.
5. **Pretendard 로딩.** 초기엔 CDN, M1에서 `next/font/local` 셀프호스팅으로 전환(성능/오프라인).
6. **버전 고정 안 함.** 요청서대로 특정 버전을 강제하지 않고 스캐폴드 최신본으로 확정했다.

## 13. 사용자 결정 사항 (2026-08-28 회신 완료)

| # | 항목 | 결과 |
| --- | --- | --- |
| 1 | 콘텐츠 전달 | 사용자가 전부 제공. 회사소개 원고 수령 완료. 사업분야·PF3D 매뉴얼·개인정보처리방침 대기 |
| 2 | 배포 도메인 | 미회신 — Resend 발신 도메인 인증에 필요, M2 전 확인 |
| 3 | 로고 | 제공 예정. `public/logo/` 배치, 도착 전 워드마크 |
| 4 | 지도 | 네이버 지도 |
| 5 | 문의 사본 저장 | 하지 않음. 메일 발송만. 사업별 문의 형태는 추후 |
| 6 | 다국어 | 한국어 단일 |
| 7 | PF3D | PERFORM-3D(CSI 외부 제품) + 자체 개발 전/후처리 프로그램. 8-1 참고 |

해소:
- 배포 도메인 = `https://dongyang-web-nine.vercel.app` (Vercel 배포 완료)
- 로고 에셋 → `public/logo/`. 헤더/푸터/파비콘 적용은 M1.

2026-08-28 추가 결정:
- **색 체계 = `#47b089` 단일 유지** (재확인). v0 프롬프트의 2톤 그린은 채택하지 않음.
- **`dongyang-v0-design-prompt-en.md` 는 무시.** 사용자가 V0에서 웹 디자인을 별도 진행 중이며
  추후 확정 디자인을 전달할 예정. 그때까지 **페이지 비주얼·레이아웃 작업은 최소화**하고,
  디자인과 무관한 기반 작업(인프라/콘텐츠 파이프라인/문의 폼 백엔드/SEO)을 우선한다.
- **개인정보처리방침·PF3D 매뉴얼: 라우트/페이지는 만들되 내비·푸터에서 링크하지 않는다.**
  둘 다 초안이며 미확정 항목(법정 보존기간, 위탁업체, 내부 도구 상세)을 검증한 뒤 노출.
- 사업분야·개인정보처리방침·PF3D 매뉴얼 원고는 **인코딩 깨짐 상태로 수령** — UTF-8 재저장 대기.
  받는 즉시 `content/` 에 배치하고 페이지에 반영.

## 14. 다음 단계

사용자가 V0 웹 디자인을 별도 진행 중 → **디자인 확정 전까지 비주얼 작업 보류**, 아래 순서로 진행:

1. **M1 (디자인 무관 기반)** — Prettier/typecheck/CI, `next/font/local` Pretendard,
   favicon·로고 배치, `sitemap.ts`/`robots.ts`, SEO 메타 헬퍼, `not-found`/`error`,
   MDX 콘텐츠 파이프라인(`src/lib/content`), 테스트 환경.
2. **문의 폼 백엔드** — Zod `inquirySchema`, `POST /api/contact`, Resend 인터페이스(키 대기).
3. **콘텐츠 반영** — 사업분야·개인정보·PF3D UTF-8 원고 수령 시 `content/` 배치 +
   기존 임시 레이아웃에 채움(디자인은 추후 교체).
4. **디자인 적용** — 사용자 확정 디자인 수령 후 컴포넌트/페이지 리스타일.
5. **M5 검증·출시**.
