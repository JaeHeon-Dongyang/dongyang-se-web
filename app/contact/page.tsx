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
        eyebrow="CONTACT"
        title={
          <>
            안전한 건축을 위한
            <br />첫 상담
          </>
        }
        description="구조설계부터 안전점검·진단, 공사 중 안전관리, 해체공사 구조검토까지 필요한 사항을 남겨주세요. 담당 기술자가 문의 내용을 검토한 후 안내해 드리겠습니다."
      />

      <section className="py-16 md:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
