import { z } from "zod";

/**
 * 문의 폼 입력 스키마. 클라이언트(즉시 검증)와 서버 라우트(재검증)가 공유한다.
 * 문의 유형은 폼의 선택 항목으로만 구분 (docs/PLAN.md §9).
 */

export const inquiryTypes = [
  { value: "business", label: "사업 문의" },
  { value: "technical", label: "기술 문의" },
  { value: "pf3d", label: "PF3D 문의" },
  { value: "other", label: "기타 문의" },
] as const;

export type InquiryTypeValue = (typeof inquiryTypes)[number]["value"];

export const inquiryTypeLabel = Object.fromEntries(
  inquiryTypes.map((t) => [t.value, t.label]),
) as Record<InquiryTypeValue, string>;

const optionalEmail = z
  .string()
  .trim()
  .max(150, "이메일이 너무 깁니다.")
  .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
    message: "이메일 형식이 올바르지 않습니다.",
  })
  .optional();

export const inquirySchema = z.object({
  type: z.enum(["business", "technical", "pf3d", "other"]),
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(100, "이름이 너무 깁니다."),
  company: z.string().trim().max(100, "회사/소속이 너무 깁니다.").optional(),
  phone: z
    .string()
    .trim()
    .min(9, "연락처를 입력해 주세요.")
    .max(20, "연락처가 너무 깁니다.")
    .regex(/^[0-9+\-\s()]+$/, "연락처는 숫자와 -, 공백만 사용할 수 있습니다."),
  email: optionalEmail,
  subject: z.string().trim().max(150, "제목이 너무 깁니다.").optional(),
  message: z
    .string()
    .trim()
    .min(5, "문의 내용을 5자 이상 입력해 주세요.")
    .max(5000, "문의 내용이 너무 깁니다. (최대 5000자)"),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
  /** honeypot — 사람은 비워둔다. 값이 있으면 봇으로 간주 (서버에서 처리). */
  hp: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/** ZodError 를 { 필드: 첫 메시지 } 형태로 변환 */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
