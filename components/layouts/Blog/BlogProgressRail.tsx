"use client";

import { useEffect, useState } from "react";

// blog_detail_rightside.png の右端「目盛りレール」。
// スクロール量に応じて上から目盛りがアクセント色に塗られ、上部に進捗％を表示する。
// xl 以上でのみ表示（装飾なので pointer-events なし）。
export default function BlogProgressRail() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const N = 52;
  const head = Math.round(p * (N - 1));

  return (
    <div className="pointer-events-none fixed right-3 top-0 z-10 hidden h-screen flex-col items-end justify-center gap-[3px] py-10 xl:flex">
      <span className="mb-3 font-mono text-[0.62rem] tabular-nums text-ink-3">
        {(p * 100).toFixed(1)}
      </span>
      {Array.from({ length: N }).map((_, i) => {
        const active = i <= head;
        return (
          <span
            key={i}
            className="block h-px rounded-full transition-all duration-200"
            style={{
              width: i === head ? 18 : active ? 11 : 7,
              background: active
                ? "var(--color-accent)"
                : "var(--color-rule-strong)",
              opacity: active ? 1 : 0.45,
            }}
          />
        );
      })}
    </div>
  );
}
