import { Icon } from "./icon";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-strong dark:text-accent ${
            centered ? "justify-center" : ""
          }`}
        >
          <Icon name="star" filled className="size-3.5" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{text}</p>}
    </div>
  );
}
