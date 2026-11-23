import type { SectionKey } from "./types";

const ICONS = ["apple", "cap", "people", "heart", "utensils", "chef", "briefcase", "leaf", "recycle", "hands", "handshake", "water"];
const COLORS = ["orange", "green", "teal"];

type Base = { key: string; label: string; help?: string };
export type Field =
  | (Base & { type: "text" | "textarea" | "url" | "image" | "date" | "time" })
  | (Base & { type: "select"; options: string[] })
  | (Base & { type: "boolean" })
  | (Base & { type: "object"; fields: Field[] })
  | (Base & { type: "list"; itemLabel: string; titleKey?: string; fields: Field[] });

export type SectionSchema = {
  key: SectionKey;
  title: string;
  description: string;
  previewPath: string;
  fields: Field[];
};

const link = (key: string, label: string): Field => ({
  key,
  label,
  type: "object",
  fields: [
    { key: "label", label: "Button text", type: "text" },
    { key: "href", label: "Link (e.g. /contact or https://…)", type: "url" },
  ],
});

const hero = (extra: Field[] = []): Field => ({
  key: "hero",
  label: "Hero banner",
  type: "object",
  fields: [
    { key: "title", label: "Headline", type: "text" },
    { key: "highlight", label: "Highlighted words (shown in color after the headline)", type: "text" },
    { key: "body", label: "Intro text", type: "textarea" },
    { key: "image", label: "Background photo", type: "image" },
    { key: "imageAlt", label: "Photo description (for screen readers)", type: "text" },
    { key: "imagePosition", label: "Photo focus (part kept visible when cropped)", type: "select", options: ["center", "top", "bottom"] },
    ...extra,
  ],
});

