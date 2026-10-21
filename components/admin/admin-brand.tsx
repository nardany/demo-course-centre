import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/admin" className="flex items-center gap-3" aria-label="Ադմին վահանակ">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white p-1">
        <LogoMark />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-[15px] font-bold">
            Demo<span className="text-accent">Academy</span>
          </span>
          <span className="block text-[10px] font-semibold tracking-[0.25em] text-white/50 uppercase">Ադմին</span>
        </span>
      )}
    </Link>
  );
}
