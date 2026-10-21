import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import type { Settings } from "@/lib/types";
import { Icon } from "../icon";

export function Footer({
  settings,
  footerText,
  promoActive,
  kidsActive,
}: {
  settings: Settings;
  footerText: string;
  promoActive: boolean;
  kidsActive: boolean;
}) {
  const pages = [
    ["/courses", "Դասընթացներ"],
    ["/kids", "Երեխաներին"],
    ["/about", "Մեր մասին"],
    ["/promotions", "Ակցիաներ"],
    ["/contact", "Կապ"],
  ].filter(([href]) => (href !== "/promotions" || promoActive) && (href !== "/kids" || kidsActive));

  const socials = [
    ["instagram", "Instagram", settings.instagram],
    ["facebook", "Facebook", settings.facebook],
    ["tiktok", "TikTok", settings.tiktok],
    ["linkedin", "LinkedIn", settings.linkedin],
  ].filter(([, , href]) => href);

  const phones = [settings.phone, settings.phone2].filter(Boolean);

  return (
    <footer className="mt-auto bg-[var(--ink-deep)] text-white/70 dark:bg-[var(--ink-deeper)]">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg bg-white p-1">
              <LogoMark />
            </span>
            <span className="text-xl font-bold text-white">
              Demo<span className="text-accent">Academy</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{footerText}</p>
          <div className="mt-6 flex flex-wrap gap-2">
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
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Էջեր</h3>
          <ul className="mt-5 space-y-3">
            {pages.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="group inline-flex items-center gap-2 transition hover:text-white">
                  <span className="h-px w-3 bg-accent transition-all group-hover:w-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Կապ</h3>
          <ul className="mt-5 space-y-3">
            {phones.map((phone, i) => (
              <li key={`${i}-${phone}`}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-white hover:text-accent">
                  <Icon name="phone" className="size-4 text-accent" /> {phone}
                </a>
              </li>
            ))}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 break-all hover:text-white">
                  <Icon name="mail" className="size-4 shrink-0 text-accent" /> {settings.email}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex items-center gap-2.5">
                <Icon name="mapPin" className="size-4 text-accent" /> {settings.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
          <p>© Demo Academy</p>
          <p className="flex items-center gap-1.5">
            Կայքը պատրաստել է
            <a
              href="https://www.linkedin.com/in/nar-danielyan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-accent"
            >
              Narek Danielyan
              <Icon name="linkedin" className="size-3.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
