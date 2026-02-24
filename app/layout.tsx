// next
import type { Metadata } from "next";

// styles
import "@/styles/globals.css";

// fonts
import { Geist, Geist_Mono } from "next/font/google";

// providers
import { WindowProvider } from "@/contexts/WindowContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import WindowManager from "@/components/ui/WindowManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata
export const metadata: Metadata = {
  title: "Kohta Portfolio",
  description: "2026年のKohtaのポートフォリオ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <WindowProvider>
            <div className="w-screen h-screen overflow-hidden relative bg-[var(--bg-primary)]">
              {children}
              <WindowManager />
            </div>
          </WindowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
