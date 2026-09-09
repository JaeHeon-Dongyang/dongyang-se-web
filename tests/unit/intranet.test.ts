import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function loadAccessCheck() {
  return (await import("@/lib/intranet")).isIntranetRequest;
}

const externalHeaders = {
  get: () => null,
};

describe("사내 전용 페이지 접근 설정", () => {
  it("접근 제한을 명시하지 않으면 운영 환경에서도 외부 요청을 허용한다", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("INTRANET_LOCK_ENABLED", "");
    vi.stubEnv("INTRANET_LOCK_DISABLED", "false");
    vi.stubEnv("INTRANET_ALLOWED_IPS", "");

    const isIntranetRequest = await loadAccessCheck();

    expect(isIntranetRequest(externalHeaders)).toBe(true);
  });

  it("접근 제한을 켜면 허용되지 않은 외부 요청을 차단한다", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("INTRANET_LOCK_ENABLED", "true");
    vi.stubEnv("INTRANET_LOCK_DISABLED", "false");
    vi.stubEnv("INTRANET_ALLOWED_IPS", "203.0.113.10");

    const isIntranetRequest = await loadAccessCheck();

    expect(isIntranetRequest(externalHeaders)).toBe(false);
  });

  it("접근 제한을 켜도 허용 IP 요청은 통과시킨다", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("INTRANET_LOCK_ENABLED", "true");
    vi.stubEnv("INTRANET_LOCK_DISABLED", "false");
    vi.stubEnv("INTRANET_ALLOWED_IPS", "203.0.113.10");
    const allowedHeaders = {
      get: (name: string) => (name === "x-forwarded-for" ? "203.0.113.10" : null),
    };

    const isIntranetRequest = await loadAccessCheck();

    expect(isIntranetRequest(allowedHeaders)).toBe(true);
  });
});