export const SCHEMAS: SectionSchema[] = [
  {
    key: "site",
    title: "Site settings",
    description: "Business details used in the header, footer and contact page.",
    previewPath: "/contact",
    fields: [
      { key: "name", label: "Business name", type: "text" },
      { key: "logoTagline", label: "Logo tagline", type: "text" },
      { key: "addressLine1", label: "Street address", type: "text" },
      { key: "addressLine2", label: "City, state, ZIP", type: "text" },
      { key: "mapUrl", label: "Map link", type: "url" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "website", label: "Website (shown in footer)", type: "text" },
      { key: "hoursLabel", label: "Hours label", type: "text" },
      { key: "hours", label: "Hours", type: "text" },
      { key: "hoursDetail", label: "Hours detail (meal service times)", type: "text" },
      { key: "orderUrl", label: "Online ordering link", type: "url" },
      { key: "donateLabel", label: "Donate button text", type: "text" },
      { key: "donateUrl", label: "Donate button link", type: "url" },
      { key: "footerAbout", label: "Footer description", type: "textarea" },
      { key: "footerTagline", label: "Footer tagline", type: "textarea" },
      { key: "footerBottomLeft", label: "Footer bottom-left text", type: "text" },
      { key: "footerBottomRight", label: "Footer bottom-right text", type: "text" },
      {
        key: "footerLinks",
        label: "Footer “Explore” links",
        type: "list",
        itemLabel: "Link",
        titleKey: "label",
        fields: [
          { key: "label", label: "Text", type: "text" },
          { key: "href", label: "Link", type: "url" },
        ],
      },
      {
        key: "social",
        label: "Social media",
        type: "list",
        itemLabel: "Profile",
        titleKey: "platform",
        fields: [
          { key: "platform", label: "Platform", type: "select", options: ["facebook", "instagram", "youtube", "linkedin", "x"] },
          { key: "url", label: "Profile URL", type: "url" },
        ],
      },
      { key: "seoDescription", label: "Search engine description", type: "textarea" },
    ],
  },
  {
    key: "home",
    title: "Home",
    description: "Hero banner and the four highlights below it.",
    previewPath: "/",
    fields: [
      hero([link("primaryCta", "Primary button"), link("secondaryCta", "Secondary button")]),
      {
        key: "features",
        label: "Highlights",
        type: "list",
        itemLabel: "Highlight",
        titleKey: "title",
        fields: [
          { key: "icon", label: "Icon", type: "select", options: ICONS },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "about",
    title: "About",
    description: "Mission, key facts and the story section.",
    previewPath: "/about",
    fields: [
      hero(),
      {
        key: "mission",
        label: "Mission",
        type: "object",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Text", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          link("cta", "Button"),
        ],
      },
      {
        key: "facts",
        label: "Key facts",
        type: "list",
        itemLabel: "Fact",
        titleKey: "label",
        fields: [
          { key: "value", label: "Number / value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      {
        key: "story",
        label: "Story",
        type: "object",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "paragraphs", label: "Paragraphs", type: "list", itemLabel: "Paragraph", fields: [{ key: "text", label: "Text", type: "textarea" }] },
        ],
      },
    ],
  },
  {
    key: "programs",
    title: "Programs",
    description: "Program cards.",
    previewPath: "/programs",
    fields: [
      hero(),
      {
        key: "cards",
        label: "Program cards",
        type: "list",
        itemLabel: "Card",
        titleKey: "title",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
          { key: "imageAlt", label: "Photo description", type: "text" },
          { key: "icon", label: "Icon", type: "select", options: ICONS },
          { key: "color", label: "Icon color", type: "select", options: COLORS },
          link("link", "Link"),
        ],
      },
    ],
  },
  {
    key: "getInvolved",
    title: "Get Involved",
    description: "Volunteer, donate and partner cards.",
    previewPath: "/get-involved",
    fields: [
      hero(),
      {
        key: "cards",
        label: "Cards",
        type: "list",
        itemLabel: "Card",
        titleKey: "title",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "icon", label: "Icon", type: "select", options: ICONS },
          { key: "color", label: "Icon color", type: "select", options: COLORS },
          link("link", "Button"),
          { key: "id", label: "Anchor id (e.g. “donate” makes /get-involved#donate scroll here)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "events",
    title: "Events",
    description: "Only published events dated today or later appear on the site.",
    previewPath: "/events",
    fields: [
      hero(),
      { key: "categories", label: "Filter categories", type: "list", itemLabel: "Category", titleKey: "name", fields: [{ key: "name", label: "Name", type: "text" }] },
      {
        key: "items",
        label: "Events",
        type: "list",
        itemLabel: "Event",
        titleKey: "title",
        fields: [
          { key: "published", label: "Published (visible on the website)", type: "boolean" },
          { key: "title", label: "Title", type: "text" },
          { key: "date", label: "Date", type: "date" },
          { key: "startTime", label: "Start time", type: "time" },
          { key: "endTime", label: "End time", type: "time" },
          { key: "location", label: "Location", type: "text" },
          { key: "category", label: "Category (must match a filter category)", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
        ],
      },
      { key: "emptyTitle", label: "Message when there are no events — title", type: "text" },
      { key: "emptyText", label: "Message when there are no events — text", type: "textarea" },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    description: "Address, phone and email come from Site settings.",
    previewPath: "/contact",
    fields: [
      hero(),
      { key: "visitTitle", label: "Visit heading", type: "text" },
      { key: "callTitle", label: "Call heading", type: "text" },
      { key: "emailTitle", label: "Email heading", type: "text" },
      { key: "formSuccess", label: "Message shown after the form is sent", type: "textarea" },
    ],
  },
];

export function getSchema(key: string) {
  return SCHEMAS.find((s) => s.key === key);
}

/** Coerces untrusted input to the shape described by the schema, dropping unknown keys. */
export function sanitize(fields: Field[], input: unknown): Record<string, unknown> {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = src[f.key];
    switch (f.type) {
      case "boolean":
        out[f.key] = v === true;
        break;
      case "select":
        out[f.key] = f.options.includes(String(v)) ? String(v) : f.options[0];
        break;
      case "object":
        out[f.key] = sanitize(f.fields, v);
        break;
      case "list":
        out[f.key] = (Array.isArray(v) ? v : []).slice(0, 200).map((item) => sanitize(f.fields, item));
        break;
      case "url":
      case "image": {
        const s = String(v ?? "").trim().slice(0, 2000);
        // Block script URLs; allow relative paths, anchors, http(s), mailto and tel.
        out[f.key] = /^\s*(javascript|data|vbscript):/i.test(s) ? "" : s;
        break;
      }
      default:
        out[f.key] = String(v ?? "").slice(0, 10000);
    }
  }
  return out;
}
