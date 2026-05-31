"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Heading {
  id: string;
  text: string;
  /** 記事内の縦位置を 0..1 で表したもの（レール上の配置に使う） */
  ratio: number;
}

// blog_detail_rightside.png の右端「目盛りレール」。
// スクロール量に応じて上から目盛りがアクセント色に塗られ、上部に進捗％を表示する。
// さらに記事内の見出し(#blog-article の h2/h3[id])を拾い、目盛りの左に小さな
// クリック可能アンカーとして配置する（クリックでその見出しへスムーズスクロール）。
// xl 以上でのみ表示。
export default function BlogProgressRail() {
  const [p, setP] = useState(0);
  const [heads, setHeads] = useState<Heading[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const collect = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("#blog-article :is(h2,h3)[id]")
      );
      setHeads(
        els.map((el) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          return {
            id: el.id,
            text: el.textContent ?? "",
            ratio: max > 0 ? Math.min(1, Math.max(0, top / max)) : 0,
          };
        })
      );
    };
    const onResize = () => {
      onScroll();
      collect();
    };
    onScroll();
    collect();
    // 画像読込などでレイアウトが確定してから再計測
    const t = window.setTimeout(collect, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const N = 88;
  const head = Math.round(p * (N - 1));

  // body 直下へポータル出力することで、祖先の transform/filter の影響を受けず
  // 確実にビューポート基準で fixed（＝スクロールしても画面中央に固定）になる。
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed right-3 top-1/2 z-10 hidden h-[70vh] -translate-y-1/2 xl:block">
      <div className="flex h-full flex-col items-end">
        <span className="mb-3 font-mono text-[0.62rem] tabular-nums text-ink-3">
          {(p * 100).toFixed(1)}
        </span>

        {/* 目盛り＋見出しアンカーの領域（残り高さいっぱい） */}
        <div className="relative flex flex-1 flex-col items-end justify-between">
          {Array.from({ length: N }).map((_, i) => {
            const active = i <= head;
            return (
              <span
                key={i}
                className="block h-px rounded-full transition-all duration-200"
                style={{
                  width: i === head ? 18 : active ? 10 : 6,
                  background: active
                    ? "var(--color-accent)"
                    : "var(--color-rule-strong)",
                  opacity: active ? 1 : 0.4,
                }}
              />
            );
          })}

          {/* 見出しアンカー：目盛りの左に小さく配置 */}
          {heads.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => go(e, h.id)}
              style={{ top: `${h.ratio * 100}%` }}
              className="pointer-events-auto absolute right-6 max-w-[16ch] -translate-y-1/2 truncate text-right font-mono text-[0.6rem] uppercase tracking-[0.05em] text-ink-3 transition-colors hover:text-accent"
            >
              {h.text}
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
