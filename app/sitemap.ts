import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { allWorkSlugs } from "@/dics/works";
import { allPostIds } from "@/dics/blog";

// 全ルート（en / ja 両方 + 動的な works / blogs）を列挙。
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // [enPath, jaPath] の組で hreflang(alternates) を付与
  const pairs: [string, string][] = [
    ["", "/ja"],
    ["/works", "/ja/works"],
    ["/blogs", "/ja/blogs"],
    ...allWorkSlugs().map(
      (s) => [`/works/${s}`, `/ja/works/${s}`] as [string, string]
    ),
    ...allPostIds().map(
      (id) => [`/blogs/${id}`, `/ja/blogs/${id}`] as [string, string]
    ),
  ];

  return pairs.flatMap(([enPath, jaPath]) => {
    const languages = {
      en: `${SITE_URL}${enPath || "/"}`,
      ja: `${SITE_URL}${jaPath}`,
    };
    return [
      {
        url: `${SITE_URL}${enPath || "/"}`,
        lastModified: now,
        alternates: { languages },
      },
      {
        url: `${SITE_URL}${jaPath}`,
        lastModified: now,
        alternates: { languages },
      },
    ];
  });
}
