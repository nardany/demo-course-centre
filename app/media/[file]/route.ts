import { getUpload } from "@/lib/db";

export async function GET(_request: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  const upload = await getUpload(file);
  if (!upload) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(upload.data), {
    headers: {
      "Content-Type": upload.content_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
