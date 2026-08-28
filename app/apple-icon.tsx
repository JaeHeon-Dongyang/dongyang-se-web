import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// icon.svg 와 동일한 심벌(녹색 타일 + 흰 D). data URI 로 넘겨 resvg 가 래스터화.
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 224"><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="207" height="224"><rect width="207" height="224" fill="#fff"/><path d="M132 0 L149 21 L166 0 Z" fill="#000"/><path d="M0 63 H110 L151 108 L110 161 H55 V82 H0 Z" fill="#000"/><path d="M141 224 L207 158 V176 L159 224 Z" fill="#000"/></mask><rect width="207" height="224" fill="#fff" mask="url(#m)"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B6C43",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={112}
        height={121}
        alt=""
        src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`}
      />
    </div>,
    { ...size },
  );
}
