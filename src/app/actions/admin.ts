"use server";

import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth";
import { CONTENT_TAG, DATA_DIR, saveSection } from "@/lib/content";
import { getMessages, saveMessages } from "@/lib/messages";
import { getSchema, sanitize } from "@/lib/schemas";
import type { SectionKey, SiteContent } from "@/lib/types";

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  // Small delay to slow down guessing.
  await new Promise((r) => setTimeout(r, 400));
  if (!checkPassword(password)) return { error: "Incorrect password." };
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveSectionAction(key: string, value: unknown): Promise<{ ok: boolean; error?: string }> {
  await guard();
  const schema = getSchema(key);
  if (!schema) return { ok: false, error: "Unknown section" };
  const clean = sanitize(schema.fields, value) as unknown as SiteContent[SectionKey];
  await saveSection(schema.key, clean);
  updateTag(CONTENT_TAG);
  return { ok: true };
}

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};
const MAX_UPLOAD = 8 * 1024 * 1024;

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await guard();
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file received" };
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Please upload a JPG, PNG, WebP, GIF or AVIF image." };
  if (file.size > MAX_UPLOAD) return { error: "Images must be 8 MB or smaller." };
  const dir = path.join(DATA_DIR, "uploads");
  await fs.mkdir(dir, { recursive: true });
  const name = `${randomUUID()}${ext}`;
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${name}` };
}

export async function setMessageRead(id: string, read: boolean) {
  await guard();
  const messages = await getMessages();
  const m = messages.find((x) => x.id === id);
  if (m) m.read = read;
  await saveMessages(messages);
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id: string) {
  await guard();
  await saveMessages((await getMessages()).filter((x) => x.id !== id));
  revalidatePath("/admin", "layout");
}
