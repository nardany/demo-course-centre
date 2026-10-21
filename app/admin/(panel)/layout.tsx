import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminBrand } from "@/components/admin/admin-brand";
import { Icon } from "@/components/icon";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getMessages } from "@/lib/db";

export const metadata: Metadata = {
  title: { default: "Ադմին վահանակ", template: "%s | Ադմին" },
  robots: { index: false },
};

async function SessionGate({ children }: { children: React.ReactNode }) {
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const role = await verifySessionToken(token);
  if (!role) redirect("/admin/login");
  return (
    <>
      {role === "demo" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border-[1.5px] border-accent bg-accent-soft p-4 text-sm">
          <Icon name="eye" className="mt-0.5 size-5 shrink-0 text-accent-strong dark:text-accent" />
          <p>
            <b>Դեմո մուտք։</b> Կարող եք բացել բոլոր բաժինները և փորձել խմբագրումը, բայց փոփոխությունները չեն
            պահպանվում։ Իրական կայքում կառավարումը լիարժեք է։
          </p>
        </div>
      )}
      {children}
    </>
  );
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const unread = (await getMessages()).filter((m) => !m.read).length;

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 z-30 bg-[var(--ink-deep)] px-4 py-3 text-white lg:flex lg:h-dvh lg:flex-col lg:p-5 dark:bg-[var(--ink-deeper)]">
        <div className="hidden lg:block">
          <AdminBrand />
        </div>
        <Suspense fallback={<div className="h-10 lg:mt-6 lg:h-auto lg:flex-1" />}>
          <SidebarNav unread={unread} />
        </Suspense>
      </aside>
      <main className="min-w-0 bg-bg p-4 sm:p-8 lg:p-10">
        <Suspense
          fallback={
            <div className="grid min-h-[50vh] place-items-center">
              <span className="size-8 animate-spin rounded-full border-4 border-border border-t-brand" />
            </div>
          }
        >
          <SessionGate>{children}</SessionGate>
        </Suspense>
      </main>
    </div>
  );
}
