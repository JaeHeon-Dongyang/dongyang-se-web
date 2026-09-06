/**
 * 사내망(사무실 공인 IP) 판별 — middleware.ts(Edge, NextRequest.headers)와
 * app/layout.tsx(Server Component, next/headers) 양쪽에서 같은 로직을 쓰기 위해 분리.
 *
 * INTRANET_ALLOWED_IPS 에 사무실 **공인 IP**를 콤마로 구분해 넣는다.
 * 미설정 시 개발 환경에서는 통과, 운영에서는 차단한다(fail closed).
 *
 * INTRANET_LOCK_DISABLED=true 면 IP 무관하게 항상 통과시킨다 — 디자인 작업 중
 * 외부 도구(Claude Design 등)로 /ask, /resources 를 열람·편집해야 할 때 임시로 켠다.
 * (dev 브랜치 Vercel 환경변수로만 설정. 작업 끝나면 반드시 지우거나 false 로.)
 */
const lockDisabled = process.env.INTRANET_LOCK_DISABLED === "true";

const allowedIps = (process.env.INTRANET_ALLOWED_IPS ?? "")
  .split(",")
  .map((ip) => ip.trim().replace(/^["']|["']$/g, "")) // Vercel 대시보드에 따옴표째 붙여넣는 실수 방지
  .filter(Boolean);

type HeadersLike = { get(name: string): string | null };

export function clientIpFrom(headers: HeadersLike): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return headers.get("x-real-ip");
}

export function isIntranetRequest(headers: HeadersLike): boolean {
  if (lockDisabled) return true;
  if (allowedIps.length === 0) {
    return process.env.NODE_ENV !== "production";
  }
  const ip = clientIpFrom(headers);
  return !!ip && allowedIps.includes(ip);
}
