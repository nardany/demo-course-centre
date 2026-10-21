import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionManager } from "@/components/admin/collection-manager";
import { PageTitle } from "@/components/admin/page-title";
import { PriceTable } from "@/components/admin/price-table";
import { SectionForm } from "@/components/admin/section-form";
import { adminPages } from "@/lib/admin-schema";
import { getContent } from "@/lib/db";

export function generateStaticParams() {
  return adminPages.map((p) => ({ page: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/admin/[page]">): Promise<Metadata> {
  const { page } = await params;
  return { title: adminPages.find((p) => p.slug === page)?.title };
}

export default async function AdminSectionPage({ params }: PageProps<"/admin/[page]">) {
  const { page: slug } = await params;
  const page = adminPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const content = await getContent();

  return (
    <>
      <PageTitle title={page.title} text="Փոփոխությունները կայքում երևում են պահպանելուց անմիջապես հետո։" />
      <div className="grid max-w-4xl gap-6 [&>*]:min-w-0">
        {page.blocks.map((block) =>
          block.kind === "prices" ? (
            <PriceTable key="prices" courses={content.courses} packages={content.packages} />
          ) : block.kind === "section" ? (
            <SectionForm key={block.key} sectionKey={block.key} values={content[block.key] as unknown as Record<string, unknown>} />
          ) : (
            <CollectionManager
              key={block.key}
              collectionKey={block.key}
              items={content[block.key] as unknown as ({ id: string } & Record<string, unknown>)[]}
            />
          ),
        )}
      </div>
    </>
  );
}
