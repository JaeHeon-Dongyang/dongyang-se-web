import { FileDown } from "lucide-react";
import type { Attachment } from "@/lib/resources-data";

export function AttachmentCard({ attachment }: { attachment: Attachment }) {
  return (
    <a
      href={attachment.href}
      download
      className="border-border bg-surface hover:border-brand focus-visible:ring-accent-green flex items-center gap-4 rounded-2xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="bg-accent-green-light text-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
        <FileDown className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-heading text-sm font-semibold">{attachment.name}</span>
        <span className="text-body-text text-xs">
          {attachment.type} · {attachment.size}
        </span>
      </div>
      <span className="border-brand text-brand shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold">
        다운로드
      </span>
    </a>
  );
}
