import Image from "next/image";
import Link from "next/link";

import { langBase, type Lang } from "@/lib/i18n";
import { getWorks } from "@/dics/works";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

// /works/[slug]。ブログ記事ページ（BlogPostView）と同じ動線・トーンの詳細ページ。
// 上部：パンくず + 前後ナビ + 言語切替 + 閉じる
// 中央：中央寄せヘッダ（期間・ロール / タイトル / リード）、ヒーロー画像、ドロップキャップ本文、タグ、前後ナビ
export default function WorkDetailView({
  slug,
  lang,
}: {
  slug: string;
  lang: Lang;
}) {
  const base = langBase(lang);
  const works = getWorks(lang);

  // ラベルはこのページ専用に最小限だけ言語分岐（Career と同じ流儀）
  const tx =
    lang === "ja"
      ? {
          brand: "WORKS",
          back: "← 一覧へ",
          prev: "前へ",
          next: "次へ",
          live: "公開ページを開く",
          home: "プロフィールへ戻る",
        }
      : {
          brand: "WORKS",
          back: "← All work",
          prev: "Prev",
          next: "Next",
          live: "Open the live site",
          home: "Back to profile",
        };

  const idx = works.findIndex((p) => p.slug === slug);
  const work = works[idx];
  if (!work) return null;

  const prev = idx > 0 ? works[idx - 1] : undefined;
  const next = idx < works.length - 1 ? works[idx + 1] : undefined;

  return (
    <div className="relative mx-auto min-h-screen max-w-[1500px]">
      {/* 上部バー */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-rule bg-paper/90 px-5 py-3 backdrop-blur sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1.5 text-ink-3">
            {prev ? (
              <Link
                href={`${base}/works/${prev.slug}`}
                aria-label={tx.prev}
                className="transition-colors hover:text-accent"
              >
                ‹
              </Link>
            ) : (
              <span className="opacity-30">‹</span>
            )}
            {next ? (
              <Link
                href={`${base}/works/${next.slug}`}
                aria-label={tx.next}
                className="transition-colors hover:text-accent"
              >
                ›
              </Link>
            ) : (
              <span className="opacity-30">›</span>
            )}
          </span>
          <span className="label min-w-0 truncate !text-ink">
            <Link
              href={`${base}/#work`}
              className="!text-ink-3 transition-colors hover:!text-accent"
            >
              {tx.brand}
            </Link>{" "}
            / {work.title}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`${base}/#work`}
            aria-label={tx.home}
            title={tx.home}
            className="text-ink-3 transition-colors hover:text-accent"
          >
            ✕
          </Link>
        </div>
      </div>

      {/* 本体 */}
      <article className="mx-auto max-w-[72ch] px-5 pb-28 pt-12 sm:px-8">
        {/* 中央寄せヘッダ */}
        <header className="text-center">
          <p className="label !text-ink-3">
            {work.period}
            {work.role ? ` · ${work.role}` : ""}
          </p>
          <h1 className="mx-auto mt-4 max-w-[20ch] font-serif text-display font-[430] leading-[1.02] tracking-[-0.02em]">
            {work.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[48ch] font-serif text-[1.35rem] italic leading-[1.4] text-ink-2">
            {work.desc}
          </p>
          <div className="dotrule mx-auto mt-9 w-16" />
        </header>

        {/* ヒーロー画像（未指定ならドット背景のみ） */}
        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[--radius-card] border border-rule-strong bg-paper-raised bg-[radial-gradient(var(--color-accent-dot)_0.5px,transparent_0.5px)] [background-size:6px_6px]">
          {work.image && (
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(min-width: 1024px) 72ch, 100vw"
              className="object-cover"
            />
          )}
        </div>

        {/* タグ */}
        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {work.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* 本文（先頭にドロップキャップ） */}
        <div className="mt-12 space-y-6">
          {work.body.map((para, i) => (
            <div key={i} className={i === 0 ? "drop" : ""} lang={lang}>
              <p className="text-left text-[1.05rem] leading-[1.72] text-ink sm:text-justify">
                {para}
              </p>
            </div>
          ))}
        </div>

        {/* 公開リンク（任意） */}
        {work.link && (
          <div className="mt-10 text-center">
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {tx.live} ↗
            </a>
          </div>
        )}

        {/* 前後のプロジェクト */}
        <nav className="mt-16 flex justify-between gap-6 border-t border-rule pt-6">
          <div className="max-w-[45%]">
            {prev && (
              <Link href={`${base}/works/${prev.slug}`} className="group block">
                <span className="label !text-ink-3">← {tx.prev}</span>
                <span className="mt-1 block font-serif text-[0.98rem] leading-[1.3] text-ink-2 transition-colors group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="max-w-[45%] text-right">
            {next && (
              <Link href={`${base}/works/${next.slug}`} className="group block">
                <span className="label !text-ink-3">{tx.next} →</span>
                <span className="mt-1 block font-serif text-[0.98rem] leading-[1.3] text-ink-2 transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}
