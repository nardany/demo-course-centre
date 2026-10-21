import Link from "next/link";
import { Icon } from "../icon";

export function CallToAction({ phone, title, text }: { phone: string; title: string; text: string }) {
  return (
    <section className="relative mt-10 overflow-hidden bg-accent text-[#1b1307]">
      <Icon name="star" filled className="pointer-events-none absolute -top-10 right-[8%] size-48 text-white/15" />
      <div className="container-x relative grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div data-reveal>
          <h2 className="text-3xl font-black tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-[#1b1307]/75">
            {text}
          </p>
        </div>
        <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href="/contact" className="btn bg-[var(--ink)] text-white shadow-[0_3px_0_0_var(--ink-deep)] hover:bg-[var(--ink-deep)]">
            Գրանցվել <Icon name="arrowRight" className="size-4" />
          </Link>
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn border-2 border-[#1b1307]/80 hover:bg-[#1b1307] hover:text-accent">
              <Icon name="phone" className="size-4" /> {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
