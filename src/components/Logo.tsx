export function Logo({ tagline }: { tagline: string }) {
  return (
    <span className="relative inline-flex flex-col leading-none">
      <span className="flex items-end">
        <span className="font-script text-[1.9rem] text-ink sm:text-[2.35rem]">Kitchen</span>
        <span className="font-display -ml-0.5 text-[2.3rem] font-black tracking-tight text-brand-orange sm:text-[2.85rem]">33</span>
        <svg viewBox="0 0 32 24" className="-mt-1 -ml-1 h-5 w-7 self-start text-brand-green sm:h-6 sm:w-8" aria-hidden="true">
          <path fill="currentColor" d="M2 22C4 9 14 2 30 2 29 15 20 22 6 21c5-4 10-8 15-14C15 11 9 16 2 22Z" />
        </svg>
      </span>
      <span className="mt-1 text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-[0.62rem]">
        {tagline}
      </span>
    </span>
  );
}

export function FooterLogo() {
  return (
    <span className="relative inline-flex items-end font-serif text-4xl font-bold text-white sm:text-[2.6rem]">
      Kitchen
      <svg viewBox="0 0 24 24" className="absolute -top-3 left-[47%] size-7 text-lime-200/80" aria-hidden="true">
        <circle cx="9" cy="9" r="6" fill="currentColor" />
        <circle cx="16" cy="6" r="4" fill="currentColor" opacity=".8" />
        <path d="M9 12 5 22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="ml-3">33</span>
    </span>
  );
}
