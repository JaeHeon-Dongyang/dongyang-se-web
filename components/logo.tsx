import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * (주)동양구조엔지니어링 로고.
 * 심벌은 실제 제공 에셋(`public/logo/`), 가로형은 심벌 + 워드마크 조합.
 * 워드마크 폰트/크기는 유지, 심벌만 실제 로고로 교체.
 */
function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/dongyang-symbol-512.png"
      alt=""
      width={512}
      height={512}
      priority
      aria-hidden="true"
      className={cn("shrink-0", className)}
    />
  );
}

export function LogoSymbol({ className }: { className?: string }) {
  return <Mark className={cn("h-8 w-8", className)} />;
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <Mark className="h-9 w-9" />
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
