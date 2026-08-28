# 작업 워크플로우 — V0(디자인) + Claude(기능)

`dongyang-se-web` 저장소 하나를 소스로 통일한다. V0와 Claude가 **겹치지 않는 파일 영역**을
나눠 맡고, 디자인 변경만 얇은 병합 단계를 거친다.

```
V0      →  design 브랜치  ─┐
                           ├─→  main  →  Vercel(프로덕션)
Claude  →  main 직접 커밋 ─┘
```

## 파일 담당

| 영역 | 담당 | 파일 |
| --- | --- | --- |
| 디자인 토큰 | **V0** | `app/globals.css` |
| 컴포넌트 스타일/레이아웃 | **V0** | `components/**` 의 className·마크업, `components/ui/**` |
| 이미지 | **V0** | `public/images/**` |
| 페이지 시각 구성 | **V0** | 페이지 `.tsx` 의 JSX/className (단, `export const metadata` 는 제외) |
| API·서버 로직 | **Claude** | `app/api/**` |
| 데이터·설정 | **Claude** | `lib/site.ts`, `lib/seo.ts`, `lib/nav.ts`, `lib/*-data.ts`, `lib/validation/**`, `lib/utils.ts` |
| SEO/라우팅 파일 | **Claude** | `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx`(메타·JSON-LD), 페이지의 `metadata` |
| 오류 처리 | **Claude** | `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` |
| 빌드/CI/문서 | **Claude** | `next.config.ts`, `tsconfig.json`, `package.json`, `.github/**`, `docs/**`, `AGENTS.md` |
| 콘텐츠 원고 | **Claude** | `content/**` |
| 로고 컴포넌트 | **V0** | `components/logo.tsx` — V0 인라인 SVG 마크 사용 (사용자 선택, 2026-08-28). `public/logo/**` 실제 에셋은 favicon 등에만 사용 |
| 문의 폼 로직 | **Claude** | `components/contact/contact-form.tsx` (검증·전송). 스타일은 V0 |

## 설정 (1회)

1. **V0를 현재 `main` 으로 동기화(pull)** — V0 프로젝트가 오래된 스냅샷이면 push 시 Claude 작업을
   되돌린다. V0의 GitHub 패널에서 최신 커밋을 pull.
2. **V0가 `main` 에 직접 push 금지** — 둘 중 하나:
   - V0 sync 브랜치를 `design` 으로 변경 (권장)
   - GitHub `main` 브랜치 보호: Settings → Branches → Require a pull request

## 평소 리듬

- **디자인 변경:** 사용자가 V0에서 작업 → "V0에서 ○○ 수정" 알림 → Claude가 `design` 브랜치(또는 PR)에서
  디자인 diff만 추려 `main` 에 반영. `globals.css` + `components/**` 변경은 충돌 거의 없음.
- **기능 개발:** Claude가 `main` 에 직접 커밋 (API, 폼, SEO, 콘텐츠).
- **위험 신호:** V0 diff에 `app/api/**`, `lib/**`, `app/sitemap.ts` 등이 삭제/변경으로 뜨면
  그 부분은 버리고 디자인만 취한다. 특히 `app/about/page.tsx` 가 "2012년 설립 / 480건+" 로
  되돌아가면 병합하지 않는다 (V0 생성 가짜 콘텐츠).

## 커밋 규칙

- 커밋 메시지에 `Co-Authored-By: Claude` 트레일러 **금지** (Vercel Hobby 배포 차단).
- 커밋 전 `npm run lint && npm run typecheck && npm run build && npm run format:check`.
