import { cn } from "@/lib/utils";

/**
 * Brand mark for Dongyang Structural Engineering.
 * A restrained truss motif (frame + diagonal brace) that reads as a
 * structural bracing detail — reused as the symbol mark, and combined
 * with the wordmark for the horizontal lockup.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="6" fill="#0B6C43" />
      <path
        d="M9 23V9H23"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9L23 23"
        stroke="#47B089"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16H16"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoSymbol({ className }: { className?: string }) {
  return <Mark className={cn("h-8 w-8 shrink-0", className)} />;
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-heading text-[15px] font-bold tracking-tight whitespace-nowrap">
          동양구조엔지니어링
        </span>
        <span className="text-body-text text-[9px] font-medium tracking-[0.14em] whitespace-nowrap">
          DONGYANG STRUCTURAL ENGINEERING
        </span>
      </span>
    </span>
  );
}
