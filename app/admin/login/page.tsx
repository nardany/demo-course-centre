import type { Metadata } from "next";
import { LogoMark } from "@/components/logo-mark";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Մուտք ադմին վահանակ", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-[var(--ink-deep)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Icon name="star" filled className="pointer-events-none absolute -right-16 -bottom-16 size-80 text-white/5" />
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-lg bg-white p-1">
            <LogoMark />
          </span>
          <span className="text-xl font-bold">
            Demo<span className="text-accent">Academy</span>
          </span>
        </div>
        <div className="relative max-w-sm">
          <p className="text-3xl leading-snug font-bold">Կառավարեք կայքի ամբողջ բովանդակությունը մեկ տեղից։</p>
          <ul className="mt-8 space-y-3 text-white/70">
            {["Դասընթացներ և գներ", "Թիմ և կարծիքներ", "Հայտեր կայքից"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Icon name="check" className="size-4 text-accent" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/40">© Demo Academy</p>
      </div>

      <div className="relative grid place-items-center px-4 py-12">
        <ThemeToggle className="absolute top-5 right-5" />
        <div className="w-full max-w-sm">
          <span className="mb-6 grid size-14 place-items-center rounded-lg bg-white p-1.5 ring-1 ring-black/5 lg:hidden">
            <LogoMark />
          </span>
          <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent-strong uppercase dark:text-accent">
            <Icon name="star" filled className="size-3" /> Ադմին վահանակ
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Մուտք</h1>
          <p className="mt-2 text-muted">Մուտքագրեք ադմինի գաղտնաբառը։</p>
          <LoginForm />
          {process.env.DEMO_PASSWORD && (
            <div className="mt-6 rounded-xl border-[1.5px] border-dashed border-accent bg-accent-soft p-4 text-sm">
              <div className="font-bold">Դեմո մուտք</div>
              <p className="mt-1 text-muted">
                Գաղտնաբառ՝{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-bold text-fg">{process.env.DEMO_PASSWORD}</code>
              </p>
              <p className="mt-1 text-xs text-muted">Դեմո ռեժիմում փոփոխությունները չեն պահպանվում։</p>
            </div>
          )}
          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-brand">
            <Icon name="arrowLeft" className="size-4" /> Վերադառնալ կայք
          </Link>
        </div>
      </div>
    </div>
  );
}
