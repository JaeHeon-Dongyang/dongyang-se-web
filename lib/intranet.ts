/**
 * 사내망(사무실 공인 IP) 판별 — middleware.ts(Edge, NextRequest.headers)와
 * app/layout.tsx(Server Component, next/headers) 양쪽에서 같은 로직을 쓰기 위해 분리.
 *
 * INTRANET_ALLOWED_IPS 에 사무실 **공인 IP**를 콤마로 구분해 넣는다.
 * 미설정 시 개발 환경에서는 통과, 운영에서는 차단한다(fail closed).
 */
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
  if (allowedIps.length === 0) {
    return process.env.NODE_ENV !== "production";
  }
  const ip = clientIpFrom(headers);
  return !!ip && allowedIps.includes(ip);
}
