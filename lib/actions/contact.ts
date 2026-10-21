"use server";

import { updateTag } from "next/cache";
import { addMessage, MESSAGES_TAG } from "../db";
import { TOPICS } from "../topics";

export type ContactState = { ok?: boolean; error?: string };

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (formData.get("website")) return { ok: true };

  const get = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const name = get("name");
  const phone = get("phone");
  const course = get("course").slice(0, 100);
  const message = get("message");
  const topic = TOPICS.some((t) => t.value === get("topic")) ? get("topic") : "question";

  if (name.length < 2 || name.length > 100) return { error: "Խնդրում ենք նշել ձեր անունը" };
  if (!/^[+\d\s()-]{6,20}$/.test(phone)) return { error: "Խնդրում ենք նշել ճիշտ հեռախոսահամար" };
  if (message.length > 2000) return { error: "Նամակը չպետք է գերազանցի 2000 նիշը" };

  try {
    await addMessage({ name, phone, course, topic, message });
  } catch (error) {
    console.error(error);
    return { error: "Չհաջողվեց ուղարկել նամակը։ Փորձեք մի փոքր ուշ կամ զանգահարեք մեզ։" };
  }
  updateTag(MESSAGES_TAG);
  return { ok: true };
}
