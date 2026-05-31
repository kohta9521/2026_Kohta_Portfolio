import type { Metadata } from "next";

import { en } from "@/dics/en";
import { ja } from "@/dics/ja";

export type Lang = "en" | "ja";

// 本番ドメインは環境変数で差し込む（未設定時は Vercel 既定にフォールバック）。
// canonical / OGP の絶対URL生成に必須。
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kohta-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Kohta Kouchi — Portfolio";

const dict = { en, ja };
const OG_LOCALE: Record<Lang, string> = { en: "en_US", ja: "ja_JP" };

// SNS の正規プロフィール（"#" のダミーは除外）
export function sameAs(): string[] {
  return en.contact.links.map((l) => l.href).filter((h) => h && h !== "#");
}

/** タイトル付き動的 OG 画像の相対URL（/og ルートが描画） */
export function ogImage(title: string, subtitle?: string): string {
  const p = new URLSearchParams({ title });
  if (subtitle) p.set("subtitle", subtitle);
  return `/og?${p.toString()}`;
}

interface PageMetaInput {
  lang: Lang;
  /** テンプレート "%s | …" を通すページ固有タイトル */
  title?: string;
  /** テンプレートを通さない絶対タイトル（トップ用） */
  absoluteTitle?: string;
  description: string;
  /** 現在ページの正規パス（例 "/ja/works/foo"） */
  path: string;
  /** 言語別の同一ページパス（hreflang 用） */
  enPath: string;
  jaPath: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/** 各ページ共通のメタデータ（canonical / hreflang / OGP / Twitter）を組み立てる */
export function pageMetadata({
  lang,
  title,
  absoluteTitle,
  description,
  path,
  enPath,
  jaPath,
  image,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const img =
    image ?? ogImage(absoluteTitle ?? title ?? SITE_NAME, dict[lang].meta.role);
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: path,
      languages: { en: enPath, ja: jaPath, "x-default": enPath },
    },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title: absoluteTitle ?? title ?? SITE_NAME,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: OG_LOCALE[lang === "en" ? "ja" : "en"],
      images: [{ url: img, width: 1200, height: 630 }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ?? title ?? SITE_NAME,
      description,
      images: [img],
    },
  };
}

/* ============ JSON-LD ビルダー ============ */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kohta Kouchi",
    alternateName: "河内光太",
    url: SITE_URL,
    jobTitle: "COO / PdM / Software Engineer",
    email: `mailto:${en.contact.email}`,
    sameAs: sameAs(),
    knowsAbout: [
      "Frontend Engineering",
      "Product Management",
      "Generative Engine Optimization",
      "FinTech",
      "Design Systems",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "ja"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function blogPostingJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  lang: Lang;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    inLanguage: opts.lang,
    url: `${SITE_URL}${opts.path}`,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: { "@type": "Person", name: "Kohta Kouchi", url: SITE_URL },
  };
}

export function creativeWorkJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  lang: Lang;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    description: opts.description,
    inLanguage: opts.lang,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
    author: { "@type": "Person", name: "Kohta Kouchi", url: SITE_URL },
  };
}

/* ============ ページ別コピー（メタ文言） ============ */

export const SEO_COPY = {
  home: {
    en: {
      title: "Kohta Kouchi — COO · PdM · Software Engineer",
      description:
        "Portfolio of Kohta Kouchi — a COO, PdM and software engineer bridging law and engineering. Full-stack development, product management and design across Mercari, QueryLift and more.",
    },
    ja: {
      title: "河内光太 — COO・PdM・ソフトウェアエンジニア",
      description:
        "河内光太のポートフォリオ。法学とエンジニアリングを横断するCOO・PdM・ソフトウェアエンジニア。メルカリ・QueryLift などでのフルスタック開発・PdM・デザインの実績を掲載。",
    },
  },
  works: {
    en: {
      title: "Work",
      description:
        "Selected projects and personal work by Kohta Kouchi — products built end to end from design to implementation.",
    },
    ja: {
      title: "制作",
      description:
        "河内光太の個人開発・制作物の一覧。デザインから実装まで一貫してつくったプロダクトを掲載。",
    },
  },
  blogs: {
    en: {
      title: "Journal",
      description:
        "Notes on engineering, design and building products by Kohta Kouchi.",
    },
    ja: {
      title: "ジャーナル",
      description:
        "河内光太のジャーナル。エンジニアリング・デザイン・ものづくりに関する記録。",
    },
  },
  ai: {
    en: {
      title: "AI · LLM README",
      description:
        "A machine-readable, structured summary of Kohta Kouchi — profile, career, skills, work, FAQ and contact in one document, written for large language models and AI search engines to read and cite accurately.",
    },
    ja: {
      title: "AI · LLM README",
      description:
        "河内光太の機械可読な構造化サマリー。プロフィール・経歴・スキル・実績・FAQ・連絡先を1つの文書に集約し、LLM や AI 検索エンジンが正確に読み取り・引用できるように記述。",
    },
  },
} as const;
