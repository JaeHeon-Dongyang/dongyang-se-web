import { NextResponse, type NextRequest } from "next/server";
import { isIntranetRequest } from "@/lib/intranet";

/**
 * /ask(질문하기), /resources(기술자료)를 사무실 회선에서만 열리게 한다.
 * IP 판별 로직은 lib/intranet.ts — /api/intranet 의 메뉴 노출 판별에도 같은 로직을 쓴다.
 *
 * 차단은 403 이 아니라 not-found 로 응답해 페이지 존재 자체를 노출하지 않는다.
 * (메뉴 자체는 클라이언트에서 숨기지만, 직접 URL 접근·북마크 대비 방어선으로 유지.)
 */

/** 매칭되는 라우트가 없는 경로 — Next 가 app/not-found.tsx 를 404 로 렌더한다. */
function blocked(request: NextRequest) {
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export function proxy(request: NextRequest) {
  return isIntranetRequest(request.headers) ? NextResponse.next() : blocked(request);
}

export const config = {
  matcher: ["/ask", "/ask/:path*", "/resources", "/resources/:path*"],
};
