"use client";

import { useLanguage } from "@/contexts/LanguageContext";

// 右カラム（Projects の下）に収める、コンパクトな技術スタック表示。
// 独立した Skills セクションの 4 カラムグリッドと違い、
// 狭い幅でも収まる「ラベル + ピル」のグループ積み重ねレイアウト。
export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="mt-10 border-t border-rule pt-8">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[0.74rem] text-accent">§ 02·b</span>
        <span className="label !text-ink">{t.skills.kicker}</span>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {t.skills.groups.map((g) => (
          <div
            key={g.label}
            className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <div className="flex shrink-0 items-baseline gap-2 sm:w-28">
              <span className="font-mono text-[0.64rem] text-ink-3">
                {g.no}
              </span>
              <span className="label !text-ink-2">{g.label}</span>
            </div>
            <ul className="flex flex-1 flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li key={item.name} className="group/tag relative">
                  <button
                    type="button"
                    className="tag cursor-help transition-colors group-hover/tag:border-accent group-hover/tag:text-accent group-focus-within/tag:border-accent group-focus-within/tag:text-accent"
                  >
                    {item.name}
                  </button>
                  {/* カスタムツールチップ：実務メモを表示 */}
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[230px] -translate-x-1/2 translate-y-1 rounded-[--radius-card] border border-rule-strong bg-paper-raised px-3 py-2 text-left text-[0.74rem] leading-[1.45] text-ink-2 opacity-0 shadow-[0_12px_34px_-14px_rgba(0,0,0,0.55)] transition-[opacity,transform] duration-200 group-hover/tag:translate-y-0 group-hover/tag:opacity-100 group-focus-within/tag:translate-y-0 group-focus-within/tag:opacity-100"
                  >
                    <span className="mb-1 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-accent">
                      {item.name}
                      {item.version ? ` · ${item.version}` : ""}
                    </span>
                    {item.note}
                    {/* 下向きの三角 */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full -mt-px h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-solid border-rule-strong bg-paper-raised"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
