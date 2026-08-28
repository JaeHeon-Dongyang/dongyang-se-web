import { NextResponse } from "next/server";
import { inquirySchema, inquiryTypeLabel, toFieldErrors } from "@/lib/validation/inquiry";
import { company } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
 * 문의 폼 처리. DB·사본 저장 없음 — Resend 로 메일 전송만 (docs/PLAN.md §9).
 * RESEND 미설정 시 문의 내용을 서버 로그에 남기고 명확히 실패를 반환한다.
 */

// 프로세스 단위 인메모리 rate limit (서버리스에선 인스턴스별). 남용 억제용.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "잠시 후 다시 시도해 주세요." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request", message: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "validation", errors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // honeypot: 값이 있으면 봇 — 성공한 척하고 전송하지 않는다.
  if (data.hp && data.hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = (process.env.CONTACT_TO_EMAIL ?? company.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const typeLabel = inquiryTypeLabel[data.type];
  const subject = `[홈페이지 문의] ${typeLabel}${data.subject ? ` - ${data.subject}` : ""}`;
  const body = [
    `유형: ${typeLabel}`,
    `이름: ${data.name}`,
    data.company ? `회사/소속: ${data.company}` : null,
    `전화: ${data.phone}`,
    data.email ? `이메일: ${data.email}` : null,
    data.subject ? `제목: ${data.subject}` : null,
    "",
    "내용:",
    data.message,
    "",
    `— 접수 IP: ${ip}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  if (!apiKey || !from) {
    // 유실 방지를 위해 서버 로그에 남긴다 (PLAN §9 의 완화책).
    console.error(
      `[contact] RESEND 미설정 — 전송 불가. 문의 내용:\n${body}\n제목: ${subject}`,
    );
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "현재 온라인 문의 전송이 준비 중입니다. 전화 또는 이메일로 연락 주시면 빠르게 도와드리겠습니다.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email || undefined,
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] Resend 실패 ${res.status}: ${detail}\n${body}`);
      return NextResponse.json(
        {
          ok: false,
          code: "send_failed",
          message:
            "전송에 실패했습니다. 전화 또는 이메일로 연락 주시면 빠르게 도와드리겠습니다.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Resend 예외:", err, `\n${body}`);
    return NextResponse.json(
      {
        ok: false,
        code: "send_failed",
        message:
          "전송에 실패했습니다. 전화 또는 이메일로 연락 주시면 빠르게 도와드리겠습니다.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
