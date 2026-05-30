"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// <html data-theme> を「外部状態」とみなして購読する。
// 初期値は layout の先頭スクリプトが先に適用済み（チラつき防止）。
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
function getSnapshot(): Theme {
  return (
    (document.documentElement.getAttribute("data-theme") as Theme) || "light"
  );
}
// サーバー描画時は現在テーマが不明（どのボタンも押下状態にしない）
function getServerSnapshot(): Theme | null {
  return null;
}

// ライト / ダークの切替。data-theme を <html> に書き、localStorage に保存する。
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // data-theme を書き換えると MutationObserver 経由で theme が更新される。
  const apply = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* localStorage 不可でも切替自体は動く */
    }
  };

  const options: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <span className="label inline-flex items-center gap-1.5" aria-label="Theme">
      {options.map((o, i) => (
        <span key={o.value} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="text-ink-3">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => apply(o.value)}
            aria-pressed={theme === o.value}
            className={
              theme === o.value
                ? "!text-accent"
                : "text-ink-3 transition-colors hover:text-ink"
            }
          >
            {o.label}
          </button>
        </span>
      ))}
    </span>
  );
}
