import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { DATA_DIR, writeJsonAtomic } from "./content";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};

const FILE = path.join(DATA_DIR, "messages.json");

export async function getMessages(): Promise<ContactMessage[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function saveMessages(messages: ContactMessage[]) {
  await writeJsonAtomic(FILE, messages);
}
