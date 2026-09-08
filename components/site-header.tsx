"use client";

import { ArrowRight } from "lucide-react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useIntranetAccess } from "@/components/intranet-access-provider";
import { LogoHorizontal } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { contactNav, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function NavLinkContent({ label, active }: { label: string; active: boolean }) {
  const { pending } = useLinkStatus();
  const selected = active || pending;

  return (
    <>
      <span className={cn(selected && "text-brand font-semibold")}>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "bg-brand absolute right-3 bottom-0 left-3 h-0.5 opacity-0 lg:right-4 lg:left-4",
          selected && "opacity-100",
        )}
      />
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const intranet = useIntranetAccess();
  const navItems = primaryNav.filter((item) => intranet || !item.intranetOnly);

  return (
    <header className="border-input bg-background/95 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-site flex min-h-16 items-center justify-between gap-6 py-2.5">
        <Link
          href="/"
          className="focus-visible:ring-focus-ring flex items-center focus-visible:ring-2 focus-visible:outline-none"
          aria-label="(주)동양구조엔지니어링 홈"
        >
          <LogoHorizontal />
        </Link>

        <div className="flex items-center gap-4 lg:gap-8">
          <nav aria-label="주요 내비게이션" className="hidden items-stretch md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-body-text hover:text-brand focus-visible:ring-focus-ring relative px-3 py-3 text-[14.5px] font-medium tracking-[-0.015em] transition-colors focus-visible:ring-2 focus-visible:outline-none lg:px-4",
                  )}
                >
                  <NavLinkContent label={item.label} active={active} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={contactNav.href}
              className="bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:ring-focus-ring hidden items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none lg:inline-flex"
            >
              {contactNav.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
