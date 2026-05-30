"use client";

import { useState } from "react";

import type { Messages } from "@/dics/types";
import SectionHead from "@/components/common/SectionHead/SectionHead";

// 04.png の「Common Questions」を再現。
// 左：質問リスト（選択中は濃く・他はフェード／上下キーで移動）。
// 右：IN: 質問 / OUT: 回答 のターミナル風カード。
export default function Faq({
  no = "§ —",
  data,
}: {
  no?: string;
  data: Messages["faq"];
}) {
  const items = data.items;
  const [active, setActive] = useState(0);

  const go = (next: number) => {
    const len = items.length;
    setActive(((next % len) + len) % len);
  };

  const current = items[active];

  return (
    <section id="faq" className="scroll-mt-8 pt-24">
      <SectionHead no={no} kicker={data.kicker} title={data.title} />

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        {/* 左：質問リスト + 縦中央に固定した上下ナビ */}
        <div className="flex gap-3 lg:w-[34%] lg:shrink-0">
          <ul
            className="flex-1"
            role="listbox"
            aria-label={data.title}
            aria-activedescendant={`faq-q-${active}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                go(active + 1);
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                go(active - 1);
              }
            }}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.q}
                  id={`faq-q-${i}`}
                  role="option"
                  aria-selected={isActive}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`block w-full py-3 text-left font-serif text-[1.05rem] leading-[1.35] transition-colors ${
                      isActive
                        ? "font-medium text-ink"
                        : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    {item.q}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* 上下ナビ：リスト高さの縦中央に固定（アクティブ位置に依存しない） */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-3 text-ink-3">
            <button
              type="button"
              aria-label="Previous question"
              onClick={() => go(active - 1)}
              className="text-lg leading-none transition-colors hover:text-accent"
            >
              ↑
            </button>
            <button
              type="button"
              aria-label="Next question"
              onClick={() => go(active + 1)}
              className="text-lg leading-none transition-colors hover:text-accent"
            >
              ↓
            </button>
          </div>
        </div>

        {/* 右：IN / OUT カード */}
        <div className="rounded-[--radius-card] border border-rule-strong lg:flex-1">
          {/* IN: 質問 */}
          <div className="flex items-baseline gap-4 border-b border-rule px-5 py-4 sm:px-7">
            <span className="label shrink-0 !text-ink-3">IN:</span>
            <span className="font-mono text-[0.82rem] uppercase tracking-[0.08em] text-ink">
              {current.q}
            </span>
          </div>
          {/* OUT: 回答 */}
          <div className="flex items-baseline gap-4 px-5 py-5 sm:px-7 sm:py-6">
            <span className="label shrink-0 !text-ink-3">OUT:</span>
            <div className="max-w-[62ch] space-y-4">
              {current.a.map((para, i) => (
                <p key={i} className="text-[1rem] leading-[1.6] text-ink">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
