import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * 동양구조엔지니어링 로고. 실제 제공 에셋(`public/logo/`)을 사용한다.
 * - LogoHorizontal: 가로형 워드마크 (데스크톱 헤더/푸터)
 * - LogoSymbol: 심벌 단독 (모바일 헤더, 컴팩트 영역)
 */

export function LogoSymbol({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/dongyang-symbol-512.png"
      alt="동양구조엔지니어링"
      width={512}
      height={512}
      priority
      className={cn("h-8 w-auto shrink-0", className)}
    />
  );
}

export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/dongyang-full.webp"
      alt="동양구조엔지니어링"
      width={2400}
      height={431}
      priority
      className={cn("h-8 w-auto", className)}
    />
  );
}
