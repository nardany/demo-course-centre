"use client";

import { Icon } from "./icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Փոխել թեման"
      title="Լուսավոր / մուգ"
      className={`relative grid size-10 place-items-center rounded-lg border-[1.5px] border-border bg-surface text-fg transition hover:border-brand hover:text-brand ${className}`}
    >
      <Icon name="moon" className="size-[18px] dark:hidden" />
      <Icon name="sun" className="hidden size-[18px] dark:block" />
    </button>
  );
}
