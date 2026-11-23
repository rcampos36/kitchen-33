import Link from "next/link";

/** Uses next/link for internal paths and a plain anchor (new tab) for external URLs. */
export function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={className} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href || "/"} className={className}>
      {children}
    </Link>
  );
}
