/** Kitchen33 wordmark. `tone="light"` is for dark backgrounds such as the footer. */
export function Logo({ tagline, tone = "dark" }: { tagline: string; tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className="relative inline-flex flex-col leading-none">
      <span className="flex items-end">
        <span className={`font-script text-[1.9rem] sm:text-[2.35rem] ${text}`}>Kitchen</span>
        <span className="font-display -ml-0.5 text-[2.3rem] font-black tracking-tight text-brand-orange sm:text-[2.85rem]">33</span>
        <svg viewBox="0 0 32 24" className="-mt-1 -ml-1 h-5 w-7 self-start text-brand-green sm:h-6 sm:w-8" aria-hidden="true">
          <path fill="currentColor" d="M2 22C4 9 14 2 30 2 29 15 20 22 6 21c5-4 10-8 15-14C15 11 9 16 2 22Z" />
        </svg>
      </span>
      <span className={`mt-1 text-[0.55rem] font-extrabold uppercase tracking-[0.12em] sm:text-[0.62rem] ${text}`}>
        {tagline}
      </span>
    </span>
  );
}
