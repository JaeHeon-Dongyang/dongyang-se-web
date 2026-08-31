import { AlertTriangle, Info, Play } from "lucide-react";
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
              <div
                key={index}
                className="border-border bg-surface-muted flex flex-col items-start gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                {block.description ? (
                  <p className="text-body-text text-sm leading-relaxed text-pretty">
                    {block.description}
                  </p>
                ) : null}
                <Button
                  render={
                    <a href={block.url} target="_blank" rel="noopener noreferrer" />
                  }
                  className="shrink-0"
                >
                  <Play />
                  {block.label}
                </Button>
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
