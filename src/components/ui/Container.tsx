import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** 일관된 최대 콘텐츠 폭 + 좌우 여백 (마스터 프롬프트 6.3). */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("max-w-content mx-auto w-full px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
