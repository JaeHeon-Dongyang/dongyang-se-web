import { NextResponse, type NextRequest } from "next/server";

/**
 * /ask(질문하기), /resources(기술자료)를 사무실 회선에서만 열리게 한다.
 *
 * INTRANET_ALLOWED_IPS 에 사무실 **공인 IP**를 콤마로 구분해 넣는다 (예: "203.0.113.10,203.0.113.11").
 * 사설 IP(192.168.x.x 등)를 넣으면 동작하지 않는다 — 밖에서 보이는 주소를 넣어야 한다.
 *
 * 미설정 시 개발 환경에서는 통과, 운영에서는 차단한다(fail closed).
 * 차단은 403 이 아니라 not-found 로 응답해 페이지 존재 자체를 노출하지 않는다.
 */
const allowedIps = (process.env.INTRANET_ALLOWED_IPS ?? "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}

/** 매칭되는 라우트가 없는 경로 — Next 가 app/not-found.tsx 를 404 로 렌더한다. */
function blocked(request: NextRequest) {
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export function middleware(request: NextRequest) {
  if (allowedIps.length === 0) {
    return process.env.NODE_ENV === "production" ? blocked(request) : NextResponse.next();
  }

  const ip = clientIp(request);
  return ip && allowedIps.includes(ip) ? NextResponse.next() : blocked(request);
}

export const config = {
  matcher: ["/ask", "/ask/:path*", "/resources", "/resources/:path*"],
};
