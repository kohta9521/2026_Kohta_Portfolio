import type { Metadata } from "next";

import AiView from "@/components/layouts/Ai/AiView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "ja",
  title: SEO_COPY.ai.ja.title,
  description: SEO_COPY.ai.ja.description,
  path: "/ja/ai",
  enPath: "/ai",
  jaPath: "/ja/ai",
});

// "/ja/ai" — AI / LLM 向けの機械可読サマリー（日本語）
export default function Page() {
  return <AiView lang="ja" />;
}
