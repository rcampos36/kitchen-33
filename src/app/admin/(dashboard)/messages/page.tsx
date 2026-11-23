import { deleteMessage, setMessageRead } from "@/app/actions/admin";
import { getMessages } from "@/lib/messages";

// Session-gated admin pages render on the server per request.
export const instant = false;
export default async function MessagesPage() {
  const messages = await getMessages();
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Messages</h1>
      <p className="mt-1 text-slate-600">Submissions from the website contact form, newest first.</p>
      {messages.length === 0 ? (
        <p className="mt-8 rounded-xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200">No messages yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {messages.map((m) => (
            <li key={m.id} className={`rounded-xl bg-white p-5 shadow-sm ring-1 ${m.read ? "ring-slate-200" : "ring-brand-orange"}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold">
                    {!m.read && <span className="mr-2 rounded bg-brand-orange px-1.5 py-0.5 text-xs text-white">New</span>}
                    {m.subject || "(no subject)"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {m.name} · <a className="underline" href={`mailto:${m.email}`}>{m.email}</a> ·{" "}
                    {new Date(m.createdAt).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <form action={setMessageRead.bind(null, m.id, !m.read)}>
                    <button className="rounded-lg px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-100">{m.read ? "Mark unread" : "Mark read"}</button>
                  </form>
                  <form action={deleteMessage.bind(null, m.id)}>
                    <button className="rounded-lg px-3 py-1.5 font-bold text-red-700 hover:bg-red-50">Delete</button>
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-slate-800">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
