import { Icon } from "../icon";

export function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-8 border-b-[1.5px] border-border pb-6">
      <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent-strong uppercase dark:text-accent">
        <Icon name="star" filled className="size-3" /> Ադմին վահանակ
      </span>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
      {text && <p className="mt-2 text-muted">{text}</p>}
    </div>
  );
}
