import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "동양구조엔지니어링 — 안전을 설계하고, 신뢰를 쌓습니다";

// next.config.ts 의 outputFileTracingIncludes 로 배포 번들에 포함시킨다.
const fontDir = join(process.cwd(), "app", "fonts");

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 224"><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="207" height="224"><rect width="207" height="224" fill="#fff"/><path d="M132 0 L149 21 L166 0 Z" fill="#000"/><path d="M0 63 H110 L151 108 L110 161 H55 V82 H0 Z" fill="#000"/><path d="M141 224 L207 158 V176 L159 224 Z" fill="#000"/></mask><rect width="207" height="224" fill="#fff" mask="url(#m)"/></svg>`;

const tile = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0B6C43"/><g transform="translate(6 5.2) scale(0.0965)">${mark}</g></svg>`;

export default function OpengraphImage() {
  const semibold = readFileSync(join(fontDir, "Pretendard-SemiBold.woff"));
  const bold = readFileSync(join(fontDir, "Pretendard-Bold.woff"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f9fafb",
        padding: 80,
        fontFamily: "Pretendard",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={72}
          height={72}
          alt=""
          src={`data:image/svg+xml;base64,${Buffer.from(tile).toString("base64")}`}
        />
        <span style={{ fontSize: 34, fontWeight: 700, color: "#16181d" }}>
          {company.name}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 78,
            fontWeight: 700,
            color: "#16181d",
            lineHeight: 1.15,
          }}
        >
          안전을 설계하고,
        </span>
        <span
          style={{
            fontSize: 78,
            fontWeight: 700,
            color: "#16181d",
            lineHeight: 1.15,
          }}
        >
          신뢰를 쌓습니다.
        </span>
      </div>

      <span style={{ fontSize: 27, fontWeight: 600, color: "#686f7d" }}>
        구조설계 · 안전점검·진단 · 공사 중 안전관리 · 해체공사 구조검토
      </span>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: semibold, weight: 600, style: "normal" },
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
