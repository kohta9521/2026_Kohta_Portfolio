"use client";

import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";
import { getBlog, postFigure } from "@/dics/blog";
import FilePlate from "@/components/common/FilePlate/FilePlate";

// blogs page.png のグリッド表示。カテゴリごとに、左に説明・右に図版サムネのカード群。
export default function BlogGrid() {
  const { lang } = useLanguage();
  const blog = getBlog(lang);
  const base = lang === "ja" ? "/ja" : "";

  return (
    <div className="space-y-16">
      {blog.categories.map((cat) => {
        const posts = blog.posts.filter((p) => p.category === cat.id);
        if (posts.length === 0) return null;
        return (
          <section
            key={cat.id}
            className="flex flex-col gap-8 border-t border-rule pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
          >
            {/* 左：カテゴリ番号・名称・説明 */}
            <div className="lg:w-60 lg:shrink-0">
              <h3 className="label !text-ink">
                <span className="text-accent">{cat.no}.</span> {cat.label}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.92rem] leading-[1.55] text-ink-2">
                {cat.desc}
              </p>
            </div>

            {/* 右：カードグリッド */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:w-[64%] lg:grid-cols-4">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link href={`${base}/blogs/${p.id}`} className="group block">
                    <div className="card-fx aspect-[4/5] rounded-[--radius-card] border border-rule">
                      <FilePlate
                        src={postFigure(p.id)}
                        filename={p.date}
                        imgPadding="p-5"
                      />
                    </div>
                    <h4 className="mt-3 text-center font-serif text-[0.95rem] leading-[1.25] text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h4>
                    <p className="label mt-1.5 text-center !text-[0.6rem] !text-ink-3">
                      {p.words} {blog.post.wordsLabel}
                    </p>
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
