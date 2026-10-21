import type { Step } from "@/lib/types";

export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="pointer-events-none absolute top-6 right-[12%] left-[12%] hidden h-[3px] rounded-full bg-accent/50 lg:block" />
      {items.map((step, i) => (
        <li key={step.id} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="relative">
          <span className="relative z-10 grid size-12 place-items-center rounded-lg bg-[var(--ink)] text-lg font-black text-accent shadow-[3px_3px_0_0_var(--accent)] dark:bg-brand-soft">
            {i + 1}
          </span>
          <div className="paper mt-5 p-5">
            <h3 className="text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
