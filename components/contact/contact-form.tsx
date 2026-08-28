"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const inquiryTypes = [
  { value: "structural-design", label: "구조설계" },
  { value: "safety-diagnosis", label: "안전진단" },
  { value: "demolition-review", label: "해체공사 구조검토" },
  { value: "other", label: "기타 문의" },
];

type FormState = "idle" | "submitting" | "success";

type FormErrors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [inquiryType, setInquiryType] = useState<string>("structural-design");

  function validate(formData: FormData): FormErrors {
    const nextErrors: FormErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) nextErrors.name = "이름을 입력해 주세요.";
    if (!phone) nextErrors.phone = "연락처를 입력해 주세요.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!message) nextErrors.message = "문의 내용을 입력해 주세요.";

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="border-border bg-surface flex flex-col items-center gap-4 rounded-2xl border px-8 py-16 text-center">
        <span className="bg-accent-green-light text-brand flex size-14 items-center justify-center rounded-full">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-heading text-xl font-bold">문의가 접수되었습니다</h3>
          <p className="text-body max-w-sm text-sm leading-relaxed">
            남겨주신 내용을 확인 후, 영업일 기준 1~2일 내로 담당 기술사가 순차적으로
            연락드리겠습니다.
          </p>
        </div>
        <Button variant="outline" onClick={() => setState("idle")}>
          다른 문의 남기기
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <FieldGroup>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">이름 / 회사명 *</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="홍길동 / (주)동양건설"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.phone)}>
            <FieldLabel htmlFor="phone">연락처 *</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-0000-0000"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">이메일</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@company.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="inquiry-type">문의 분야</FieldLabel>
            <Select
              value={inquiryType}
              onValueChange={(value) => setInquiryType(String(value))}
              name="inquiryType"
            >
              <SelectTrigger id="inquiry-type" className="w-full">
                <SelectValue placeholder="문의 분야를 선택하세요">
                  {(value: string) =>
                    inquiryTypes.find((type) => type.value === value)?.label ??
                    "문의 분야를 선택하세요"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {inquiryTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">문의 내용 *</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder="프로젝트 개요, 위치, 규모, 희망 일정 등을 자세히 남겨주시면 상담에 도움이 됩니다."
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <FieldError>{errors.message}</FieldError>
          ) : (
            <FieldDescription>
              첨부하실 도면이나 자료가 있으면 회신 이메일을 통해 별도로 전달해 주세요.
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={state === "submitting"}
        className="w-full sm:w-fit"
      >
        {state === "submitting" ? (
          <Loader2 className="animate-spin" data-icon="inline-start" />
        ) : (
          <Send data-icon="inline-start" />
        )}
        {state === "submitting" ? "전송 중..." : "문의 보내기"}
      </Button>
    </form>
  );
}
