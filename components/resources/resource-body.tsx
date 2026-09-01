import { Fragment } from "react";
import { AlertTriangle, ArrowRight, ExternalLink, Info, Play } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ContentBlock, ImageMarker } from "@/lib/resources-data";

// "**굵게**" 구간만 <strong> 으로 바꾼다. 본문·목록·콜아웃·마커 설명에 쓰는 최소 파서.
function renderWithBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * 마커 번호를 본문 순서대로 매긴다.
 * heading 을 만나면 1 로 초기화하고, 같은 heading 안에서는 이미지가 바뀌어도 이어서 증가한다.
 * 마커 객체를 키로 쓰므로 데이터에 번호를 적어둘 필요가 없다.
 */
function assignMarkerNumbers(blocks: ContentBlock[]) {
  const numbers = new Map<ImageMarker, number>();
  let next = 1;
  for (const block of blocks) {
    if (block.type === "heading") {
      next = 1;
    } else if (block.type === "annotated-image") {
      for (const marker of block.markers) numbers.set(marker, next++);
    } else if (block.type === "image-pair") {
      for (const marker of block.left.markers) numbers.set(marker, next++);
      for (const marker of block.right.markers) numbers.set(marker, next++);
    }
  }
  return numbers;
}

// 번호 배지 위치를 박스 중심 기준 오프셋(%)으로 계산한다. 박스가 없으면 x·y 그 자리.
function numberOffset(marker: ImageMarker) {
  if (!marker.box) return { dx: 0, dy: 0 };
  const { w, h } = marker.box;
  switch (marker.numberCorner ?? "bottom-right") {
    case "top-left":
      return { dx: -w / 2, dy: -h / 2 };
    case "top-center":
      return { dx: 0, dy: -h / 2 };
    case "top-right":
      return { dx: w / 2, dy: -h / 2 };
    case "bottom-left":
      return { dx: -w / 2, dy: h / 2 };
    case "bottom-center":
      return { dx: 0, dy: h / 2 };
    case "bottom-right":
      return { dx: w / 2, dy: h / 2 };
  }
}

