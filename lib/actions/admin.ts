"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { collections, sections, type Field } from "../admin-schema";
import { checkPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE, verifySessionToken } from "../auth";
import {
  CONTENT_TAG,
  MESSAGES_TAG,
  mutateContent,
  removeMessage,
  removeUpload,
  saveUpload,
  updateMessageRead,
} from "../db";
import type { CollectionKey, SectionKey } from "../types";

export type FormState = { ok?: boolean; error?: string; savedAt?: number };

export type ActionResult = { error?: string };

const DEMO_MESSAGE = "Դեմո մուտք. փոփոխությունները չեն պահպանվում";

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const role = await verifySessionToken(token);
  if (!role) redirect("/admin/login");
  return role;
}

async function denyDemo() {
  return (await requireAdmin()) === "demo" ? DEMO_MESSAGE : undefined;
}

function isSection(key: unknown): key is SectionKey {
  return typeof key === "string" && Object.hasOwn(sections, key);
}

function isCollection(key: unknown): key is CollectionKey {
  return typeof key === "string" && Object.hasOwn(collections, key);
}

/** Uploads the image files in the form before the content transaction starts, keyed by field name. */
async function uploadImages(fields: Field[], formData: FormData) {
  const uploaded: Record<string, string> = {};
  try {
    for (const field of fields) {
      if (field.type !== "image") continue;
      const file = formData.get(`${field.name}__file`);
      if (file instanceof File && file.size > 0) uploaded[field.name] = await saveUpload(file);
    }
  } catch (error) {
    await Promise.all(Object.values(uploaded).map(removeUpload));
    throw error;
  }
  return uploaded;
}

async function parseFields(
  fields: Field[],
  formData: FormData,
  previous: Record<string, unknown> = {},
  uploaded: Record<string, string> = {},
) {
  const values: Record<string, unknown> = {};
  const obsoleteImages: unknown[] = [];

  for (const field of fields) {
    const raw = formData.get(field.name);
    const text = typeof raw === "string" ? raw.trim() : "";

    switch (field.type) {
      case "checkbox":
        values[field.name] = raw === "on";
        break;
      case "number": {
        const n = Number(text);
        const min = field.min ?? -Infinity;
        const max = field.max ?? Infinity;
        values[field.name] = Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : (field.min ?? 0);
        break;
      }
      case "lines":
        values[field.name] = text.split("\n").map((l) => l.trim()).filter(Boolean);
        break;
      case "image": {
        const remove = formData.get(`${field.name}__remove`) === "on";
        const current = previous[field.name] ?? "";
        if (uploaded[field.name]) {
          values[field.name] = uploaded[field.name];
          obsoleteImages.push(current);
        } else if (remove) {
          values[field.name] = "";
          obsoleteImages.push(current);
        } else {
          values[field.name] = current;
        }
        break;
      }
      case "select":
        values[field.name] = field.options?.some((o) => o.value === text) ? text : (field.options?.[0]?.value ?? "");
        break;
      default:
        if (text.length > 5000) throw new Error(`«${field.label}» դաշտը չափազանց երկար է`);
        values[field.name] = text;
    }

    if (field.required && (values[field.name] === "" || values[field.name] === undefined)) {
      throw new Error(`«${field.label}» դաշտը պարտադիր է`);
    }
  }
  return { values, obsoleteImages };
}

function fail(error: unknown): FormState {
  return { ok: false, error: error instanceof Error ? error.message : "Անհայտ սխալ" };
}

export async function saveSection(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await denyDemo();
  if (denied) return { ok: false, error: denied };
  const key = formData.get("__section");
  if (!isSection(key)) return { ok: false, error: "Անհայտ բաժին" };
  try {
    await mutateContent(async (db) => {
      const { values } = await parseFields(sections[key].fields, formData, db[key]);
      db[key] = { ...db[key], ...values } as never;
    });
  } catch (error) {
    return fail(error);
  }
  updateTag(CONTENT_TAG);
  return { ok: true, savedAt: Date.now() };
}

