"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { company, contactLinks } from "@/lib/site";
import {
  inquirySchema,
  inquiryTypes,
  type InquiryTypeValue,
} from "@/lib/validation/inquiry";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState<InquiryTypeValue>("business");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const form = event.currentTarget;
    const fd = new FormData(form);

    const payload = {
      type: inquiryType,
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      privacyConsent: consent,
      hp: String(fd.get("hp") ?? ""),
    };

    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (res.ok && data.ok) {
        form.reset();
        setConsent(false);
        setInquiryType("business");
        setState("success");
        return;
      }

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setState("idle");
        return;
      }

      setFormError(
        data.message ??
          "전송에 실패했습니다. 잠시 후 다시 시도하거나 전화·이메일로 연락 주세요.",
      );
      setState("error");
    } catch {
      setFormError("네트워크 오류로 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border-border bg-surface flex flex-col items-center gap-4 rounded-2xl border px-8 py-16 text-center">
        <span className="bg-accent-green-light text-brand flex size-14 items-center justify-center rounded-full">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-heading text-xl font-bold">문의가 접수되었습니다</h3>
          <p className="text-body-text max-w-sm text-sm leading-relaxed">
            남겨주신 내용을 확인한 뒤 담당자가 순차적으로 연락드리겠습니다.
            <br />
            급하신 경우 {company.tel} 로 전화 주세요.
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
        {/* honeypot — 화면에 보이지 않음 */}
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        <Field>
          <FieldLabel htmlFor="inquiry-type">문의 유형</FieldLabel>
          <Select
            value={inquiryType}
            onValueChange={(value) => setInquiryType(value as InquiryTypeValue)}
            name="type"
          >
            <SelectTrigger id="inquiry-type" className="w-full">
              <SelectValue placeholder="문의 유형을 선택하세요">
                {(value: string) =>
                  inquiryTypes.find((t) => t.value === value)?.label ??
                  "문의 유형을 선택하세요"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {inquiryTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">이름 *</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="홍길동"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.company)}>
            <FieldLabel htmlFor="company">회사 / 소속</FieldLabel>
            <Input
              id="company"
              name="company"
              placeholder="(주)동양건설"
              autoComplete="organization"
              aria-invalid={Boolean(errors.company)}
            />
            {errors.company && <FieldError>{errors.company}</FieldError>}
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.phone)}>
            <FieldLabel htmlFor="phone">연락처 *</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-0000-0000"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </Field>

          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">이메일</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@company.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={Boolean(errors.subject)}>
          <FieldLabel htmlFor="subject">제목</FieldLabel>
          <Input
            id="subject"
            name="subject"
            placeholder="문의 제목 (선택)"
            aria-invalid={Boolean(errors.subject)}
          />
          {errors.subject && <FieldError>{errors.subject}</FieldError>}
        </Field>

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
              첨부할 도면이나 자료가 있으면 회신 이메일로 별도 전달해 주세요.
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.privacyConsent)}>
          <label
            htmlFor="privacy-consent"
            className="text-body-text flex items-start gap-3 text-sm leading-relaxed"
          >
            <Checkbox
              id="privacy-consent"
              name="privacyConsent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              className="mt-0.5"
              aria-invalid={Boolean(errors.privacyConsent)}
            />
            <span>
              문의 접수 및 회신을 위한 개인정보(이름·연락처·이메일·문의 내용) 수집·이용에
              동의합니다. 수집한 정보는 문의 처리 목적으로만 사용합니다.
            </span>
          </label>
          {errors.privacyConsent && <FieldError>{errors.privacyConsent}</FieldError>}
        </Field>
      </FieldGroup>

      {state === "error" && formError ? (
        <div
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border px-4 py-3 text-sm leading-relaxed"
        >
          {formError}
          <div className="text-body-text mt-1">
            <a href={contactLinks.tel} className="underline underline-offset-2">
              {company.tel}
            </a>
            {" · "}
            <a href={contactLinks.mailto} className="underline underline-offset-2">
              {company.email}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          size="lg"
          disabled={state === "submitting" || !consent}
          className="w-full sm:w-fit"
        >
          {state === "submitting" ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <Send data-icon="inline-start" />
          )}
          {state === "submitting" ? "전송 중..." : "문의 보내기"}
        </Button>
        {!consent ? (
          <p className="text-muted-foreground text-xs">
            개인정보 수집·이용에 동의하시면 문의를 보낼 수 있습니다.
          </p>
        ) : null}
      </div>
    </form>
  );
}
