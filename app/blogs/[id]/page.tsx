import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostView from "@/components/layouts/Blog/BlogPostView";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { allPostIds, getPost } from "@/dics/blog";
import {
  pageMetadata,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  SEO_COPY,
} from "@/lib/seo";

export function generateStaticParams() {
  return allPostIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getPost("en", id);
  if (!post) return {};
  return pageMetadata({
    lang: "en",
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${id}`,
    enPath: `/blogs/${id}`,
    jaPath: `/ja/blogs/${id}`,
    type: "article",
    publishedTime: post.date.replace(/\./g, "-"),
  });
}

// "/blogs/[id]" — 英語の記事ページ
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPost("en", id);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blogs/${id}`,
            datePublished: post.date.replace(/\./g, "-"),
            lang: "en",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: SEO_COPY.blogs.en.title, path: "/blogs" },
            { name: post.title, path: `/blogs/${id}` },
          ]),
        ]}
      />
      <BlogPostView id={id} lang="en" />
    </>
  );
}
