"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { consentCopy } from "@/dics/consent";
import { isGtmEnabled, updateAnalyticsConsent } from "@/lib/gtm";

const STORAGE_KEY = "consent";

// クッキー同意バナー（Consent Mode v2 連動）。
// layout 直下（LanguageProvider の外）に置くため、言語は URL から判定し辞書を直接読む。
// 既定は denied（layout の先頭スクリプトで設定済み）。同意/拒否で update して localStorage に保存。
export default function ConsentBanner() {
  const pathname = usePathname() || "/";
  const lang = pathname.startsWith("/ja") ? "ja" : "en";
  const t = consentCopy[lang];

  // 未選択のときだけ表示。SSR と初回描画を一致させるため open は false 始まり。
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isGtmEnabled) return; // GTM 無効時はバナー自体を出さない
    // localStorage はクライアント専用。SSR と初回描画を一致させるため open=false で始め、
    // マウント後に未選択なら開く（外部ストア同期なので effect 内 setState は妥当）。
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved !== "granted" && saved !== "declined") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    updateAnalyticsConsent(granted);
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "declined");
    } catch {
      /* localStorage 不可でも選択は反映済み */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[640px] rounded-[--radius-card] border border-rule-strong bg-paper-raised p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] sm:inset-x-auto sm:right-4 sm:left-auto sm:p-5"
    >
      <p className="max-w-[58ch] text-[0.86rem] leading-[1.55] text-ink-2">
        {t.message}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => choose(true)}
          className="btn btn-primary"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="btn btn-ghost"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}
