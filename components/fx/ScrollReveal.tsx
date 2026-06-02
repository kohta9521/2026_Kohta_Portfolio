"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// [data-reveal] が付いた要素を走査し、スクロール登場演出を一括適用する。
// サーバーコンポーネントを client 化せずに演出を足せるよう、属性ベースで非侵襲に動かす。
//
//   data-reveal="up"            … 下から 18px フェードアップ（既定の見出し/段落向け）
//   data-reveal="fade"          … その場でフェードのみ
//   data-reveal="text"/"lines"  … （旧 SplitText）要素単位のフェードアップに集約
//   data-reveal-delay="0.12"    … 任意の遅延（秒）でステバー
//
// 設計（再発防止）:
//   * IntersectionObserver + CSS トランジションのみ。GSAP/ScrollTrigger/SplitText に依存しない。
//   * usePathname で「ルートが変わるたび」に未処理要素を再走査する。
//     → 言語切替やページ遷移（next/link のクライアント遷移）でレイアウトが再マウント
//       されなくても、新しいページのテキストが必ず表示される。
//   * フェイルオープン: reduced-motion / IO 非対応 / フェイルセーフのいずれでも
//     最終的に必ず .is-revealed が付き、テキストが空白のまま残ることがない。
//   * 初期非表示は <html class="reveal-ready"> の CSS だけが担い、JS 無効・クローラ・
//     reduced-motion では全文表示される（SEO・A11y 無害）。
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 表示に確定させる。delay を transition-delay へ写してステバーを再現。
    const reveal = (el: Element) => {
      const node = el as HTMLElement;
      if (node.classList.contains("is-revealed")) return;
      const d = parseFloat(node.getAttribute("data-reveal-delay") || "0") || 0;
      if (d) node.style.transitionDelay = `${d}s`;
      node.classList.add("is-revealed");
    };

    const targets = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reveal]:not(.is-revealed)"
        )
      );

    // reduced-motion / IO 非対応: 演出なしで即表示（フェイルオープン）。
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      html.classList.remove("reveal-ready");
      targets().forEach(reveal);
      return;
    }

    let io: IntersectionObserver | null = null;
    let failSafe: number | undefined;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      const els = targets();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );
      els.forEach((el) => io?.observe(el));

      // フェイルセーフ: 何があってもテキストを空白のまま残さない。
      failSafe = window.setTimeout(() => targets().forEach(reveal), 3000);
    };

    // ブート中はプリローダー完了を待ってからヒーロー周辺を出す。
    if (html.classList.contains("booting")) {
      window.addEventListener("preloader:done", start, { once: true });
      // 取りこぼし保険（完了通知が来ない場合でも必ず開始する）。
      const bootFallback = window.setTimeout(start, 4000);
      return () => {
        window.removeEventListener("preloader:done", start);
        window.clearTimeout(bootFallback);
        window.clearTimeout(failSafe);
        io?.disconnect();
      };
    }

    start();
    return () => {
      window.clearTimeout(failSafe);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
