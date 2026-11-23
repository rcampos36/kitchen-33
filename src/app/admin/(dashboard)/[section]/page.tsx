import { notFound } from "next/navigation";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { getContent } from "@/lib/content";
import { SCHEMAS, getSchema } from "@/lib/schemas";

// Session-gated admin pages render on the server per request.
export const instant = false;
export function generateStaticParams() {
  return SCHEMAS.map((s) => ({ section: s.key }));
}

export default async function SectionPage({ params }: PageProps<"/admin/[section]">) {
  const { section } = await params;
  const schema = getSchema(section);
  if (!schema) notFound();
  const content = await getContent();
  return <SectionEditor schema={schema} initial={content[schema.key] as unknown as Record<string, unknown>} />;
}
