import Link from "next/link";

import { langBase, type Lang } from "@/lib/i18n";
import { getBlog } from "@/dics/blog";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import BlogToc from "./BlogToc";
import BlogGrid from "./BlogGrid";
import BlogStatsBar from "./BlogStatsBar";
import BlogViewToggle from "./BlogViewToggle";

// /blogs（および /ja/blogs）。blogs page.png 準拠：
// 中央寄せの「Table of Contents.」＋ LIST / GRID トグル＋メタ統計＋カテゴリ別の本文。
// 表示トグルだけを BlogViewToggle（クライアント島）に隔離し、本体はサーバー描画。
export default function BlogListView({ lang }: { lang: Lang }) {
  const blog = getBlog(lang);
  const base = langBase(lang);

  return (
    <main className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
      <Header lang={lang} />

      {/* 中央寄せタイトル + 表示トグル（トグル以下はクライアント島） */}
      <section className="pt-20 text-center">
        <h1 className="font-serif text-[length:--text-display] font-[430] leading-[1.0] tracking-[-0.02em]">
          {blog.index.title}
        </h1>

        <BlogViewToggle
          listLabel={blog.index.listLabel}
          gridLabel={blog.index.gridLabel}
          statsBar={<BlogStatsBar lang={lang} />}
          intro={blog.index.intro}
          list={<BlogToc lang={lang} />}
          grid={<BlogGrid lang={lang} />}
        />
      </section>

      <div className="mt-16 border-t border-rule pt-6">
        <Link
          href={base || "/"}
          className="label !text-ink-2 transition-colors hover:!text-accent"
        >
          {blog.index.backHome}
        </Link>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
