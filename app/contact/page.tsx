import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "구조설계, 안전진단, 해체공사 구조검토가 필요하신가요? 동양구조엔지니어링에 프로젝트 개요를 남겨주시면 담당 기술사가 신속히 연락드립니다.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="문의하기"
        title="프로젝트를 알려주세요"
        description="구조설계, 안전진단, 해체공사 구조검토 등 어떤 단계에 있든 편하게 문의해 주세요. 담당 기술사가 프로젝트 개요를 검토한 뒤 신속하게 회신드립니다."
      />

      <section className="border-border bg-background border-b py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="border-border bg-surface rounded-2xl border p-8 md:p-10">
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
