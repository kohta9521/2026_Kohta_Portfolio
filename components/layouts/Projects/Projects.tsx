"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionHead from "@/components/common/SectionHead/SectionHead";

export default function Projects({ no = "§ —" }: { no?: string }) {
  const { t, lang } = useLanguage();
  const base = lang === "ja" ? "/ja" : "";

  return (
    <section id="work">
      <SectionHead
        no={no}
        kicker={t.projects.kicker}
        title={t.projects.title}
        titleClassName="max-w-none"
      />
      <ul className="mt-10 flex flex-col gap-3">
        {t.projects.items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`${base}/works/${p.slug}`}
              className="card-fx group flex cursor-pointer gap-4 rounded-[--radius-card] border border-rule bg-paper-raised p-2.5"
            >
              {/* 左：画像 */}
              <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-[--radius-card] border border-rule bg-paper-sunken sm:w-24">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="96px"
                  className="object-cover transition-[transform,filter] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.08] group-hover:saturate-[1.15]"
                />
                {/* hover で乗るアクセントのグラデーション膜 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              {/* 右：テキスト */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="flex min-w-0 items-baseline gap-1.5 font-serif text-[1.08rem] leading-[1.1] tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent">
                    <span className="truncate">{p.title}</span>
                    <span
                      aria-hidden
                      className="shrink-0 -translate-x-1 font-mono text-[0.78rem] text-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </h3>
                  <span className="shrink-0 font-mono text-[0.64rem] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                    {p.period}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[0.82rem] leading-[1.4] text-ink-2">
                  {p.desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
