import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /privacy 는 초안이라 색인 제외. /ask 는 사내 전용.
      // 기술자료는 예시지만 링크되어 있어 허용.
      disallow: ["/api/", "/privacy", "/ask"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
