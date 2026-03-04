import { MetadataRoute } from "next";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com"; // 本番環境のドメインに変更してください

  const routes = ["/", "/about", "/projects", "/skills", "/contact", "/blog"];

  const sitemap: MetadataRoute.Sitemap = [];

  // 各ロケールのページを追加
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/blog" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    });
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    },
    ...sitemap,
  ];
}
