// Replaces the site content in the database with lib/seed.ts.
// Messages and uploaded images are not touched. Usage: npm run db:reset-content
import postgres from "postgres";
import { createInterface } from "node:readline/promises";
import { seed } from "../lib/seed.ts";

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error("DATABASE_URL is not set (.env or .env.local).");
  process.exit(1);
}
const url = new URL(raw);
url.searchParams.delete("channel_binding");

console.log(`\nDatabase: ${url.host}${url.pathname}`);
console.log("All texts, courses, team, prices, testimonials and settings will be replaced with lib/seed.ts.");
console.log("Contact messages and uploaded images are kept.\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = await rl.question('Type "yes" to continue: ');
rl.close();
if (answer.trim().toLowerCase() !== "yes") {
  console.log("Cancelled.");
  process.exit(0);
}

const sql = postgres(url.toString(), { prepare: false, max: 1, onnotice: () => {} });
try {
  await sql`
    create table if not exists site_content (
      id integer primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )`;
  await sql`
    insert into site_content (id, data) values (1, ${sql.json(seed as never)})
    on conflict (id) do update set data = excluded.data, updated_at = now()`;
  console.log("Done. Restart `npm run dev`, or redeploy (`npm run deploy`) so the live site picks up the new content.");
} finally {
  await sql.end();
}
