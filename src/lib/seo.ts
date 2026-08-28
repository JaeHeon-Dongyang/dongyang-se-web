import type { Metadata } from "next";
import { company, siteMeta, siteUrl } from "@/lib/site";

type PageMetaInput = {
  title?: string;
  description?: string;
  /** 사이트 루트 기준 경로. 예: "/about" */
  path?: string;
};

/**
 * 페이지별 metadata 생성 헬퍼.
 * title 은 layout 의 template(`%s | 동양구조엔지니어링`)에 합성된다.
 */
export function buildMetadata({ title, description, path }: PageMetaInput): Metadata {
  const desc = description ?? siteMeta.description;
  const url = path ? `${siteUrl}${path}` : siteUrl;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} | ${siteMeta.title}` : siteMeta.title,
      description: desc,
      url,
      siteName: siteMeta.title,
      locale: siteMeta.locale,
      type: "website",
    },
  };
}

/** 조직 정보 JSON-LD (schema.org/Organization). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    email: company.email,
    telephone: company.tel,
    faxNumber: company.fax,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "대전광역시",
      addressCountry: "KR",
    },
  };
}
