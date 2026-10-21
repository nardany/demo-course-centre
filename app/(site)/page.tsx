import Link from "next/link";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { CallToAction } from "@/components/site/cta";
import { CourseBadge } from "@/components/site/course-badge";
import { nativeName } from "@/components/site/native-name";
import { Refund } from "@/components/site/refund";
import { Steps } from "@/components/site/steps";
import { Testimonials } from "@/components/site/testimonials";
import { getSiteContent, isPromoActive } from "@/lib/db";

const tiles = [
  { code: "EN", hello: "Hello!", tone: "from-[var(--brand-btn)] to-[var(--brand-2)]" },
  { code: "DE", hello: "Hallo!", tone: "from-[var(--accent-strong)] to-[var(--accent)]" },
  { code: "FR", hello: "Bonjour!", tone: "from-[var(--ink)] to-[var(--brand-2)]" },
  { code: "ZH", hello: "你好!", tone: "from-[var(--accent-strong)] to-[var(--accent)]" },
];

const greetings = ["Hello", "Hallo", "Bonjour", "¡Hola!", "你好", "Привет"];

export default async function HomePage() {
  const content = await getSiteContent();
  const { home, features, courses, steps, testimonials, promotions, refund, settings, kids } = content;
  const activePromo = isPromoActive(content) ? promotions[0] : undefined;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-x relative grid items-center gap-14 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-24">
          <div>
            {home.badge && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent-strong dark:text-accent">
                <Icon name="shield" className="size-4" />
                {home.badge}
              </span>
            )}
            <h1 className="mt-6 text-[2.5rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl lg:text-[4rem]">
              {home.title}{" "}
              {home.highlight && (
                <span className="bg-[linear-gradient(transparent_62%,var(--accent-soft)_62%,var(--accent-soft)_92%,transparent_92%)] box-decoration-clone text-brand dark:bg-[linear-gradient(transparent_62%,rgba(212,173,104,0.25)_62%,rgba(212,173,104,0.25)_92%,transparent_92%)]">
                  {home.highlight}
                </span>
              )}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty">{home.subtitle}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Անվճար փորձնական դաս <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link href="/courses" className="btn btn-ghost">
                Դասընթացներ
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 text-[15px] sm:grid-cols-3 sm:gap-4">
              {content.texts.heroPoints.map((item, i) => (
                <li key={`${i}-${item}`} className="flex items-center gap-2">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-btn text-white">
                    <Icon name="check" className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rotate-1 rounded-[1.75rem] border border-border bg-surface p-3 shadow-2xl shadow-black/15 transition duration-500 hover:rotate-0">
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-medium text-muted">Demo Academy · օնլայն դաս</span>
                <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-600 dark:text-red-400">
                  <span className="animate-ping-soft size-1.5 rounded-full bg-red-500" /> LIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {tiles.map((tile, i) => (
                  <div
                    key={tile.code}
                    className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-linear-to-br ${tile.tone}`}
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-white/15 text-lg font-bold text-white ring-2 ring-white/30 sm:size-16">
                      {tile.code}
                    </span>
                    <span
                      className="animate-float absolute top-2.5 right-2.5 rounded-xl rounded-br-sm bg-white px-2.5 py-1 text-xs font-bold text-[#0d1b33] shadow-md"
                      style={{ animationDelay: `${i * -1.4}s` } as React.CSSProperties}
                    >
                      {tile.hello}
                    </span>
                    <span className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] font-medium text-white/85">
                      <Icon name="mic" className="size-3" /> {i === 0 ? "Դասախոս" : "Ուսանող"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                {["mic", "video", "message"].map((icon) => (
                  <span key={icon} className="grid size-9 place-items-center rounded-full bg-surface-2 text-muted">
                    <Icon name={icon} className="size-4" />
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl sm:-left-8">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
                <Icon name="gift" className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold">Փորձնական դաս</span>
                <span className="text-xs text-muted">Անվճար</span>
              </span>
            </div>
            <div className="absolute -top-5 -right-2 grid size-16 rotate-12 place-items-center rounded-2xl bg-accent text-[#1b1307] shadow-lg sm:-right-5">
              <span className="text-center text-xs leading-tight font-black">
                CLT
                <span className="block text-[9px] font-semibold">մեթոդ</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-[var(--ink)] bg-[var(--ink)] py-4 text-white dark:bg-[var(--ink-deep)]">
        <div className="animate-marquee flex w-max gap-10 pr-10 text-lg font-semibold" style={{ "--marquee-duration": "30s" } as React.CSSProperties}>
          {[...greetings, ...greetings, ...greetings, ...greetings].map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word}
              <Icon name="star" filled className="size-3.5 text-accent" />
            </span>
          ))}
        </div>
      </div>

      {activePromo && (
        <section className="container-x pt-5">
          <Link
            href="/promotions"
            data-reveal
            className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-linear-to-r from-accent to-[var(--accent-light)] p-6 text-[#1b1307] sm:flex-row sm:items-center sm:p-8"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/40 backdrop-blur">
              <Icon name="gift" className="size-7" />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider opacity-70">
                Ակցիա {activePromo.badge && <span className="rounded-full bg-[#1b1307] px-2 py-0.5 text-white">{activePromo.badge}</span>}
              </div>
              <div className="mt-1 font-display text-xl font-bold sm:text-2xl">{activePromo.title}</div>
              <div className="mt-1 opacity-80">{activePromo.text}</div>
            </div>
            <span className="btn bg-[#1b1307] text-white transition group-hover:gap-3">
              Մանրամասն <Icon name="arrowRight" className="size-4" />
            </span>
          </Link>
        </section>
      )}

      <section className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="Ինչու՞ մենք"
          title={content.texts.whyTitle}
          text={content.texts.whyText}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="paper paper-hover group relative p-7"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-[var(--ink)] text-accent transition group-hover:scale-110 dark:bg-brand-soft">
                  <Icon name={feature.icon} className="size-5" />
                </span>
                <span className="text-4xl font-black text-border tabular-nums transition group-hover:text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {courses.length > 0 && (
        <section className="border-y border-border bg-surface py-20 sm:py-24">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                align="left"
                eyebrow="Լեզուներ"
                title={content.texts.coursesTitle}
                text={content.texts.coursesText}
              />
              <Link href="/courses" className="btn btn-ghost shrink-0">
                Բոլոր դասընթացները <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {courses.map((course, i) => (
                <Link
                  key={course.id}
                  href={`/courses#pricing-${course.id}`}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                  className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-xl bg-[var(--ink)] p-5 text-white transition hover:-translate-y-1 hover:bg-[var(--brand-btn)] sm:min-h-48 sm:p-6 dark:bg-brand-soft"
                >
                  <span className="pointer-events-none absolute -right-2 -bottom-6 text-[6.5rem] leading-none font-black text-white/[0.06] transition group-hover:text-accent/20 sm:text-[8rem]">
                    {course.code}
                  </span>
                  <span className="flex items-center justify-between">
                    <CourseBadge course={course} className="size-10 !rounded-lg !bg-white/10 text-sm !text-accent" />
                    <Icon name="arrowRight" className="size-5 -rotate-45 text-accent transition group-hover:rotate-0" />
                  </span>
                  <span className="relative">
                    {nativeName(course.code) && (
                      <span className="block text-sm font-medium text-accent">{nativeName(course.code)}</span>
                    )}
                    <span className="block text-2xl font-bold sm:text-3xl">{course.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {kids.enabled && (
        <section className="container-x py-20 sm:py-24">
          <div
            data-reveal
            className="relative grid gap-10 overflow-hidden rounded-[2rem] bg-accent-soft p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <Icon name="star" filled className="pointer-events-none absolute -top-6 -right-6 size-40 text-accent/15" />
            <div className="relative">
              <span className="inline-flex rounded-lg bg-[var(--ink)] px-3 py-1 text-sm font-bold text-white">{kids.ages}</span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{kids.title}</h2>
              <p className="mt-4 text-lg text-muted">{kids.intro}</p>
              <p className="mt-3 text-2xl font-bold text-brand">«{kids.question}»</p>
              <Link href="/kids" className="btn btn-primary mt-8">
                Մանրամասն <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
            <ul className="relative grid gap-2.5">
              {kids.outcomes.map((item, i) => (
                <li
                  key={`${i}-${item}`}
                  className="flex items-center gap-3 rounded-2xl bg-surface px-5 py-3.5 font-semibold shadow-sm"
                  style={{ marginLeft: `${(i % 3) * 14}px` }}
                >
                  <Icon name="arrowRight" className="size-4 text-accent-strong dark:text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="container-x py-20 sm:py-24">
          <SectionHeading
            eyebrow="Առաջին քայլերը"
            title={content.coursesPage.howTitle}
            text={content.coursesPage.howText}
          />
          <Steps items={steps} />
        </section>
      )}

      <Refund refund={refund} />

      {testimonials.length > 0 && (
        <section className="overflow-hidden py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Կարծիքներ"
              title={content.texts.testimonialsTitle}
              text={content.texts.testimonialsText}
            />
          </div>
          <Testimonials items={testimonials} />
        </section>
      )}

      <CallToAction phone={settings.phone} title={content.texts.ctaTitle} text={content.texts.ctaText} />
    </>
  );
}
