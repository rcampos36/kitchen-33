"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/admin";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block text-sm font-bold">
        Password
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
      </label>
      {state.error && <p role="alert" className="text-sm font-bold text-red-700">{state.error}</p>}
      <button disabled={pending} className="btn-primary w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