export async function saveItem(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await denyDemo();
  if (denied) return { ok: false, error: denied };
  const key = formData.get("__collection");
  const id = formData.get("id");
  if (!isCollection(key)) return { ok: false, error: "Անհայտ բաժին" };
  let uploaded: Record<string, string> = {};
  let obsolete: unknown[] = [];
  try {
    uploaded = await uploadImages(collections[key].fields, formData);
    obsolete = await mutateContent(async (db) => {
      const list = db[key] as unknown as Record<string, unknown>[];
      const index = typeof id === "string" && id ? list.findIndex((item) => item.id === id) : -1;
      const previous = index >= 0 ? list[index] : {};
      const { values, obsoleteImages } = await parseFields(collections[key].fields, formData, previous, uploaded);
      if (index >= 0) list[index] = { ...previous, ...values };
      else list.push({ id: crypto.randomUUID(), ...values });
      return obsoleteImages;
    });
  } catch (error) {
    await Promise.all(Object.values(uploaded).map((url) => removeUpload(url).catch(() => undefined)));
    return fail(error);
  }
  await Promise.all(obsolete.map((url) => removeUpload(url).catch(() => undefined)));
  updateTag(CONTENT_TAG);
  return { ok: true, savedAt: Date.now() };
}

export async function savePrices(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await denyDemo();
  if (denied) return { ok: false, error: denied };
  try {
    await mutateContent((db) => {
      for (const pkg of db.packages) {
        const prices: Record<string, string> = {};
        for (const course of db.courses) {
          const value = formData.get(`price:${pkg.id}:${course.id}`);
          const text = typeof value === "string" ? value.trim().slice(0, 50) : String(pkg.prices?.[course.id] ?? "");
          if (text) prices[course.id] = text;
        }
        pkg.prices = prices;
      }
    });
  } catch (error) {
    return fail(error);
  }
  updateTag(CONTENT_TAG);
  return { ok: true, savedAt: Date.now() };
}

async function attempt(run: () => Promise<void>): Promise<ActionResult> {
  try {
    await run();
    return {};
  } catch (error) {
    console.error(error);
    return { error: "Չհաջողվեց կատարել գործողությունը։ Փորձեք կրկին։" };
  }
}

export async function deleteItem(key: CollectionKey, id: string): Promise<ActionResult> {
  const denied = await denyDemo();
  if (denied) return { error: denied };
  if (!isCollection(key)) return { error: "Անհայտ բաժին" };
  return attempt(async () => {
    const removed = await mutateContent((db) => {
      const list = db[key] as unknown as Record<string, unknown>[];
      const index = list.findIndex((item) => item.id === id);
      if (key === "courses") for (const pkg of db.packages) delete pkg.prices?.[id];
      return index >= 0 ? list.splice(index, 1)[0] : undefined;
    });
    const imageField = collections[key].imageField;
    if (removed && imageField) await removeUpload(removed[imageField]).catch(() => undefined);
    updateTag(CONTENT_TAG);
  });
}

export async function moveItem(key: CollectionKey, id: string, direction: -1 | 1): Promise<ActionResult> {
  const denied = await denyDemo();
  if (denied) return { error: denied };
  if (!isCollection(key) || (direction !== 1 && direction !== -1)) return { error: "Անհայտ գործողություն" };
  return attempt(async () => {
    await mutateContent((db) => {
      const list = db[key] as unknown as Record<string, unknown>[];
      const from = list.findIndex((item) => item.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= list.length) return;
      [list[from], list[to]] = [list[to], list[from]];
    });
    updateTag(CONTENT_TAG);
  });
}

export async function setMessageRead(id: string, read: boolean): Promise<ActionResult> {
  const denied = await denyDemo();
  if (denied) return { error: denied };
  return attempt(async () => {
    await updateMessageRead(id, read === true);
    updateTag(MESSAGES_TAG);
  });
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  const denied = await denyDemo();
  if (denied) return { error: denied };
  return attempt(async () => {
    await removeMessage(id);
    updateTag(MESSAGES_TAG);
  });
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = formData.get("password");
  const role = typeof password === "string" ? await checkPassword(password) : null;
  if (!role) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: false, error: "Սխալ գաղտնաբառ" };
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
