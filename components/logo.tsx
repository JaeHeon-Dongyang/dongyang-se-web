import { cn } from "@/lib/utils";

/**
 * (주)동양구조엔지니어링 로고.
 * 심벌은 모회사 (주)동양구조 마크를 계승한 정사각 형태로, 솔리드 사각형에서
 * 상단 웨지·D 카운터·우하단 45° 슬래시 세 개를 마스크로 파낸다. 색만 자사 그린.
 * 워드마크 폰트/크기는 유지.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <mask
        id="dy-symbol-mask"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <rect width="100" height="100" fill="white" />
        <path d="M58 0 H73 L70 12 Z" fill="black" />
        <path d="M0 31 H52 L70 50 L49 72 H29 V34 H0 Z" fill="black" />
        <path d="M64 100 H72 L100 72 V64 Z" fill="black" />
      </mask>
      <rect width="100" height="100" fill="#0B6C43" mask="url(#dy-symbol-mask)" />
    </svg>
  );
}

export function LogoSymbol({ className }: { className?: string }) {
  return <Mark className={cn("h-[30px] w-[30px]", className)} />;
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark className="h-[30px] w-[30px]" />
      <span className="flex flex-col gap-[3px] leading-none">
        <span className="text-heading text-[15px] font-bold tracking-[-0.02em] whitespace-nowrap">
          (주)동양구조엔지니어링
        </span>
        <span className="text-body-text text-[9px] font-medium tracking-[0.14em] whitespace-nowrap">
          DONGYANG STRUCTURAL ENGINEERING
        </span>
      </span>
    </span>
  );
}
