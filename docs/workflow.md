# 작업 워크플로우 — Claude 단독 (디자인 + 기능)

`dongyang-se-web` 저장소를 Claude가 전담한다. **V0 무료 플랜은 더 이상 편집이 불가능해
V0 단계는 폐기** (2026-08-31). 이제 파일 영역이 아니라 **요청 종류**로 브랜치를 가른다.

```
디자인 요청  →  design 브랜치  ─┐
                                ├─→  main  →  Vercel(프로덕션, 프로젝트: dongyang-se-web-tu)
기능 요청    →  dev 브랜치     ─┘
```

- `main` 은 직접 커밋하지 않는다. `design`·`dev` 에서만 병합.
- **디자인 관련 수정/개발**(레이아웃, 스타일, 문구 톤, 컴포넌트 시각 구성 등) → `design` 브랜치에 커밋.
- **기능 관련 개발**(API, 폼, SEO, 데이터, 설정, 빌드) → `dev` 브랜치에 커밋.
- 로컬에 `design` 브랜치가 없으면 `origin/design` 을 추적하는 로컬 브랜치를 먼저 만든다.
- 단위 작업이 끝나면 해당 브랜치 → `main` 병합(fast-forward 우선).
- 두 브랜치가 병렬로 앞서가면 병합 전 서로 rebase/merge 해 최신화한다.

## 브랜치 선택 기준

| 요청 예시 | 브랜치 |
| --- | --- |
| 여백/색상/폰트 크기 조정, 문구 톤, 컴포넌트 레이아웃, 이미지 교체 | `design` |
| API 라우트, 폼 검증/전송, `lib/**` 로직, SEO/사이트맵/robots, 빌드·CI 설정, 콘텐츠 원고 | `dev` |
| 애매한 경우 | 사용자에게 확인 |

## 커밋 규칙

- 커밋 메시지에 `Co-Authored-By: Claude` 트레일러 **금지** (Vercel Hobby 배포 차단).
- 커밋 전 `npm run lint && npm run typecheck && npm run build && npm run format:check`.
- 회사 정보·법령·실적·인증·연혁·수치는 임의 생성 금지 (`AGENTS.md` 참고). 특히
  `app/about/page.tsx` 가 "2012년 설립 / 480건+" 같은 가짜 콘텐츠로 되돌아가면 안 된다.
