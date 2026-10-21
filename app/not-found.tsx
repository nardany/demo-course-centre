import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = { title: "404 — Էջը չի գտնվել" };

const chat = [
  { me: true, lang: "EN", text: "Excuse me, where is this page?" },
  { me: false, lang: "FR", text: "Désolé, cette page n'existe pas." },
  { me: true, lang: "DE", text: "Wirklich? Gar nicht?" },
  { me: false, lang: "HY", text: "Ցավոք, ոչ։ Բայց ահա ճիշտ ճանապարհը։" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="container-x flex items-center justify-between py-5">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="container-x grid flex-1 items-center gap-12 py-12 lg:grid-cols-2">
        <div>
          <div className="flex items-end gap-2 text-[7rem] leading-none font-black tracking-tighter text-brand sm:text-[10rem]">
            4
            <span className="relative mb-3 grid size-[5.5rem] place-items-center rounded-2xl rounded-bl-sm bg-accent text-5xl text-[#1b1307] shadow-[5px_5px_0_0_var(--brand-btn)] sm:size-[8rem] sm:text-7xl">
              ?
            </span>
            4
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Այս էջը գոյություն չունի</h1>
          <p className="mt-3 max-w-md text-lg text-muted">
            Հնարավոր է՝ հղումը սխալ է կամ էջը տեղափոխվել է։ Ընտրեք, թե ուր գնալ։
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              <Icon name="home" className="size-4" /> Գլխավոր էջ
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Փորձնական դաս <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="paper mx-auto w-full max-w-md p-5" aria-hidden="true">
          <div className="flex items-center gap-2 border-b border-border pb-3 text-sm text-muted">
            <Icon name="message" className="size-4" /> Դասի չատ
          </div>
          <ul className="mt-4 space-y-3">
            {chat.map((line, i) => (
              <li
                key={i}
                className={`animate-pop-in flex ${line.me ? "justify-end" : "justify-start"}`}
                style={{ animationDelay: `${0.3 + i * 0.6}s` }}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] ${
                    line.me ? "rounded-br-sm bg-brand-btn text-white" : "rounded-bl-sm bg-surface-2"
                  }`}
                >
                  <span className={`mr-2 text-[10px] font-black ${line.me ? "text-accent" : "text-accent-strong"}`}>
                    {line.lang}
                  </span>
                  {line.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
