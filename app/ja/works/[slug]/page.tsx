import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LanguageProvider } from "@/contexts/LanguageContext";
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
  const w = getWork("ja", slug);
  if (!w) return {};
  return pageMetadata({
    lang: "ja",
    title: w.title,
    description: w.desc,
    path: `/ja/works/${slug}`,
    enPath: `/works/${slug}`,
    jaPath: `/ja/works/${slug}`,
    type: "article",
  });
}

// "/ja/works/[slug]" — 日本語のプロジェクト詳細ページ
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWork("ja", slug);
  if (!w) notFound();

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({
            title: w.title,
            description: w.desc,
            path: `/ja/works/${slug}`,
            image: w.image,
            lang: "ja",
          }),
          breadcrumbJsonLd([
            { name: "ホーム", path: "/ja" },
            { name: SEO_COPY.works.ja.title, path: "/ja/works" },
            { name: w.title, path: `/ja/works/${slug}` },
          ]),
        ]}
      />
      <LanguageProvider lang="ja">
        <WorkDetailView slug={slug} />
      </LanguageProvider>
    </>
  );
}
