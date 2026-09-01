"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoHorizontal } from "@/components/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactNav, type primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav({
  navItems,
}: {
  navItems: ReadonlyArray<(typeof primaryNav)[number]>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="text-heading md:hidden" />}
        aria-label="메뉴 열기"
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface flex w-[280px] flex-col gap-0 p-0">
        <SheetHeader className="border-border border-b px-5 py-5 text-left">
          <SheetTitle className="sr-only">메뉴</SheetTitle>
          <LogoHorizontal />
        </SheetHeader>
        <nav
          aria-label="모바일 내비게이션"
          className="flex flex-1 flex-col gap-1 px-3 py-4"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <SheetClose
                render={<Link href={item.href} />}
                key={item.href}
                className={cn(
                  "text-heading hover:bg-surface-muted rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  active && "bg-accent-green-light text-brand",
                )}
              >
                {item.label}
              </SheetClose>
            );
          })}
        </nav>
        <div className="border-border border-t p-4">
          <SheetClose
            render={<Link href={contactNav.href} />}
            className="bg-brand text-brand-foreground hover:bg-brand-hover flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors"
          >
            {contactNav.label}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
