import type { IconName } from "@/lib/types";

const paths: Record<IconName | "pin" | "phone" | "mail" | "clock" | "arrow" | "menu" | "close" | "facebook" | "instagram" | "youtube" | "linkedin" | "x", React.ReactNode> = {
  apple: (
    <>
      <path d="M12 7c-1.5-1-3.5-1.4-5.2-.6C4.3 7.6 3.5 10.6 4.3 13.6c.9 3.4 3.2 6.6 5.4 6.9.8.1 1.4-.3 2.3-.3s1.5.4 2.3.3c2.2-.3 4.5-3.5 5.4-6.9.8-3-.1-6-2.5-7.2-1.7-.8-3.7-.4-5.2.6Z" />
      <path d="M12 7c0-2 1-3.5 3-4" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5Z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
      <path d="M22 9v5" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="9" r="2.2" />
      <circle cx="19" cy="9" r="2.2" />
      <path d="M6.5 20v-2a5.5 5.5 0 0 1 11 0v2" />
      <path d="M1.5 19v-1a3.5 3.5 0 0 1 4.5-3.3M22.5 19v-1a3.5 3.5 0 0 0-4.5-3.3" />
    </>
  ),
  heart: <path d="M12 20.5s-8.5-5-8.5-11A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 2.9c0 6-8.5 11-8.5 11Z" />,
  utensils: (
    <>
      <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10" />
      <path d="M17 21V3c-2.5 1.5-3.5 4.5-3.5 8h3.5" />
    </>
  ),
  chef: (
    <>
      <path d="M7 18h10M7 21h10M7 18v-4.5A4 4 0 0 1 6.5 6a5.5 5.5 0 0 1 11 0 4 4 0 0 1-.5 7.5V18" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </>
  ),
  recycle: (
    <>
      <path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L5 13" />
      <path d="M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7L19 13" />
      <path d="m14 16-3 3 3 3M8.3 6.5l1.1-1.9a1.8 1.8 0 0 1 3.2 0l1.4 2.4" />
      <path d="m3.8 9.5 1.6-.8L7 13l-4-1M16.5 5.5l-2.6 1.5-1.5-4" />
    </>
  ),
  hands: (
    <>
      <path d="M12 21v-6M8 21c-3-2-4-5-4-9V8a1.5 1.5 0 0 1 3 0v4M16 21c3-2 4-5 4-9V8a1.5 1.5 0 0 0-3 0v4" />
      <path d="M7 12v-6a1.5 1.5 0 0 1 3 0v6M14 12V6a1.5 1.5 0 0 1 3 0v6M10 12V4.5a1.5 1.5 0 0 1 3 0V12" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.5 1.5a2 2 0 0 1-3-3L13 7l1-1h3l4 4M2 10l4-4h3" />
      <path d="m2 10 7 7 1 1a1.4 1.4 0 0 0 2-2" />
    </>
  ),
  water: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  pin: (
    <>
      <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: <path d="M5 3h3.5l2 5-2.5 1.5a11 11 0 0 0 6.5 6.5L16 13.5l5 2V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".5" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10 9 5 3-5 3Z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
};

export type AnyIcon = keyof typeof paths;

export function Icon({ name, className = "size-6", strokeWidth = 2 }: { name: AnyIcon; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.heart}
    </svg>
  );
}

export const ICON_OPTIONS: IconName[] = [
  "apple", "cap", "people", "heart", "utensils", "chef", "briefcase", "leaf", "recycle", "hands", "handshake", "water",
];
