# 배포 · 환경변수

## 배포 개요

| | |
| --- | --- |
| 호스팅 | Vercel — 프로젝트 `dongyang-se-web-tu` |
| 프로덕션 브랜치 | `main` (자동 배포) |
| 프리뷰 | `dev`, `design` 및 PR — 브랜치별 프리뷰 URL 자동 생성 |
| 프로덕션 URL | `https://dongyang-se-web-tu.vercel.app` (실제 도메인 연결 전) |

브랜치 역할은 [`workflow.md`](workflow.md) 참고. `main` 에는 아무도 직접 커밋하지 않고
`design`(V0) · `dev`(Claude) 에서 병합한다.

## 환경변수

Vercel → 프로젝트 → Settings → Environment Variables 에 등록. `.env.local` 은 로컬 전용이며
커밋하지 않는다. 예시는 [`.env.example`](../.env.example).

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `RESEND_API_KEY` | 문의 폼 사용 시 | Resend API 키. 서버에서만 사용. |
| `CONTACT_FROM_EMAIL` | 문의 폼 사용 시 | 발신 주소. 아래 "Resend 설정" 참고. |
| `CONTACT_TO_EMAIL` | 선택 | 수신 주소(콤마로 여러 개). 미설정 시 `lib/site.ts` 의 회사 이메일. |
| `NEXT_PUBLIC_SITE_URL` | 선택 | 절대 URL. 미설정 시 Vercel 이 `VERCEL_PROJECT_PRODUCTION_URL` 을 자동 주입하므로 보통 불필요. 실제 도메인 연결 시에만 지정. |

`NEXT_PUBLIC_` 접두사 변수는 빌드 시 번들에 포함되므로 **변경 후 재배포** 필요.

## Resend 설정

### 커스텀 도메인이 꼭 필요한가?

**아니다.** 내부용·저volume 이면 도메인 없이 운영 가능하다. 다만 제약이 있다:

| | 도메인 없음 (`onboarding@resend.dev`) | 도메인 인증 |
| --- | --- | --- |
| 발신 주소 | `onboarding@resend.dev` 고정 | `no-reply@내도메인` 등 자유 |
| 수신 대상 | **Resend 가입 이메일 1곳만** | 임의 주소 (`dy8000@daum.net` 등) |
| 스팸함 위험 | 높음 (공용 테스트 발신자) | 낮음 (SPF/DKIM/DMARC 정렬) |
| 용도 | 테스트 / 소규모 내부 | 운영 권장 |
| DNS 작업 | 없음 | 등록업체에 레코드 추가 필요 |

> 핵심 제약: `onboarding@resend.dev` 로 보내면 Resend 는 **가입 이메일 주소로만** 배달한다.
> 그 외 주소로 보내면 발송이 거부되어 폼이 "전송 실패"를 반환한다.

### A. 도메인 없이 (지금)

목표: 문의를 `dy8000@daum.net` 으로 받고 싶다면 → **Resend 가입 자체를 `dy8000@daum.net` 으로**
하면 된다 (이미 다른 이메일로 가입했다면 그 주소로 임시 수신하거나, 아래 B 로 진행).

1. Resend 가입 (가능하면 `dy8000@daum.net` 로).
2. API Keys → 키 발급. **키를 채팅·코드·문서에 붙여넣지 말 것.** 노출되면 revoke 후 재발급.
3. Vercel 환경변수:
   - `RESEND_API_KEY` = 발급 키
   - `CONTACT_FROM_EMAIL` = `onboarding@resend.dev`
   - `CONTACT_TO_EMAIL` = Resend 가입 이메일과 동일하게
4. Redeploy → `/contact` 폼 제출 → 해당 수신함 확인.
5. Resend 대시보드의 "Add Domain" 화면은 지금은 **닫아도 된다.** (Name 칸엔 URL 이 아니라
   순수 도메인이 들어가며, `*.vercel.app` 은 DNS 제어 불가라 인증할 수 없다.)

### B. 도메인 인증 (운영 권장)

회사 도메인(예: `dongyang.co.kr`)이 생기면:

1. Resend → Add Domain → **순수 도메인**(`dongyang.co.kr`) 입력. Region 은 Tokyo 권장.
2. 표시되는 DNS 레코드(SPF `TXT`, DKIM `TXT` 3개, 선택적으로 DMARC)를 도메인 등록업체
   DNS 설정에 추가 → Resend 에서 Verify.
3. Vercel 환경변수 변경:
   - `CONTACT_FROM_EMAIL` = `no-reply@dongyang.co.kr` (인증한 도메인)
   - `CONTACT_TO_EMAIL` = `dy8000@daum.net`
4. Redeploy → 실제 수신 테스트.

발신 도메인과 웹사이트 도메인은 **같을 필요 없다.** 사이트가 `*.vercel.app` 이어도
메일만 `dongyang.co.kr` 로 보낼 수 있다.

## 동작 방식 (참고)

`POST /api/contact` (`app/api/contact/route.ts`):

- 입력 검증 실패 → `422` + 필드별 메시지
- honeypot 값 있음(봇) → `200` 으로 조용히 무시, 발송 안 함
- 같은 IP 1분당 5회 초과 → `429`
- `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` 미설정 → `503` + 안내 문구,
  **문의 내용은 서버 로그에 남겨** 유실을 방지
- Resend 발송 실패 → `502` + "전화·이메일로 연락" 안내

**DB·사본 저장은 하지 않는다** (PLAN §9). 발송 실패 시 폼이 대체 연락처(전화·이메일)를
노출하고 서버 로그에 기록하는 것이 유일한 완화책이다.

## 로컬 테스트

```bash
cp .env.example .env.local   # 값 채우기 (또는 비워두고 503 응답 확인)
npm run dev
# POST 테스트
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"type":"business","name":"홍길동","phone":"010-1234-5678","message":"테스트입니다","privacyConsent":true}'
```

## 배포 후 확인

- `/` `/about` `/services` `/resources` `/contact` 200
- `/robots.txt`, `/sitemap.xml` 정상, `sitemap` 의 URL 이 프로덕션 도메인
- `/contact` 폼: 검증 오류 표시 → 정상 제출 시 수신함 도착
- Lighthouse (모바일) Performance ≥ 90, Accessibility ≥ 95 목표

## 롤백

Vercel → Deployments → 이전 정상 배포 → **Promote to Production**.
코드 되돌리기: `git revert <sha>` 후 `dev` → `main` 병합.
