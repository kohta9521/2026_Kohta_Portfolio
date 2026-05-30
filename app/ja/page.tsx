import type { Metadata } from "next";

import HomeView from "@/components/layouts/HomeView/HomeView";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { pageMetadata, personJsonLd, websiteJsonLd, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "ja",
  absoluteTitle: SEO_COPY.home.ja.title,
  description: SEO_COPY.home.ja.description,
  path: "/ja",
  enPath: "/",
  jaPath: "/ja",
});

// "/ja" — 日本語
export default function Page() {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <HomeView lang="ja" />
    </>
  );
}
