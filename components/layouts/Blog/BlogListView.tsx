"use client";

import { useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";
import { getBlog } from "@/dics/blog";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import BlogToc from "./BlogToc";
import BlogGrid from "./BlogGrid";
import BlogStatsBar from "./BlogStatsBar";

// /blogs（および /ja/blogs）。blogs page.png 準拠：
// 中央寄せの「Table of Contents.」＋ LIST / GRID トグル＋メタ統計＋カテゴリ別の本文。
export default function BlogListView() {
  const { lang } = useLanguage();
  const blog = getBlog(lang);
  const base = lang === "ja" ? "/ja" : "";
  const [view, setView] = useState<"list" | "grid">("grid");

  return (
    <main className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
      <Header />

      {/* 中央寄せタイトル + 表示トグル */}
      <section className="pt-20 text-center">
        <h1 className="font-serif text-[length:--text-display] font-[430] leading-[1.0] tracking-[-0.02em]">
          {blog.index.title}
        </h1>
        <div className="mt-4 inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`label transition-colors ${
              view === "list" ? "!text-accent" : "!text-ink-3 hover:!text-ink"
            }`}
          >
            {blog.index.listLabel}
          </button>
          <span aria-hidden className="label !text-ink-3">
            ·
          </span>
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            className={`label transition-colors ${
              view === "grid" ? "!text-accent" : "!text-ink-3 hover:!text-ink"
            }`}
          >
            {blog.index.gridLabel}
          </button>
        </div>

        <div className="mt-12">
          <BlogStatsBar />
        </div>

        <p className="mx-auto mt-10 max-w-[58ch] text-[1rem] leading-[1.6] text-ink-2">
          {blog.index.intro}
        </p>
      </section>

      {/* 本文 */}
      <section className="mt-16 border-t border-rule-strong pt-12">
        {view === "grid" ? <BlogGrid /> : <BlogToc />}
      </section>

      <div className="mt-16 border-t border-rule pt-6">
        <Link
          href={base || "/"}
          className="label !text-ink-2 transition-colors hover:!text-accent"
        >
          {blog.index.backHome}
        </Link>
      </div>

      <Footer />
    </main>
  );
}
