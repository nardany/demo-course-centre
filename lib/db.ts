import postgres from "postgres";
import { cacheLife, cacheTag } from "next/cache";
import { seed } from "./seed";
import type { Content, Message } from "./types";


export const CONTENT_TAG = "content";
export const MESSAGES_TAG = "messages";

let client: postgres.Sql | undefined;

function sql() {
  if (!client) {
    const raw = process.env.DATABASE_URL;
    if (!raw) throw new Error("DATABASE_URL is not set");
    const parsed = new URL(raw);
    parsed.searchParams.delete("channel_binding");
    const url = parsed.toString();
    client = postgres(url, { max: 5, prepare: false, idle_timeout: 20, onnotice: () => {} });
  }
  return client;
}

let schema: Promise<void> | undefined;

function ready() {
  schema ??= createSchema().catch((error) => {
    schema = undefined;
    throw error;
  });
  return schema;
}

async function createSchema() {
  await sql().begin(async (db) => {
    await db`select pg_advisory_xact_lock(724001)`;
    await db`
      create table if not exists site_content (
        id integer primary key,
        data jsonb not null,
        updated_at timestamptz not null default now()
      )`;
    await db`
      create table if not exists messages (
        id text primary key,
        name text not null,
        phone text not null,
        course text not null default '',
        topic text not null default '',
        message text not null,
        read boolean not null default false,
        created_at timestamptz not null default now()
      )`;
    await db`alter table messages add column if not exists topic text not null default ''`;
    await db`
      create table if not exists media (
        id text primary key,
        content_type text not null,
        data bytea not null,
        created_at timestamptz not null default now()
      )`;
    await db`insert into site_content (id, data) values (1, ${db.json(seed as never)}) on conflict (id) do nothing`;
  });
}

function normalize(stored: Partial<Content>): Content {
  const content = { ...structuredClone(seed), ...stored } as Content;
  for (const key of ["settings", "home", "refund", "about", "coursesPage", "kids", "texts", "promo"] as const) {
    content[key] = { ...seed[key], ...stored[key] } as never;
  }
  migratePackages(content);
  return content;
}

type LegacyPackage = { price?: string; courseId?: string; prices?: Record<string, string> };

function migratePackages(content: Content) {
  for (const pkg of content.packages as (Content["packages"][number] & LegacyPackage)[]) {
    if (!pkg.prices) {
      const ids = pkg.price === undefined ? [] : pkg.courseId ? [pkg.courseId] : content.courses.map((c) => c.id);
      pkg.prices = Object.fromEntries(ids.map((id) => [id, String(pkg.price ?? "")]));
    }
    delete pkg.price;
    delete pkg.courseId;
  }
}

export async function mutateContent<T>(fn: (content: Content) => T | Promise<T>): Promise<T> {
  await ready();
  const result = await sql().begin(async (tx) => {
    const [row] = await tx<{ data: Partial<Content> }[]>`select data from site_content where id = 1 for update`;
    const content = normalize(row.data);
    const value = await fn(content);
    await tx`update site_content set data = ${tx.json(content as never)}, updated_at = now() where id = 1`;
    return [value];
  });
  return result[0] as T;
}

export async function getContent(): Promise<Content> {
  "use cache";
  cacheLife("max");
  cacheTag(CONTENT_TAG);
  await ready();
  const [row] = await sql()<{ data: Partial<Content> }[]>`select data from site_content where id = 1`;
  return normalize(row.data);
}


type MessageRow = {
  id: string;
  name: string;
  phone: string;
  course: string;
  topic: string;
  message: string;
  read: boolean;
  created_at: Date;
};

export async function getMessages(): Promise<Message[]> {
  "use cache";
  cacheLife("max");
  cacheTag(MESSAGES_TAG);
  await ready();
  const rows = await sql()<MessageRow[]>`select * from messages order by created_at desc limit 1000`;
  return rows.map(({ created_at, ...m }) => ({ ...m, createdAt: created_at.toISOString() }));
}

export async function addMessage(message: Pick<Message, "name" | "phone" | "course" | "topic" | "message">) {
  await ready();
  await sql()`
    insert into messages (id, name, phone, course, topic, message)
    values (${crypto.randomUUID()}, ${message.name}, ${message.phone}, ${message.course}, ${message.topic}, ${message.message})`;
}

export async function updateMessageRead(id: string, read: boolean) {
  await ready();
  await sql()`update messages set read = ${read} where id = ${id}`;
}

export async function removeMessage(id: string) {
  await ready();
  await sql()`delete from messages where id = ${id}`;
}


const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const UPLOAD_NAME = /^[a-f0-9-]{36}\.(jpg|png|webp|gif)$/;

export async function saveUpload(file: File): Promise<string> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Թույլատրվում են միայն JPG, PNG, WEBP կամ GIF նկարներ");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Նկարի չափը չպետք է գերազանցի 4ՄԲ-ը");
  await ready();
  const id = `${crypto.randomUUID()}.${ext}`;
  await sql()`
    insert into media (id, content_type, data)
    values (${id}, ${file.type}, ${Buffer.from(await file.arrayBuffer())})`;
  return `/media/${id}`;
}

export async function getUpload(id: string) {
  if (!UPLOAD_NAME.test(id)) return undefined;
  await ready();
  const [row] = await sql()<{ content_type: string; data: Buffer }[]>`
    select content_type, data from media where id = ${id}`;
  return row;
}

export async function removeUpload(url: unknown) {
  if (typeof url !== "string" || !url.startsWith("/media/")) return;
  const id = url.slice("/media/".length);
  if (!UPLOAD_NAME.test(id)) return;
  await ready();
  await sql()`delete from media where id = ${id}`;
}


export async function getSiteContent(): Promise<Content> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const content = await getContent();
  const today = new Date().toISOString().slice(0, 10);
  return { ...content, promotions: content.promotions.filter((p) => !p.validUntil || p.validUntil >= today) };
}

export function isPromoActive(content: Pick<Content, "promo" | "promotions">) {
  return content.promo.enabled && content.promotions.length > 0;
}
