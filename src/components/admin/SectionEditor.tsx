"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { saveSectionAction, uploadImage } from "@/app/actions/admin";
import type { Field, SectionSchema } from "@/lib/schemas";

type Obj = Record<string, unknown>;

const inputCls =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30";

function emptyFor(fields: Field[]): Obj {
  const o: Obj = {};
  for (const f of fields) {
    if (f.type === "boolean") o[f.key] = false;
    else if (f.type === "select") o[f.key] = f.options[0];
    else if (f.type === "object") o[f.key] = emptyFor(f.fields);
    else if (f.type === "list") o[f.key] = [];
    else o[f.key] = "";
  }
  return o;
}

export function SectionEditor({ schema, initial }: { schema: SectionSchema; initial: Obj }) {
  const [value, setValue] = useState<Obj>(initial);
  const [saved, setSaved] = useState<Obj>(initial);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = () =>
    startTransition(async () => {
      setStatus(null);
      try {
        const res = await saveSectionAction(schema.key, value);
        if (res.ok) {
          setSaved(value);
          setStatus({ kind: "ok", text: "Saved — the website is updated." });
        } else setStatus({ kind: "error", text: res.error ?? "Could not save." });
      } catch {
        setStatus({ kind: "error", text: "Could not save. Your session may have expired — sign in again." });
      }
    });

  return (
    <div className="max-w-4xl pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">{schema.title}</h1>
          <p className="mt-1 text-slate-600">{schema.description}</p>
        </div>
        <a href={schema.previewPath} target="_blank" className="text-sm font-bold text-brand-orange hover:underline">
          View page ↗
        </a>
      </div>

      <div className="mt-6 space-y-5">
        <Fields fields={schema.fields} value={value} onChange={setValue} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <p role="status" className={`text-sm font-semibold ${status?.kind === "error" ? "text-red-700" : dirty ? "text-amber-700" : "text-emerald-700"}`}>
            {status?.text ?? (dirty ? "You have unsaved changes." : "All changes saved.")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!dirty || pending}
              onClick={() => {
                setValue(saved);
                setStatus(null);
              }}
              className="rounded-lg px-4 py-2 font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              Discard
            </button>
            <button type="button" disabled={!dirty || pending} onClick={save} className="btn-primary py-2 disabled:opacity-50">
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fields({ fields, value, onChange }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void }) {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });
  return (
    <>
      {fields.map((f) => (
        <FieldInput key={f.key} field={f} value={value?.[f.key]} onChange={(v) => set(f.key, v)} />
      ))}
    </>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "object":
      return (
        <fieldset className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <legend className="float-left mb-3 w-full text-lg font-bold">{field.label}</legend>
          <div className="clear-both space-y-4">
            <Fields fields={field.fields} value={(value as Obj) ?? {}} onChange={onChange} />
          </div>
        </fieldset>
      );
    case "list":
      return <ListInput field={field} value={(value as Obj[]) ?? []} onChange={onChange} />;
    case "boolean":
      return (
        <label className="flex items-center gap-3 font-semibold">
          <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-brand-orange" />
          {field.label}
        </label>
      );
    case "select":
      return (
        <label className="block text-sm font-bold text-slate-700">
          {field.label}
          <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            {field.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      );
    case "image":
      return <ImageInput label={field.label} value={String(value ?? "")} onChange={onChange} />;
    case "textarea":
      return (
        <label className="block text-sm font-bold text-slate-700">
          {field.label}
          <textarea value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} rows={4} className={`${inputCls} font-normal`} />
        </label>
      );
    default:
      return (
        <label className="block text-sm font-bold text-slate-700">
          {field.label}
          <input
            type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} font-normal`}
          />
        </label>
      );
  }
}

function ListInput({ field, value, onChange }: { field: Extract<Field, { type: "list" }>; value: Obj[]; onChange: (v: unknown) => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const update = (i: number, item: Obj) => onChange(value.map((x, j) => (j === i ? item : x)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpenIdx(openIdx === i ? j : openIdx);
  };
  const remove = (i: number) => {
    if (!confirm(`Remove this ${field.itemLabel.toLowerCase()}?`)) return;
    onChange(value.filter((_, j) => j !== i));
    setOpenIdx(null);
  };
  const add = () => {
    onChange([...value, emptyFor(field.fields)]);
    setOpenIdx(value.length);
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{field.label}</h2>
        <button type="button" onClick={add} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-bold text-white hover:bg-slate-700">
          + Add {field.itemLabel.toLowerCase()}
        </button>
      </div>
      {value.length === 0 && <p className="text-sm text-slate-500">Nothing here yet.</p>}
      <ol className="space-y-2">
        {value.map((item, i) => {
          const title = (field.titleKey && String(item[field.titleKey] ?? "")) || `${field.itemLabel} ${i + 1}`;
          const isOpen = openIdx === i;
          const draft = "published" in item && item.published !== true;
          return (
            <li key={i} className="rounded-lg ring-1 ring-slate-200">
              <div className="flex items-center gap-2 px-3 py-2">
                <button type="button" onClick={() => setOpenIdx(isOpen ? null : i)} className="min-w-0 flex-1 truncate text-left font-semibold" aria-expanded={isOpen}>
                  <span className="mr-2 inline-block w-3 text-slate-400">{isOpen ? "▾" : "▸"}</span>
                  {title}
                  {draft && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-800">Draft</span>}
                </button>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label="Move up">
                  ↑
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label="Move down">
                  ↓
                </button>
                <button type="button" onClick={() => remove(i)} className="rounded px-2 py-1 text-sm font-bold text-red-700 hover:bg-red-50">
                  Remove
                </button>
              </div>
              {isOpen && (
                <div className="space-y-4 border-t border-slate-200 p-4">
                  <Fields fields={field.fields} value={item} onChange={(v) => update(i, v)} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ImageInput({ label, value, onChange }: { label: string; value: string; onChange: (v: unknown) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await uploadImage(fd);
      if (res.url) onChange(res.url);
      else setError(res.error ?? "Upload failed");
    } catch {
      setError("Upload failed. The file may be too large (max 8 MB).");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="text-sm font-bold text-slate-700">
      {label}
      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="grid size-full place-items-center text-xs font-normal text-slate-400">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} font-normal`} aria-label={`${label} URL`} />
          <div className="flex gap-2">
            <button type="button" disabled={busy} onClick={() => ref.current?.click()} className="rounded-lg bg-slate-900 px-3 py-1.5 font-bold text-white hover:bg-slate-700 disabled:opacity-50">
              {busy ? "Uploading…" : "Upload new image"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="rounded-lg px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100">
                Clear
              </button>
            )}
          </div>
          <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          {error && <p className="font-semibold text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
