import Link from "next/link";
import Image from "next/image";

import { langBase, type Lang } from "@/lib/i18n";
import { getBlog, postFigure } from "@/dics/blog";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import BlogProgressRail from "./BlogProgressRail";

// /blogs/[id]。blog_details.png 準拠：
// グレーの台紙の上に、影のついた白い「紙（PDFのページ）」のシートを浮かべる。
// 左：紙の外（グレー上）に置く目次サイドバー＋ブランド。
// 中央シート上：ミニマルなパンくずヘッダ → 中央寄せの記事ヘッダ → 図版 → 本文。
// 右端：スクロール進捗の目盛りレール。
export default function BlogPostView({ id, lang }: { id: string; lang: Lang }) {
  const blog = getBlog(lang);
  const base = langBase(lang);

  const idx = blog.posts.findIndex((p) => p.id === id);
  const post = blog.posts[idx];
  if (!post) return null;

  const category = blog.categories.find((c) => c.id === post.category);
  const prev = idx > 0 ? blog.posts[idx - 1] : undefined;
  const next = idx < blog.posts.length - 1 ? blog.posts[idx + 1] : undefined;

  return (
    // 台紙：限りなく白に近いグレー（paper-sunken）。純白の PDF ページとの差はわずか。
    // トークン参照なのでダークモードにもそのまま追従する。area を仕切る border は引かない。
    <div className="flex min-h-screen justify-center bg-paper-sunken px-4 sm:px-6 lg:px-12 xl:items-start xl:gap-10 xl:px-8">
      <BlogProgressRail />

      {/* 左：目次サイドバー（グレー台紙の上・仕切り線なし）。
          xl 未満ではページを中央の純白シート1枚に集中させるため非表示。 */}
      <aside className="sticky top-16 mt-14 hidden max-h-[calc(100vh-8rem)] w-72 shrink-0 flex-col overflow-y-auto xl:flex">
        <Link
          href={`${base}/blogs`}
          className="label !text-accent transition-opacity hover:opacity-70"
        >
          {blog.post.brand}
        </Link>

        <nav className="mt-9 space-y-7">
          {blog.categories.map((cat) => {
            const posts = blog.posts.filter((p) => p.category === cat.id);
            if (posts.length === 0) return null;
            return (
              <div key={cat.id}>
                <h3 className="label !text-[0.62rem] !text-ink-3">
                  <span className="text-accent">{cat.no}.</span> {cat.label}
                </h3>
                <ul className="mt-2.5 space-y-1.5">
                  {posts.map((p) => {
                    const here = p.id === post.id;
                    return (
                      <li key={p.id} className="flex gap-2">
                        <span
                          aria-hidden
                          className={here ? "text-accent" : "text-ink-3"}
                        >
                          ·
                        </span>
                        <Link
                          href={`${base}/blogs/${p.id}`}
                          aria-current={here ? "page" : undefined}
                          className={`text-[0.84rem] leading-[1.35] transition-colors ${
                            here ? "text-accent" : "text-ink-2 hover:text-ink"
                          }`}
                        >
                          {p.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* 言語切替（仕切り線は引かず余白だけで区切る） */}
        <div className="mt-10 pt-5">
          <LanguageSwitcher lang={lang} />
        </div>
      </aside>

      {/* 中央：白い PDF ページ。全方向 shadow で気持ち浮かせる。仕切り border は一切なし。 */}
      <div className="relative my-10 min-h-[70vh] w-full min-w-0 max-w-[840px] bg-paper-raised shadow-[0_2px_10px_-4px_rgba(0,0,0,0.12),0_30px_80px_-24px_rgba(0,0,0,0.22)] lg:my-14">
        {/* パンくずヘッダ（ミニマル・仕切り線なし／白紙に溶け込む） */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-paper-raised/85 px-5 py-3 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex items-center gap-2 text-ink-3">
              {prev ? (
                <Link
                  href={`${base}/blogs/${prev.id}`}
                  aria-label={blog.post.prev}
                  className="transition-colors hover:text-accent"
                >
                  ‹
                </Link>
              ) : (
                <span className="opacity-30">‹</span>
              )}
              {next ? (
                <Link
                  href={`${base}/blogs/${next.id}`}
                  aria-label={blog.post.next}
                  className="transition-colors hover:text-accent"
                >
                  ›
                </Link>
              ) : (
                <span className="opacity-30">›</span>
              )}
            </span>
            <span className="label truncate !text-ink">
              {category && (
                <span className="!text-ink-3">{category.label} / </span>
              )}
              {post.title}
            </span>
          </div>

          {/* 右：目次（一覧）へ戻る三本線アイコン */}
          <Link
            href={`${base}/blogs`}
            aria-label={blog.post.contents}
            title={blog.post.contents}
            className="shrink-0 text-ink-3 transition-colors hover:text-accent"
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 1h18M1 7h18M1 13h12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        {/* 記事本体 */}
        <article
          id="blog-article"
          className="mx-auto max-w-[74ch] px-6 pb-24 pt-14 sm:px-12 lg:px-16"
        >
          {/* 中央寄せヘッダ */}
          <header className="text-center">
            <p className="label !text-ink-3">
              {post.words} {blog.post.wordsLabel} · {blog.post.author}
            </p>
            <h1 className="mx-auto mt-5 max-w-[27ch] font-serif text-[length:clamp(1.9rem,1.2rem+2.6vw,3.1rem)] font-[430] leading-[1.05] tracking-[-0.02em]">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[58ch] font-serif text-[1.2rem] italic leading-[1.5] text-ink-2">
              {post.excerpt}
            </p>
            <div className="mx-auto mt-8 h-px w-10 bg-rule-strong" />
          </header>

          {/* 図版（白紙の上に直接・キャプション付き） */}
          <figure className="mt-12">
            <Image
              src={postFigure(post.id)}
              alt=""
              width={460}
              height={363}
              unoptimized
              className="mx-auto h-auto w-full max-w-[460px]"
            />
            <figcaption className="label mt-4 text-center !text-[0.6rem] !text-ink-3">
              FIG · {category?.no ?? "—"} · {post.date}
            </figcaption>
          </figure>

          {/* 本文（先頭にドロップキャップ）。
              "## 見出し" / "### 小見出し" の行は id 付き h2/h3 に変換し、
              右レールのアンカーから飛べるようにする。 */}
          <div className="mt-14 space-y-6">
            {post.body.map((para, i) => {
              const m3 = /^###\s+(.+)/.exec(para);
              if (m3) {
                return (
                  <h3
                    key={i}
                    id={`sec-${i}`}
                    className="scroll-mt-24 pt-3 font-serif text-[1.25rem] font-[460] leading-[1.2] tracking-[-0.01em]"
                  >
                    {m3[1]}
                  </h3>
                );
              }
              const m2 = /^##\s+(.+)/.exec(para);
              if (m2) {
                return (
                  <h2
                    key={i}
                    id={`sec-${i}`}
                    className="scroll-mt-24 pt-5 font-serif text-[1.6rem] font-[440] leading-[1.18] tracking-[-0.015em]"
                  >
                    {m2[1]}
                  </h2>
                );
              }
              return (
                <div key={i} className={i === 0 ? "drop" : ""} lang={lang}>
                  <p className="text-left text-[1.05rem] leading-[1.72] text-ink sm:text-justify">
                    {para}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 前後の記事 */}
          <nav className="mt-16 flex justify-between gap-6 border-t border-rule pt-6">
            <div className="max-w-[45%]">
              {prev && (
                <Link href={`${base}/blogs/${prev.id}`} className="group block">
                  <span className="label !text-ink-3">← {blog.post.prev}</span>
                  <span className="mt-1 block font-serif text-[0.98rem] leading-[1.3] text-ink-2 transition-colors group-hover:text-accent">
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="max-w-[45%] text-right">
              {next && (
                <Link href={`${base}/blogs/${next.id}`} className="group block">
                  <span className="label !text-ink-3">{blog.post.next} →</span>
                  <span className="mt-1 block font-serif text-[0.98rem] leading-[1.3] text-ink-2 transition-colors group-hover:text-accent">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </article>

        {/* モバイル用：一覧へ戻る */}
        <div className="px-6 pb-10 sm:px-12 xl:hidden">
          <Link
            href={`${base}/blogs`}
            className="label !text-ink-2 transition-colors hover:!text-accent"
          >
            {blog.post.backToList}
          </Link>
        </div>
      </div>
    </div>
  );
}
