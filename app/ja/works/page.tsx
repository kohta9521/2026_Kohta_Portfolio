import type { Metadata } from "next";

import { LanguageProvider } from "@/contexts/LanguageContext";
import WorkListView from "@/components/layouts/Work/WorkListView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "ja",
  title: SEO_COPY.works.ja.title,
  description: SEO_COPY.works.ja.description,
  path: "/ja/works",
  enPath: "/works",
  jaPath: "/ja/works",
});

// "/ja/works" — 日本語の個人開発一覧
export default function Page() {
  return (
    <LanguageProvider lang="ja">
      <WorkListView />
    </LanguageProvider>
  );
}
