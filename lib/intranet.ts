/**
 * 제한 페이지 접근 판별 — proxy.ts 의 접근 차단과 /api/intranet 의 메뉴 노출
 * 판별에서 같은 로직을 쓰기 위해 분리.
 *
 * 기본값은 외부 공개다. INTRANET_LOCK_ENABLED=true 로 설정하면
 * INTRANET_ALLOWED_IPS 에 등록한 사무실 공인 IP만 통과시킨다.
 */
const lockEnabled = process.env.INTRANET_LOCK_ENABLED === "true";

const allowedIps = (process.env.INTRANET_ALLOWED_IPS ?? "")
  .split(",")
  .map((ip) => ip.trim().replace(/^["']|["']$/g, "")) // Vercel 대시보드에 따옴표째 붙여넣는 실수 방지
  .filter(Boolean);

type HeadersLike = { get(name: string): string | null };

function clientIpFrom(headers: HeadersLike): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return headers.get("x-real-ip");
}

export function isIntranetRequest(headers: HeadersLike): boolean {
  if (!lockEnabled) return true;
  if (allowedIps.length === 0) {
    return false;
  }
  const ip = clientIpFrom(headers);
  return !!ip && allowedIps.includes(ip);
}
