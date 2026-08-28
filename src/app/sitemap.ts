import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * 공개 라우트만 포함. 초안 상태인 /privacy, /resources/pf3d-manual 은 제외한다.
 * (검증 후 노출 예정 — docs/PLAN.md)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/resources", "/contact"];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
