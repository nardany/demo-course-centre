import Link from "next/link";
import { Icon } from "@/components/icon";
import { PageTitle } from "@/components/admin/page-title";
import { adminPages } from "@/lib/admin-schema";
import { getContent, getMessages } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export default async function DashboardPage() {
  const [content, messages] = await Promise.all([getContent(), getMessages()]);
  const unread = messages.filter((m) => !m.read);

  const stats = [
    { label: "Նոր հաղորդագրություն", value: unread.length, icon: "inbox", href: "/admin/messages" },
    { label: "Դասընթաց", value: content.courses.length, icon: "book", href: "/admin/courses" },
    { label: "Դասընթացավար", value: content.team.length, icon: "users", href: "/admin/about" },
    { label: "Կարծիք", value: content.testimonials.length, icon: "star", href: "/admin/testimonials" },
  ];

  return (
    <>
      <PageTitle title="Բարի գալուստ" text="Կարճ ամփոփում և արագ հղումներ դեպի կայքի բոլոր բաժինները։" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Link
            key={s.label}
            href={s.href}
            className={`group flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5 ${
              i === 0
                ? "rounded-[0.875rem] bg-[var(--ink)] text-white shadow-[5px_5px_0_0_var(--accent)] transition hover:-translate-y-0.5 dark:bg-brand-soft"
                : "paper paper-hover"
            }`}
          >
            <span
              className={`grid size-12 place-items-center rounded-lg transition ${
                i === 0 ? "bg-accent text-[#1b1307]" : "bg-brand-soft text-brand group-hover:bg-brand-btn group-hover:text-white"
              }`}
            >
              <Icon name={s.icon} />
            </span>
            <span>
              <span className="block text-2xl font-black">{s.value}</span>
              <span className={`text-sm ${i === 0 ? "text-white/70" : "text-muted"}`}>{s.label}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
        <section className="paper p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Վերջին հաղորդագրությունները</h2>
            <Link href="/admin/messages" className="text-sm font-medium text-brand hover:underline">
              Բոլորը
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="mt-6 text-muted">Դեռ հաղորդագրություններ չկան։</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-2 size-2 shrink-0 rounded-full ${m.read ? "bg-border" : "bg-accent"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-xs text-muted">{formatDateTime(m.createdAt)}</span>
                    </div>
                    <p className="truncate text-sm text-muted">{m.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="paper p-4 sm:p-6">
          <h2 className="text-lg font-semibold">Արագ հղումներ</h2>
          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <span className="flex items-center gap-3">
                <Icon name="gift" className="size-5 text-accent-strong" />
                Ակցիաներ
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  content.promo.enabled ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-surface-2 text-muted"
                }`}
              >
                {content.promo.enabled ? "Միացված" : "Անջատված"}
              </span>
            </div>
            {adminPages.map((p) => (
              <Link key={p.slug} href={`/admin/${p.slug}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-muted transition hover:bg-surface-2 hover:text-fg">
                <Icon name={p.icon} className="size-5" />
                <span className="flex-1">{p.title}</span>
                <Icon name="arrowRight" className="size-4" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
