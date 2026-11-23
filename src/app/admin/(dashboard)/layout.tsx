import { Suspense } from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { getMessages } from "@/lib/messages";

// Session-gated admin pages render on the server per request.
export const instant = false;
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-8 font-semibold text-slate-500">Loading dashboard…</p>}>
      <AuthedShell>{children}</AuthedShell>
    </Suspense>
  );
}

async function AuthedShell({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = (await getMessages()).filter((m) => !m.read).length;
  return (
    <div className="lg:flex">
      <AdminNav unread={unread} />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:py-10">{children}</div>
    </div>
  );
}
