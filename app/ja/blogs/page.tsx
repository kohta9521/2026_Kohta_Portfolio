import type { Metadata } from "next";

import { LanguageProvider } from "@/contexts/LanguageContext";
import BlogListView from "@/components/layouts/Blog/BlogListView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "ja",
  title: SEO_COPY.blogs.ja.title,
  description: SEO_COPY.blogs.ja.description,
  path: "/ja/blogs",
  enPath: "/blogs",
  jaPath: "/ja/blogs",
});

// "/ja/blogs" — 日本語のジャーナル一覧
export default function Page() {
  return (
    <LanguageProvider lang="ja">
      <BlogListView />
    </LanguageProvider>
  );
}
