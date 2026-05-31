import Link from "next/link";

import { langBase, type Lang } from "@/lib/i18n";
import { getBlog } from "@/dics/blog";

// 03.png の「Table of Contents」を再現する目次本体。
// カテゴリごとに記事を列挙し、タイトル → ドットリーダー → 目安 WORDS を一行に。
// トップの §03 セクションと /blogs ページの両方から使う共通パーツ。
export default function BlogToc({ lang }: { lang: Lang }) {
  const blog = getBlog(lang);
  const base = langBase(lang);

  return (
    <div className="columns-1 gap-x-12 md:columns-2 lg:columns-3 [&>*]:break-inside-avoid">
      {blog.categories.map((cat) => {
        const posts = blog.posts.filter((p) => p.category === cat.id);
        if (posts.length === 0) return null;
        return (
          <section key={cat.id} className="mb-10 break-inside-avoid">
            <h3 className="label !text-ink">
              <span className="text-accent">{cat.no}.</span> {cat.label}
            </h3>
            <ul className="mt-4">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`${base}/blogs/${p.id}`}
                    className="group flex items-baseline gap-2 py-[0.45rem] text-ink-2 transition-colors hover:text-accent"
                  >
                    <span className="font-serif text-[0.98rem] font-[560] leading-[1.3]">
                      {p.title}
                    </span>
                    <span
                      aria-hidden
                      className="mb-[0.3em] flex-1 self-end border-b border-dotted border-rule-strong opacity-45"
                    />
                    <span className="label shrink-0 !text-[0.6rem] !text-ink-3 transition-colors group-hover:!text-accent">
                      {p.words} {blog.post.wordsLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
