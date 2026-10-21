"use client";

import { useTransition } from "react";
import { deleteMessage, setMessageRead } from "@/lib/actions/admin";
import { Icon } from "../icon";

export function MessageActions({ id, read }: { id: string; read: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className={`flex gap-2 ${pending ? "opacity-50" : ""}`}>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const result = await setMessageRead(id, !read);
            if (result.error) alert(result.error);
          })
        }
        className="btn btn-ghost !px-3 !py-1.5 text-xs"
      >
        <Icon name={read ? "mail" : "check"} className="size-3.5" />
        {read ? "Նշել չկարդացված" : "Նշել կարդացված"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Ջնջե՞լ այս հաղորդագրությունը։ Այս գործողությունը հնարավոր չէ հետարկել։")) {
            startTransition(async () => {
              const result = await deleteMessage(id);
              if (result.error) alert(result.error);
            });
          }
        }}
        className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-red-500/10 hover:text-red-600"
        aria-label="Ջնջել"
      >
        <Icon name="trash" className="size-4" />
      </button>
    </div>
  );
}
