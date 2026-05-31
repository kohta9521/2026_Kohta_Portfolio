import type { Metadata } from "next";

import AiView from "@/components/layouts/Ai/AiView";
import { pageMetadata, SEO_COPY } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  title: SEO_COPY.ai.en.title,
  description: SEO_COPY.ai.en.description,
  path: "/ai",
  enPath: "/ai",
  jaPath: "/ja/ai",
});

// "/ai" — AI / LLM 向けの機械可読サマリー（英語）
export default function Page() {
  return <AiView lang="en" />;
}
