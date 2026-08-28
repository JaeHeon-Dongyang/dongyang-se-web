import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown, ip = "10.0.0.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  type: "business",
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@example.com",
  message: "구조 검토 문의드립니다.",
  privacyConsent: true,
};

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("잘못된 본문은 422 와 필드 오류를 반환한다", async () => {
    const res = await POST(makeRequest({ type: "business" }, "10.1.0.1"));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.code).toBe("validation");
    expect(json.errors.name).toBeTruthy();
  });

  it("honeypot 값이 있으면 전송하지 않고 200 을 반환한다", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(makeRequest({ ...validBody, hp: "bot" }, "10.2.0.1"));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("RESEND 미설정이면 503 not_configured 를 반환한다", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const res = await POST(makeRequest(validBody, "10.3.0.1"));
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("not_configured");
  });

  it("RESEND 설정 + 발송 성공이면 200 ok 를 반환한다", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "onboarding@resend.dev");
    vi.stubEnv("CONTACT_TO_EMAIL", "dy8000@daum.net");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: "x" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(makeRequest(validBody, "10.4.0.1"));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("Resend 가 실패하면 502 send_failed 를 반환한다", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "onboarding@resend.dev");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 500 })),
    );
    const res = await POST(makeRequest(validBody, "10.5.0.1"));
    expect(res.status).toBe(502);
    expect((await res.json()).code).toBe("send_failed");
  });

  it("같은 IP 에서 짧은 시간에 여러 번 호출하면 429 를 반환한다", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const ip = "10.9.9.9";
    let last: Response | undefined;
    for (let i = 0; i < 7; i++) {
      last = await POST(makeRequest(validBody, ip));
    }
    expect(last?.status).toBe(429);
  });
});
