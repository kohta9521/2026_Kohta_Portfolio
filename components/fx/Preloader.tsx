"use client";

import { useEffect, useRef } from "react";

// 初回ブート画面。
// 表示制御は <html class="booting"> + CSS（.booting .preloader { display:flex }）で行い、
// hydration ミスマッチを避ける（サーバー/クライアントで同じ DOM を出す）。
// booting は layout の inline script が「初回訪問 かつ reduced-motion でない」時のみ付与する。
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;

    // 初回訪問でなければ何もしない（CSS で非表示のまま）。
    if (!html.classList.contains("booting")) return;

    let killed = false;

    const finish = () => {
      if (killed) return;
      killed = true;
      try {
        sessionStorage.setItem("kk_booted", "1");
      } catch {
        /* sessionStorage 不可でも続行 */
      }
      html.classList.remove("booting");
      html.classList.add("boot-done");
      // ScrollReveal に「ブート完了 → ヒーローを出してよい」を通知
      window.dispatchEvent(new Event("preloader:done"));
    };

    let tl: gsap.core.Timeline | null = null;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        if (killed) return;

        const counter = { v: 0 };
        tl = gsap.timeline({ onComplete: finish });

        // カウンタ 000 → 100 とバー充填。
        // LCP 配慮で短め（旧 1.15s）。初回セッションは PSI/Lighthouse の計測条件でもあり、
        // ここを縮めると実コンテンツのペイントが早まる。
        tl.to(counter, {
          v: 100,
          duration: 0.7,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = Math.round(counter.v);
            if (countRef.current) {
              countRef.current.textContent = String(n).padStart(3, "0");
            }
            if (fillRef.current) {
              fillRef.current.style.width = `${n}%`;
            }
          },
        });

        // 余韻 → 上方向へスライドアウト
        tl.to({}, { duration: 0.1 });
        tl.to(rootRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power4.inOut",
        });
      } catch {
        // GSAP 読み込み失敗時は即座に解除（ページを塞がない）
        finish();
      }
    })();

    return () => {
      killed = true;
      tl?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="preloader__inner">
        <div className="preloader__top">
          <span className="label !text-accent">§ SYSTEM / BOOT</span>
          <span className="label">FIG.000 / INIT</span>
        </div>
        <div className="preloader__count">
          <span ref={countRef}>000</span>
          <b> %</b>
        </div>
        <div className="preloader__bar">
          <span ref={fillRef} className="preloader__fill" />
        </div>
        <div className="preloader__bottom">
          <span className="label">KOHTA_KOUCHI</span>
          <span className="label">ENGINEERING PORTFOLIO</span>
        </div>
      </div>
    </div>
  );
}
