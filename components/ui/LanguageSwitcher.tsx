"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ja", label: "JA" },
];

// 現在のパスを保ったまま言語だけ切り替える。
// en は接頭辞なし（/blogs/x）、ja は /ja 接頭辞（/ja/blogs/x）。
function localizedHref(pathname: string, target: Lang): string {
  const bare = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
  if (target === "ja") return bare === "/" ? "/ja" : `/ja${bare}`;
  return bare;
}

export default function LanguageSwitcher() {
  const { lang } = useLanguage();
  const pathname = usePathname() || "/";

  return (
    <span
      className="label inline-flex items-center gap-1.5"
      aria-label="Language"
    >
      {OPTIONS.map((opt, i) => (
        <span key={opt.value} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="text-ink-3">
              /
            </span>
          )}
          <Link
            href={localizedHref(pathname, opt.value)}
            aria-current={lang === opt.value ? "true" : undefined}
            className={
              lang === opt.value
                ? "text-accent"
                : "text-ink-3 transition-colors hover:text-ink"
            }
          >
            {opt.label}
          </Link>
        </span>
      ))}
    </span>
  );
}
