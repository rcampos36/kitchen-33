"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Icon } from "./Icon";

const input =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-ink shadow-inner outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30";

export function ContactForm({ successText }: { successText: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { ok: false });

  if (state.ok) {
    return (
      <div role="status" className="grid min-h-64 place-items-center rounded-2xl text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-green text-white">
            <Icon name="heart" className="size-8" />
          </span>
          <p className="mt-4 text-xl font-bold">{successText}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
      <label className="font-bold">
        Your Name <span className="text-red-600">*</span>
        <input name="name" required autoComplete="name" defaultValue={state.fields?.name} className={input} />
      </label>
      <label className="font-bold">
        Your Email <span className="text-red-600">*</span>
        <input name="email" type="email" required autoComplete="email" defaultValue={state.fields?.email} className={input} />
      </label>
      <label className="font-bold sm:col-span-2">
        Subject
        <input name="subject" defaultValue={state.fields?.subject} className={input} />
      </label>
      <label className="font-bold sm:col-span-2">
        Your Message <span className="text-red-600">*</span>
        <textarea name="message" required rows={5} defaultValue={state.fields?.message} className={input} />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state.error && (
        <p role="alert" className="font-bold text-red-700 sm:col-span-2">
          {state.error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="btn-primary px-8 py-4 text-lg disabled:opacity-60">
          {pending ? "Sending…" : "Send Message"} <Icon name="arrow" className="size-5" />
        </button>
      </div>
    </form>
  );
}
