"use client";

import { Fragment } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionHead from "@/components/common/SectionHead/SectionHead";

// 文中の [[...]] をアクセント（青）文字に置き換える簡易マークアップ。
function renderItem(text: string) {
  return text.split(/(\[\[.*?\]\])/g).map((part, i) => {
    const m = part.match(/^\[\[(.*?)\]\]$/);
    return m ? (
      <span key={i} className="font-medium text-accent">
        {m[1]}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

export default function Highlights({
  no = "§ —",
  compact = false,
}: {
  no?: string;
  compact?: boolean;
}) {
  const { t } = useLanguage();

  // コンパクト版：Career の右の flex カラム（TechStack の下）に収める。
  // TechStack のミニ見出しに揃え、番号付きの行リストで魅せる。
  if (compact) {
    return (
      <section className="mt-10 border-t border-rule pt-8">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[0.74rem] text-accent">{no}</span>
          <span className="label !text-ink">{t.highlights.kicker}</span>
        </div>

        <ul className="mt-5">
          {t.highlights.items.map((item, i) => (
            <li
              key={item}
              className="group flex items-baseline gap-3 border-t border-rule py-3 first:border-t-0"
            >
              <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-accent transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.92rem] leading-[1.5] text-ink-2 transition-colors group-hover:text-ink">
                {renderItem(item)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="pt-24">
      <SectionHead
        no={no}
        kicker={t.highlights.kicker}
        title={t.highlights.title}
      />
      <ul className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        {t.highlights.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-t border-rule py-4 text-[1rem] leading-[1.5] text-ink-2"
          >
            <span aria-hidden className="font-mono text-accent">
              ·
            </span>
            <span className="max-w-[44ch]">{renderItem(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
