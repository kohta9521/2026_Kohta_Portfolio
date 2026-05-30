"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { sendPageView } from "@/lib/gtm";

// App Router はクライアント遷移でフルリロードしないため、GA4 のページビューは
// ルート変更を検知して自分で push する（初回＋遷移ごと）。GTM 側で page_view を一本化。
function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = searchParams?.toString();
    const page_path = `${pathname}${qs ? `?${qs}` : ""}`;
    sendPageView({
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      language: pathname?.startsWith("/ja") ? "ja" : "en",
    });
  }, [pathname, searchParams]);

  return null;
}

// useSearchParams は Suspense 境界が必須（SSG を壊さないため）。
export default function RouteAnalytics() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
