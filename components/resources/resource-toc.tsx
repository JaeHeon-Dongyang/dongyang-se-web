import type { ContentBlock } from "@/lib/resources-data";

export function ResourceToc({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter((b) => b.type === "heading") as {
    type: "heading";
    text: string;
    id: string;
  }[];

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="border-border flex flex-col gap-3 rounded-2xl border p-5"
    >
      <span className="text-heading text-sm font-semibold">목차</span>
      <ul className="flex flex-col gap-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-body-text hover:text-brand text-sm leading-relaxed transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
