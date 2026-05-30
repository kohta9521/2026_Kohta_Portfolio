"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionHead from "@/components/common/SectionHead/SectionHead";

// 2 行を超える説明文だけ、折りたたみ＋展開トグルを出す。
// 各項目で独立して開閉でき、複数同時に開いてよい。
function CareerDesc({ text, lang }: { text: string; lang: "en" | "ja" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);

  useEffect(() => {
    // 折りたたみ時（line-clamp-2）に中身がはみ出すかで、トグルの要否を判定。
    if (expanded) return;
    const el = ref.current;
    if (!el) return;
    const check = () => setClampable(el.scrollHeight > el.clientHeight + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [expanded, text]);

  return (
    <div>
      <p
        ref={ref}
        className={`mt-2 text-[0.98rem] leading-[1.55] text-ink-2 ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {text}
      </p>
      {(clampable || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="label mt-2 inline-flex items-center gap-1 !text-accent transition-opacity hover:opacity-70"
        >
          <span
            className={`inline-block transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
          {expanded
            ? lang === "ja"
              ? "閉じる"
              : "Show less"
            : lang === "ja"
              ? "もっと見る"
              : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function Career({ no = "§ —" }: { no?: string }) {
  const { t, lang } = useLanguage();

  return (
    <section>
      <SectionHead
        no={no}
        kicker={t.career.kicker}
        title={t.career.title}
        titleClassName="max-w-none"
      />
      <ul className="mt-10">
        {t.career.items.map((c) => (
          <li
            key={c.org}
            className="flex flex-col gap-x-10 gap-y-2 border-t border-rule py-6 sm:flex-row"
          >
            <div className="flex items-baseline gap-3 sm:w-48 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
              <span className="font-mono text-[0.78rem] text-ink-3">
                {c.period.split(" / ")[0]}
              </span>
              <span className="label !text-accent">{c.role}</span>
            </div>
            <div className="max-w-[60ch]">
              <h3 className="font-serif text-[1.3rem] leading-[1.12] tracking-[-0.01em]">
                {c.org}
              </h3>
              <CareerDesc text={c.desc} lang={lang} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
