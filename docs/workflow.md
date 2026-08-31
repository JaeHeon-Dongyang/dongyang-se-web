# 작업 워크플로우 — Claude 단독 (디자인 + 기능)

`dongyang-se-web` 저장소를 Claude가 전담한다. **V0 무료 플랜은 더 이상 편집이 불가능해
V0 단계는 폐기** (2026-08-31). 디자인·기능을 모두 Claude가 담당하므로 요청 종류로
브랜치를 가르지 않는다. **`design` 브랜치는 2026-08-31 삭제** — 모든 커밋이 이미 `main`·
`dev` 에 병합된 상태였다 (복구가 필요하면 `git push origin 4772c6b:refs/heads/design`).

```
모든 작업  →  dev 브랜치  →  main  →  Vercel(프로덕션, 프로젝트: dongyang-se-web-tu)
```

- `main` 은 직접 커밋하지 않는다. `dev` 에서만 병합.
- 디자인 수정이든 기능 개발이든 전부 `dev` 에 커밋한다.
- 단위 작업이 끝나면 `dev` → `main` 병합(fast-forward 우선).
- 큰 레이아웃 변경이나 정보 구조 변경은 커밋 전 사용자와 합의한다.

## 커밋 규칙

- 커밋 메시지에 `Co-Authored-By: Claude` 트레일러 **금지** (Vercel Hobby 배포 차단).
- 커밋 전 `npm run lint && npm run typecheck && npm run build && npm run format:check`.
- 회사 정보·법령·실적·인증·연혁·수치는 임의 생성 금지 (`AGENTS.md` 참고). 특히
  `app/about/page.tsx` 가 "2012년 설립 / 480건+" 같은 가짜 콘텐츠로 되돌아가면 안 된다.
