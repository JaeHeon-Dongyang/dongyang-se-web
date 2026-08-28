import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
                className="border-border bg-surface-muted items-start gap-2.5"
              >
                {block.tone === "warning" ? (
                  <AlertTriangle className="text-warning" />
                ) : (
                  <Info className="text-brand" />
                )}
                <AlertDescription className="text-body-text text-sm leading-relaxed text-pretty">
                  {block.text}
                </AlertDescription>
              </Alert>
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
