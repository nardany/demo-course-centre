export const SESSION_COOKIE = "demo_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SECRET must be set (at least 32 characters)");
  }
  return secret;
}

function toBase64Url(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export type Role = "admin" | "demo";

export async function createSessionToken(role: Role) {
  const payload = `${Date.now() + SESSION_MAX_AGE * 1000}.${role}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<Role | null> {
  if (!token) return null;
  const [expires, role, signature] = token.split(".");
  if (!expires || !signature || (role !== "admin" && role !== "demo") || Number(expires) < Date.now()) return null;
  return safeEqual(signature, await sign(`${expires}.${role}`)) ? role : null;
}

async function matches(input: string, expected: string) {
  return safeEqual(await sign(`pw:${input}`), await sign(`pw:${expected}`));
}

export async function checkPassword(input: string): Promise<Role | null> {
  const admin = process.env.ADMIN_PASSWORD;
  if (!admin) throw new Error("ADMIN_PASSWORD must be set");
  if (await matches(input, admin)) return "admin";
  const demo = process.env.DEMO_PASSWORD;
  if (demo && (await matches(input, demo))) return "demo";
  return null;
}
