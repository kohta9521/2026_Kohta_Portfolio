import Link from "next/link";

import { getDictionary, langBase, type Lang } from "@/lib/i18n";
import { getBlog } from "@/dics/blog";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const base = langBase(lang);

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-rule-strong pt-4 pb-1">
      {/* ブランド表記をそのまま home への動線にする（常時ヘッダ上部からトップへ戻れる） */}
      <Link
        href={base || "/"}
        aria-label="Home"
        className="label !text-ink-3 transition-opacity hover:opacity-70"
      >
        <b className="font-normal text-accent">ENGINEERING</b> PORTFOLIO
      </Link>
      <span className="label !text-ink-3 hidden md:inline">
        {t.nav.tagline}
      </span>
      <span className="flex items-center gap-4">
        <Link
          href={`${base}/blogs`}
          className="label !text-ink-3 transition-colors hover:!text-accent"
        >
          {getBlog(lang).section.kicker}
        </Link>
        <span className="label !text-ink-3">{t.meta.year}</span>
        <LanguageSwitcher lang={lang} />
      </span>
    </header>
  );
}
