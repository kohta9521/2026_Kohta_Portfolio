import Link from "next/link";

import { langBase, type Lang } from "@/lib/i18n";
import { getBlog } from "@/dics/blog";
import BlogToc from "./BlogToc";

// トップページの §03 セクション。03.png のヘッダ（v1.0 / Table of Contents. / PROGRESS · WORDS）を再現し、
// 下に目次（BlogToc）と /blogs への導線を置く。
export default function BlogIndex({ no, lang }: { no?: string; lang: Lang }) {
  const blog = getBlog(lang);
  const base = langBase(lang);

  return (
    <section id="journal" className="scroll-mt-8 pt-24">
      {/* ヘッダ行：左に §no・v1.0・見出し、右に PROGRESS · WORDS */}
      <div className="flex items-baseline justify-between gap-4 border-t border-rule-strong pt-3">
        <span className="label !text-accent">{no ?? blog.section.no}</span>
        <span className="label">{blog.section.progress}</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-6">
        <h2 className="flex items-baseline gap-3 font-serif text-h1 font-[430] leading-[1.04] tracking-[-0.015em]">
          <span className="label !text-ink-3">{blog.section.version}</span>
          {blog.section.title}
        </h2>
        <Link
          href={`${base}/blogs`}
          className="label hidden shrink-0 !text-ink-2 transition-colors hover:!text-accent sm:inline"
        >
          {blog.section.viewAll} →
        </Link>
      </div>

      <div className="mt-12">
        <BlogToc lang={lang} />
      </div>

      <Link
        href={`${base}/blogs`}
        className="label mt-6 inline-flex !text-ink-2 transition-colors hover:!text-accent sm:hidden"
      >
        {blog.section.viewAll} →
      </Link>
    </section>
  );
}
