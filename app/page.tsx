import type { Metadata } from "next";

import HomeView from "@/components/layouts/HomeView/HomeView";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { pageMetadata, personJsonLd, websiteJsonLd, SEO_COPY } from "@/lib/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  absoluteTitle: SEO_COPY.home.en.title,
  description: SEO_COPY.home.en.description,
  path: "/",
  enPath: "/",
  jaPath: "/ja",
});

// "/" — 英語
export default function Page() {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <HomeView lang="en" />
      <SpeedInsights />
    </>
  );
}
