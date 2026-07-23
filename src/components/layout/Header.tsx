"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-charcoal/10 bg-cream/85 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-cream/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-8">
        <Link href="#home" className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:bg-charcoal/5 hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
          <Button href="#order" size="md" className="ml-2">
            Order Now
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded md:hidden hover:bg-charcoal/5"
        >
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 h-0.5 w-5 bg-charcoal transition-all", open ? "top-2 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 top-2 h-0.5 w-5 bg-charcoal transition-all", open && "opacity-0")} />
            <span className={cn("absolute left-0 h-0.5 w-5 bg-charcoal transition-all", open ? "top-2 -rotate-45" : "top-4")} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-charcoal/10 bg-cream/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0 border-transparent",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal/5"
            >
              {item.label}
            </Link>
          ))}
          <Button href="#order" size="lg" className="mt-2" onClick={() => setOpen(false)}>
            Order Now
          </Button>
        </nav>
      </div>
    </header>
  );
}
