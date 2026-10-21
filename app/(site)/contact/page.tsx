import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { getSiteContent } from "@/lib/db";

export const metadata: Metadata = {
  title: "Կապ",
  description: "Կապվեք մեզ հետ՝ գրանցվելու, փորձնական դասի կամ մակարդակի որոշման համար։",
};

export default async function ContactPage() {
  const { settings, courses, texts } = await getSiteContent();
  const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

  const items = [
    settings.phone && { icon: "phone", label: "Հեռախոս", value: settings.phone, href: tel(settings.phone) },
    settings.phone2 && { icon: "phone", label: "Լրացուցիչ հեռախոս", value: settings.phone2, href: tel(settings.phone2) },
    settings.email && { icon: "mail", label: "Էլ. փոստ", value: settings.email, href: `mailto:${settings.email}` },
    settings.address && { icon: "mapPin", label: "Որտեղ", value: settings.address },
    settings.hours && { icon: "clock", label: "Աշխատանքային ժամեր", value: settings.hours },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string }[];

  const socials = [
    ["instagram", "Instagram", settings.instagram],
    ["facebook", "Facebook", settings.facebook],
    ["tiktok", "TikTok", settings.tiktok],
    ["linkedin", "LinkedIn", settings.linkedin],
  ].filter(([, , href]) => href);

  return (
    <>
      <PageHero
        eyebrow="Կապ"
        title={texts.contactTitle}
        text={texts.contactText}
      />

      <section className="container-x py-16 sm:py-20">
        <div data-reveal className="paper grid overflow-hidden !p-0 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Contact panel */}
          <div className="relative overflow-hidden bg-[var(--ink)] p-7 text-white sm:p-10 dark:bg-[var(--ink-deep)]">
            <Icon name="star" filled className="pointer-events-none absolute -right-8 -bottom-8 size-44 text-white/5" />
            <h2 className="text-2xl font-bold">Մեր կոնտակտները</h2>
            <p className="mt-2 text-white/70">Զանգիր, գրիր կամ միացիր մեզ սոցցանցերում։</p>
            <ul className="relative mt-8 space-y-5">
              {items.map((item) => {
                const body = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-accent">
                      <Icon name={item.icon} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-white/60">{item.label}</span>
                      <span className="block font-semibold break-words">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-4 transition hover:text-accent">
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            {socials.length > 0 && (
              <div className="relative mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {socials.map(([icon, label, href]) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-lg border border-white/15 transition hover:border-accent hover:bg-accent hover:text-[#1b1307]"
                  >
                    <Icon name={icon} className="size-[18px]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="p-7 sm:p-10">
            <h2 className="text-2xl font-bold">Հայտ</h2>
            <p className="mt-2 mb-8 text-muted">Թողեք Ձեր տվյալները, և մենք կկապվենք Ձեզ հետ՝ հանդիպման հարմար օրն ու ժամը ճշտելու համար։</p>
            <ContactForm courses={courses.map((c) => c.name)} />
          </div>
        </div>
      </section>

      {settings.mapUrl.startsWith("https://www.google.com/maps/embed") && (
        <section className="container-x pb-20">
          <iframe
            src={settings.mapUrl}
            title="Քարտեզ"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-96 w-full rounded-xl border border-border"
          />
        </section>
      )}
    </>
  );
}
