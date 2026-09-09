import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /privacy 는 초안, /ask·/resources 는 콘텐츠 검증 전이라 색인에서 제외한다.
      disallow: ["/api/", "/privacy", "/ask", "/resources"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
