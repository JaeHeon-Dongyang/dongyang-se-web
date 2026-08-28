import { describe, expect, it } from "vitest";
import { inquirySchema, inquiryTypeLabel, toFieldErrors } from "@/lib/validation/inquiry";

const valid = {
  type: "business" as const,
  name: "홍길동",
  company: "",
  phone: "010-1234-5678",
  email: "hong@example.com",
  subject: "",
  message: "구조 검토 문의드립니다.",
  privacyConsent: true,
  hp: "",
};

describe("inquirySchema", () => {
  it("정상 입력을 통과시킨다", () => {
    const r = inquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("이름이 비면 실패한다", () => {
    const r = inquirySchema.safeParse({ ...valid, name: "  " });
    expect(r.success).toBe(false);
    if (!r.success) expect(toFieldErrors(r.error).name).toBeTruthy();
  });

  it("문의 내용이 5자 미만이면 실패한다", () => {
    const r = inquirySchema.safeParse({ ...valid, message: "짧음" });
    expect(r.success).toBe(false);
  });

  it("개인정보 미동의면 실패한다", () => {
    const r = inquirySchema.safeParse({ ...valid, privacyConsent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(toFieldErrors(r.error).privacyConsent).toBeTruthy();
  });

  it("이메일은 선택이지만 형식이 틀리면 실패한다", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "" }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(
      false,
    );
  });

  it("전화번호는 숫자·기호만 허용한다", () => {
    expect(inquirySchema.safeParse({ ...valid, phone: "010-000-0000" }).success).toBe(
      true,
    );
    expect(inquirySchema.safeParse({ ...valid, phone: "전화없음" }).success).toBe(false);
  });

  it("알 수 없는 문의 유형은 실패한다", () => {
    expect(inquirySchema.safeParse({ ...valid, type: "unknown" }).success).toBe(false);
  });

  it("honeypot 값이 있어도 스키마는 통과한다 (봇 처리는 라우트에서)", () => {
    const r = inquirySchema.safeParse({ ...valid, hp: "i am a bot" });
    expect(r.success).toBe(true);
  });
});

describe("inquiryTypeLabel", () => {
  it("모든 유형에 라벨이 있다", () => {
    expect(inquiryTypeLabel.business).toBe("사업 문의");
    expect(inquiryTypeLabel.pf3d).toBe("PF3D 문의");
  });
});
