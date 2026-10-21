import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CallToAction } from "@/components/site/cta";
import { getSiteContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Մեր մասին",
  description: "Ծանոթացեք ակադեմիային և մեր դասախոսների թիմին։",
};

export default async function AboutPage() {
  const { about, team, home, settings, texts } = await getSiteContent();
  const paragraphs = about.body.split(/\n\s*\n/).filter(Boolean);
  const facts = [
    [home.students, "ուսանող"],
    [home.teachers, "դասախոս"],
    [home.languages, "լեզու"],
    ["CLT", "մեթոդաբանություն"],
    ["Օնլայն", "ձևաչափ"],
  ]
    .filter(([value]) => value)
    .slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Մեր մասին" title={about.title} text={about.intro} />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[17rem_1fr] lg:gap-20">
        <aside className="grid content-start gap-3 sm:grid-cols-3 lg:sticky lg:top-28 lg:grid-cols-1">
          {facts.map(([value, label], i) => (
            <div key={label} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="paper p-5">
              <div className="text-3xl font-black text-brand">{value}</div>
              <div className="mt-1 text-sm text-muted">{label}</div>
            </div>
          ))}
          {about.accreditation && (
            <div data-reveal className="flex gap-3 rounded-xl bg-accent-soft p-5 text-sm leading-relaxed sm:col-span-3 lg:col-span-1">
              <Icon name="shield" className="size-5 shrink-0 text-accent-strong dark:text-accent" />
              {about.accreditation}
            </div>
          )}
        </aside>

        <div>
          <div data-reveal className="max-w-3xl space-y-6 text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl font-medium" : "text-muted"}>
                {p}
              </p>
            ))}
          </div>

          {about.mission && (
            <figure data-reveal className="mt-12 max-w-3xl border-l-4 border-accent pl-6 sm:pl-8">
              <figcaption className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent-strong uppercase dark:text-accent">
                <Icon name="star" filled className="size-3.5" /> Մեր առաքելությունը
              </figcaption>
              <blockquote className="mt-3 text-2xl leading-snug font-bold text-balance sm:text-3xl">{about.mission}</blockquote>
            </figure>
          )}
        </div>
      </section>

      <section id="team" className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            align="left"
            eyebrow="Թիմը"
            title={texts.teamTitle}
            text={texts.teamText}
          />
          {team.length === 0 ? (
            <p className="mt-12 text-muted">Թիմի տվյալները շուտով կավելացվեն։</p>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {team.map((member, i) => (
                <article
                  key={member.id}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                  className="paper paper-hover flex gap-5 p-5 sm:p-6"
                >
                  {member.photo ? (
                    <Avatar name={member.name} photo={member.photo} className="!size-24 shrink-0 !rounded-xl sm:!size-28" />
                  ) : (
                    <Avatar name={member.name} className="!size-24 shrink-0 !rounded-xl text-2xl sm:!size-28" />
                  )}
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-[var(--ink)] px-2 py-0.5 text-xs font-bold text-accent dark:bg-brand-soft">
                      {member.language}
                    </span>
                    <h3 className="mt-2 text-xl font-bold">{member.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CallToAction phone={settings.phone} title={texts.ctaTitle} text={texts.ctaText} />
    </>
  );
}
