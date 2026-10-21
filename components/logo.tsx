import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Demo Academy — գլխավոր էջ">
      <span className="grid size-11 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5 transition group-hover:-rotate-3">
        <LogoMark />
      </span>
      {!compact && (
        <span className="leading-none whitespace-nowrap">
          <span className="block text-[17px] font-bold tracking-tight">
            Demo<span className="text-accent-strong dark:text-accent">.</span>
          </span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.32em] text-muted">Academy</span>
        </span>
      )}
    </Link>
  );
}
