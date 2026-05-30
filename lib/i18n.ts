// ルート（URL）で確定する言語の、サーバー用ディクショナリ解決ヘルパー。
// クライアントコンテキストは廃止し、ページ（サーバー）が lang を解決して
// 各コンポーネントへ props で配る。これにより辞書(en/ja)はクライアント JS に載らない。
//
// 注意: このモジュール（および dics/* の getBlog/getWorks など）は en/ja の両辞書を
// import するため、import してよいのは「サーバーコンポーネント」だけ。
// クライアントコンポーネントには解決済みの slice を props で渡すこと。

import { en } from "@/dics/en";
import { ja } from "@/dics/ja";
import type { Messages } from "@/dics/types";

export type Lang = "en" | "ja";

const dictionaries: Record<Lang, Messages> = { en, ja };

export function getDictionary(lang: Lang): Messages {
  return dictionaries[lang];
}

/** en は接頭辞なし、ja は "/ja"。リンクの base に使う。 */
export function langBase(lang: Lang): string {
  return lang === "ja" ? "/ja" : "";
}
