import type { Testimonial } from "@/lib/types";
import { Avatar } from "../avatar";
import { Icon } from "../icon";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <div className="container-x mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const brand = i % 3 === 1;
        return (
          <figure key={item.id} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
            <blockquote
              className={`relative rounded-2xl p-6 text-[15px] leading-relaxed ${
                brand
                  ? "rounded-bl-none bg-[var(--ink)] text-white dark:bg-brand-soft"
                  : "rounded-bl-none border-[1.5px] border-border bg-surface"
              }`}
            >
              <div className={`mb-3 flex gap-0.5 ${brand ? "text-accent" : "text-accent-strong dark:text-accent"}`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Icon key={s} name="star" filled className={`size-3.5 ${s < item.rating ? "" : "opacity-25"}`} />
                ))}
              </div>
              {item.text}
              <span
                className={`absolute -bottom-[9px] left-0 size-[18px] [clip-path:polygon(0_0,100%_0,0_100%)] ${
                  brand ? "bg-[var(--ink)] dark:bg-brand-soft" : "bg-border"
                }`}
              />
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 pl-1">
              <Avatar name={item.name} photo={item.photo} className="size-10 text-sm" />
              <div>
                <div className="font-bold">{item.name}</div>
                {item.course && <div className="text-sm text-muted">{item.course}</div>}
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
