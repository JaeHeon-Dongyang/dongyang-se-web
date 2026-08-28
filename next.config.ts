import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OG/애플 아이콘 라우트가 fs 로 읽는 폰트 파일을 배포 번들에 포함
  outputFileTracingIncludes: {
    "/opengraph-image": ["./app/fonts/*.woff"],
    "/apple-icon": ["./app/fonts/*.woff"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
