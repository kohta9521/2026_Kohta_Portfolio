import type { Metadata } from "next";

import { LanguageProvider } from "@/contexts/LanguageContext";
import WorkListView from "@/components/layouts/Work/WorkListView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  title: SEO_COPY.works.en.title,
  description: SEO_COPY.works.en.description,
  path: "/works",
  enPath: "/works",
  jaPath: "/ja/works",
});

// "/works" — 英語の個人開発一覧
export default function Page() {
  return (
    <LanguageProvider lang="en">
      <WorkListView />
    </LanguageProvider>
  );
}
