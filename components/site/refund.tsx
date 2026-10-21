import Link from "next/link";
import type { RefundSection } from "@/lib/types";
import { Icon } from "../icon";

export function Refund({ refund }: { refund: RefundSection }) {
  if (!refund.enabled) return null;
  return (
    <section className="container-x py-20">
      <div data-reveal className="rounded-2xl bg-[var(--ink)] p-2 text-white dark:bg-[var(--ink-deep)]">
        <div className="grid gap-10 rounded-xl border-2 border-accent/60 p-7 outline-1 outline-offset-[-10px] outline-accent/30 outline-dashed sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
          {refund.amount && (
            <div className="text-center lg:text-left">
              <div className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">մինչև</div>
              <div className="mt-1 text-5xl font-black tracking-tight whitespace-nowrap sm:text-7xl">{refund.amount}</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm">
                <Icon name="shield" className="size-4 text-accent" /> ԿԳՄՍ նախարարություն
              </div>
            </div>
          )}
          <div className="lg:border-l lg:border-white/15 lg:pl-14">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{refund.title}</h2>
            <p className="mt-4 leading-relaxed text-white/75">{refund.text}</p>
            {refund.note && <p className="mt-4 leading-relaxed font-medium">{refund.note}</p>}
            <Link href="/contact" className="btn btn-accent mt-8">
              Իմանալ ավելին <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
