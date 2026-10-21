import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CourseBadge } from "@/components/site/course-badge";
import { CallToAction } from "@/components/site/cta";
import { nativeName } from "@/components/site/native-name";
import { PricingTabs } from "@/components/site/pricing-tabs";
import { Refund } from "@/components/site/refund";
import { Steps } from "@/components/site/steps";
import { getSiteContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Դասընթացներ",
  description: "Օտար լեզուների օնլայն դասընթացներ, ուսուցման ձևաչափեր, փաթեթներ և արժեքներ։",
};

export default async function CoursesPage() {
  const { coursesPage, courses, steps, packages, refund, settings, texts } = await getSiteContent();
  const hasPrices = packages.some((p) => Object.values(p.prices ?? {}).some(Boolean));

  return (
    <>
      <PageHero eyebrow="Դասընթացներ" title={texts.coursesHeroTitle} text={coursesPage.intro} />

      <section className="container-x py-20">
        {courses.length === 0 ? (
          <p className="text-center text-muted">Դասընթացները շուտով կավելացվեն։</p>
        ) : (
          <ul className="border-t-[1.5px] border-border">
            {courses.map((course, i) => (
              <li
                key={course.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties}
                className="group grid gap-5 border-b-[1.5px] border-border py-8 transition md:grid-cols-[auto_1.1fr_1.4fr_auto] md:items-center md:gap-8"
              >
                <CourseBadge course={course} className="size-16 !rounded-xl text-xl" />
                <div>
                  {nativeName(course.code) && (
                    <div className="text-sm font-semibold text-accent-strong dark:text-accent">{nativeName(course.code)}</div>
                  )}
                  <h2 className="text-3xl font-bold tracking-tight">{course.name}</h2>
                </div>
                <div>
                  <p className="leading-relaxed text-muted">{course.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    {course.levels.map((level, i) => (
                      <span key={`${i}-${level}`} className="rounded-md border border-border px-2 py-0.5 font-semibold">
                        {level}
                      </span>
                    ))}
                    {course.format && (
                      <span className="flex items-center gap-1.5 text-muted">
                        <Icon name="video" className="size-4 text-accent-strong dark:text-accent" /> {course.format}
                      </span>
                    )}
                    {course.duration && (
                      <span className="flex items-center gap-1.5 text-muted">
                        <Icon name="clock" className="size-4 text-accent-strong dark:text-accent" /> {course.duration}
                      </span>
                    )}
                  </div>
                </div>
                {packages.some((p) => p.prices?.[course.id]) && (
                  <a
                    href={`#pricing-${course.id}`}
                    className="inline-flex items-center gap-2 justify-self-start rounded-lg border-[1.5px] border-border px-4 py-2.5 text-sm font-semibold transition group-hover:border-brand group-hover:text-brand md:justify-self-end"
                  >
                    Արժեքներ <Icon name="arrowRight" className="size-4" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {steps.length > 0 && (
        <section className="border-y border-border bg-surface py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Ինչպես է աշխատում" title={coursesPage.howTitle} text={coursesPage.howText} />
            <Steps items={steps} />
          </div>
        </section>
      )}

      {hasPrices && (
        <section id="pricing" className="container-x scroll-mt-24 py-20 sm:py-24">
          <SectionHeading eyebrow="Արժեքներ" title={coursesPage.pricingTitle} text={coursesPage.pricingText} />
          <PricingTabs courses={courses} packages={packages} />
        </section>
      )}

      <Refund refund={refund} />
      <CallToAction phone={settings.phone} title={texts.ctaTitle} text={texts.ctaText} />
    </>
  );
}
