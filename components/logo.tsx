import { cn } from "@/lib/utils";

/**
 * (주)동양구조엔지니어링 로고.
 * 심벌은 제공 에셋 `public/logo/dongyang-symbol.svg` 를 인라인한 것 (여백 없이 박스를 꽉 채움).
 * 워드마크 폰트/크기는 유지.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 207 224"
      className={cn("w-auto shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <mask
        id="dy-symbol-mask"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="207"
        height="224"
      >
        <rect width="207" height="224" fill="white" />
        <path d="M132 0 L149 21 L166 0 Z" fill="black" />
        <path d="M0 63 H110 L151 108 L110 161 H55 V82 H0 Z" fill="black" />
        <path d="M141 224 L207 158 V176 L159 224 Z" fill="black" />
      </mask>
      <rect width="207" height="224" fill="#0B6C43" mask="url(#dy-symbol-mask)" />
    </svg>
  );
}

export function LogoSymbol({ className }: { className?: string }) {
  return <Mark className={cn("h-[30px] w-[30px]", className)} />;
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <Mark className="h-[30px] w-[30px]" />
      <span className="flex flex-col leading-none">
        <span className="text-heading text-[15px] font-bold tracking-tight whitespace-nowrap">
          (주)동양구조엔지니어링
        </span>
        <span className="text-body-text text-[9px] font-medium tracking-[0.14em] whitespace-nowrap">
          DONGYANG STRUCTURAL ENGINEERING
        </span>
      </span>
    </span>
  );
}
