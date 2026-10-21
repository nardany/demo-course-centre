import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { MessageActions } from "@/components/admin/message-actions";
import { PageTitle } from "@/components/admin/page-title";
import { getMessages } from "@/lib/db";
import { formatDateTime } from "@/lib/format";
import { topicLabel } from "@/lib/topics";

export const metadata: Metadata = { title: "Հաղորդագրություններ" };

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <>
      <PageTitle title="Հաղորդագրություններ" text="Կայքի «Կապ» էջի ձևից ուղարկված նամակները։" />
      {messages.length === 0 ? (
        <div className="paper grid place-items-center p-16 text-center text-muted">
          <Icon name="inbox" className="size-10" />
          <p className="mt-4">Դեռ հաղորդագրություններ չկան։</p>
        </div>
      ) : (
        <div className="grid max-w-4xl gap-4">
          {messages.map((m) => (
            <article key={m.id} className={`paper p-5 sm:p-6 ${m.read ? "" : "border-l-4 border-l-accent"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex flex-wrap items-center gap-2 font-semibold">
                    {m.name}
                    {!m.read && <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-[#1b1307]">Նոր</span>}
                    {topicLabel(m.topic) && (
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs text-brand">{topicLabel(m.topic)}</span>
                    )}
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-brand">
                      <Icon name="phone" className="size-3.5" /> {m.phone}
                    </a>
                    {m.course && (
                      <span className="flex items-center gap-1.5">
                        <Icon name="book" className="size-3.5" /> {m.course}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Icon name="clock" className="size-3.5" /> {formatDateTime(m.createdAt)}
                    </span>
                  </div>
                </div>
                <MessageActions id={m.id} read={m.read} />
              </div>
              <p className="mt-4 break-words whitespace-pre-wrap leading-relaxed">{m.message}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
