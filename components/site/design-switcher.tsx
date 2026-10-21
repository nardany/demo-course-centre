"use client";

import { useState } from "react";
import { Icon } from "../icon";

const PALETTES = [
  { id: "", label: "Ակադեմիական", colors: ["#12428a", "#c39a52"] },
  { id: "emerald", label: "Զմրուխտ", colors: ["#0f766e", "#e0a43c"] },
  { id: "coral", label: "Կորալ", colors: ["#c2334f", "#f2a65a"] },
  { id: "violet", label: "Մանուշակ", colors: ["#6d28d9", "#f59e0b"] },
];

function read(key: string) {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function write(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {}
}

/** Demo-only panel that lets visitors try colour palettes and light/dark mode live. */
export function DesignSwitcher() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<string | null>(null);
  const [dark, setDark] = useState<boolean | null>(null);

  function toggle() {
    if (!open) {
      // Read the current state when the panel opens (it is applied before paint by the root layout).
      setPalette(document.documentElement.getAttribute("data-palette") ?? read("palette"));
      setDark(document.documentElement.classList.contains("dark"));
    }
    setOpen((v) => !v);
  }

  function choosePalette(id: string) {
    if (id) document.documentElement.setAttribute("data-palette", id);
    else document.documentElement.removeAttribute("data-palette");
    write("palette", id);
    setPalette(id);
  }

  function chooseMode(isDark: boolean) {
    document.documentElement.classList.toggle("dark", isDark);
    write("theme", isDark ? "dark" : "light");
    setDark(isDark);
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Դիզայնի ընտրություն"
          className="paper animate-pop-in mb-3 w-[min(19rem,calc(100vw-2rem))] p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Փորձեք այլ ոճ</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Փակել" className="text-muted hover:text-fg">
              <Icon name="x" className="size-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.id || "default"}
                type="button"
                onClick={() => choosePalette(p.id)}
                aria-pressed={palette === p.id}
                className={`flex items-center gap-2 rounded-lg border-[1.5px] p-2 text-left text-xs font-semibold transition ${
                  palette === p.id ? "border-brand bg-brand-soft" : "border-border hover:border-brand/50"
                }`}
              >
                <span className="flex -space-x-1.5">
                  {p.colors.map((c) => (
                    <span key={c} className="size-5 rounded-full ring-2 ring-surface" style={{ background: c }} />
                  ))}
                </span>
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              [false, "sun", "Լուսավոր"],
              [true, "moon", "Մուգ"],
            ].map(([isDark, icon, label]) => (
              <button
                key={String(label)}
                type="button"
                onClick={() => chooseMode(isDark as boolean)}
                aria-pressed={dark === isDark}
                className={`flex items-center justify-center gap-2 rounded-lg border-[1.5px] p-2 text-xs font-semibold transition ${
                  dark === isDark ? "border-brand bg-brand-soft" : "border-border hover:border-brand/50"
                }`}
              >
                <Icon name={icon as string} className="size-4" /> {label as string}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Սա ընդամենը օրինակ է։ Ձեր կայքի գույները, տառատեսակները, անիմացիաները և բովանդակությունը կստեղծվեն
            հենց ձեր բրենդի համար։
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-[var(--ink)] py-2.5 pr-4 pl-3 text-sm font-semibold text-white shadow-lg ring-2 ring-accent/60 transition hover:-translate-y-0.5"
      >
        <span className="flex -space-x-1">
          <span className="size-3.5 rounded-full bg-brand-2 ring-2 ring-[var(--ink)]" />
          <span className="size-3.5 rounded-full bg-accent ring-2 ring-[var(--ink)]" />
        </span>
        Դիզայն
      </button>
    </div>
  );
}
