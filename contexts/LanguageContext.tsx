"use client";

import { createContext, useContext, useEffect } from "react";

import { en } from "@/dics/en";
import { ja } from "@/dics/ja";
import type { Messages } from "@/dics/types";

export type Lang = "en" | "ja";

const dictionaries: Record<Lang, Messages> = { en, ja };

interface LanguageContextValue {
  lang: Lang;
  t: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// 言語はルート（URL）で決まる。/ = en, /ja = ja。
// 各ページが自分のロケールを lang で渡す。
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  // <html lang> をルートの言語へ同期
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
