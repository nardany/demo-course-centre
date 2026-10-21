import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CallToAction } from "@/components/site/cta";
import { getSiteContent } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const { kids } = await getSiteContent();
  return {
    title: "Երեխաների համար",
    description: `Օնլայն լեզվի դասընթացներ երեխաների համար (${kids.ages})։ ${kids.offer}։`,
  };
}

const skillIcons = ["message", "compass", "mic", "star", "globe"];

export default async function KidsPage() {
  const { kids, settings, texts } = await getSiteContent();
  if (!kids.enabled) notFound();

  return (
    <>
      <PageHero eyebrow={kids.ages} title={kids.title} text={kids.intro} />

      <section className="container-x py-20">
        <figure data-reveal className="relative mx-auto max-w-4xl text-center">
          <Icon name="star" filled className="mx-auto size-8 text-accent" />
          <blockquote className="mt-6 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
            «{kids.question}»
          </blockquote>
          <figcaption className="mt-6 text-lg text-muted">
            {texts.kidsQuoteCaption}
          </figcaption>
        </figure>

        {kids.outcomes.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl">
            <p data-reveal className="text-center text-sm font-bold tracking-[0.18em] text-accent-strong uppercase dark:text-accent">
              Դասերից հետո երեխան կկարողանա
            </p>
            <ol className="mt-6 flex flex-wrap justify-center gap-3">
              {kids.outcomes.map((item, i) => (
                <li
                  key={`${i}-${item}`}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface py-3 pr-5 pl-3 text-lg font-semibold shadow-sm"
                >
                  <span className="grid size-8 place-items-center rounded-xl bg-brand-btn text-sm text-white">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {kids.skills.length > 0 && (
        <section className="border-y border-border bg-surface py-20 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                align="left"
                eyebrow="Հմտություններ"
                title={texts.kidsSkillsTitle}
                text={kids.motivation}
              />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {kids.skills.map((skill, i) => (
                <li
                  key={`${i}-${skill}`}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                  className="flex items-center gap-4 rounded-2xl bg-bg p-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-strong dark:text-accent">
                    <Icon name={skillIcons[i % skillIcons.length]} className="size-6" />
                  </span>
                  <span className="text-lg font-semibold">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {kids.steps.length > 0 && (
        <section className="container-x py-20 sm:py-24">
          <SectionHeading eyebrow="Քայլ առ քայլ" title={texts.kidsStepsTitle} />
          <ol className="mx-auto mt-12 grid max-w-3xl gap-3">
            {kids.steps.map((step, i) => (
              <li
                key={`${i}-${step}`}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className="flex items-center gap-5 rounded-2xl border border-border bg-surface p-4 sm:p-5"
              >
                <span className="text-3xl font-black text-accent tabular-nums sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium">{step}</span>
                <Icon name="check" className="ml-auto size-5 shrink-0 text-brand" />
              </li>
            ))}
          </ol>

          {kids.offer && (
            <div
              data-reveal
              className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5 rounded-[1.75rem] bg-[var(--ink)] p-8 text-center text-white sm:flex-row sm:text-left dark:bg-[var(--ink-deep)]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-[#1b1307]">
                <Icon name="gift" className="size-7" />
              </span>
              <div className="flex-1">
                <div className="text-sm text-white/70">Առաջին քայլը՝ առանց ռիսկի</div>
                <div className="mt-1 text-xl font-bold">{kids.offer}</div>
              </div>
              <Link href="/contact" className="btn btn-accent shrink-0">
                Գրանցվել
              </Link>
            </div>
          )}
        </section>
      )}

      <CallToAction phone={settings.phone} title={texts.ctaTitle} text={texts.ctaText} />
    </>
  );
}
