import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * 검색 노출이 승인된 공개 라우트만 포함한다.
 * /privacy, /ask, /resources/* 는 콘텐츠 검증 후 추가한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/contact"];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
