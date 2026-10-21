import { Icon } from "./icon";

function Bubbles({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 420 300" fill="none" className={className} aria-hidden="true">
      <path
        d="M70 30h220a40 40 0 0 1 40 40v90a40 40 0 0 1-40 40H150l-56 46 10-46H70a40 40 0 0 1-40-40V70a40 40 0 0 1 40-40z"
        stroke="currentColor"
        strokeOpacity=".16"
        strokeWidth="2"
      />
      <path
        d="M200 110h170a30 30 0 0 1 30 30v70a30 30 0 0 1-30 30h-22l8 36-44-36H200a30 30 0 0 1-30-30v-70a30 30 0 0 1 30-30z"
        className="text-accent"
        stroke="currentColor"
        strokeOpacity=".55"
        strokeWidth="2"
      />
      <circle cx="245" cy="175" r="5" className="text-accent" fill="currentColor" fillOpacity=".7" />
      <circle cx="285" cy="175" r="5" className="text-accent" fill="currentColor" fillOpacity=".7" />
      <circle cx="325" cy="175" r="5" className="text-accent" fill="currentColor" fillOpacity=".7" />
    </svg>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white dark:bg-[var(--ink-deep)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_45%,rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.06)_62%,transparent_62%)]" />
      <Bubbles className="pointer-events-none absolute top-1/2 -right-24 hidden h-80 -translate-y-1/2 text-white md:block lg:right-0" />
      <div className="container-x relative py-16 sm:py-20">
        <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent uppercase">
          <Icon name="star" filled className="size-3.5" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
          {title}
        </h1>
        {text && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 text-pretty">{text}</p>}
      </div>
    </section>
  );
}
