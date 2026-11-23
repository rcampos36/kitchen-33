import Link from "next/link";
import { SCHEMAS } from "@/lib/schemas";

// Session-gated admin pages render on the server per request.
export const instant = false;
export default function AdminHome() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Content dashboard</h1>
      <p className="mt-2 text-slate-600">Choose a page to edit. Changes go live on the website as soon as you save.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {SCHEMAS.map((s) => (
          <li key={s.key}>
            <Link href={`/admin/${s.key}`} className="block h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-orange">
              <span className="text-lg font-bold">{s.title}</span>
              <span className="mt-1 block text-sm text-slate-600">{s.description}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/admin/messages" className="block h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-orange">
            <span className="text-lg font-bold">Messages</span>
            <span className="mt-1 block text-sm text-slate-600">Submissions from the contact form.</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
