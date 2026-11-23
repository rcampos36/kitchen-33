export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full sm:h-16 lg:h-24 ${className}`}
      aria-hidden="true"
    >
      <path d="M0 70C240 20 520 15 760 60s470 50 680-10V120H0Z" fill="#7bbf2a" />
      <path d="M0 88C260 44 540 52 790 82s440 26 650-26V120H0Z" fill="#f7b625" />
      <path d="M0 96C300 70 560 82 820 100s420 14 620-20V120H0Z" fill="#fff" />
    </svg>
  );
}
