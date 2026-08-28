"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company, navigation } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="border-border bg-surface/90 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center"
          onClick={closeMenu}
          aria-label={`${company.name} 홈`}
        >
          <Image
            src="/logo/dongyang-full.webp"
            alt={company.name}
            width={2400}
            height={431}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-control text-label px-3 py-2 transition-colors",
                isActive(pathname, item.href)
                  ? "text-primary"
                  : "text-text hover:text-heading",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="md">
            문의하기
          </Button>
        </div>

        <button
          type="button"
          className="rounded-control text-heading inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden className="text-2xl leading-none">
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>
      </Container>

      {menuOpen ? (
        <div id="mobile-menu" className="border-border bg-surface border-t md:hidden">
          <Container className="flex flex-col py-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "rounded-control text-body px-3 py-3 transition-colors",
                  isActive(pathname, item.href)
                    ? "text-primary"
                    : "text-heading hover:bg-primary-light",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
