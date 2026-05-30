"use client";

import { useState } from "react";

// /blogs の LIST / GRID 切替だけを担う最小のクライアント島。
// 表示する2ビュー（BlogToc / BlogGrid）はサーバーで描画済みのノードを
// props で受け取るため、辞書はクライアント JS に載らない。
export default function BlogViewToggle({
  listLabel,
  gridLabel,
  statsBar,
  intro,
  list,
  grid,
}: {
  listLabel: string;
  gridLabel: string;
  statsBar: React.ReactNode;
  intro: React.ReactNode;
  list: React.ReactNode;
  grid: React.ReactNode;
}) {
  const [view, setView] = useState<"list" | "grid">("grid");

  return (
    <>
      <div className="mt-4 inline-flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView("list")}
          aria-pressed={view === "list"}
          className={`label transition-colors ${
            view === "list" ? "!text-accent" : "!text-ink-3 hover:!text-ink"
          }`}
        >
          {listLabel}
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
          {gridLabel}
        </button>
      </div>

      <div className="mt-12">{statsBar}</div>

      <p className="mx-auto mt-10 max-w-[58ch] text-[1rem] leading-[1.6] text-ink-2">
        {intro}
      </p>

      {/* 本文：選択中ビューのみ表示（両方サーバーで描画済み） */}
      <section className="mt-16 border-t border-rule-strong pt-12">
        {view === "grid" ? grid : list}
      </section>
    </>
  );
}
