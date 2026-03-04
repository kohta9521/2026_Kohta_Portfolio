// next
import type { Metadata } from "next";

// styles
import "@/styles/globals.css";

// fonts
import { IBM_Plex_Sans_JP, IBM_Plex_Mono } from "next/font/google";

// seo
import StructuredData from "@/components/seo/StructuredData";

// analytics
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSansJP = IBM_Plex_Sans_JP({
  variable: "--font-ibm-plex-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// metadata
export const metadata: Metadata = {
  title: {
    default: "Kohta Portfolio",
    template: "%s | Kohta Portfolio",
  },
  description:
    "フルスタックエンジニアKohtaのポートフォリオサイト。React、Next.js、TypeScriptを使用したモダンなWeb開発プロジェクトを紹介。",
  keywords: [
    "フルスタックエンジニア",
    "Web開発",
    "React",
    "Next.js",
    "TypeScript",
    "ポートフォリオ",
    "Kohta",
    "フロントエンド",
    "バックエンド",
  ],
  authors: [{ name: "Kohta", url: "https://your-domain.com" }],
  creator: "Kohta",
  publisher: "Kohta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kohta Portfolio",
    description:
      "フルスタックエンジニアKohtaのポートフォリオサイト。モダンなWeb開発プロジェクトを紹介。",
    url: "https://your-domain.com",
    siteName: "Kohta Portfolio",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kohta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kohta Portfolio",
    description:
      "フルスタックエンジニアKohtaのポートフォリオサイト。モダンなWeb開発プロジェクトを紹介。",
    creator: "@yourusername",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${ibmPlexSansJP.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