function MarkedImage({
  src,
  alt,
  width,
  markers,
  numbers,
}: {
  src: string;
  alt: string;
  width: number;
  markers: ImageMarker[];
  numbers: Map<ImageMarker, number>;
}) {
  return (
    <div
      className="border-border bg-surface relative mx-auto w-full overflow-hidden rounded-xl border"
      style={{ maxWidth: width }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
      {markers.map((marker, i) => {
        const { dx, dy } = numberOffset(marker);
        return (
          <Fragment key={i}>
            {marker.box ? (
              <span
                aria-hidden="true"
                className="border-destructive absolute -translate-x-1/2 -translate-y-1/2 rounded-md"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  width: `${marker.box.w}%`,
                  height: `${marker.box.h}%`,
                  borderWidth: marker.box.borderWidth ?? 2,
                }}
              />
            ) : null}
            {marker.hideNumber ? null : (
              <span
                aria-hidden="true"
                className="bg-destructive absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs leading-none font-bold text-white ring-2 [box-shadow:0_1px_4px_rgb(0_0_0_/_0.5)] ring-white"
                style={{
                  left: `${marker.x + dx}%`,
                  top: `${marker.y + dy}%`,
                }}
              >
                {numbers.get(marker)}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function MarkerList({
  markers,
  numbers,
}: {
  markers: ImageMarker[];
  numbers: Map<ImageMarker, number>;
}) {
  return (
    <ol className="flex flex-col gap-2.5">
      {markers.map((marker, i) => (
        <li key={i} className="text-body-text flex items-start gap-2.5 text-sm">
          {/* 이미지 위 배지(size-6 / text-xs)보다 20% 큰 크기 */}
          <span className="bg-destructive flex size-[1.6rem] shrink-0 items-center justify-center rounded-full text-[0.9rem] leading-none font-bold text-white">
            {numbers.get(marker)}
          </span>
          <span className="leading-relaxed text-pretty">
            {renderWithBold(marker.note)}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ResourceBody({ blocks }: { blocks: ContentBlock[] }) {
  const numbers = assignMarkerNumbers(blocks);
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-body-text text-base leading-relaxed text-pretty"
              >
                {renderWithBold(block.text)}
              </p>
            );
          case "heading":
            return (
              <h2
                key={block.id}
                id={block.id}
                className="text-heading scroll-mt-24 pt-2 text-xl font-bold tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-body-text flex items-start gap-2.5 text-sm"
                  >
                    <span
                      className="bg-accent-green mt-2 h-1 w-1 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-pretty">
                      {renderWithBold(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <Alert
                key={index}
                className="border-border bg-surface-muted flex items-center gap-2.5 [&>svg]:translate-y-0"
              >
                {block.tone === "warning" ? (
                  <AlertTriangle className="text-warning shrink-0" />
                ) : (
                  <Info className="text-brand shrink-0" />
                )}
                <AlertDescription className="text-body-text text-sm leading-relaxed text-pretty">
                  {renderWithBold(block.text)}
                </AlertDescription>
              </Alert>
            );
          case "video":
            return (
              <div key={index} className="flex flex-col gap-3">
                {block.description ? (
                  <Alert className="border-border bg-surface-muted flex items-center gap-2.5 [&>svg]:translate-y-0">
                    <Info className="text-brand shrink-0" />
                    <AlertDescription className="text-body-text text-sm leading-relaxed text-pretty">
                      {block.description}
                    </AlertDescription>
                  </Alert>
                ) : null}
                <Button
                  render={
                    <a href={block.url} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  className="h-16 w-fit"
                >
                  <Play />
                  {block.label}
                </Button>
              </div>
            );
          case "video-story":
            return (
              <div
                key={index}
                className="border-border bg-surface-muted flex flex-col gap-5 rounded-xl border p-6"
              >
                <span className="text-brand text-xs font-semibold tracking-wide uppercase">
                  {block.eyebrow}
                </span>
                <h3 className="text-heading text-xl font-bold tracking-tight text-balance">
                  {block.title}
                </h3>
                {block.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className="text-body-text text-sm leading-relaxed text-pretty"
                  >
                    {text}
                  </p>
                ))}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border-border bg-surface rounded-lg border p-4">
                    <p className="text-body-text/80 mb-1.5 text-xs font-semibold">
                      {block.comparison.leftLabel}
                    </p>
                    <p className="text-body-text text-sm leading-relaxed text-pretty">
                      {block.comparison.leftText}
                    </p>
                  </div>
                  <div className="border-border bg-surface rounded-lg border p-4">
                    <p className="text-body-text/80 mb-1.5 text-xs font-semibold">
                      {block.comparison.rightLabel}
                    </p>
                    <p className="text-body-text text-sm leading-relaxed text-pretty">
                      {block.comparison.rightText}
                    </p>
                  </div>
                </div>
                {block.note ? (
                  <Alert className="border-border bg-surface flex items-center gap-2.5 [&>svg]:translate-y-0">
                    <Info className="text-brand shrink-0" />
                    <AlertDescription className="text-body-text text-sm leading-relaxed text-pretty">
                      {block.note}
                    </AlertDescription>
                  </Alert>
                ) : null}
                <Button
                  render={
                    <a href={block.video.url} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  className="h-12 w-fit"
                >
                  <Play fill="currentColor" />
                  {block.video.label}
                </Button>
              </div>
            );
          case "image":
            return (
              <figure key={index} className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt}
                  className="border-border w-full rounded-xl border"
                />
                {block.caption ? (
                  <figcaption className="text-body-text/70 text-center text-xs">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "annotated-image":
            return (
              <figure key={index} className="flex flex-col gap-4">
                <MarkedImage
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  markers={block.markers}
                  numbers={numbers}
                />
                <MarkerList markers={block.markers} numbers={numbers} />
                {block.caption ? (
                  <figcaption className="text-body-text/70 text-center text-xs">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "image-pair":
            return (
              <figure key={index} className="mb-2 flex flex-col gap-4">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <div className="w-full sm:w-auto sm:flex-1">
                    <MarkedImage
                      src={block.left.src}
                      alt={block.left.alt}
                      width={block.left.width}
                      markers={block.left.markers}
                      numbers={numbers}
                    />
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={3}
                    className="text-destructive hidden size-9 shrink-0 sm:block"
                  />
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={3}
                    className="text-destructive size-9 shrink-0 rotate-90 sm:hidden"
                  />
                  <div className="w-full sm:w-auto sm:flex-1">
                    <MarkedImage
                      src={block.right.src}
                      alt={block.right.alt}
                      width={block.right.width}
                      markers={block.right.markers}
                      numbers={numbers}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-center">
                  <div className="w-full sm:w-auto sm:flex-1">
                    <MarkerList markers={block.left.markers} numbers={numbers} />
                  </div>
                  <div aria-hidden="true" className="hidden w-9 shrink-0 sm:block" />
                  <div className="w-full sm:w-auto sm:flex-1">
                    <MarkerList markers={block.right.markers} numbers={numbers} />
                  </div>
                </div>
              </figure>
            );
          case "link":
            return (
              <div key={index} className="flex flex-col gap-2">
                {block.description ? (
                  <p className="text-body-text/80 text-sm leading-relaxed text-pretty">
                    {block.description}
                  </p>
                ) : null}
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-hover inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
                >
                  <ExternalLink className="size-4" />
                  {block.label}
                </a>
              </div>
            );
          case "table":
            return (
              <div
                key={index}
                className="border-border overflow-x-auto rounded-xl border"
              >
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-surface-muted">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          className="text-heading px-4 py-3 font-semibold first:rounded-tl-xl last:rounded-tr-xl"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-border border-t">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="text-body-text px-4 py-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
