# 동양구조엔지니어링 웹사이트

구조 엔지니어링·안전진단 전문기업 **동양구조엔지니어링**의 공식 웹사이트.

- 스택: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- 배포: Vercel · 문의 폼: 트랜잭션 메일(Resend), 별도 DB 없음
- 현재 상태: **M0 스캐폴드 + 회사소개(`/about`) 구현 완료, M1 승인 대기** (자세히는 [`docs/PLAN.md`](docs/PLAN.md))

## 개발

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |

## 문서

| 파일 | 내용 |
| --- | --- |
| [`docs/PLAN.md`](docs/PLAN.md) | 아키텍처 결정, 사이트맵, 콘텐츠 모델, 마일스톤, 미해결 항목 |
| [`TASKS.md`](TASKS.md) | 마일스톤별 작업 목록 |
| [`AGENTS.md`](AGENTS.md) | 코드/언어 규칙, Next 16 주의사항 |
| [`docs/master-prompt-source.md`](docs/master-prompt-source.md) | 원본 요청서 (ChatGPT 작성, 참고용) |

## 규칙 요약

- 사용자 노출 텍스트·주석·문서는 한국어, 코드 식별자는 영어.
- 회사 정보는 `src/lib/site.ts` 가 유일 출처. 제공되지 않은 정보·실적·인증은 만들지 않는다.
- 커밋 전 `npm run lint` + `npm run build` 통과.
