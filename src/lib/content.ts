import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import type { SectionKey, SiteContent } from "./types";

export const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

export const CONTENT_TAG = "site-content";

/** Cached until an admin saves (the save action calls updateTag(CONTENT_TAG)). */
export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheLife("max");
  cacheTag(CONTENT_TAG);
  return readContentFile();
}

async function readContentFile(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_FILE, "utf8");
  return JSON.parse(raw) as SiteContent;
}

async function writeJsonAtomic(file: string, data: unknown) {
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(tmp, file);
}

export async function saveSection<K extends SectionKey>(key: K, value: SiteContent[K]) {
  const content = await readContentFile();
  content[key] = value;
  await writeJsonAtomic(CONTENT_FILE, content);
}

export { writeJsonAtomic };
