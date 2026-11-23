import { promises as fs } from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/content";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(_req: Request, ctx: RouteContext<"/uploads/[file]">) {
  const { file } = await ctx.params;
  if (!/^[a-f0-9-]+\.(jpg|png|webp|gif|avif)$/.test(file)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(DATA_DIR, "uploads", file));
    return new Response(data, {
      headers: {
        "Content-Type": TYPES[path.extname(file)],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
