import Link from "next/link";
import type { Package } from "@/lib/types";
import { Icon } from "../icon";

export function PackageCard({ pkg, price }: { pkg: Package; price: string }) {
  return (
    <article
      className={`paper paper-hover relative flex flex-col overflow-hidden p-7 ${
        pkg.highlighted ? "!border-accent !shadow-[6px_6px_0_0_var(--accent)]" : ""
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute top-5 -right-10 rotate-45 bg-accent px-10 py-1 text-[11px] font-bold text-[#1b1307]">
          Լավագույն
        </span>
      )}
      <span className="text-xs font-bold tracking-[0.18em] text-accent-strong uppercase dark:text-accent">{pkg.name}</span>
      {pkg.description && <p className="mt-2 text-sm text-muted">{pkg.description}</p>}
      <div className="mt-6 border-y border-dashed border-border py-5">
        <span className="text-4xl font-black tracking-tight text-brand">{price}</span>
        {pkg.period && <span className="ml-2 text-sm text-muted">/ {pkg.period}</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-[15px]">
        {pkg.features.map((f, i) => (
          <li key={`${i}-${f}`} className="flex items-start gap-3">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-strong dark:text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/contact" className={`btn mt-8 w-full ${pkg.highlighted ? "btn-accent" : "btn-primary"}`}>
        Գրանցվել
      </Link>
    </article>
  );
}
