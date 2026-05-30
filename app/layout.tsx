import type { Metadata, Viewport } from "next";
import {
  Newsreader,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import localFont from "next/font/local";

// styles
import "../styles/globals.css";

import { SITE_URL, SITE_NAME, SEO_COPY, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_COPY.home.en.title,
    template: "%s | Kohta Kouchi",
  },
  description: SEO_COPY.home.en.description,
  applicationName: SITE_NAME,
  authors: [{ name: "Kohta Kouchi" }],
  creator: "Kohta Kouchi",
  keywords: [
    "Kohta Kouchi",
    "河内光太",
    "ポートフォリオ",
    "portfolio",
    "frontend engineer",
    "フロントエンドエンジニア",
    "PdM",
    "COO",
    "FDE",
    "GEO",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", ja: "/ja", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    locale: "en_US",
    alternateLocale: "ja_JP",
    title: SEO_COPY.home.en.title,
    description: SEO_COPY.home.en.description,
    images: [{ url: ogImage("Kohta Kouchi"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_COPY.home.en.title,
    description: SEO_COPY.home.en.description,
    images: [ogImage("Kohta Kouchi")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfb" },
    { media: "(prefers-color-scheme: dark)", color: "#040404" },
  ],
  colorScheme: "light dark",
};

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const shippori = Shippori_Mincho({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shippori",
});
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen",
});
const departure = localFont({
  src: "../public/fonts/DepartureMono-Regular.woff2",
  display: "swap",
  variable: "--font-departure",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // チラつき防止：ペイント前に localStorage / OS 設定からテーマを <html> へ適用する。
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${shippori.variable} ${zenKaku.variable} ${departure.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
