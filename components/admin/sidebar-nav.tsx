"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminPages } from "@/lib/admin-schema";
import { logout } from "@/lib/actions/admin";
import { Icon } from "../icon";
import { AdminBrand } from "./admin-brand";
import { ThemeToggle } from "../theme-toggle";

export function SidebarNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/admin", title: "Վահանակ", icon: "dashboard" },
    { href: "/admin/messages", title: "Հաղորդագրություններ", icon: "inbox", badge: unread },
    ...adminPages.map((p) => ({ href: `/admin/${p.slug}`, title: p.title, icon: p.icon })),
  ];

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const current = links.find((link) => isActive(link.href));

  return (
    <>
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <AdminBrand compact />
          <span className="min-w-0">
            <span className="block text-xs text-white/50">Ադմին</span>
            <span className="block truncate text-sm font-semibold">{current?.title}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <ThemeToggle className="!border-white/15 !bg-white/5 !text-white" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-white/15 bg-white/5"
            aria-label="Ցանկ"
            aria-expanded={open}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        className={`${
          open ? "flex" : "hidden"
        } flex-col gap-1 max-lg:fixed max-lg:inset-x-0 max-lg:top-16 max-lg:bottom-0 max-lg:z-40 max-lg:overflow-y-auto max-lg:bg-[var(--ink-deep)] max-lg:p-4 lg:mt-8 lg:flex lg:flex-1 dark:max-lg:bg-[var(--ink-deeper)]`}
      >
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-accent bg-white/10 text-white"
                  : "border-transparent text-white/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon name={link.icon} className={`size-[18px] ${active ? "text-accent" : ""}`} />
              <span className="flex-1">{link.title}</span>
              {"badge" in link && link.badge ? (
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-[#1b1307]">
                  {link.badge}
                </span>
              ) : null}
            </Link>
          );
        })}

        <div className="mt-auto grid gap-1 border-t border-white/10 pt-4 lg:mt-6">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-white/5 hover:text-white">
            <Icon name="external" className="size-[18px]" /> Դիտել կայքը
          </Link>
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-red-500/15 hover:text-red-300">
              <Icon name="logout" className="size-[18px]" /> Ելք
            </button>
          </form>
          <div className="hidden px-3 pt-2 lg:block">
            <ThemeToggle className="!border-white/15 !bg-white/5 !text-white" />
          </div>
        </div>
      </nav>
    </>
  );
}
