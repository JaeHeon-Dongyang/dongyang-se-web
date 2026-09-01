import { Fragment } from "react";
import { AlertTriangle, ExternalLink, Info, Play } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ContentBlock } from "@/lib/resources-data";

export function ResourceBody({ blocks }: { blocks: ContentBlock[] }) {
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
                {block.text}
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
                    <span className="leading-relaxed text-pretty">{item}</span>
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
                  {block.text}
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
                <div
                  className="border-border bg-surface relative mx-auto w-full overflow-hidden rounded-xl border"
                  style={{ maxWidth: block.width }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.src} alt={block.alt} className="block w-full" />
                  {block.markers.map((marker) => (
                    <Fragment key={marker.n}>
                      {marker.box ? (
                        <span
                          aria-hidden="true"
                          className="border-destructive absolute -translate-x-1/2 -translate-y-1/2 rounded-md border-2"
                          style={{
                            left: `${marker.x}%`,
                            top: `${marker.y}%`,
                            width: `${marker.box.w}%`,
                            height: `${marker.box.h}%`,
                          }}
                        />
                      ) : null}
                      <span
                        aria-hidden="true"
                        className="bg-destructive absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs leading-none font-bold text-white ring-2 [box-shadow:0_1px_4px_rgb(0_0_0_/_0.5)] ring-white"
                        style={{
                          left: `${marker.x + (marker.box ? marker.box.w / 2 : 0)}%`,
                          top: `${marker.y + (marker.box ? marker.box.h / 2 : 0)}%`,
                        }}
                      >
                        {marker.n}
                      </span>
                    </Fragment>
                  ))}
                </div>
                <ol className="flex flex-col gap-2.5">
                  {block.markers.map((marker) => (
                    <li
                      key={marker.n}
                      className="text-body-text flex items-start gap-2.5 text-sm"
                    >
                      <span className="bg-destructive mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] leading-none font-bold text-white">
                        {marker.n}
                      </span>
                      <span className="leading-relaxed text-pretty">{marker.note}</span>
                    </li>
                  ))}
                </ol>
                {block.caption ? (
                  <figcaption className="text-body-text/70 text-center text-xs">
                    {block.caption}
                  </figcaption>
                ) : null}
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
