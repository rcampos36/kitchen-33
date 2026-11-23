import type { IconName } from "@/lib/types";
import { Icon } from "./Icon";

const bg = { orange: "bg-brand-orange", green: "bg-brand-green", teal: "bg-brand-teal" } as const;

export function IconBadge({ icon, color, className = "size-20" }: { icon: IconName; color: keyof typeof bg; className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full text-white ring-4 ring-white ${bg[color] ?? bg.orange} ${className}`}>
      <Icon name={icon} className="size-1/2" />
    </span>
  );
}
