"use server";

import { randomUUID } from "node:crypto";
import { getMessages, saveMessages } from "@/lib/messages";

export type ContactState = { ok: boolean; error?: string; fields?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const fields = { name: get("name"), email: get("email"), subject: get("subject"), message: get("message") };

  // Honeypot: real visitors never fill this hidden field.
  if (get("company")) return { ok: true };

  if (!fields.name || !fields.email || !fields.message) return { ok: false, error: "Please fill in your name, email and message.", fields };
  if (!EMAIL.test(fields.email)) return { ok: false, error: "Please enter a valid email address.", fields };
  if (fields.name.length > 200 || fields.subject.length > 300 || fields.message.length > 5000)
    return { ok: false, error: "Your message is too long.", fields };

  const messages = await getMessages();
  messages.unshift({ id: randomUUID(), ...fields, createdAt: new Date().toISOString(), read: false });
  await saveMessages(messages.slice(0, 2000));
  return { ok: true };
}
