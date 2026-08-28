import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-label " +
  "transition-colors duration-150 disabled:cursor-not-allowed " +
  "disabled:bg-disabled-surface disabled:text-disabled-text";

const variants: Record<Variant, string> = {
  // 기본 CTA: #16181D 배경 + 흰색 텍스트 (마스터 프롬프트 6.1 대비 기준)
  primary: "bg-heading text-white hover:bg-black/85 active:bg-black",
  // 보조 CTA: primary 컬러 테두리
  secondary:
    "border border-primary text-primary bg-surface hover:bg-primary-light active:bg-primary-light/70",
  ghost: "text-primary hover:bg-primary-light active:bg-primary-light/70",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-label",
  lg: "h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * 링크/버튼 겸용. `href` 가 있으면 `<a>`(내부 경로는 next/link)로,
 * 없으면 `<button>` 으로 렌더한다. 상태: default / hover / focus / active / disabled.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<
    ButtonAsButton,
    keyof CommonProps
  >;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
