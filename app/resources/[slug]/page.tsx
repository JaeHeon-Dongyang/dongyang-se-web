import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AttachmentCard } from "@/components/resources/attachment-card";
import { ResourceBody } from "@/components/resources/resource-body";
import { ResourceToc } from "@/components/resources/resource-toc";
import { CategoryBadge } from "@/components/category-badge";
import { ContactCta } from "@/components/contact-cta";
import { ResourceCard } from "@/components/resource-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getResourceBySlug, resources } from "@/lib/resources-data";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.summary,
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = resource.related
    ?.map((relatedSlug) => getResourceBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="flex flex-col gap-16 pb-24 md:gap-20">
      <div className="container-site flex flex-col gap-6 pt-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/resources" />}>
                기술자료
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{resource.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge>{resource.category}</CategoryBadge>
            {resource.version ? (
              <span className="text-body-text text-xs font-medium">
                {resource.version}
              </span>
            ) : null}
          </div>
          <h1 className="text-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {resource.title}
          </h1>
          <p className="text-body-text max-w-2xl text-base leading-relaxed text-pretty">
            {resource.summary}
          </p>
          <time
            dateTime={resource.updatedAt}
            className="text-body-text/80 text-xs font-medium"
          >
            최종 수정일 {resource.updatedAt}
          </time>
        </div>
      </div>

      <div className="container-site grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px] md:gap-14">
        <article className="border-border flex flex-col gap-10 border-t pt-10">
          {resource.attachments?.length ? (
            <div className="flex flex-col gap-3">
              {resource.attachments.map((attachment) => (
                <AttachmentCard key={attachment.name} attachment={attachment} />
              ))}
            </div>
          ) : null}
          <ResourceBody blocks={resource.body} />
        </article>

        <aside className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
          <ResourceToc blocks={resource.body} />
        </aside>
      </div>

      {relatedResources && relatedResources.length > 0 ? (
        <section className="container-site border-border border-t pt-14">
          <h2 className="text-heading mb-8 text-xl font-bold tracking-tight">
            관련 자료
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedResources.map((related) => (
              <ResourceCard key={related.slug} resource={related} />
            ))}
          </div>
        </section>
      ) : null}

      <ContactCta />
    </div>
  );
}
