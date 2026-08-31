"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoHorizontal } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { contactNav, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-surface/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="focus-visible:ring-focus-ring flex items-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
          aria-label="(주)동양구조엔지니어링 홈"
        >
          <LogoHorizontal />
        </Link>

        <nav aria-label="주요 내비게이션" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-body-text hover:text-brand focus-visible:ring-focus-ring rounded-md px-4 py-2 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  active && "text-brand",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={contactNav.href}
            aria-label={contactNav.label}
            title={contactNav.label}
            className="bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring hidden items-center justify-center rounded-full p-3 transition-colors focus-visible:ring-2 focus-visible:outline-none md:inline-flex"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
