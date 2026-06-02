import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

// styles
import "../styles/globals.css";

import { GoogleTagManager } from "@next/third-parties/google";

import { SITE_URL, SITE_NAME, SEO_COPY, ogImage } from "@/lib/seo";
import { GTM_ID, isGtmEnabled } from "@/lib/gtm";
import Preloader from "@/components/fx/Preloader";
import ScrollReveal from "@/components/fx/ScrollReveal";
import RouteAnalytics from "@/components/analytics/RouteAnalytics";
import ConsentBanner from "@/components/ui/ConsentBanner";

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
    // iOS は apple-touch-icon に SVG を使わないため PNG(180×180) を指定する。
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Search Console / Bing の所有権確認。コードは触らず Vercel の環境変数で差し込む。
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfb" },
    { media: "(prefers-color-scheme: dark)", color: "#040404" },
  ],
  colorScheme: "light dark",
};

// Newsreader は可変フォント。weight を指定せず軸ごと読み込むことで、
// 300〜600 + italic を 1 ファイルでまかなう（旧: 静的 8 ファイル）。
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
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
  // チラつき防止：ペイント前にテーマを <html> へ適用する。
  // 方針：デフォルトは常にライト（OS のダーク設定は初期値には反映しない）。
  // ただしユーザーがトグルで明示的に選んだ場合（localStorage）はそれを尊重して永続化する。
  // あわせて演出用フラグも付与する：
  //   reveal-ready … JS が動く環境でだけ [data-reveal] を初期非表示にする（クローラ/JS無効では全文表示）
  //   booting       … 初回訪問かつ reduced-motion でない時だけプリローダーを表示
  const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='light';}d.setAttribute('data-theme',t);}catch(e){d.setAttribute('data-theme','light');}try{var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){d.classList.add('reveal-ready');if(!sessionStorage.getItem('kk_booted')){d.classList.add('booting');}}}catch(e){}})();`;

  // Consent Mode v2 の既定値を GTM 読み込み前に設定（チラつき防止スクリプトと同様に body 先頭で同期実行）。
  // 既に同意済みの再訪ユーザーは analytics を granted で開始する。
  const consentScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;(function(){var g='denied';try{if(localStorage.getItem('consent')==='granted'){g='granted';}}catch(e){}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:g,wait_for_update:500});})();`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${departure.variable}`}
    >
      <body>
        {/* anti-FOUC / consent はペイント前に同期実行する必要があるため beforeInteractive。
            生の <script> を React ツリーに置くと React 19 が「クライアントでは実行されない」と
            警告するため、next/script に委譲する（ルートレイアウトでのみ beforeInteractive 可）。 */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {isGtmEnabled && (
          <Script id="consent-init" strategy="beforeInteractive">
            {consentScript}
          </Script>
        )}
        <Preloader />
        {children}
        <ScrollReveal />
        <RouteAnalytics />
        <ConsentBanner />
        {isGtmEnabled && <GoogleTagManager gtmId={GTM_ID} />}
      </body>
    </html>
  );
}
