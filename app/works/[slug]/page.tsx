import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WorkDetailView from "@/components/layouts/Work/WorkDetailView";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { allWorkSlugs, getWork } from "@/dics/works";
import {
  pageMetadata,
  creativeWorkJsonLd,
  breadcrumbJsonLd,
  SEO_COPY,
} from "@/lib/seo";

export function generateStaticParams() {
  return allWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork("en", slug);
  if (!w) return {};
  return pageMetadata({
    lang: "en",
    title: w.title,
    description: w.desc,
    path: `/works/${slug}`,
    enPath: `/works/${slug}`,
    jaPath: `/ja/works/${slug}`,
    type: "article",
  });
}

// "/works/[slug]" — 英語のプロジェクト詳細ページ
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWork("en", slug);
  if (!w) notFound();

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({
            title: w.title,
            description: w.desc,
            path: `/works/${slug}`,
            image: w.image,
            lang: "en",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: SEO_COPY.works.en.title, path: "/works" },
            { name: w.title, path: `/works/${slug}` },
          ]),
        ]}
      />
      <WorkDetailView slug={slug} lang="en" />
    </>
  );
}
