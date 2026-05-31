"use client";

import { useEffect } from "react";

// [data-reveal] が付いた要素を走査し、スクロール登場演出を一括適用する。
// サーバーコンポーネントを client 化せずに演出を足せるよう、属性ベースで非侵襲に動かす。
//
//   data-reveal="up"    … 下から 18px フェードアップ（既定の見出し/段落向け）
//   data-reveal="fade"  … その場でフェードのみ
//   data-reveal="text"  … SplitText で文字単位、マスク下からせり上がり（ヒーロー見出し向け）
//   data-reveal="lines" … SplitText で行単位フェードアップ
//   data-reveal-delay="0.12" … 任意の遅延（秒）でステバー
//
// SEO/A11y: 初期非表示は <html class="reveal-ready"> の CSS だけが担い、JS 無効・クローラ・
// reduced-motion では全文表示される。
export default function ScrollReveal() {
  useEffect(() => {
    const html = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // reduced-motion: 演出なしで即表示
    if (prefersReduced) {
      html.classList.remove("reveal-ready");
      return;
    }

    let ctx: { revert: () => void } | null = null;
    let started = false;

    const run = async () => {
      if (started) return;
      started = true;
      try {
        const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/SplitText"),
        ]);
        gsap.registerPlugin(ScrollTrigger, SplitText);

        ctx = gsap.context(() => {
          const delayOf = (el: Element) =>
            parseFloat(el.getAttribute("data-reveal-delay") || "0") || 0;

          // 演出完了後、要素を「恒久的に表示」状態へ確定させる。
          // data-reveal を外して CSS の初期非表示(.reveal-ready [data-reveal]) の対象から
          // 外し、インラインも clear する。これで以降 ScrollTrigger.refresh（スマホの
          // アドレスバー伸縮やフォント遅延読込で発生）やリフローが起きてもテキストが消えない。
          const settle = (el: HTMLElement, props: string) => {
            el.removeAttribute("data-reveal");
            gsap.set(el, { clearProps: props });
          };

          // --- up / fade ---
          gsap.utils
            .toArray<HTMLElement>('[data-reveal="up"], [data-reveal="fade"]')
            .forEach((el) => {
              const isUp = el.getAttribute("data-reveal") === "up";
              gsap.set(el, { opacity: 0, y: isUp ? 18 : 0 });
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.85,
                delay: delayOf(el),
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
                onComplete: () => settle(el, "opacity,transform"),
              });
            });

          // --- text（文字単位・マスク） ---
          gsap.utils
            .toArray<HTMLElement>('[data-reveal="text"]')
            .forEach((el) => {
              gsap.set(el, { opacity: 1 });
              const split = new SplitText(el, {
                type: "chars",
                mask: "chars",
              });
              gsap.from(split.chars, {
                yPercent: 120,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                stagger: 0.03,
                delay: delayOf(el),
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
                // 完了後は分割を解除して素のテキストに戻す（マスクのクリップで
                // リフロー時に文字が隠れて消えるのを防ぐ）。
                onComplete: () => {
                  split.revert();
                  settle(el, "opacity");
                },
              });
            });

          // --- lines（行単位） ---
          gsap.utils
            .toArray<HTMLElement>('[data-reveal="lines"]')
            .forEach((el) => {
              gsap.set(el, { opacity: 1 });
              const split = new SplitText(el, {
                type: "lines",
                mask: "lines",
              });
              gsap.from(split.lines, {
                yPercent: 110,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.09,
                delay: delayOf(el),
                scrollTrigger: { trigger: el, start: "top 86%", once: true },
                onComplete: () => {
                  split.revert();
                  settle(el, "opacity");
                },
              });
            });

          // 初回ロードで in-view の要素を確実に発火
          ScrollTrigger.refresh();
        });
      } catch {
        // GSAP 失敗時は全文表示にフォールバック
        html.classList.remove("reveal-ready");
      }
    };

    // ブート中はプリローダー完了を待ってからヒーローを出す
    if (html.classList.contains("booting")) {
      window.addEventListener("preloader:done", run, { once: true });
      // 取りこぼし保険（プリローダーが何らかの理由で完了通知を出さない場合）
      const fallback = window.setTimeout(run, 4000);
      return () => {
        window.removeEventListener("preloader:done", run);
        window.clearTimeout(fallback);
        ctx?.revert();
      };
    }

    run();
    return () => ctx?.revert();
  }, []);

  return null;
}
