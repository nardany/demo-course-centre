"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Settings } from "@/lib/types";
import { Icon } from "../icon";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";

type NavLink = { href: string; label: string };

export function Header({
  promoActive,
  kidsActive,
  settings,
}: {
  promoActive: boolean;
  kidsActive: boolean;
  settings: Settings;
}) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links: NavLink[] = [
    { href: "/", label: "Գլխավոր" },
    { href: "/courses", label: "Դասընթացներ" },
    ...(kidsActive ? [{ href: "/kids", label: "Երեխաներին" }] : []),
    { href: "/about", label: "Մեր մասին" },
    ...(promoActive ? [{ href: "/promotions", label: "Ակցիաներ" }] : []),
    { href: "/contact", label: "Կապ" },
  ];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      {/* Contact strip */}
      <div className="hidden bg-[var(--ink)] text-[13px] text-white/80 md:block dark:bg-[var(--ink-deep)]">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icon name="video" className="size-3.5 text-accent" /> Օնլայն դասեր ամբողջ աշխարհից
            </span>
            {settings.phone && (
              <a href={tel(settings.phone)} className="flex items-center gap-1.5 hover:text-white">
                <Icon name="phone" className="size-3.5" /> {settings.phone}
              </a>
            )}
            {settings.phone2 && (
              <a href={tel(settings.phone2)} className="hover:text-white">
                {settings.phone2}
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {[
              ["instagram", settings.instagram],
              ["facebook", settings.facebook],
              ["tiktok", settings.tiktok],
              ["linkedin", settings.linkedin],
            ]
              .filter(([, href]) => href)
              .map(([icon, href]) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={icon} className="hover:text-accent">
                  <Icon name={icon} className="size-3.5" />
                </a>
              ))}
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-border bg-bg/85 shadow-sm backdrop-blur-xl" : "border-transparent bg-bg"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[15px] font-medium transition ${
                  isActive(link.href) ? "text-brand" : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary hidden !py-2.5 sm:inline-flex">
              Փորձնական դաս
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg border-[1.5px] border-border bg-surface lg:hidden"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Բացել ցանկը"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>

      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Ցանկ"
        className={`fixed inset-0 z-[60] flex flex-col bg-bg transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-x flex h-[72px] shrink-0 items-center justify-between border-b border-border">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-lg border-[1.5px] border-border bg-surface"
            aria-label="Փակել ցանկը"
          >
            <Icon name="x" />
          </button>
        </div>

        <nav className="container-x flex-1 overflow-y-auto py-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`flex items-center justify-between border-b border-border py-4 text-xl font-semibold transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              } ${isActive(link.href) ? "text-brand" : ""}`}
            >
              {link.label}
              <Icon name="arrowRight" className="size-5 text-accent" />
            </Link>
          ))}
        </nav>

        <div className="container-x shrink-0 border-t border-border bg-surface py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Գրանցվել անվճար փորձնական դասի
          </Link>
          <div className="mt-3 flex items-center justify-between gap-3">
            {settings.phone ? (
              <a href={tel(settings.phone)} className="flex items-center gap-2 font-semibold">
                <Icon name="phone" className="size-4 text-accent-strong dark:text-accent" /> {settings.phone}
              </a>
            ) : (
              <span />
            )}
            <div className="flex gap-1">
              {[
                ["instagram", settings.instagram],
                ["facebook", settings.facebook],
                ["tiktok", settings.tiktok],
              ]
                .filter(([, href]) => href)
                .map(([icon, href]) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon}
                    className="grid size-9 place-items-center rounded-lg text-muted hover:text-brand"
                  >
                    <Icon name={icon} className="size-[18px]" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
