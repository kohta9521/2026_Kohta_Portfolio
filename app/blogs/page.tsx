import type { Metadata } from "next";

import { LanguageProvider } from "@/contexts/LanguageContext";
import BlogListView from "@/components/layouts/Blog/BlogListView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  title: SEO_COPY.blogs.en.title,
  description: SEO_COPY.blogs.en.description,
  path: "/blogs",
  enPath: "/blogs",
  jaPath: "/ja/blogs",
});

// "/blogs" — 英語のジャーナル一覧
export default function Page() {
  return (
    <LanguageProvider lang="en">
      <BlogListView />
    </LanguageProvider>
  );
}
