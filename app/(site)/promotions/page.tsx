import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { getSiteContent, isPromoActive } from "@/lib/db";

export const metadata: Metadata = {
  title: "Ակցիաներ",
  description: "Ընթացիկ ակցիաները և հատուկ առաջարկները։",
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("hy-AM", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export default async function PromotionsPage() {
  const content = await getSiteContent();
  if (!isPromoActive(content)) notFound();
  const { promo, promotions } = content;

  return (
    <>
      <PageHero eyebrow="Ակցիաներ" title={promo.title} text={promo.text} />

      <section className="container-x py-20">
        <div className="mx-auto grid max-w-4xl gap-5">
          {promotions.map((item, i) => (
            <article
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="paper paper-hover relative grid gap-5 overflow-hidden border-l-[6px] !border-l-accent p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8"
            >
              {item.badge ? (
                <span className="grid min-w-24 place-items-center rounded-lg bg-[var(--ink)] px-4 py-3 text-3xl font-black text-accent dark:bg-brand-soft">
                  {item.badge}
                </span>
              ) : (
                <span className="grid size-16 place-items-center rounded-lg bg-accent-soft text-accent-strong dark:text-accent">
                  <Icon name="gift" className="size-7" />
                </span>
              )}
              <div>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                {item.validUntil && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-accent-strong dark:text-accent">
                    <Icon name="calendar" className="size-4" /> Գործում է մինչև {formatDate(item.validUntil)}
                  </p>
                )}
              </div>
              <Link href="/contact" className="btn btn-primary">
                Օգտվել <Icon name="arrowRight" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
